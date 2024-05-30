import { redirect } from '@sveltejs/kit'

import { AUTH_PIN } from '$env/static/private'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ resolve, event }) {
  const url = new URL(event.request.url)
  const isLoggedIn = event.cookies.get('auth_pin') === AUTH_PIN

  if (url.pathname.startsWith('/admin') && url.pathname !== '/admin/login') {
    if (!isLoggedIn) return redirect(302, '/admin/login')
  }

  event.locals.authed = isLoggedIn

  return resolve(event)
}
