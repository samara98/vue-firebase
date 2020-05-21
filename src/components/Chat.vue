<template>
	<div class="chat container">
		<h2 class="center teal-text">Ninja Chat</h2>
		<div class="card">
			<div class="card-content">
				<ul class="messages">
					<li v-for="message in messages" :key="message.id">
						<span class="teal-text">{{ message.name }}</span>
						<span class="grey-text text-darken-3">{{ message.content }}</span>
						<span class="grey-text time">{{ message.timestamp }}</span>
					</li>
				</ul>
			</div>
			<div class="card-action">
				<new-message :name="name" />
			</div>
		</div>
	</div>
</template>

<script>
import NewMessage from "./NewMessage";
import db from "../api/firebase";

export default {
	name: "Chat",
	components: {
		NewMessage
	},
	props: ["name"],
	data() {
		return {
			messages: []
		};
	},
	created() {
		const dbMessages = db.collection("messages").orderBy("timestamp");

		dbMessages.onSnapshot(querySnapshot => {
			querySnapshot.docChanges().forEach(change => {
				if (change.type === "added") {
					const { doc } = change;
					this.messages.push({
						id: doc.id,
						...doc.data()
					});
				}
			});
		});
	}
};
</script>

<style>
.chat h2 {
	font-size: 2.6em;
	margin-bottom: 40px;
}

.chat span {
	font-size: 1.4em;
}

.chat .time {
	display: block;
	font-size: 1.2em;
}
</style>
