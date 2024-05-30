<script lang="ts">
  import { IconLoader } from '@tabler/icons-svelte'
  import { Pincode, PincodeInput } from 'svelte-pincode'

  import { goto } from '$app/navigation'

  let code: string[] = []
  let value = ''
  let submitting = false

  async function submit() {
    if (value.length < 4) return
    if (submitting) return

    submitting = true

    const response = await fetch('/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pin: value }),
    })
    const data = await response.json()

    if (data.success) {
      return goto('/admin')
    }

    code = []
    value = ''
    submitting = false

    alert(data.error)
  }
</script>

{#if submitting}
  <div class="h-screen flex items-center justify-center">
    <IconLoader class="h-8 animate-spin" />
  </div>
{:else}
  <div class="h-screen container flex flex-col items-center justify-center space-y-6">
    <Pincode bind:code bind:value type="numeric" on:complete={submit} class="border border-red-500">
      <PincodeInput />
      <PincodeInput />
      <PincodeInput />
      <PincodeInput />
      <PincodeInput />
      <PincodeInput />
    </Pincode>
  </div>
{/if}
