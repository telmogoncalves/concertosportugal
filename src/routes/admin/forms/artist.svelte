<script lang="ts">
  import slugify from 'slugify'

  import { enhance } from '$app/forms'
  import { invalidateAll } from '$app/navigation'
  import Title from '$lib/components/title.svelte'
  import { Button } from '$lib/components/ui/button'
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'

  $: name = ''
  $: slug = slugify(name, { lower: true })
</script>

<form
  use:enhance={() => {
    invalidateAll()

    return ({ update }) => {
      return update()
    }
  }}
  method="post"
  action="?/artist"
  class="border p-6 rounded-xl space-y-6"
  enctype="multipart/form-data"
>
  <Title size="2xl" weight="bold" family="grotesque">Add a new artist</Title>

  <div class="space-y-8">
    <div class="space-y-2">
      <Label for="name">Name</Label>
      <Input type="text" id="name" name="name" placeholder="eg.: Ed Sheeran" bind:value={name} />
    </div>

    <div class="space-y-2">
      <Label for="slug">Slug</Label>
      <Input type="text" id="slug" name="slug" placeholder="eg.: ed-sheeran" value={slug} />
    </div>

    <div class="space-y-2">
      <Label for="image">Image</Label>
      <Input type="file" id="image" name="image" />
    </div>

    <div class="pt-6">
      <Button class="w-full" type="submit">Add artist</Button>
    </div>
  </div>
</form>
