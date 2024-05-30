<script lang="ts">
  import Title from '$lib/components/title.svelte'

  export let data: import('./$types').PageData
</script>

{#if data.concert}
  <div class="p-12 space-y-6">
    <Title size="3xl" weight="bold" family="grotesque">{data.concert.name}</Title>

    <pre>
{JSON.stringify(data, null, 2)}
    </pre>
  </div>
{:else}
  <div>Concerto não encontrado</div>
{/if}
