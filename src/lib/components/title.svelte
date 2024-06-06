<script lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import clsx from 'clsx'

const title = cva('', {
  variants: {
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    },
    size: {
      '6xl': 'text-4xl md:text-6xl',
      '5xl': 'text-5xl',
      '4xl': 'text-4xl',
      '3xl': 'text-3xl',
      '2xl': 'text-2xl',
      xl: 'text-xl',
      lg: 'text-lg',
      base: 'text-base',
      sm: 'text-sm',
      xs: 'text-xs',
    },
    family: {
      sans: 'font-sans',
      mono: 'font-mono',
      dela: 'font-dela',
    },
    transform: {
      up: 'uppercase',
      down: 'lowercase',
      cap: 'capitalize',
      normal: 'normal-case',
    },
  },
})

interface $$Props extends VariantProps<typeof title> {}

export let weight: $$Props['weight'] = 'normal'
export let size: $$Props['size'] = 'base'
export let family: $$Props['family'] = 'sans'
export let transform: $$Props['transform'] = 'normal'
</script>

<div {...$$props} class={clsx('tracking-tight', title({ weight, family, transform, size, class: $$props.class }))}>
  <slot />
</div>
