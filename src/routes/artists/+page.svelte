<script lang="ts">
  import { page } from '$app/stores'
  import ConcertsList from '$lib/components/concerts-list.svelte'
  import Title from '$lib/components/title.svelte'
  import Button from '$lib/components/ui/button/button.svelte'
  import { Skeleton } from '$lib/components/ui/skeleton'

  export let data: import('./$types').PageData

  $: selected = $page.url.searchParams.get('selected')
</script>

<div class="p-12 space-y-6">
  <Title size="3xl" weight="bold" family="grotesque">Artistas</Title>

  {#await data.streamed.artists}
    <div class="flex space-x-6">
      <div class="grid grid-cols-2 gap-4 w-full">
        {#each Array(11) as _}
          {#key _}
            <Skeleton class="h-16 w-full" />
          {/key}
        {/each}
      </div>

      <div class="w-2/3">
        <Skeleton class="w-full h-1/2" />
      </div>
    </div>
  {:then artists}
    <div class="space-y-6">
      <!-- <Input placeholder="Procurar artistas" bind:value={q} /> -->

      <div class="flex items-start w-full space-x-6">
        <div class="grid gap-4 w-full" class:grid-cols-4={!selected} class:grid-cols-2={selected}>
          {#each artists as artist}
            <a
              class="flex items-center border rounded-xl hover:border-primary h-20 overflow-hidden"
              href="/artists?selected={artist.id}"
              class:border-primary={selected === artist.id}
              data-sveltekit-noscroll
            >
              <img src={artist.image} alt={artist.name} class="h-full w-20 object-cover" />

              <div class="p-4">
                <Title size="lg" family="grotesque">{artist.name}</Title>
              </div>
            </a>
          {/each}
        </div>

        {#if selected}
          {@const details = artists.find(artist => artist.id === selected)}
          {@const concerts =
            // @ts-expect-error - This is a hack to make the type checker happy
            details?.concerts}

          <div class="w-2/3 space-y-4 border p-6 rounded-xl shadow-sm sticky top-24">
            <div class="flex items-center justify-between">
              <Title size="xl" family="grotesque">{details?.name}</Title>
              <Button href="/artists" variant="outline" size="sm">Fechar</Button>
            </div>

            <img src={details?.image} alt={details?.name} class="w-full rounded-xl max-h-72 object-cover object-top" />

            {#if concerts}
              <ConcertsList data={concerts} />
            {/if}
          </div>
        {/if}
      </div>
    </div>
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>
