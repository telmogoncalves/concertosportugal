<script lang="ts">
export let data: import('./$types').PageData
  </script>

<div class="p-24 flex items-center justify-center">
  <pre>
{JSON.stringify(data, null, 2)}
  </pre>
</div>
