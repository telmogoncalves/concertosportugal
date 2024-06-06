import db from '$lib/db'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const featured = await db.concert.findFirst({
    where: {
      date: {
        gte: new Date(),
      },
      // slug: 'comendatio-music-fest-paco-da-comenda-2024-06-15',
      // slug: 'o-munas-fuzz-cartaxo-2024-06-08',
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
          date: {
            gte: new Date(featured.date),
            lte: new Date(new Date(featured.date).setMonth(new Date(featured.date).getMonth() + 1)),
          },
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
