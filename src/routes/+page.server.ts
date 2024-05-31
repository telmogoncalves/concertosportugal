import db from '$lib/db'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  return {
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
