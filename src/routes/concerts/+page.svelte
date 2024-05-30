<script lang="ts">
  import ConcertsList from '$lib/components/concerts-list.svelte'
  import Title from '$lib/components/title.svelte'

  export let data: import('./$types').PageData
</script>

<div class="p-12 space-y-6 w-1/2">
  <Title size="3xl" weight="bold" family="grotesque">Concertos</Title>

  <div>
    <ConcertsList data={data.concerts} />
  </div>
</div>
