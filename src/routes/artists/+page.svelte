<script lang="ts">
  import Title from '$lib/components/title.svelte'
  import { Input } from '$lib/components/ui/input'

  export let data: import('./$types').PageData

  let q = ''
  $: artists = data.artists.filter(artist => artist.name.toLowerCase().includes(q.toLowerCase()))
</script>

<div class="p-12 space-y-6">
  <Title size="3xl" weight="bold" family="grotesque">Artistas</Title>

  <Input placeholder="Procurar artistas" bind:value={q} />

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
