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

<div class="px-12 py-4 border-b flex items-center justify-between sticky top-0 bg-background z-50">
  <div class="flex items-center space-x-2">
    <a data-sveltekit-preload-data="hover" href="/" class="flex items-center space-x-3">
      <Logo class="h-14" />
    </a>
  </div>

  <nav class="text-sm font-medium">
    <div class="flex space-x-6">
      {#each menus as { name, href }}
        <a {href} class="hover:underline" data-sveltekit-preload-data="hover">{name}</a>
      {/each}
    </div>
  </nav>
</div>

<slot />
