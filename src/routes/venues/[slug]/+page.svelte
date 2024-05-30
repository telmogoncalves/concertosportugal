<script lang="ts">
  import ConcertsList from '$lib/components/concerts-list.svelte'
  import Title from '$lib/components/title.svelte'

  export let data: import('./$types').PageData
</script>

{#if data.venue}
  <div class="p-12 mx-auto grid grid-cols-12 gap-12">
    <div class="col-span-3 space-y-6">
      {#if data.venue.image}
        <img src={data.venue.image} alt={data.venue.name} class="object-cover w-full h-72 rounded-lg" />
      {/if}

      <div class="space-y-1">
        <Title size="3xl" weight="bold" family="grotesque">{data.venue.name}</Title>
      </div>

      <div class="border p-4 rounded-xl shadow-sm">
        <div class="space-y-2">
          <Title size="lg" weight="semibold" family="grotesque">📍 Localização</Title>

          <div class="text-gray-500 space-y-1">
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
