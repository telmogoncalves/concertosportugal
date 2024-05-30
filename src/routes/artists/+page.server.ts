import db from '$lib/db'

import type { PageServerLoad } from './$types'
export const load: PageServerLoad = async () => {
  return {
    artists: await db.artist.findMany({
      orderBy: {
        name: 'asc',
      },
    }),
  }
}
