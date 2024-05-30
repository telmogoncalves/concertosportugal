import db from '$lib/db'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const data = await db.concert.findMany({
    orderBy: [{ date: 'asc' }, { time: 'asc' }, { createdAt: 'asc' }],
    include: {
      venue: true,
      artists: {
        orderBy: {
          name: 'asc',
        },
      },
    },
  })

  return { concerts: data }
}
