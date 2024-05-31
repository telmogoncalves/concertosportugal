<script lang="ts">
  import type { Artist, Concert, Venue } from '@prisma/client'
  import Marquee from 'svelte-fast-marquee'

  import CalendarIcon from '$lib/components/calendar-icon.svelte'
  import Title from '$lib/components/title.svelte'

  export let title: string
  export let concerts: [Concert & { artists: Artist[]; venue: Venue }]
</script>

<div class="space-y-6">
  <div class="px-12 capitalize">
    <Title size="xl" weight="bold" family="grotesque">{title}</Title>
  </div>

  <Marquee direction="left" pauseOnHover speed={80}>
    <div class="flex space-x-4">
      {#each concerts as concert}
        {@const cover = concert.artists[0].image}

        <a
          data-sveltekit-preload-data="hover"
          href="/concerts/{concert.id}"
          class="border rounded-xl shadow-sm overflow-hidden hover:border-primary w-[350px] block"
        >
          <img src={cover} alt={concert.artists[0].name} class="w-full h-48 object-cover" />

          <div class="p-4 flex items-center space-x-4">
            <CalendarIcon date={concert.date} />

            <div>
              <div class="font-semibold">{concert.name}</div>
              <div class="text-sm text-gray-500">📍 {concert.venue.name}</div>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </Marquee>
</div>
