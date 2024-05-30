import db from '$lib/db'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  return {
    streamed: {
      venues: db.venue.findMany({
        orderBy: {
          name: 'asc',
        },
      }),
    },
  }
}
