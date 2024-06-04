<script lang="ts">
  import Title from '$lib/components/title.svelte'
  import { Input } from '$lib/components/ui/input'
  import { Skeleton } from '$lib/components/ui/skeleton'

  export let data: import('./$types').PageData

  let q = ''
</script>

<div class="p-6 md:p-12 space-y-6">
  <Title size="4xl" weight="bold" family="unica">Locais</Title>

  {#await data.streamed.venues}
    <div class="md:grid grid-cols-4 gap-6">
      {#each Array(6) as _}
        {#key _}
          <Skeleton class="h-72 w-full" />
        {/key}
      {/each}
    </div>
  {:then venues}
    <Input placeholder="Procurar locais" bind:value={q} />

    <div class="md:grid grid-cols-4 gap-6 md:space-y-0 space-y-6">
      {#each venues.filter(venue => venue.name.toLowerCase().includes(q.toLowerCase())) as venue}
        <a
          data-sveltekit-preload-data="hover"
          href="/venues/{venue.slug}"
          class="flex flex-col space-y-2 border rounded-xl p-1.5 hover:border-primary"
        >
          <img src={venue.image} alt={venue.name} class="object-cover h-72 rounded-lg" />

          <div class="px-4 py-3">
            <Title size="xl" weight="semibold">{venue.name}</Title>
          </div>
        </a>
      {/each}
    </div>
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>
