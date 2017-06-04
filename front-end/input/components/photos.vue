<template>
	<div>
		<transition v-for="(image,i) in images" name="fade">
			<img :src="image" v-show="i == show" :class="(i == show) ? 'active' : ''">
		</transition>
</div>
</template>

<script>
import axios from 'axios'

export default {
	props: ['src'],
	data() {
		return { show: 0,
			seconds: 4,
			randomStart: true,
			images: []
		}
},
methods: {
	next: function (){
		var nImages = (this.images === undefined) ? 0 : this.images.length;
		this.show = (this.show + 1) % nImages;
	}
},
async created() {
		let _images = await axios.get('/api/cover');
		console.log(_images.data);
		this.images = _images.data;
		setInterval(this.next,this.seconds*1000);
}
};
</script>

<style scoped>
div {
	position: relative;
}
.active {
	position: relative;
}
img {
	width:100%;
	position:absolute;
	top:0;
	left:0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
</style>
