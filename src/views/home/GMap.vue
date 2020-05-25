<template>
	<div class="map">
		<div class="google-map" id="map"></div>
	</div>
</template>

<script>
import "../../api/firebase-init";
// import firebase from "firebase/app";
import "firebase/auth";

export default {
	name: "GMap",
	data() {
		return {
			lat: 53,
			lng: -2
		};
	},
	computed: {
		google() {
			return window.google;
		}
	},
	methods: {
		renderMap() {
			if (this.google) {
				new this.google.maps.Map(document.getElementById("map"), {
					center: { lat: this.lat, lng: this.lng },
					zoom: 6,
					maxZoom: 15,
					minZoom: 3,
					streetViewControl: false
				});
			}
		}
	},
	mounted() {
		// get user geolocation
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					this.lat = position.coords.latitude;
					this.lng = position.coords.longitude;
					this.renderMap();
				},
				err => {
					console.error(err);
					this.renderMap();
				},
				{ maximumAge: 6000, timeout: 3000 }
			);
		} else {
			// position centre of default values
			this.renderMap();
		}
		this.renderMap();
	},
	watch: {
		google() {
			this.renderMap();
		}
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
