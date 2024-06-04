<script lang="ts">
  import type { Artist, Concert, Venue } from '@prisma/client'

  import CalendarIcon from '$lib/components/calendar-icon.svelte'
  import Title from '$lib/components/title.svelte'

  export let concert: Concert & { venue: Venue; artists: Artist[]; dates: string[] }
</script>

<div
  class="border rounded-xl"
  style="
    background-image: url(/crowd-bg.png);
    background-size: 120% auto;
    background-repeat: no-repeat;
    background-position: bottom;
  "
>
  <div class="flex flex-col items-center px-0 md:px-6 py-12 space-y-6">
    <a href="/concerts/{concert.slug}" class="hover:underline">
      <Title size="4xl" weight="bold" family="unica">{concert.name}</Title>
    </a>

    <div class="flex items-center space-x-5">
      {#each concert.dates as date}
        <CalendarIcon {date} top="month" />
      {/each}
    </div>

    <hr class="border-secondary w-1/6" />

    <div class="space-y-4">
      <div class="text-center font-unica text-xl">Com</div>

      <div class="flex flex-wrap justify-center md:gap-3 gap-0 space-y-2 md:space-y-0">
        {#each concert.artists as artist}
          <a
            href="/artists?see={artist.slug}"
            data-sveltekit-preload-data="hover"
            class="flex md:justify-center whitespace-nowrap items-center space-x-3 rounded-xl px-4 py-2 hover:bg-secondary"
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

<hr />
