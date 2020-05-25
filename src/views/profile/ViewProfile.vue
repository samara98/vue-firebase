<template>
	<div class="view-profile container">
		<div class="card" v-if="profile">
			<h2 class="deep-purple-text center">{{ profile.alias }}'s Wall</h2>
		</div>
	</div>
</template>

<script>
import db from "../../api/firebase-init";

export default {
	name: "ViewProfile",
	data() {
		return {
			profile: null
		};
	},
	created() {
		const dbUsers = db.collection("users-geo-ninjas");
		dbUsers
			.doc(this.$route.params.id)
			.get()
			.then(snapshot => {
				this.profile = snapshot.data();
			});
	}
};
</script>

<style></style>
