<script lang="ts">
  import type { DateValue } from '@internationalized/date'
  import { IconAlertCircle } from '@tabler/icons-svelte'
  import slugify from 'slugify'

  import Title from '$lib/components/title.svelte'
  import { Button } from '$lib/components/ui/button'
  import { Calendar } from '$lib/components/ui/calendar'
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'
  import * as Select from '$lib/components/ui/select'

  import ArtistForm from './forms/artist.svelte'
  import VenueForm from './forms/venue.svelte'

  export let data: import('./$types').PageData
  export let form: import('./$types').ActionData

  let date: DateValue | undefined = undefined

  $: title = ''
  $: venueId = ''
  $: venue = data.venues.find(v => v.id === venueId)?.name ?? ''
  $: year = ''
  $: slug = slugify(`${title} ${venue} ${year}`, { lower: true })
</script>

<div class="p-12">
  <div class="grid grid-cols-2 gap-8">
    <form method="post" action="?/concert" class="border p-6 rounded-xl space-y-6">
      {#if form?.error}
        <div
          class="bg-red-50/50 flex items-center space-x-2 text-sm font-medium border border-red-400 text-red-500 px-4 py-3 rounded-lg relative"
          role="alert"
        >
          <IconAlertCircle class="w-5 h-5 text-red-500" />
          <span class="block">{form.error}</span>
        </div>
      {/if}

      <Title size="2xl" weight="bold" family="grotesque">Add a new concert</Title>

      <input type="hidden" name="venueId" value={venueId} />
      <input type="hidden" name="date" value={date} />

      <div class="space-y-8">
        <div class="space-y-2">
          <Label for="name">Title</Label>
          <Input type="text" id="name" name="name" placeholder="eg.: Ed Sheeran" bind:value={title} />
        </div>

        <div class="space-y-2">
          <Label for="slug">Slug</Label>
          <Input type="text" id="slug" name="slug" placeholder="eg.: ed-sheeran" value={slug} />
        </div>

        <div class="space-y-2">
          <Label for="date">Date</Label>
          <div>
            <div class="border rounded-xl inline-block">
              <Calendar
                onValueChange={value => {
                  date = value
                  year = value?.year.toString() ?? ''
                }}
              />
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <Label for="venueId">Venue</Label>

          <Select.Root
            name="venueId"
            onSelectedChange={selected => {
              // @ts-expect-error value is not a valid property
              const value = selected.value
              if (!value) return

              // @ts-expect-error value is not a valid property
              venueId = value
            }}
          >
            <Select.Trigger class="w-full">
              <Select.Value placeholder="Pick a venue" />
            </Select.Trigger>

            <Select.Content>
              {#each data.venues as venue}
                <Select.Item value={venue.id}>{venue.name}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </div>

        <div class="space-y-2">
          <Label for="artists">Artists</Label>
          <div class="border rounded-xl p-1 max-h-[640px] overflow-scroll">
            {#each data.artists as artist}
              <label
                for={artist.id}
                class="flex items-center space-x-2 p-3 rounded-xl hover:bg-secondary cursor-pointer w-full"
              >
                <input type="checkbox" name="artists" id={artist.id} value={artist.id} />
                <img src={artist.image} alt={artist.name} class="w-8 h-8 rounded-full object-cover" />
                <p>{artist.name}</p>
              </label>
            {/each}
          </div>

          <div class="pt-6">
            <Button class="w-full" type="submit">Add concert</Button>
          </div>
        </div>
      </div>
    </form>

    <div class="space-y-12">
      <ArtistForm />
      <VenueForm />
    </div>
  </div>
</div>
