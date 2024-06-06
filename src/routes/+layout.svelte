<script lang="ts">
import '../app.css'

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

<div class="sticky top-0 z-50 flex h-20 items-center justify-between border-b bg-background px-6 md:px-12">
  <div class="flex items-center space-x-2">
    <a data-sveltekit-preload-data="hover" href="/" class="flex items-center space-x-3 text-sm">
      <Logo />
    </a>
  </div>

  <nav class="hidden font-medium md:block">
    <div class="flex items-center space-x-6">
      {#each menus as { name, href }}
        <a href={href} class="font-dela text-sm uppercase hover:underline" data-sveltekit-preload-data="hover">{name}</a
        >
      {/each}

      <Button href="mailto:telmo@hey.com?subject=Adicionar%20Concerto" class="font-dela text-xs font-medium uppercase">
        Adiciona o teu
      </Button>
    </div>
  </nav>

  <div class="block items-center justify-center pt-1.5 md:hidden">
    <Hamburger
      type="spring"
      --color="black"
      --layer-width="25px"
      --padding="0px"
      --layer-height="3px"
      bind:open={open}
    />
  </div>

  {#if open}
    <div class="fixed left-0 top-20 z-50 h-[calc(100%-5rem)] w-full bg-background md:hidden">
      <div class="flex flex-col items-center space-y-6 pt-6">
        {#each menus as { name, href }}
          <a href={href} class="font-dela text-lg uppercase hover:underline" data-sveltekit-preload-data="hover"
            >{name}</a
          >
        {/each}

        <Button
          href="mailto:telmo@hey.com?subject=Adicionar%20Concerto"
          class="font-dela text-base font-medium uppercase"
        >
          Adiciona o teu concerto
        </Button>
      </div>
    </div>
  {/if}
</div>

<slot />

<footer class="my-8 border-t py-8">
  <div class="flex flex-col items-center space-y-6">
    <Logo />
    <div class="text-xs text-gray-500">
      © {new Date().getFullYear()} Concertos Portugal
    </div>
  </div>
</footer>
