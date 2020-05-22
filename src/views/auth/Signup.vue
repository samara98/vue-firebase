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
			<div class="field center">
				<button class="btn deep-purple">Signup</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	name: "Signup",
	data() {
		return {
			email: null,
			password: null,
			alias: null
		};
	},
	methods: {
		signup() {}
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
