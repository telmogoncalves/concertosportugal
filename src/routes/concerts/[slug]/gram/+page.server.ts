import { redirect } from '@sveltejs/kit'

import { GRAM_PWD } from '$env/static/private'
import db from '$lib/db'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, url }) => {
  // Get pass from url params
  const pwd = url.searchParams.get('pwd')

  // If pwd is not set, return 404
  if (!pwd) return redirect(302, '/')

  if (pwd !== GRAM_PWD) return redirect(302, '/')

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
