<script lang="ts">
  import ConcertsList from '$lib/components/concerts-list.svelte'
  import Title from '$lib/components/title.svelte'

  export let data: import('./$types').PageData
</script>

{#if data.artist}
  <div class="p-12 mx-auto grid grid-cols-12 gap-12">
    <div class="col-span-3 space-y-6">
      {#if data.artist.image}
        <img src={data.artist.image} alt={data.artist.name} class="object-cover w-full h-72 rounded-lg" />
      {/if}

      <div class="space-y-1">
        <Title size="3xl" weight="bold" family="grotesque">{data.artist.name}</Title>
      </div>
    </div>

    <div class="col-span-9">
      <div class="space-y-2">
        <ConcertsList data={data.artist.concerts} />
      </div>
    </div>
  </div>
{:else}
  <div>Artista não encontrado</div>
{/if}
