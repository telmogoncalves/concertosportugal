<script lang="ts">
import Title from '$lib/components/title.svelte'
import CalendarIcon from '$lib/components/calendar-icon.svelte'

export let data: import('./$types').PageData
</script>

<svelte:head>
  <title>{data.concert ? data.concert.name : 'Concerto não encontrado'} - Concertos Portugal</title>
</svelte:head>

{#if data.concert}
  <div class="space-y-12 p-6 md:p-12">
    <div
      class="flex flex-col items-center space-x-0 space-y-6 text-center md:flex-row md:space-x-6 md:space-y-0 md:text-left"
    >
      <CalendarIcon date={data.concert.date} />
      <Title size="3xl" weight="bold" family="grotesque">{data.concert.name}</Title>
    </div>

    <div class="grid-cols-2 gap-8 space-y-6 md:grid md:space-y-0">
      <div class="space-y-4 rounded-xl border p-3 md:p-8">
        <Title size="lg" weight="semibold" family="grotesque">🎸 Bandas</Title>

        <div class="grid-cols-2 gap-4 md:grid">
          {#each data.concert.artists as artist}
            <a
              href="/artists?see={artist.slug}"
              data-sveltekit-preload-data="hover"
              class="flex items-center space-x-3 rounded-lg p-2 hover:bg-secondary"
            >
              <img src={artist.image} alt={artist.name} class="h-12 w-12 rounded-full object-cover" />
              <Title size="lg" weight="semibold" family="grotesque">{artist.name}</Title>
            </a>
          {/each}
        </div>
      </div>

      <div class="space-y-4 rounded-xl border p-3 md:p-8">
        <Title size="lg" weight="semibold" family="grotesque">📍 Localização</Title>

        <img src={data.concert.venue.image} alt={data.concert.venue.name} class="h-72 w-full rounded-lg object-cover" />

        <div class="space-y-2">
          <Title size="base" weight="medium" family="grotesque">{data.concert.venue.name}</Title>

          <div class="space-y-1">
            <div class="text-gray-500">{data.concert.venue.address}</div>
            <div class="text-gray-500">{data.concert.venue.zip}, {data.concert.venue.city}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div>Concerto não encontrado</div>
{/if}
