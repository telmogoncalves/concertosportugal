import { startOfMonth } from 'date-fns'

import db from '$lib/db'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  return {
    streamed: {
      concerts: db.concert.findMany({
        where: {
          date: {
            gte: startOfMonth(new Date()),
          },
        },
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
