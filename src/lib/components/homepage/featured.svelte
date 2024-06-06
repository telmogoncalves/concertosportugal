<script lang="ts">
import type { Artist, Concert, Venue } from '@prisma/client'
import clsx from 'clsx'

import CalendarIcon from '$lib/components/calendar-icon.svelte'
import Title from '$lib/components/title.svelte'

export let concert: Concert & { venue: Venue; artists: Artist[]; dates: string[] }

$: totalArtists = concert.artists.length
</script>

<div
  style="
    background-image: url(/crowd.png);
    background-repeat: no-repeat;
    background-position: bottom;
  "
  class="border-b bg-[length:410%_auto] md:bg-[length:110%_auto]"
>
  <div class="px-3 py-12 md:px-6">
    <div
      class={clsx('mx-auto flex w-full flex-col items-center justify-center space-y-8 rounded-xl border py-10 text-center shadow-sm', {
      'md:w-2/3': totalArtists > 5,
      'md:w-1/3': totalArtists <= 5
    })}
    >
      <a href="/concerts/{concert.slug}" class="hover:underline">
        <Title size="2xl" transform="up" weight="bold" family="dela">{concert.name}</Title>
      </a>

      <div class="flex items-center space-x-5">
        {#each concert.dates as date}
          <CalendarIcon date={date} top="month" />
        {/each}
      </div>

      <div class="space-y-4">
        <div class="font-dela text-center text-lg uppercase">Com</div>

        <div class="flex flex-wrap justify-center gap-0 space-y-2 md:gap-3 md:space-y-0">
          {#each concert.artists as artist}
            <a
              href="/artists?see={artist.slug}"
              data-sveltekit-preload-data="hover"
              class="flex items-center space-x-3 whitespace-nowrap rounded-xl px-4 py-2 ring-primary hover:ring-2 md:justify-center"
            >
              <img src={artist.image} alt={artist.name} class="h-12 w-12 rounded-full object-cover" />
              <div>
                <Title weight="semibold">{artist.name}</Title>
              </div>
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>
</div>
