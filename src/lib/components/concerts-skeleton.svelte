<script>
  import { Skeleton } from './ui/skeleton'
</script>

<div class="space-y-4">
  <!-- Year -->
  <Skeleton class="h-8 w-16" />

  <div class="border rounded-xl p-6 space-y-6">
    <!-- Month -->
    <Skeleton class="h-6 w-12" />

    <div class="space-y-3">
      <div class="space-y-2 flex items-center space-x-4">
        <!-- Day calendar -->
        <Skeleton class="h-14 w-14" />

        <div class="flex items-center space-x-4">
          <!-- Bands -->
          <div class="-space-x-2 overflow-hidden md:flex hidden">
            <Skeleton class="h-8 w-8 rounded-full ring-4 ring-background" />
            <Skeleton class="h-8 w-8 rounded-full ring-4 ring-background" />
            <Skeleton class="h-8 w-8 rounded-full ring-4 ring-background" />
            <Skeleton class="h-8 w-8 rounded-full ring-4 ring-background" />
            <Skeleton class="h-8 w-8 rounded-full ring-4 ring-background" />
            <Skeleton class="h-8 w-8 rounded-full ring-4 ring-background" />
          </div>

          <!-- Details -->
          <div class="space-y-1">
            <Skeleton class="h-4 w-48" />
            <Skeleton class="h-3 w-20" />
          </div>
        </div>
      </div>

      <div class="space-y-2 flex items-center space-x-4">
        <!-- Day calendar -->
        <Skeleton class="h-14 w-14" />

        <div class="flex items-center space-x-4">
          <!-- Bands -->
          <div class="md:flex hidden -space-x-2 overflow-hidden">
            <Skeleton class="h-8 w-8 rounded-full ring-4 ring-background" />
            <Skeleton class="h-8 w-8 rounded-full ring-4 ring-background" />
          </div>

          <!-- Details -->
          <div class="space-y-1">
            <Skeleton class="h-4 w-48" />
            <Skeleton class="h-3 w-20" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="border rounded-xl p-6 space-y-6">
    <!-- Month -->
    <Skeleton class="h-6 w-12" />

    <div class="space-y-3">
      <div class="space-y-2 flex items-center space-x-4">
        <!-- Day calendar -->
        <Skeleton class="h-14 w-14" />

        <div class="flex items-center space-x-4">
          <!-- Bands -->
          <div class="md:flex hidden -space-x-2 overflow-hidden">
            <Skeleton class="h-8 w-8 rounded-full ring-4 ring-background" />
            <Skeleton class="h-8 w-8 rounded-full ring-4 ring-background" />
            <Skeleton class="h-8 w-8 rounded-full ring-4 ring-background" />
          </div>

          <!-- Details -->
          <div class="space-y-1">
            <Skeleton class="h-4 w-48" />
            <Skeleton class="h-3 w-20" />
          </div>
        </div>
      </div>

      <div class="space-y-2 flex items-center space-x-4">
        <!-- Day calendar -->
        <Skeleton class="h-14 w-14" />

        <div class="flex items-center space-x-4">
          <!-- Bands -->
          <div class="md:flex hidden -space-x-2 overflow-hidden">
            <Skeleton class="h-8 w-8 rounded-full ring-4 ring-background" />
            <Skeleton class="h-8 w-8 rounded-full ring-4 ring-background" />
            <Skeleton class="h-8 w-8 rounded-full ring-4 ring-background" />
            <Skeleton class="h-8 w-8 rounded-full ring-4 ring-background" />
          </div>

          <!-- Details -->
          <div class="space-y-1">
            <Skeleton class="h-4 w-48" />
            <Skeleton class="h-3 w-20" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
