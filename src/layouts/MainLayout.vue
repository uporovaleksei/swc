<script setup>
import Navigation from '@/components/Navigation.vue'
import Header from '@/components/Header.vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const pageTitle = computed(() => {
  const currentRoute = router.currentRoute.value
  const routeName = currentRoute.name

  switch (routeName) {
    case 'settings':
      return 'Settings'
    case '':
      return 'Vehicles'
    case 'profile':
      return 'Profile'
    default:
      return 'Vehicles '
  }
})
</script>
<template>
  <div class="container">
    <div class="side__bar">
      <Navigation />
    </div>
    <div class="content">
      <Header :title="pageTitle" />
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  .side__bar {
    z-index: 1;
  }
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    z-index: 4;
  }
}
</style>
