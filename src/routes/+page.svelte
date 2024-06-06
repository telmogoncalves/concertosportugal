<script lang="ts">
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'

import List from '$lib/components/homepage/concerts/list.svelte'
import Skeleton from '$lib/components/homepage/concerts/skeleton.svelte'
import Featured from '$lib/components/homepage/featured.svelte'
import Title from '$lib/components/title.svelte'
import { Button } from '$lib/components/ui/button'

export let data: import('./$types').PageData
</script>

<div class="space-y-12 py-24">
  <div class="mx-auto px-6 md:w-2/3 md:px-0">
    <div class="space-y-6 text-center">
      <div class="space-y-2">
        <Title size="6xl" weight="bold" family="dela">CONCERTOS</Title>
        <div class="text-xl text-gray-500">Descobre os próximos concertos a acontecer em Portugal</div>
      </div>

      {#if data.featured}
        <Featured concert={data.featured} />
      {/if}

      <Button href="/concerts" variant="outline" size="lg" data-sveltekit-preload-data="hover">
        Ver todos os concertos
      </Button>
    </div>
  </div>

  <div>
    {#await data.streamed.concerts}
      <Skeleton />
    {:then concerts}
      {@const grouped = concerts.reduce((acc, concert) => {
        const date = new Date(concert.date)
        const month = format(date, 'MMMM', { locale: pt })

        const monthIndex = acc.findIndex(m => m.month === month)

        if (monthIndex === -1) {
          acc.push({ month, concerts: [concert] })
        } else {
          acc[monthIndex].concerts.push(concert)
        }

        return acc
      }, [])}

      <div class="space-y-24">
        {#each grouped as { month, concerts }, i}
          {#if concerts.length}
            <List title={month} concerts={concerts} />
          {/if}
        {/each}
      </div>
    {:catch error}
      <div>Error: {error.message}</div>
    {/await}
  </div>
</div>
