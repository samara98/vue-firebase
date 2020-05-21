<template>
	<div class="chat container">
		<h2 class="center teal-text">Ninja Chat</h2>
		<div class="card">
			<div class="card-content">
				<ul class="messages" v-chat-scroll>
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
import moment from "moment";

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
					const data = doc.data();
					this.messages.push({
						id: doc.id,
						name: data.name,
						content: data.content,
						timestamp: moment(
							data.timestamp.seconds * 1000 +
								data.timestamp.nanoseconds / 1000000
						).format("lll")
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
	font-size: 0.8em;
}

.messages {
	max-height: 300px;
	overflow: auto;
}

.messages::-webkit-scrollbar {
	width: 3px;
}

.messages::-webkit-scrollbar-track {
	background: #ddd;
}

.messages::-webkit-scrollbar-thumb {
	background: #aaa;
}
</style>
