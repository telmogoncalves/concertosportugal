import db from '$lib/db'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const featured = await db.concert.findFirst({
    where: {
      date: {
        gte: new Date(),
      },
    },
    orderBy: {
      date: 'asc',
    },
    include: {
      venue: true,
      artists: true,
    },
  })

  // Find if there are any more days of the same concert
  // (e.g. for a multi-day festival)
  const days = featured
    ? await db.concert.findMany({
        where: {
          name: featured.name,
          NOT: {
            slug: featured.slug,
          },
        },
        include: {
          venue: true,
          artists: true,
        },
        orderBy: {
          date: 'asc',
        },
      })
    : null

  return {
    featured: featured
      ? {
          ...featured,
          dates: [featured.date, days?.map(day => day.date)].flat(),
          artists: [
            ...new Set(featured.artists.map(artist => artist)),
            ...new Set(days?.map(day => day.artists.map(artist => artist))),
          ].flat(),
        }
      : null,
    streamed: {
      concerts: db.concert.findMany({
        where: {
          date: {
            gte: new Date(),
          },
        },
        include: {
          venue: true,
          artists: true,
        },
        orderBy: {
          date: 'asc',
        },
      }),
    },
  }
}
