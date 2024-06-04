<script lang="ts">
  import { copy, copyToClipboard } from '@svelte-put/copy'
  import { format } from 'date-fns'
  import { pt } from 'date-fns/locale'
  import { domToJpeg } from 'modern-screenshot'
  import { onMount } from 'svelte'

  import Title from '$lib/components/title.svelte'
  import { Button } from '$lib/components/ui/button'

  $: downloadUrl = ''
  let trigger: HTMLButtonElement

  onMount(async () => {
    const element = document.querySelector('#instagram') as HTMLElement
    const url = await domToJpeg(element, { width: 540, height: 540 })

    downloadUrl = url
  })

  export let data: import('./$types').PageData
</script>

<div class="flex items-center p-24 justify-center gap-12">
  {#if data.concert}
    <div class="space-y-6">
      <div class="ring-4 inline-block rounded-xl p-2 ring-white">
        <div
          id="instagram"
          style="
            width: 540px;
            height: 540px;
            background-image: url(/crowd-bg.png);
            background-size: 200% auto;
            background-repeat: no-repeat;
            background-position: bottom;
          "
          class="bg-black"
        >
          <div class="p-12 space-y-8">
            <div class="ring-4 ring-primary w-20 rounded-md font-unica">
              <div class="bg-primary text-background text-2xl uppercase text-center font-semibold pb-0.5">
                {format(new Date(data.concert.date), 'MMM', { locale: pt })}
              </div>

              <div class="text-4xl font-semibold flex items-center justify-center py-2.5">
                {format(new Date(data.concert.date), 'd')}
              </div>
            </div>

            <Title size="4xl" weight="bold" family="unica">{data.concert.name}</Title>

            <div class="flex flex-wrap gap-8">
              {#each data.concert.artists.slice(0, 6) as artist}
                <div class="flex whitespace-nowrap items-center space-x-3 rounded-xl">
                  <img src={artist.image} alt={artist.name} class="h-14 w-14 rounded-full object-cover" />
                  <div>
                    <Title size="xl" weight="semibold">{artist.name}</Title>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        {#if downloadUrl}
          <Button href={downloadUrl} download={data.concert.name}>Download and post on Instagram</Button>
        {/if}
      </div>
    </div>

    <div class="space-y-6">
      <div
        use:copy={{ trigger }}
        on:copied={e => {
          copyToClipboard(e.detail.text)
          alert('Post copiado!')
        }}
      >
        {data.concert.name} é já no próximo dia {format(new Date(data.concert.date), 'd')} de {format(
          new Date(data.concert.date),
          'MMMM',
          { locale: pt },
        )}!

        <br />
        <br />

        <div>🎸 Bandas:</div>
        {#each data.concert.artists as artist}
          - {artist.name}
          <br />
        {/each}

        <br />
        <br />

        <div>📍 Local:</div>
        <div>
          {data.concert.venue.name}
        </div>
      </div>

      <button bind:this={trigger}>
        <Button>Copiar post</Button>
      </button>
    </div>
  {/if}
</div>
