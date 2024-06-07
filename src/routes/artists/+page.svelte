<script lang="ts">
import {
  IconArrowLeft,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandSpotify,
  IconBrandYoutube,
  IconWorld,
} from '@tabler/icons-svelte'

import { page } from '$app/stores'
import ConcertsList from '$lib/components/concerts-list.svelte'
import Title from '$lib/components/title.svelte'
import Button from '$lib/components/ui/button/button.svelte'
import { Input } from '$lib/components/ui/input'
import { Skeleton } from '$lib/components/ui/skeleton'

export let data: import('./$types').PageData
let q = ''

$: selected = $page.url.searchParams.get('see')
</script>

<div class="space-y-6 p-6 md:p-12">
  <Title size="2xl" transform="up" weight="bold" family="dela">Artistas</Title>

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
      <Input placeholder="Procurar artistas" bind:value={q} />

      <div class="flex w-full items-start space-x-6">
        <div
          class="w-full gap-4 space-y-3 md:grid md:space-y-0"
          class:grid-cols-4={!selected}
          class:grid-cols-2={selected}
        >
          {#each artists.filter(artist => artist.name.toLowerCase().includes(q.toLowerCase())) as artist}
            <a
              class="flex h-20 items-center overflow-hidden rounded-xl border hover:border-primary"
              href="/artists?see={artist.slug}"
              class:border-primary={selected === artist.id}
              data-sveltekit-noscroll
            >
              <img src={artist.image} alt={artist.name} class="h-full w-20 object-cover" />

              <div class="p-4">
                <Title size="lg" weight="semibold">{artist.name}</Title>
              </div>
            </a>
          {/each}
        </div>

        {#if selected}
          {@const details = artists.find(artist => artist.slug === selected)}
          {@const concerts = details?.concerts}

          <div
            class="fixed -left-6 top-0 z-50 h-screen w-full space-y-4 overflow-scroll rounded-xl bg-background p-6 shadow-sm md:sticky md:top-24 md:w-2/3 md:border"
          >
            <div class="flex items-center">
              <Button href="/artists" variant="outline" size="icon" data-sveltekit-noscroll>
                <IconArrowLeft class="h-4 w-4" />
              </Button>
            </div>

            <div class="grid-cols-2 gap-4 space-y-4 md:grid md:space-y-0">
              <img src={details?.image} alt={details?.name} class="h-72 w-full rounded-xl object-cover object-top" />
              <div class="space-y-3">
                <Title size="2xl" family="dela">{details?.name}</Title>

                <div class="flex items-center space-x-3">
                  {#if details?.instagram}
                    <a href={details.instagram} target="_blank" rel="noopener noreferrer" class="hover:text-orange-500">
                      <IconBrandInstagram class="h-7 w-7" />
                    </a>
                  {/if}

                  {#if details?.spotify}
                    <a href={details.spotify} target="_blank" rel="noopener noreferrer" class="hover:text-green-500">
                      <IconBrandSpotify class="h-7 w-7" />
                    </a>
                  {/if}

                  {#if details?.facebook}
                    <a href={details.facebook} target="_blank" rel="noopener noreferrer" class="hover:text-blue-600">
                      <IconBrandFacebook class="h-7 w-7" />
                    </a>
                  {/if}

                  {#if details?.youtube}
                    <a href={details.youtube} target="_blank" rel="noopener noreferrer" class="hover:text-red-500">
                      <IconBrandYoutube class="h-7 w-7" />
                    </a>
                  {/if}

                  {#if details?.website}
                    <a href={details.website} target="_blank" rel="noopener noreferrer" class="hover:text-gray-400">
                      <IconWorld class="h-7 w-7" />
                    </a>
                  {/if}
                </div>
              </div>
            </div>

            {#if concerts}
              <hr />
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
