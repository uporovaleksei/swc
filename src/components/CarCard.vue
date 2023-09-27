<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  vehicle_name: String,
  vin_postfix: String,
  vin: String,
  angles_count: Number,
  src: String,
  uploads: Number,
})
</script>

<template>
  <div class="card">
    <div class="options">
      <button>
        <img src="@/assets/images/more_horizontal.svg" alt="" />
      </button>
    </div>
    <img class="car" :src="props.src" alt="" />
    <div class="title">
      <h1>{{ props.vehicle_name }}</h1>
    </div>
    <div class="vin">
      <h2>{{ props.vin_postfix }}{{ props.vin }}</h2>
    </div>
    <div class="status">
      <div class="count" :class="{ active: props.angles_count == props.uploads }">
        <img v-if="props.angles_count == props.uploads" src="@/assets/images/check.svg" alt="" />
        {{ props.uploads }}/{{ props.angles_count }}
      </div>
      <div class="time">3 days left</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  width: 354px;
  height: 335px;
  border-radius: 10px;
  flex: 0 0 calc(33.33%);
  background: #f3f6f8;
  text-align: center;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .options {
    align-self: flex-end;
    button {
      background: transparent;
      border: 0;
      cursor: pointer;
      display: flex;
      gap: 3px;
      span {
        width: 2px;
        height: 2px;
        border: 2px solid #29314899;
        border-radius: 50%;
      }
    }
  }
  .car {
    object-fit: cover;
    width: 260px;
    height: 135px;
  }
  .title {
    align-self: flex-start;
    margin-top: 24px;
    h1 {
      font-size: 20px;
      font-weight: 700;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
      color: #293148;
    }
  }
  .vin {
    align-self: flex-start;
    margin-top: 12px;
    h2 {
      font-size: 15px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: 0.30000001192092896px;
      text-align: left;
      color: #29314899;
    }
  }
  .status {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 18px;
    border-top: 1px solid #e4e4e4;
    .count {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 18px;
      width: 66px;
      height: 30px;
      padding: 4px, 14px, 4px, 14px;
      border-radius: 6px;
      gap: 10px;
      background: #ededed;
      color: #293148cc;
      font-size: 15px;
      font-weight: 700;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: center;
    }
    .active {
      width: 93px;
      background: #e4f5dd;
      color: #7fc75e;
    }
  }
  .time {
    margin-top: 18px;
    font-size: 15px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: right;
    color: #29314899;
  }
}
</style>
