<script lang="ts">
  import type { Artist, Concert as PrismaConcert, Venue } from '@prisma/client'
  import { format } from 'date-fns'
  import { pt } from 'date-fns/locale'

  import * as Tooltip from '$lib/components/ui/tooltip'

  import CalendarIcon from './calendar-icon.svelte'
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
      <Title size="2xl" weight="semibold" family="unica">{concert.year}</Title>

      <div class="space-y-6">
        {#each concert.months as month}
          <div class="space-y-3 rounded-xl border p-6 shadow-sm">
            <Title size="2xl" weight="semibold" family="unica">
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
                    <div class="flex items-center space-x-0.5 md:space-x-3">
                      <div class="flex w-16 justify-center py-1.5">
                        {#if printGuide}
                          <div class="-mt-5 flex h-16 w-full justify-center">
                            <div class="h-full w-px bg-primary" />
                          </div>
                        {:else}
                          <CalendarIcon date={concert.date} />
                        {/if}
                      </div>

                      <a
                        data-sveltekit-preload-data="hover"
                        href="/concerts/{concert.slug}"
                        class="flex w-full items-center space-x-3 overflow-auto rounded-lg p-1.5 hover:bg-secondary"
                      >
                        <div class="hidden md:block">
                          {#if concert.artists}
                            <div class="flex -space-x-3 overflow-hidden">
                              {#each concert.artists as artist}
                                <Tooltip.Root openDelay={0.3}>
                                  <Tooltip.Trigger>
                                    <div class="h-10 w-10 rounded-full border-background overflow-hidden border-4">
                                      <img src={artist.image} alt={artist.name} class="w-full h-full object-cover" />
                                    </div>
                                  </Tooltip.Trigger>

                                  <Tooltip.Content>
                                    <p>{artist.name}</p>
                                  </Tooltip.Content>
                                </Tooltip.Root>
                              {/each}
                            </div>
                          {/if}
                        </div>

                        <div class="w-full truncate">
                          <div class="truncate text-ellipsis font-semibold">{concert.name}</div>
                          {#if concert.venue}
                            <div class="-ml-1 text-sm text-gray-500">
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
  <div class="text-sm italic text-gray-500">
    Ou não há concertos agendados ou estamos ainda a carregar a informação.
  </div>
{/if}
