<template>
	<div class="signup container">
		<form class="card-panel" @submit.prevent="signup">
			<h2 class="center deep-purple-text">Signup</h2>
			<div class="field">
				<label for="email-input">Email:</label>
				<input type="email" name="email" id="email-input" v-model="email" />
			</div>
			<div class="field">
				<label for="password-input">Password:</label>
				<input
					type="password"
					name="password"
					id="password-input"
					v-model="password"
				/>
			</div>
			<div class="field">
				<label for="alias-input">Alias:</label>
				<input type="text" name="alias" id="alias-input" v-model="alias" />
			</div>
			<p class="red-text center" v-if="feedback">{{ feedback }}</p>
			<div class="field center">
				<button class="btn deep-purple">Signup</button>
			</div>
		</form>
	</div>
</template>

<script>
import slugify from "slugify";
import db from "../../api/firebase-init";
import firebase from "firebase/app";
import "firebase/auth";

export default {
	name: "Signup",
	data() {
		return {
			email: null,
			password: null,
			alias: null,
			feedback: null,
			slug: null
		};
	},
	methods: {
		signup() {
			if (this.alias && this.email && this.password) {
				this.slug = slugify(this.alias, {
					replacement: "-",
					remove: /[$*_+~.()'"!\-\\:@]g/,
					lower: true
				});
				const dbUsers = db.collection("users-geo-ninjas");
				dbUsers
					.doc(this.slug)
					.get()
					.then(doc => {
						if (doc.exists) {
							this.feedback = "This alias already exists";
						} else {
							firebase
								.auth()
								.createUserWithEmailAndPassword(this.email, this.password)
								.catch(err => {
									console.error(err);
									this.feedback = err.message;
								});
							this.feedback = "This alias is free to use";
						}
					});
			} else {
				this.feedback = "You must enter an alias";
			}
		}
	}
};
</script>

<style lang="scss">
.signup {
	max-width: 400px;
	margin-top: 60px;
	h2 {
		font-size: 2.4em;
	}
	.field {
		margin-bottom: 16px;
	}
}
</style>
