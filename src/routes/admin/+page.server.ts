import { put } from '@vercel/blob'

import db from '$lib/db'

import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  return {
    artists: await db.artist.findMany({
      orderBy: {
        name: 'asc',
      },
    }),
    venues: await db.venue.findMany({
      orderBy: {
        name: 'asc',
      },
    }),
  }
}

export const actions = {
  concert: async ({ request }) => {
    const data = await request.formData()

    const artists = data.getAll('artists')
    const venueId = data.get('venueId') as string
    const name = data.get('name') as string
    const slug = data.get('slug') as string
    const date = data.get('date') as string

    console.log({ venueId })

    if (!name || !slug || !date || !venueId || artists.length === 0) {
      return {
        status: 400,
        error: 'Missing required fields',
      }
    }

    const response = await db.concert.create({
      data: {
        name,
        slug,
        date: new Date(date),
        venueId,
        artists: {
          connect: artists.map(id => ({ id: id as string })),
        },
      },
    })

    return {
      status: 200,
      body: response,
    }
  },
  artist: async ({ request }) => {
    const data = await request.formData()

    const image = data.get('image') as File
    const { url } = await put(image.name, image, { access: 'public' })

    const name = data.get('name') as string
    const slug = data.get('slug') as string

    if (!name || !slug) {
      return {
        status: 400,
        error: 'Missing required fields',
      }
    }

    const response = await db.artist.create({
      data: {
        name,
        slug,
        image: url,
      },
    })

    return {
      status: 200,
      body: response,
    }
  },
  venue: async ({ request }) => {
    const data = await request.formData()

    const image = data.get('image') as File
    const { url } = await put(image.name, image, { access: 'public' })

    const name = data.get('name') as string
    const slug = data.get('slug') as string
    const address = data.get('address') as string
    const city = data.get('city') as string
    const zip = data.get('zip') as string
    const capacity = data.get('capacity') as string

    if (!name || !slug) {
      return {
        status: 400,
        error: 'Missing required fields',
      }
    }

    const response = await db.venue.create({
      data: {
        name,
        slug,
        address,
        city,
        zip,
        capacity: parseInt(capacity, 10),
        image: url,
      },
    })

    return {
      status: 200,
      body: response,
    }
  },
} satisfies Actions
