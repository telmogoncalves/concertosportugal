<script lang="ts">
  import { format } from 'date-fns'
  import { pt } from 'date-fns/locale'

  export let date: Date | string
  export let top: 'day' | 'month' = 'day'
</script>

<div class="ring-4 ring-primary w-12 rounded-md font-unica">
  <div class="h-[22px] bg-primary text-background uppercase text-sm text-center font-medium">
    {format(new Date(date), top === 'day' ? 'E' : 'MMM', { locale: pt })}
  </div>

  <div class="text-xl font-semibold flex items-center justify-center py-0.5">
    {format(new Date(date), 'd')}
  </div>
</div>
