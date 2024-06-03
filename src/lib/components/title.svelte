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
        unica: 'font-unica',
      },
    },
  })

  interface $$Props extends VariantProps<typeof title> {}

  export let weight: $$Props['weight'] = 'normal'
  export let size: $$Props['size'] = 'base'
  export let family: $$Props['family'] = 'sans'
</script>

<div {...$$props} class={clsx('tracking-tight', title({ weight, family, size, class: $$props.class }))}>
  <slot />
</div>
