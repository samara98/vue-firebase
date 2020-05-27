<template>
	<div class="view-profile container">
		<div class="card" v-if="profile">
			<h2 class="deep-purple-text center">{{ profile.alias }}'s Wall</h2>
			<ul class="comments collection">
				<li v-for="(comment, index) in comments" :key="index">
					<div class="deep-purple-text">{{ comment.from }}</div>
					<div class="grey-text text-darken-2">{{ comment.content }}</div>
				</li>
			</ul>
			<form @submit.prevent="addComment">
				<div class="field">
					<label for="comment-input">Add a comment</label>
					<input
						type="text"
						name="comment"
						id="commnet-input"
						v-model="newComment"
					/>
					<p v-if="feedback" class="red-text center">{{ feedback }}</p>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import db from "../../api/firebase-init";
import firebase from "firebase/app";

export default {
	name: "ViewProfile",
	data() {
		return {
			profile: null,
			newComment: null,
			feedback: null,
			user: null,
			comments: []
		};
	},
	methods: {
		addComment() {
			if (this.newComment) {
				this.feedback = null;
				db.collection("comments-geo-ninjas")
					.add({
						to: this.$route.params.id,
						from: this.user.alias,
						content: this.newComment,
						time: Date.now()
					})
					.then(() => {
						this.newComment = null;
					});
			} else {
				this.feedback = "You must enter a comment to add it";
			}
		}
	},
	created() {
		const dbUsers = db.collection("users-geo-ninjas");

		// get current user
		dbUsers
			.where("user_id", "==", firebase.auth().currentUser.uid)
			.get()
			.then(snapshot => {
				snapshot.forEach(doc => {
					this.user = {
						id: doc.id,
						...doc.data()
					};
				});
			});

		// profile data
		dbUsers
			.doc(this.$route.params.id)
			.get()
			.then(snapshot => {
				this.profile = snapshot.data();
			});

		// comments
		const dbComments = db.collection("comments-geo-ninjas");
		dbComments
			.where("to", "==", this.$route.params.id)
			.onSnapshot(querySnapshop => {
				querySnapshop.docChanges().forEach(change => {
					if (change.type === "added") {
						this.comments.unshift({
							from: change.doc.data().from,
							content: change.doc.data().content
						});
					}
				});
			});
	}
};
</script>

<style>
.view-profile .card {
	padding: 20px;
	margin-top: 60px;
}

.view-profile h2 {
	font-size: 2em;
	margin-top: 0;
}

.view-profile li {
	padding: 10px;
	border-bottom: 1px solid #eeeeee;
}
</style>
