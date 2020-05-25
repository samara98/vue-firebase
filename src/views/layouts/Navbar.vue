<template>
	<div class="navbar">
		<nav class="deep-purple darken-1">
			<div class="container">
				<router-link :to="{ name: `Home` }" class="brand-logo left"
					>Geo Ninjas</router-link
				>
				<ul class="right">
					<template v-if="!user">
						<li><router-link :to="{ name: `Signup` }">Signup</router-link></li>
						<li><router-link :to="{ name: `Login` }">Login</router-link></li>
					</template>
					<template v-if="user">
						<li>
							<a href="#">{{ user.email }} </a>
						</li>
						<li><a href="#" @click="logout">Logout</a></li>
					</template>
				</ul>
			</div>
		</nav>
	</div>
</template>

<script>
import firebase from "firebase/app";

export default {
	name: "Navbar",
	data() {
		return {
			user: null
		};
	},
	methods: {
		logout() {
			firebase
				.auth()
				.signOut()
				.then(() => {
					this.$router.push({ name: "Login" });
				});
		}
	},
	created() {
		// const user = firebase.auth().currentUser;
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.user = user;
			} else {
				this.user = null;
			}
		});
	}
};
</script>

<style></style>
