<script lang="ts">
  import '../app.css'
  import '@fontsource/unica-one'
  import '@fontsource-variable/bricolage-grotesque'

  import unica from '@fontsource/unica-one/files/unica-one-latin-400-normal.woff2?url'
  import bricolage from '@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-cyrillic-ext-opsz-normal.woff2?url'
  import { Hamburger } from 'svelte-hamburgers'

  import { navigating } from '$app/stores'
  import Logo from '$lib/components/logo.svelte'
  import { Button } from '$lib/components/ui/button'

  let menus = [
    { name: 'Home', href: '/' },
    { name: 'Concertos', href: '/concerts' },
    { name: 'Artistas', href: '/artists' },
    { name: 'Locais', href: '/venues' },
  ]

  let open = false

  $: if ($navigating) {
    open = false
  }
</script>

<svelte:head>
  <link rel="preload" href={unica} as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href={bricolage} as="font" type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<div class="sticky top-0 z-50 flex items-center justify-between border-b bg-background px-6 md:px-12 h-20">
  <div class="flex items-center space-x-2">
    <a data-sveltekit-preload-data="hover" href="/" class="flex items-center space-x-3 text-sm">
      <Logo class="h-10 md:h-12" />
    </a>
  </div>

  <nav class="hidden font-medium md:block">
    <div class="flex items-center space-x-6">
      {#each menus as { name, href }}
        <a {href} class="text-lg font-unica hover:underline" data-sveltekit-preload-data="hover">{name}</a>
      {/each}

      <Button href="mailto:telmo@hey.com?subject=Adicionar%20Concerto" class="font-unica text-base font-medium">
        Adiciona o TeU
      </Button>
    </div>
  </nav>

  <div class="block md:hidden items-center justify-center pt-1.5">
    <Hamburger type="spring" --color="white" --layer-width="25px" --padding="0px" --layer-height="2.5px" bind:open />
  </div>

  {#if open}
    <div class="fixed md:hidden h-[calc(100%-5rem)] w-full top-20 left-0 bg-background z-50">
      <div class="flex flex-col items-center space-y-6 pt-6">
        {#each menus as { name, href }}
          <a {href} class="text-lg font-unica hover:underline" data-sveltekit-preload-data="hover">{name}</a>
        {/each}

        <Button href="mailto:telmo@hey.com?subject=Adicionar%20Concerto" class="font-unica text-base font-medium">
          Adiciona o TeU concerto
        </Button>
      </div>
    </div>
  {/if}
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
