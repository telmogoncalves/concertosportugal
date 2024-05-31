<script lang="ts">
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'

import List from '$lib/components/homepage/concerts/list.svelte'
import Skeleton from '$lib/components/homepage/concerts/skeleton.svelte'
import Title from '$lib/components/title.svelte'
import { Button } from '$lib/components/ui/button'

export let data: import('./$types').PageData
</script>

<div class="space-y-12 py-24">
  <div class="mx-auto w-2/3">
    <div class="space-y-6 text-center">
      <div class="space-y-2">
        <Title size="4xl" weight="bold" family="grotesque">Concertos em Portugal</Title>
        <div class="text-xl text-gray-500">Descobre os próximos concertos.</div>
      </div>

      <Button href="/concerts" variant="outline" size="lg" data-sveltekit-preload-data="hover"
        >Ver todos os concertos</Button
      >
    </div>
  </div>

  <div>
    {#await data.streamed.concerts}
      <Skeleton />
    {:then concerts}
      {@const grouped =
        concerts.reduce((acc, concert) => {
          const date = new Date(concert.date)
          const month = format(date, 'MMMM', { locale: pt })

          // @ts-expect-error - TS doesn't know about the Date constructor
          const monthIndex = acc.findIndex(m => m.month === month)

          if (monthIndex === -1) {
            acc.push({ month, concerts: [concert] })
          } else {
            acc[monthIndex].concerts.push(concert)
          }

          return acc
        }, [])}

      <div class="space-y-24">
        {#each grouped as { month, concerts }}
          {@const speeds = [30, 40, 50]}
          {#if concerts.length}
            <List title={month} concerts={concerts} speed={speeds[Math.floor(Math.random() * speeds.length)]} />
          {/if}
        {/each}
      </div>
    {:catch error}
      <div>Error: {error.message}</div>
    {/await}
  </div>
</div>
