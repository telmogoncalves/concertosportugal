<script lang="ts">
import type { Artist, Concert, Venue } from '@prisma/client'
import Marquee from 'svelte-fast-marquee'

import CalendarIcon from '$lib/components/calendar-icon.svelte'
import Title from '$lib/components/title.svelte'

export let title: string
export let concerts: [Concert & { artists: Artist[]; venue: Venue }]
export let speed = 80
</script>

<div class="space-y-6">
  <div class="px-12 capitalize">
    <Title size="xl" weight="bold" family="grotesque">{title}</Title>
  </div>

  <Marquee direction="left" pauseOnHover speed={speed}>
    <div class="flex space-x-4">
      {#each concerts as concert}
        {@const cover = concert.artists[0].image}

        <a
          data-sveltekit-preload-data="hover"
          href="/concerts/{concert.slug}"
          class="block w-[350px] overflow-hidden rounded-xl border shadow-sm hover:border-primary"
        >
          <img src={cover} alt={concert.artists[0].name} class="h-48 w-full object-cover" />

          <div class="flex items-center space-x-4 p-4">
            <div>
              <CalendarIcon date={concert.date} />
            </div>

            <div class="truncate">
              <div class="truncate text-ellipsis font-semibold">{concert.name}</div>
              <div class="text-sm text-gray-500">📍 {concert.venue.name}</div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </Marquee>
</div>
