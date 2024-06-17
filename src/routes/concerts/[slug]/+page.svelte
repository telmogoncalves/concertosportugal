<script lang="ts">
import { IconBrandInstagram } from '@tabler/icons-svelte'

import CalendarIcon from '$lib/components/calendar-icon.svelte'
import ConcertsList from '$lib/components/concerts-list.svelte'
import Title from '$lib/components/title.svelte'

export let data: import('./$types').PageData
</script>

<svelte:head>
  <title>{data.concert ? data.concert.name : 'Concerto não encontrado'} - Concertos Portugal</title>
</svelte:head>

{#if data.concert}
  <div class="space-y-12 p-6 md:p-12">
    <div class="flex items-center justify-between">
      <div
        class="flex flex-col items-center space-x-0 space-y-6 text-center md:flex-row md:space-x-6 md:space-y-0 md:text-left"
      >
        <CalendarIcon date={data.concert.date} top="month" />
        <Title size="3xl" transform="up" weight="bold" family="dela">{data.concert.name}</Title>
      </div>

      {#if data.admin}
        <a href="/concerts/{data.concert.slug}/gram">
          <IconBrandInstagram class="h-12" />
        </a>
      {/if}
    </div>

    <div class="grid-cols-5 gap-8 space-y-6 md:grid md:space-y-0">
      <div class="col-span-3 overflow-hidden rounded-xl border">
        <div class="grid-cols-3 md:grid">
          <div class="border-r border-dashed p-8">
            <Title size="xl" family="dela">🎸 Artistas</Title>
          </div>

          <div class="border-r border-dashed" />
          <div />

          {#each data.concert.artists as artist, i}
            {@const border = (i + 1) % 3 === 0 ? '' : 'border-r'}

            <div class="border-dashed {border} border-t">
              <a
                href="/artists?see={artist.slug}"
                data-sveltekit-preload-data="hover"
                class="flex flex-col p-6 hover:bg-gray-100"
              >
                <div class="p-2">
                  <Title class="truncate text-ellipsis" size="lg" weight="semibold">{artist.name}</Title>
                </div>

                <img src={artist.image} alt={artist.name} class="h-48 w-full rounded-lg object-cover" />
              </a>
            </div>
          {/each}
        </div>
      </div>

      <!-- <div class="col-span-3 space-y-4 rounded-xl border p-3 md:p-8">
        <Title size="xl" family="dela">🎸 Artistas</Title>

        <div class="grid-cols-3 gap-2 md:grid">
          {#each data.concert.artists as artist}
            <a
              href="/artists?see={artist.slug}"
              data-sveltekit-preload-data="hover"
              class="group flex flex-col rounded-xl p-1"
            >
              <div class="p-2 group-hover:underline">
                <Title class="truncate text-ellipsis" size="lg" weight="semibold">{artist.name}</Title>
              </div>

              <img src={artist.image} alt={artist.name} class="h-48 w-full rounded-lg object-cover" />
            </a>
          {/each}
        </div>
      </div> -->

      <div class="col-span-2 space-y-4 rounded-xl border p-3 md:p-8">
        <Title size="xl" family="dela">📍 Localização</Title>

        <img src={data.concert.venue.image} alt={data.concert.venue.name} class="h-72 w-full rounded-lg object-cover" />

        <div class="space-y-2">
          <a href="/venues/{data.concert.venue.slug}" data-sveltekit-preload-data="hover" class="hover:underline">
            <Title size="lg" weight="semibold" family="sans">{data.concert.venue.name}</Title>
          </a>

          <div class="space-y-1">
            <div class="text-gray-500">{data.concert.venue.address}</div>
            <div class="text-gray-500">{data.concert.venue.zip}, {data.concert.venue.city}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {#if data.days.length}
    <div class="space-y-6 p-6 md:p-12">
      <Title size="xl" transform="up" family="dela">
        + {data.concert.name}
      </Title>
      <ConcertsList data={data.days} />
    </div>
  {/if}
{:else}
  <div>Concerto não encontrado</div>
{/if}
