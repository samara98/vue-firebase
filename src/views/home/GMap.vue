<template>
	<div class="map">
		<div class="google-map" id="map"></div>
	</div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

export default {
	name: "GMap",
	data() {
		return {
			lat: 53,
			lng: -2
		};
	},
	methods: {
		renderMap() {
			const map = new window.google.maps.Map(document.getElementById("map"), {
				center: { lat: 53, lng: -2 },
				zoom: 6,
				maxZoom: 15,
				minZoom: 3,
				streetViewControl: false
			});
		}
	},
	mounted() {
		this.renderMap();
	}
};
</script>

<style>
.google-map {
	width: 100%;
	height: 100%;
	margin: 0 auto;
	background: white;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
}
</style>
