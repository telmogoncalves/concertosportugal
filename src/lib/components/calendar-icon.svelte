<script lang="ts">
import { format } from 'date-fns'
import { pt } from 'date-fns/locale'

export let date: Date | string
export let top: 'day' | 'month' = 'day'
</script>

<div class="font-dela w-12 overflow-hidden rounded-md ring-4 ring-primary">
  <div class="h-[20px] bg-primary text-center text-xs uppercase text-background">
    {format(new Date(date), top === 'day' ? 'E' : 'MMM', { locale: pt })}
  </div>

  <div class="flex items-center justify-center bg-background py-0.5 text-xl">
    {format(new Date(date), 'd')}
  </div>
</div>
