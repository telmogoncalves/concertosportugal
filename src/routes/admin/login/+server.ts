import { json } from '@sveltejs/kit'

import { AUTH_PIN } from '$env/static/private'

/** @type {import('./$types').RequestHandler} */
export async function POST({ cookies, request }) {
  const data = await request.json()
  const pin = data.pin

  if (pin === AUTH_PIN) {
    cookies.set('auth_pin', pin, { path: '/', maxAge: 60 * 60 * 24 * 365 })
    return json({ success: true })
  }

  return json({ error: 'Invalid PIN' }, { status: 401 })
}
