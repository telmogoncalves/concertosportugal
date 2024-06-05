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

<div class="flex items-center p-24 justify-center gap-12">
  {#if data.concert}
    <div class="space-y-6">
      <div class="ring-4 inline-block rounded-xl p-2 ring-white">
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
          class="bg-black flex flex-col justify-end p-3"
        >
          <div class="bg-black p-4 rounded-2xl flex items-center space-x-6">
            <div>
              <div class="ring-4 ring-primary w-20 rounded-md font-unica">
                <div class="bg-primary text-background text-2xl uppercase text-center font-semibold pb-0.5">
                  {format(new Date(data.concert.date), 'MMM', { locale: pt })}
                </div>

                <div class="text-4xl font-semibold flex items-center justify-center py-2.5">
                  {format(new Date(data.concert.date), 'd')}
                </div>
              </div>
            </div>

            <div>
              <Title size="2xl" weight="bold" family="unica">{data.concert.name}</Title>

              <div class="text-lg">
                {#if data.concert.artists.length > 4}
                  {data.concert.artists
                    .slice(0, 4)
                    .map(artist => artist.name)
                    .join(', ')} e mais{' '}
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
        <Title size="xl" weight="bold" family="unica">Imagem de fundo</Title>

        <div class="grid grid-cols-2 gap-2">
          {#each data.concert.artists as artist}
            <button
              on:click={async () => {
                selectedArtist = artist
              }}
              class="flex items-center space-x-4 w-full p-2 hover:bg-secondary rounded-xl"
              class:bg-white={selectedArtist === artist}
              class:text-black={selectedArtist === artist}
            >
              <img src={artist.image} alt={artist.name} class="w-12 h-12 object-cover rounded-full" />

              <div>
                <Title weight="medium">{artist.name}</Title>
              </div>
            </button>
          {/each}
        </div>
      </div>

      <div class="space-y-6">
        <Title size="xl" weight="bold" family="unica">Posição</Title>

        {#each positions as position}
          <button
            on:click={() => (selectedPosition = position)}
            class="flex items-center space-x-4 w-full p-4 hover:bg-secondary rounded-xl capitalize"
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
  <div class="w-1/3 mx-auto space-y-6">
    <Textarea class="h-72" bind:value={postContent} />

    <Button class="w-full">Gerar conteúdo</Button>
  </div>
{/if}
