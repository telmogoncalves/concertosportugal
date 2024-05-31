<script>
import '../app.css'

import Logo from '$lib/components/logo.svelte'

let menus = [
  { name: 'Home', href: '/' },
  { name: 'Concertos', href: '/concerts' },
  { name: 'Artistas', href: '/artists' },
  { name: 'Locais', href: '/venues' },
]
</script>

<div class="sticky top-0 z-50 flex items-center justify-between border-b bg-background px-6 py-4 md:px-12">
  <div class="flex items-center space-x-2">
    <a data-sveltekit-preload-data="hover" href="/" class="flex items-center space-x-3 text-sm">
      <Logo class="h-10 md:h-12" />
    </a>
  </div>

  <nav class="hidden text-sm font-medium md:block">
    <div class="flex space-x-6">
      {#each menus as { name, href }}
        <a href={href} class="hover:underline" data-sveltekit-preload-data="hover">{name}</a>
      {/each}
    </div>
  </nav>
</div>

<slot />

<footer class="my-8 border-t py-8">
  <div class="flex flex-col items-center space-y-6">
    <Logo class="h-10" />
    <div class="text-xs text-gray-500">
      © {new Date().getFullYear()} Concertos Portugal
    </div>
  </div>
</footer>
