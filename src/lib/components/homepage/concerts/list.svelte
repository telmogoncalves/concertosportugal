<script lang="ts">
  import type { Artist, Concert, Venue } from '@prisma/client'
  import Marquee from 'svelte-fast-marquee'

  import CalendarIcon from '$lib/components/calendar-icon.svelte'
  import Title from '$lib/components/title.svelte'

  export let title: string
  export let concerts: [Concert & { artists: Artist[]; venue: Venue }]
  export let speed = 80
  export let direction: 'left' | 'right' | undefined = 'left'
</script>

<div class="space-y-6">
  <div class="px-12 capitalize">
    <Title size="3xl" weight="bold" family="unica">{title}</Title>
  </div>

  <Marquee {direction} pauseOnHover {speed}>
    <div class="flex space-x-4 pr-4">
      {#each concerts as concert}
        {@const cover = concert.artists[0].image}

        <a
          data-sveltekit-preload-data="hover"
          href="/concerts/{concert.slug}"
          class="block w-[250px] overflow-hidden rounded-xl border shadow-sm hover:border-primary md:w-[350px]"
        >
          <img src={cover} alt={concert.artists[0].name} class="h-24 w-full object-cover md:h-48" />

          <div class="flex items-center space-x-4 p-4">
            <div>
              <CalendarIcon date={concert.date} />
            </div>

            <div class="truncate">
              <div class="truncate text-ellipsis font-unica font-semibold">{concert.name}</div>
              <div class="text-sm text-gray-500">📍 {concert.venue.name}</div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </Marquee>
</div>
