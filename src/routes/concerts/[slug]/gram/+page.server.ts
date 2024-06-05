import { redirect } from '@sveltejs/kit'

import { GRAM_SECRET } from '$env/static/private'
import db from '$lib/db'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ params, cookies }) => {
  if (!cookies.get('GRAM_SECRET')) return redirect(302, '/')
  if (cookies.get('GRAM_SECRET') !== GRAM_SECRET) return redirect(302, '/')

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
