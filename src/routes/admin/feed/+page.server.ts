import { addMonths, format } from 'date-fns'
import slugify from 'slugify'

import { FEED_KEY } from '$env/static/private'
import db from '$lib/db'
import openai from '$lib/openai'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ request }) => {
  // Check if url contains the secret key to trigger the feed
  if (new URL(request.url).searchParams.get('key') !== FEED_KEY) {
    return {
      status: 401,
      body: { message: 'Unauthorized' },
    }
  }

  const response = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
          You extract all concerts happening in Portugal from
          ${format(new Date(), 'yyyy-MM-dd')} to ${format(addMonths(new Date(), 6), 'yyyy-MM-dd')}
          into JSON data. You also need to include the venue and artists for each concert.
          Make 100% sure the data is correct and complete, specially the images for each artist and venue.`,
      },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'concert_schema',
        schema: {
          type: 'object',
          properties: {
            concerts: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  date: { type: 'string' },
                  venue: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                      description: { type: 'string' },
                      image: { type: 'string' },
                      address: { type: 'string' },
                      city: { type: 'string' },
                      zip: { type: 'string' },
                      capacity: { type: 'string' },
                    },
                  },
                  artists: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        description: { type: 'string' },
                        image: { type: 'string' },
                        instagram: { type: 'string' },
                        facebook: { type: 'string' },
                        spotify: { type: 'string' },
                        youtube: { type: 'string' },
                        website: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    model: 'gpt-4o',
  })

  // Parse the response json data
  const parsedResponse = JSON.parse(response.choices.at(0)?.message.content || '{}')
  const concerts = parsedResponse.concerts as Concert[]

  // For each concert in the response, create a new concert in the database
  for (const concert of concerts) {
    // Generate unique slug based on the concert name, date, and venue
    const slug = slugify(`${concert.name} ${concert.venue.name} ${concert.date ?? ''}`, { lower: true })
    const venueSlug = slugify(concert.venue.name, { lower: true })

    // Check if venue already exists in the database
    const venue = await db.venue.findUnique({ where: { slug: venueSlug } })

    if (!venue) {
      const prompt = `A real photo of the venue ${concert.venue.name} in ${concert.venue.city}, Portugal.`
      console.log('✍🏻 Prompting OpenAI:', prompt)

      // Generate image for the venue if it doesn't exist
      const response = await openai.images.generate({ model: 'dall-e-3', prompt, n: 1, size: '1024x1024' })
      const image_url = response.data[0].url

      await db.venue.create({
        data: {
          slug: venueSlug,
          name: concert.venue.name,
          description: concert.venue.description,
          image: image_url,
          address: concert.venue.address,
          city: concert.venue.city,
          zip: concert.venue.zip,
          capacity: Number(concert.venue.capacity),
        },
      })
    }

    // Check if artists already exist in the database
    await Promise.all(
      concert.artists.map(async artist => {
        const artistSlug = slugify(artist.name, { lower: true })

        // Check if artist already exists in the database
        const artistExists = await db.artist.findUnique({ where: { slug: artistSlug } })

        if (artistExists) return

        const prompt = `Generate an illustration of the singer / band / group ${artist.name} in a unique style.`
        console.log('✍🏻 Prompting OpenAI:', prompt)

        // Generate image for the artist if it doesn't exist
        const response = await openai.images.generate({ model: 'dall-e-3', prompt, n: 1, size: '1024x1024' })
        const image_url = response.data[0].url

        await db.artist.create({
          data: {
            slug: artistSlug,
            name: artist.name,
            description: artist.description,
            image: image_url ?? '',
            instagram: artist.instagram,
            facebook: artist.facebook,
            spotify: artist.spotify,
            youtube: artist.youtube,
            website: artist.website,
          },
        })
      }),
    )

    // We can now create the concert in the database
    await db.concert.create({
      data: {
        slug,
        name: concert.name,
        date: new Date(concert.date),
        venue: {
          connect: { slug: venueSlug },
        },
        artists: {
          connect: concert.artists.map(artist => ({ slug: slugify(artist.name, { lower: true }) })),
        },
      },
    })

    console.log(`Created concert: ${concert.name}`)
  }

  console.log('Concerts successfully added to the database')

  return {
    status: 200,
    body: { message: 'Concerts successfully added to the database' },
  }
}

type Concert = {
  name: string
  date: string
  venue: {
    name: string
    description: string
    address: string
    city: string
    zip: string
    capacity: string
  }
  artists: {
    name: string
    description: string
    instagram: string
    facebook: string
    spotify: string
    youtube: string
    website: string
  }[]
}
