<script setup>
import { defineProps, onMounted, onBeforeUnmount, ref } from 'vue'
const props = defineProps({
  title: String,
})
const totalCars = ref(null)
const handleTotalCarsUpdate = event => {
  if (event && event.detail && event.detail.totalCars !== undefined) {
    totalCars.value = event.detail.totalCars
  }
}

onMounted(() => {
  document.addEventListener('update-total-cars', handleTotalCarsUpdate)
})

onBeforeUnmount(() => {
  document.removeEventListener('update-total-cars', handleTotalCarsUpdate)
})
</script>

<template>
  <header>
    <div class="info">
      <h1>{{ props.title }}</h1>
      <p v-if="totalCars">{{ totalCars }}</p>
    </div>
    <div class="actions">
      <div class="plus">
        <button>
          <img src="@/assets/images/plus.svg" alt="" />
        </button>
      </div>
      <div class="profile">
        <img src="@/assets/images/Photo.png" alt="" />
        <h2>John Doe</h2>
      </div>
      <div class="language">
        <img src="@/assets/images/uk.svg" alt="" />
        <p>En</p>
        <img src="@/assets/images/chevron_down.svg" alt="" />
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 102px;
  border-bottom: 1px solid #e4e4e4;
  .info {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-left: 30px;
    h1 {
      color: #293148;
      font-size: 32px;
      font-weight: 700;
      line-height: 38px;
      letter-spacing: 0px;
      text-align: left;
    }
    p {
      padding: 4px 14px;
      background: #f3f6f8;
      color: #293148cc;
      border-radius: 6px;
      font-size: 15px;
      font-weight: 700;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: center;
    }
  }
  .actions {
    display: flex;
    align-items: center;
    gap: 40px;
    margin-right: 30px;
    .plus {
      button {
        background: transparent;
        width: 42px;
        height: 42px;
        border: 1px solid #e86e84;
        border-radius: 6px;
      }
    }
    .profile {
      display: flex;
      gap: 14px;
      align-items: center;
      h2 {
        color: #293148;
      }
    }
    .language {
      display: flex;
      align-items: center;
      img {
        margin-right: 14px;
      }
      p {
        font-size: 15px;
        font-weight: 500;
        line-height: 22px;
        letter-spacing: 0px;
        text-align: left;
      }
    }
  }
}
</style>
