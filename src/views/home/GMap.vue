<template>
	<div class="map">
		<div class="google-map" id="map"></div>
	</div>
</template>

<script>
import db from "../../api/firebase-init";
import firebase from "firebase/app";
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
				const map = new this.google.maps.Map(document.getElementById("map"), {
					center: { lat: this.lat, lng: this.lng },
					zoom: 6,
					maxZoom: 15,
					minZoom: 3,
					streetViewControl: false
				});
				db.collection("users-geo-ninjas")
					.get()
					.then(snapshot => {
						snapshot.docs.forEach(doc => {
							const data = doc.data();
							if (data.geolocation) {
								const marker = new window.google.maps.Marker({
									position: {
										lat: data.geolocation.lat,
										lng: data.geolocation.lng
									},
									map
								});
								// add click event to marker
								marker.addListener("click", () => {
									this.$router.push({
										name: "ViewProfile",
										params: { id: doc.id }
									});
								});
							}
						});
					});
			}
		}
	},
	mounted() {
		// get current user
		const user = firebase.auth().currentUser;

		// get user geolocation
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					this.lat = position.coords.latitude;
					this.lng = position.coords.longitude;

					// find the user record and then update geocord
					db.collection("users-geo-ninjas")
						.where("user_id", "==", user.uid)
						.get()
						.then(snapshot => {
							snapshot.forEach(doc => {
								db.collection("users-geo-ninjas")
									.doc(doc.id)
									.update({
										geolocation: {
											lat: position.coords.latitude,
											lng: position.coords.longitude
										}
									});
							});
						})
						.then(() => {
							this.renderMap();
						});
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
