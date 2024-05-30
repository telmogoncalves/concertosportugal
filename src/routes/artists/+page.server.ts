import db from '$lib/db'

import type { PageServerLoad } from './$types'
export const load: PageServerLoad = async () => {
  return {
    streamed: {
      artists: db.artist.findMany({
        orderBy: {
          name: 'asc',
        },
      }),
    },
  }
}
