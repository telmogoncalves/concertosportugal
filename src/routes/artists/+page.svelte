<script lang="ts">
  import Title from '$lib/components/title.svelte'
  import { Skeleton } from '$lib/components/ui/skeleton'

  export let data: import('./$types').PageData
</script>

<div class="p-12 space-y-6">
  <Title size="3xl" weight="bold" family="grotesque">Artistas</Title>

  {#await data.streamed.artists}
    <div class="grid grid-cols-4 gap-4">
      {#each Array(6) as _}
        {#key _}
          <Skeleton class="h-16 w-full" />
        {/key}
      {/each}
    </div>
  {:then artists}
    <div class="space-y-6">
      <!-- <Input placeholder="Procurar artistas" bind:value={q} /> -->

      <div class="grid grid-cols-4 gap-4">
        {#each artists as artist}
          <a
            data-sveltekit-preload-data="hover"
            href="/artists/{artist.slug}"
            class="flex items-center space-x-4 border rounded-xl p-3 hover:border-primary"
          >
            <img src={artist.image} alt={artist.name} class="h-12 w-12 object-cover rounded-full" />

            <div>
              <Title size="lg" family="grotesque">{artist.name}</Title>
            </div>
          </a>
        {/each}
      </div>
    </div>
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>
