<script setup>
import { ref,computed } from 'vue'
import { useRoute } from 'vue-router'
import rim from '@/assets/images/rim.svg'
import settings from '@/assets/images/settings.svg'
import user from '@/assets/images/user.svg'
const route = useRoute()
const curPath = computed(() => {
		return route.path

})
const paths = ref([
        {
          label: 'Profile',
          path: '/profile',
					src: user,
        },
        {
          label: 'Veichlie',
          path: '/',
					src: rim,

        },
        {
          label: 'Settings',
          path: '/settings',
					src: settings,

        },
      ])
</script>
	
<template>
<div class="nav__bar">
	<h1>Demo Test</h1>
	<div class="links">
	<router-link 
	v-for="item in paths" 
	:key="item.label" 
	:to="item.path"
	:class="{ active: curPath == item.path}"
	>
	<img :src="item.src" alt="">
		{{item.label}}
	</router-link>
	</div>
</div>
</template>


<style lang="scss" scoped>
.nav__bar{
	width: 256px;
	height: 100%;
	min-height: 100dvh;
	background: #282828;
	position: relative;
	&::after{
		content: '';
		position: absolute;
		background: url('@/assets/images/Vector.svg') no-repeat ;
		background-size: contain;
		width: 704px;
		height: 341px;
		left: -113px;
		bottom: 0;
	}
	h1{
		font-family: DM Sans;
		font-size: 24px;
		font-weight: 700;
		line-height: 24px;
		letter-spacing: 0em;
		text-align: left;
		color: #ffffff;
		padding-top: 30px;
		padding-left: 56px;
	}
	.links{
		margin-top: 103px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		a{
			display: flex;
			align-items: center;
			width: 100%;
			height: 48px;
			padding-left: 30px;
			font-size: 16px;
			font-weight: 500;
			line-height: 20px;
			letter-spacing: 0em;
			text-align: left;
			color: #ffffff;
		}
		.active{
				background: #FFFFFF33;
				border-left: 2px solid #D90E32;
		}
	}
	img{
		margin-right: 20px;
	}
}

</style>