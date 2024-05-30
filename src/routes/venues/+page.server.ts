import db from '$lib/db'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  return {
    venues: await db.venue.findMany({
      orderBy: {
        name: 'asc',
      },
    }),
  }
}
