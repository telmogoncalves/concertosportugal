import db from '$lib/db'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
  return {
    artist: await db.artist.findUnique({
      where: {
        slug: params.slug,
      },
      include: {
        concerts: {
          include: {
            venue: true,
            artists: {
              where: {
                slug: {
                  not: params.slug,
                },
              },
            },
          },
          orderBy: {
            date: 'asc',
          },
        },
      },
    }),
  }
}
