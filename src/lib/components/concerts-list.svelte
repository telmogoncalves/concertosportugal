<script lang="ts">
import { isToday } from '@internationalized/date'
import type { Artist, Concert as PrismaConcert, Venue } from '@prisma/client'
import { addDays, format } from 'date-fns'
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
      <Title size="xl" weight="semibold">{concert.year}</Title>

      <div class="space-y-6">
        {#each concert.months as month}
          <div class="space-y-3 rounded-xl border p-6 shadow-sm">
            <Title size="xl" weight="semibold" family="dela" transform="up">
              {format(new Date(2024, Number(month.value) - 1, 1), 'MMMM', { locale: pt })}
            </Title>

            <div class="relative space-y-2">
              {#each month.days as day}
                {#each day.concerts as concert}
                  {@const past = addDays(new Date(), -1) > new Date(concert.date)}
                  {@const today = new Date(concert.date).toDateString() === new Date().toDateString()}
                  {@const previousDay = day.concerts[day.concerts.indexOf(concert) - 1]}
                  {@const printGuide = previousDay && previousDay.date !== concert.date}

                  {#if today}
                    <svg
                      viewBox="0 0 564 576"
                      fill="none"
                      class="absolute -left-11 top-3 h-10 md:-left-14 md:top-1 md:h-12"
                    >
                      <path
                        d="M254.253 13.1593C268.526 -4.36243 295.389 -4.41043 309.758 13.1593C333.954 42.8982 342.051 44.4344 376.363 28.3528C396.979 18.7039 421.127 30.441 426.366 52.4032C435.16 89.1508 441.335 94.5994 479.804 94.9594C502.558 95.1754 519.258 116.274 514.404 138.308C506.283 175.439 509.791 182.928 544.055 199.802C564.406 209.835 570.365 235.973 556.405 253.855C532.906 283.834 532.882 292.115 556.405 322.118C570.365 340 564.406 366.138 544.055 376.171C509.935 392.973 506.259 400.39 514.404 437.665C519.234 459.699 502.558 480.774 479.804 481.014C449.264 481.326 437.01 479.237 426.366 523.57C421.127 545.532 396.979 557.269 376.363 547.62C348.803 534.707 338.591 527.41 309.758 562.814C295.389 580.383 268.574 580.407 254.253 562.814C230.057 533.099 221.935 531.539 187.623 547.62C167.103 557.245 142.931 545.652 137.621 523.57C128.875 487.134 122.988 481.374 84.1828 481.014C61.4764 480.798 44.7529 459.747 49.6066 437.665C57.68 400.75 54.292 393.069 19.956 376.171C-0.395701 366.162 -6.37868 339.952 7.60562 322.118C31.0089 292.259 31.129 283.834 7.60562 253.855C-6.37868 236.021 -0.395701 209.811 19.956 199.802C53.7153 183.192 57.8001 175.847 49.5825 138.332C44.7529 116.25 61.4523 95.1994 84.1828 94.9834C122.964 94.5994 128.851 88.8388 137.621 52.4272C142.931 30.345 167.127 18.7519 187.623 28.3768C221.623 44.3384 229.913 43.0423 254.253 13.1593Z"
                        fill="white"
                      />
                      <path
                        d="M256.131 31.2843C269.447 14.9202 294.508 14.8753 307.914 31.2843C330.487 59.0586 338.042 60.4932 370.053 45.4741C389.286 36.4626 411.815 47.4243 416.702 67.9356C424.906 102.256 430.667 107.344 466.556 107.68C487.785 107.882 503.365 127.586 498.836 148.165C491.26 182.843 494.532 189.837 526.499 205.596C545.485 214.967 551.045 239.378 538.021 256.079C516.097 284.077 516.075 291.811 538.021 319.832C551.045 336.532 545.485 360.944 526.499 370.314C494.667 386.006 491.237 392.932 498.836 427.745C503.342 448.324 487.785 468.006 466.556 468.23C438.065 468.521 426.632 466.571 416.702 507.975C411.815 528.486 389.286 539.448 370.053 530.436C344.341 518.376 334.814 511.561 307.914 544.626C294.508 561.035 269.491 561.057 256.131 544.626C233.558 516.874 225.981 515.417 193.97 530.436C174.826 539.425 152.275 528.598 147.321 507.975C139.161 473.946 133.669 468.566 97.466 468.23C76.2822 468.028 60.6802 448.369 65.2084 427.745C72.7404 393.269 69.5796 386.095 37.5462 370.314C18.5593 360.966 12.9775 336.487 26.024 319.832C47.8579 291.945 47.97 284.077 26.024 256.079C12.9775 239.423 18.5593 214.944 37.5462 205.596C69.0416 190.084 72.8525 183.225 65.186 148.187C60.6802 127.564 76.2598 107.905 97.466 107.703C133.646 107.344 139.139 101.964 147.321 67.958C152.275 47.3347 174.848 36.5074 193.97 45.4965C225.689 60.4036 233.423 59.1931 256.131 31.2843Z"
                        fill="#5C32FD"
                      />
                      <path
                        d="M183.188 337V239.32H204.5V337H183.188ZM121.028 337V239.32H142.34V337H121.028ZM134.644 296.448V278.836H192.66V296.448H134.644ZM264.524 339.072C257.519 339.072 251.204 337.987 245.58 335.816C240.055 333.547 235.319 330.291 231.372 326.048C227.524 321.707 224.564 316.428 222.492 310.212C220.42 303.897 219.384 296.695 219.384 288.604C219.384 277.06 221.358 267.539 225.304 260.04C229.251 252.443 234.678 246.769 241.584 243.02C248.491 239.172 256.384 237.248 265.264 237.248C272.171 237.248 278.387 238.333 283.912 240.504C289.438 242.675 294.174 245.931 298.12 250.272C302.067 254.515 305.076 259.843 307.148 266.256C309.22 272.571 310.256 279.872 310.256 288.16C310.256 296.547 309.171 303.897 307 310.212C304.928 316.527 301.87 321.855 297.824 326.196C293.878 330.439 289.092 333.645 283.468 335.816C277.844 337.987 271.53 339.072 264.524 339.072ZM265.116 321.756C270.247 321.756 274.539 320.523 277.992 318.056C281.446 315.491 284.06 311.791 285.836 306.956C287.612 302.121 288.5 296.201 288.5 289.196C288.5 281.796 287.563 275.58 285.688 270.548C283.814 265.417 281.1 261.52 277.548 258.856C274.095 256.192 269.803 254.86 264.672 254.86C259.739 254.86 255.496 256.143 251.944 258.708C248.491 261.273 245.827 265.023 243.952 269.956C242.176 274.889 241.288 280.957 241.288 288.16C241.288 293.685 241.782 298.569 242.768 302.812C243.854 306.956 245.383 310.459 247.356 313.32C249.428 316.083 251.944 318.204 254.904 319.684C257.864 321.065 261.268 321.756 265.116 321.756ZM317.751 338.036L315.827 318.5C316.913 318.697 317.998 318.845 319.083 318.944C320.169 319.043 320.958 319.092 321.451 319.092C325.299 319.092 328.259 318.5 330.331 317.316C332.403 316.033 333.834 314.109 334.623 311.544C335.511 308.979 335.955 305.575 335.955 301.332V239.32H357.415V301.628C357.415 309.719 356.231 316.527 353.863 322.052C351.594 327.479 348.042 331.573 343.207 334.336C338.471 337.099 332.354 338.48 324.855 338.48C323.77 338.48 322.685 338.431 321.599 338.332C320.613 338.233 319.33 338.135 317.751 338.036ZM374.969 337V239.32H396.281V337H374.969ZM389.917 337V319.388H447.637V337H389.917ZM389.917 295.708V279.724H440.385V295.708H389.917ZM389.917 256.784V239.32L447.341 239.32V256.784H389.917Z"
                        fill="white"
                      />
                    </svg>
                  {/if}

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
                                    <div class="h-10 w-10 overflow-hidden rounded-full border-4 border-background">
                                      <img src={artist.image} alt={artist.name} class="h-full w-full object-cover" />
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
