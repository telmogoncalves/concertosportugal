<script lang="ts">
import { page } from '$app/stores'
import ConcertsList from '$lib/components/concerts-list.svelte'
import Title from '$lib/components/title.svelte'
import Button from '$lib/components/ui/button/button.svelte'
import { Skeleton } from '$lib/components/ui/skeleton'

export let data: import('./$types').PageData

$: selected = $page.url.searchParams.get('see')
</script>

<div class="space-y-6 p-6 md:p-12">
  <Title size="3xl" weight="bold" family="grotesque">Artistas</Title>

  {#await data.streamed.artists}
    <div class="flex space-x-6">
      <div class="grid w-full grid-cols-2 gap-4">
        {#each Array(11) as _}
          {#key _}
            <Skeleton class="h-16 w-full" />
          {/key}
        {/each}
      </div>

      <div class="w-2/3">
        <Skeleton class="h-1/2 w-full" />
      </div>
    </div>
  {:then artists}
    <div class="space-y-6">
      <!-- <Input placeholder="Procurar artistas" bind:value={q} /> -->

      <div class="flex w-full items-start space-x-6">
        <div
          class="w-full gap-4 space-y-3 md:grid md:space-y-0"
          class:grid-cols-4={!selected}
          class:grid-cols-2={selected}
        >
          {#each artists as artist}
            <a
              class="flex h-20 items-center overflow-hidden rounded-xl border hover:border-primary"
              href="/artists?see={artist.slug}"
              class:border-primary={selected === artist.id}
              data-sveltekit-noscroll
            >
              <img src={artist.image} alt={artist.name} class="h-full w-20 object-cover" />

              <div class="p-4">
                <Title size="lg" family="grotesque">{artist.name}</Title>
              </div>
            </a>
          {/each}
        </div>

        {#if selected}
          {@const details = artists.find(artist => artist.slug === selected)}
          {@const concerts = details?.concerts}

          <div
            class="fixed -left-6 top-0 z-50 h-screen w-full space-y-4 overflow-scroll rounded-xl bg-white p-6 shadow-sm md:sticky md:top-24 md:w-2/3 md:border"
          >
            <div class="flex items-center justify-between">
              <Title size="xl" family="grotesque">{details?.name}</Title>
              <Button href="/artists" variant="outline" size="sm" data-sveltekit-noscroll>Fechar</Button>
            </div>

            <img src={details?.image} alt={details?.name} class="h-72 w-full rounded-xl object-cover object-top" />

            {#if concerts}
              <ConcertsList data={concerts} />
            {/if}
          </div>
        {/if}
      </div>
    </div>
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>
