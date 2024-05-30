import db from '$lib/db'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
  return {
    venue: await db.venue.findUnique({
      where: {
        slug: params.slug,
      },
      include: {
        concerts: {
          include: {
            artists: true,
          },
          orderBy: {
            date: 'asc',
          },
        },
      },
    }),
  }
}
