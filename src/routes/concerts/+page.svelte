<script lang="ts">
  import ConcertsList from '$lib/components/concerts-list.svelte'
  import ConcertsSkeleton from '$lib/components/concerts-skeleton.svelte'
  import Title from '$lib/components/title.svelte'

  export let data: import('./$types').PageData
</script>

<div class="mx-auto space-y-6 p-6 md:w-2/3 md:p-12">
  <Title size="3xl" weight="bold" family="grotesque">Concertos</Title>

  {#await data.streamed.concerts}
    <ConcertsSkeleton />
  {:then concerts}
    <ConcertsList data={concerts} />
  {:catch error}
    <p>{error.message}</p>
  {/await}
</div>
