import db from '$lib/db'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params }) => {
  const concert = await db.concert.findUnique({
    where: {
      slug: params.slug,
    },
    include: {
      venue: true,
      artists: true,
    },
  })

  if (!concert) {
    return {
      status: 404,
      error: new Error(`Concert not found: ${params.slug}`),
    }
  }

  const days = await db.concert.findMany({
    where: {
      name: concert.name,
      NOT: {
        slug: concert.slug,
      },
    },
    include: {
      venue: true,
      artists: true,
    },
    orderBy: {
      date: 'asc',
    },
  })

  return {
    concert,
    days,
  }
}
