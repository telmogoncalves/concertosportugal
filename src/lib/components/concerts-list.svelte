<script lang="ts">
  import type { Artist, Concert as PrismaConcert, Venue } from '@prisma/client'
  import { format } from 'date-fns'
  import { pt } from 'date-fns/locale'

  import * as Tooltip from '$lib/components/ui/tooltip'

  import Title from './title.svelte'

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export let data: any

  type Concert = PrismaConcert & {
    artists?: Artist[]
    venue?: Venue
  }

  type Day = {
    value: string
    concerts: Concert[]
  }

  type Month = {
    value: string
    days: Day[]
  }

  type Year = {
    year: string
    months: Month[]
  }

  function addConcertToDay(days: Day[], day: string, concert: Concert) {
    const dayIndex = days.findIndex(d => d.value === day)

    if (dayIndex === -1) {
      days.push({ value: day, concerts: [concert] })
    } else {
      days[dayIndex].concerts.push(concert)
    }
  }

  function addConcertToMonth(months: Month[], month: string, day: string, concert: Concert) {
    const monthIndex = months.findIndex(m => m.value === month)

    if (monthIndex === -1) {
      months.push({ value: month, days: [{ value: day, concerts: [concert] }] })
    } else {
      addConcertToDay(months[monthIndex].days, day, concert)
    }
  }

  function addConcertToYear(acc: Year[], year: string, month: string, day: string, concert: Concert) {
    const yearIndex = acc.findIndex(y => y.year === year)

    if (yearIndex === -1) {
      acc.push({ year, months: [{ value: month, days: [{ value: day, concerts: [concert] }] }] })
    } else {
      addConcertToMonth(acc[yearIndex].months, month, day, concert)
    }
  }

  // Group concerts by year and month
  $: concerts = data?.reduce((acc: Year[], concert: Concert) => {
    const date = new Date(concert.date)
    const year = date.getFullYear().toString()
    const month = date.toLocaleString('default', { month: 'numeric' })
    const day = date.getDate().toString()

    addConcertToYear(acc, year, month, day, concert)

    return acc
  }, []) as { year: string; months: { value: string; days: { value: string; concerts: Concert[] }[] }[] }[]
</script>

{#if concerts.length}
  {#each concerts as concert}
    <div class="space-y-3">
      <Title size="2xl" weight="semibold" family="grotesque">{concert.year}</Title>

      <div class="space-y-6">
        {#each concert.months as month}
          <div class="space-y-3 border p-6 rounded-xl shadow-sm">
            <Title size="xl" weight="semibold">
              <span class="capitalize">
                {format(new Date(2024, Number(month.value) - 1, 1), 'MMMM', { locale: pt })}
              </span>
            </Title>

            <div class="space-y-2">
              {#each month.days as day}
                {#each day.concerts as concert}
                  {@const past = new Date(concert.date) < new Date()}
                  {@const previousDay = day.concerts[day.concerts.indexOf(concert) - 1]}
                  {@const printGuide = previousDay && previousDay.date !== concert.date}

                  <div class:opacity-30={past} class="hover:opacity-100">
                    <div class="flex items-center space-x-3">
                      <div class="py-1.5 w-14 flex justify-center">
                        {#if printGuide}
                          <div class="w-full h-16 flex justify-center -mt-5">
                            <div class="w-px bg-primary h-full" />
                          </div>
                        {:else}
                          <div class="ring-4 ring-primary w-12 rounded-md">
                            <div class="h-5 bg-primary text-background text-xs text-center font-medium capitalize">
                              {format(new Date(concert.date), 'E', { locale: pt })}
                            </div>

                            <div class="text-lg font-semibold flex items-center justify-center py-0.5">
                              {format(new Date(concert.date), 'd')}
                            </div>
                          </div>
                        {/if}
                      </div>

                      <a
                        data-sveltekit-preload-data="hover"
                        href="/concerts/{concert.slug}"
                        class="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-secondary w-full"
                      >
                        {#if concert.artists}
                          <div class="flex -space-x-2 overflow-hidden">
                            {#each concert.artists as artist}
                              <Tooltip.Root openDelay={0.3}>
                                <Tooltip.Trigger>
                                  <img
                                    src={artist.image}
                                    alt={artist.name}
                                    class="w-8 h-8 object-cover rounded-full ring-4 ring-background"
                                  />
                                </Tooltip.Trigger>

                                <Tooltip.Content>
                                  <p>{artist.name}</p>
                                </Tooltip.Content>
                              </Tooltip.Root>
                            {/each}
                          </div>
                        {/if}

                        <div>
                          <div class="font-semibold">{concert.name}</div>
                          {#if concert.venue}
                            <div class="text-sm text-gray-500">
                              📍 {concert.venue.name}
                            </div>
                          {/if}
                        </div>
                      </a>
                    </div>
                  </div>
                {/each}
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
{:else}
  <div>Sem concertos</div>
{/if}
