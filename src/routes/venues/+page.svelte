<script lang="ts">
  import Title from '$lib/components/title.svelte'

  export let data: import('./$types').PageData
</script>

<div class="p-12 space-y-6">
  <Title size="3xl" weight="bold" family="grotesque">Locais</Title>

  <div class="grid grid-cols-4 gap-6">
    {#each data.venues as venue}
      <a
        data-sveltekit-preload-data="hover"
        href="/venues/{venue.slug}"
        class="flex flex-col space-y-2 border rounded-xl p-1.5 hover:border-primary"
      >
        <img src={venue.image} alt={venue.name} class="object-cover h-72 rounded-lg" />

        <div class="px-4 py-3">
          <Title size="xl" family="grotesque">{venue.name}</Title>
        </div>
      </a>
    {/each}
  </div>
</div>
