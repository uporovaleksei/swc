<script setup>
import CarCard from './CarCard.vue'
import api from '@/utils/api'
import { ref, onMounted, watch } from 'vue'

const cars = ref([])
const currentPage = ref(1)
const totalPages = ref(0)
const perPageOptions = [3, 6, 9, 18]
const perPage = ref(9)
const search = ref('')
const fetchCars = async () => {
  try {
    let url = `cars-test?per_page=${perPage.value}&page=${currentPage.value}`
    const text = search.value?.trim()
    if (text) {
      url += '&search=' + encodeURIComponent(text)
    }
    const response = await api.get(url)
    cars.value = response.data.data
    totalPages.value = response.data.meta.last_page
    document.dispatchEvent(
      new CustomEvent('updateTotalCars', {
        detail: { totalCars: totalPages.value * perPage.value },
      }),
    )
  } catch (error) {
    console.error(error)
  }
}

const changePerPage = () => {
  currentPage.value = 1
  fetchCars()
}

const changePage = newPage => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage
    fetchCars()
  }
}

onMounted(() => {
  fetchCars()
})

watch([search, perPage], () => {
  currentPage.value = 1
  fetchCars()
})
</script>

<template>
  <div class="container">
    <div class="actions">
      <div class="left__items">
        <div class="search">
          <input type="text" placeholder="Search VIN" v-model="search" />
          <img src="@/assets/images/Lens.svg" alt="" />
        </div>
        <div class="pages__count">
          <p>Select vehicles per page:</p>
          <div class="select">
            <select v-model="perPage" @change="changePerPage">
              <option v-for="option in perPageOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
            <img src="@/assets/images/chevron_down.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="add__btn">
        <button>
          <img src="@/assets/images/plus__w.svg" alt="" />
          <p>Add Vehicle</p>
        </button>
      </div>
    </div>
    <div class="car__items">
      <div class="car__item" v-for="item in cars" :key="item.id">
        <CarCard
          :vehicle_name="item.vehicle_name"
          :vin_postfix="item.vin_postfix"
          :vin="item.vin"
          :angles_count="item.angles_count"
          :src="item.photo ? item.photo.url : 'https://api.caiman-app.de/img/car_placeholder.jpg'"
          :uploads="item.uploads"
        />
      </div>
    </div>
    <div class="footer">
      <div class="shows">
        Showing {{ cars.length * currentPage }} out of
        {{ totalPages * perPage }}
      </div>
      <div class="pagination">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">
          <img class="left__arrow" src="@/assets/images/chevron_down.svg" alt="" />
        </button>
        <input type="text" v-model="currentPage" @change="changePage(currentPage)" :min="1" :max="totalPages" />
        <p>of</p>
        <span>{{ totalPages }}</span>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
          <img class="right_arrow" src="@/assets/images/chevron_down.svg" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 95%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .actions {
    width: 100%;
    margin-top: 36px;
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left__items {
      display: flex;
      .search {
        position: relative;
        input {
          position: relative;
          padding: 9px 16px;
          width: 354px;
          height: 42px;
          position: relative;
          border: 1px solid #e4e4e4;
          border-radius: 8px;
          outline: none;
          transition: 0.3s ease all;
          &:focus {
            filter: drop-shadow(0px 0px 4px #e4e4e4);
          }
        }
        img {
          position: absolute;
          pointer-events: none;

          right: 0;
          padding: 11px 18px;
        }
      }
      .pages__count {
        margin-left: 32px;
        display: flex;
        align-items: center;
        gap: 16px;
        p {
          color: #293148;
          font-size: 16px;
          font-weight: 400;
          line-height: 22px;
          letter-spacing: 0em;
          text-align: center;
        }
        .select {
          position: relative;
          display: flex;
          align-items: center;
          select {
            width: 85px;
            height: 42px;
            border: 1px solid #e4e4e4;
            appearance: none;
            border-radius: 8px;
            padding: 9px 16px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 400;
            line-height: 22px;
            letter-spacing: 0em;
            text-align: left;
            color: #293148;
            outline: none;
          }

          img {
            position: absolute;
            right: 16px;
            pointer-events: none;
          }
        }
      }
    }
    .add__btn {
      justify-self: flex-end;
      transition: 0.3s ease all;
      button {
        width: 180px;
        height: 42px;
        padding: 9px, 0px, 9px, 18px;
        border-radius: 10px;
        box-shadow: 0px 8px 24px 0px #d90e321f;
        background: #d90e32;
        border: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        cursor: pointer;
        p {
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1px;
          color: #ffffff;
        }
      }
      &:hover {
        scale: 1.1;
        filter: drop-shadow(0px 0px 2px #d90e32);
      }
      &:active {
        scale: 0.98;
      }
    }
  }
  .car__items {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 50px;
    .car__item {
      transition: 0.3s ease all;

      &:hover {
        scale: 1.1;
      }
    }
  }
  .footer {
    width: 100%;
    display: flex;
    margin: 30px 0;
    align-items: center;
    justify-content: space-between;
    .shows {
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
      color: #293148cc;
    }
    .pagination {
      display: flex;
      align-items: center;
      align-self: flex-end;
      gap: 20px;
      input {
        width: 32px;
        height: 32px;
        text-align: center;
        border: 1px solid #e4e4e4;
        border-radius: 6px;
        font-size: 15px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0px;
        text-align: center;
        color: #293148cc;
      }
      span {
        font-size: 15px;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0px;
        text-align: center;
        color: #29314873;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        text-align: center;
        border: 1px solid #e4e4e4;
        border-radius: 6px;
      }
      p {
        font-size: 13px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0px;
        text-align: center;
        color: #293148cc;
      }
      button {
        background: transparent;
        border: 0;
        display: flex;
      }
      .left__arrow {
        transform: rotate(90deg);
        transition: 0.3s ease all;
        cursor: pointer;
        &:hover {
          transform: rotate(90deg) translateY(2px);
        }
        &:active {
          scale: 0.9;
        }
      }
      .right_arrow {
        transform: rotate(-90deg);
        transition: 0.3s ease all;
        cursor: pointer;
        &:hover {
          transform: rotate(-90deg) translateY(2px);
        }
        &:active {
          scale: 0.9;
        }
      }
    }
  }
}
@media (max-width: 1441px) {
  .container {
    .car__items {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 30px;
      .car__item {
        transition: 0.3s ease all;

        &:hover {
          scale: 1.1;
        }
      }
    }
  }
}
</style>
