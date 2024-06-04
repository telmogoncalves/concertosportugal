import db from '$lib/db'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
  return {
    concert: await db.concert.findUnique({
      where: {
        slug: params.slug,
      },
      include: {
        venue: true,
        artists: true,
      },
    }),
  }
}
