<script lang="ts">
import type { Artist, Concert, Venue } from '@prisma/client'

import CalendarIcon from '$lib/components/calendar-icon.svelte'
import Title from '$lib/components/title.svelte'

export let title: string
export let concerts: [Concert & { artists: Artist[]; venue: Venue }]
</script>

<div class="space-y-6">
  <div class="px-6 capitalize md:px-12">
    <Title size="xl" transform="up" weight="bold" family="dela">{title}</Title>
  </div>

  <div class="mx-4 grid-cols-4 gap-6 space-y-5 md:mx-12 md:grid md:space-y-0">
    {#each concerts as concert}
      {@const cover = concert.artists[0].image}

      <a
        data-sveltekit-preload-data="hover"
        href="/concerts/{concert.slug}"
        class="block overflow-hidden rounded-xl border shadow-sm hover:border-primary"
      >
        <img src={cover} alt={concert.artists[0].name} class="w-full object-cover md:h-48" />

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
</div>
