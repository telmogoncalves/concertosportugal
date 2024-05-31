<script lang="ts">
import ConcertsList from '$lib/components/concerts-list.svelte'
import Title from '$lib/components/title.svelte'

export let data: import('./$types').PageData
</script>

<svelte:head>
  <title>{data.venue ? data.venue.name : 'Sala não encontrada'} - Concertos Portugal</title>
</svelte:head>

{#if data.venue}
  <div class="mx-auto grid grid-cols-12 gap-12 p-12">
    <div class="col-span-3 space-y-6">
      {#if data.venue.image}
        <img src={data.venue.image} alt={data.venue.name} class="h-72 w-full rounded-lg object-cover" />
      {/if}

      <div class="space-y-1">
        <Title size="3xl" weight="bold" family="grotesque">{data.venue.name}</Title>
      </div>

      <div class="rounded-xl border p-4 shadow-sm">
        <div class="space-y-2">
          <Title size="lg" weight="semibold" family="grotesque">📍 Localização</Title>

          <div class="space-y-1 text-gray-500">
            <div>{data.venue.address}</div>
            <div>{data.venue.zip}, {data.venue.city}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-9 space-y-4">
      <Title size="2xl" weight="semibold" family="grotesque">Concertos</Title>

      <ConcertsList data={data.venue.concerts} />
    </div>
  </div>
{:else}
  <div>Sala não encontrada</div>
{/if}
