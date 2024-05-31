import { json } from '@sveltejs/kit'

import db from '$lib/db'

/** @type {import('./$types').RequestHandler} */
export async function GET() {
  const data = await db.artist.findMany({
    select: {
      slug: true,
    },
  })

  return json(data.map(artist => artist.slug).sort())
}
