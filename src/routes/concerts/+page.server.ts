import db from '$lib/db'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  return {
    streamed: {
      concerts: db.concert.findMany({
        orderBy: [{ date: 'asc' }, { time: 'asc' }, { createdAt: 'asc' }],
        include: {
          venue: true,
          artists: {
            orderBy: {
              name: 'asc',
            },
          },
        },
      }),
    },
  }
}
