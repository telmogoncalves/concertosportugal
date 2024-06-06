<script lang="ts">
import { format, isTomorrow } from 'date-fns'
import { pt } from 'date-fns/locale'

import Title from '$lib/components/title.svelte'
import Button from '$lib/components/ui/button/button.svelte'
import { Textarea } from '$lib/components/ui/textarea'

export let data: import('./$types').PageData

// Get a random artist image to use as background
$: selectedArtist = data.concert?.artists[0]
$: selectedPosition = 'center'

let postContent: string | undefined = undefined
$: if (data.concert && !postContent) {
  let tomorrow = isTomorrow(new Date(data.concert.date))
  let week = format(new Date(data.concert.date), 'EEEE', { locale: pt })
  let day = format(new Date(data.concert.date), 'd', { locale: pt })
  let month = format(new Date(data.concert.date), 'MMMM', { locale: pt })

  postContent = `${data.concert.name} ∙ ${tomorrow ? 'amanhã' : week}, ${day} de ${month}!

🎸
${data.concert.artists.map(artist => `- ${artist.name}`).join('\n')}

📍 ${data.concert.venue.name}
`
}

let positions = ['left', 'center', 'right']
</script>

<div class="flex items-center justify-center gap-12 p-24">
  {#if data.concert}
    <div class="space-y-6">
      <div class="inline-block rounded-xl p-2 ring-4 ring-primary">
        <div
          id="instagram"
          style="
            width: 540px;
            height: 540px;
            background-image: url({selectedArtist?.image});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: {selectedPosition};
          "
          class="flex flex-col justify-end bg-black p-8"
        >
          <div class="flex items-center space-x-6 rounded-2xl bg-background p-4">
            <div>
              <div class="w-20 rounded-md font-dela text-primary ring-4 ring-primary">
                <div class="bg-primary pb-1 text-center text-lg uppercase text-background">
                  {format(new Date(data.concert.date), 'MMM', { locale: pt })}
                </div>

                <div class="flex items-center justify-center py-2.5 text-4xl">
                  {format(new Date(data.concert.date), 'd')}
                </div>
              </div>
            </div>

            <div class="text-primary">
              <Title size="xl" transform="up" family="dela">{data.concert.name}</Title>

              <div class="text-lg">
                {#if data.concert.artists.length > 4}
                  {data.concert.artists
                    .slice(0, 4)
                    .map(artist => artist.name)
                    .join(', ')}
                  +
                  {data.concert.artists.length - 4} artistas
                {:else}
                  {new Intl.ListFormat('pt').format(data.concert.artists.map(artist => artist.name))}
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-16">
      <div class="space-y-6">
        <Title size="xl" transform="up" family="dela">Imagem de fundo</Title>

        <div class="grid grid-cols-2 gap-2">
          {#each data.concert.artists as artist}
            <button
              on:click={async () => {
                selectedArtist = artist
              }}
              class="flex w-full items-center space-x-4 rounded-xl p-2 hover:bg-secondary"
              class:bg-white={selectedArtist === artist}
              class:text-black={selectedArtist === artist}
            >
              <img src={artist.image} alt={artist.name} class="h-12 w-12 rounded-full object-cover" />

              <div>
                <Title weight="medium">{artist.name}</Title>
              </div>
            </button>
          {/each}
        </div>
      </div>

      <div class="space-y-6">
        <Title size="xl" transform="up" family="dela">Posição</Title>

        {#each positions as position}
          <button
            on:click={() => (selectedPosition = position)}
            class="flex w-full items-center space-x-4 rounded-xl p-4 capitalize hover:bg-secondary"
            class:bg-white={selectedPosition === position}
            class:text-black={selectedPosition === position}
          >
            {position}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>

{#if data.concert}
  <div class="mx-auto w-1/3 space-y-6">
    <Textarea class="h-72" bind:value={postContent} />

    <Button class="w-full">Gerar conteúdo</Button>
  </div>
{/if}
