<script lang="ts">
import clsx from 'clsx'
import { format, isToday } from 'date-fns'
import { pt } from 'date-fns/locale'

export let date: Date | string
export let top: 'day' | 'month' = 'day'

let today = isToday(new Date(date))
</script>

<div
  class={clsx('w-12 overflow-hidden rounded-md font-dela ring-4', {
  'ring-primary': !today,
  'ring-green-500': today,
})}
>
  <div
    class={clsx('h-[20px] text-center text-xs uppercase', {
    'bg-primary text-background': !today,
    'bg-green-500 text-background': today,
  })}
  >
    {format(new Date(date), top === 'day' ? 'E' : 'MMM', { locale: pt })}
  </div>

  <div
    class={clsx('flex items-center justify-center bg-background py-0.5 text-xl', {
    'text-primary': !today,
    'text-green-500': today,
  })}
  >
    {format(new Date(date), 'd')}
  </div>
</div>
