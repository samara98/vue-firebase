<template>
	<div class="home">
		<g-map />
	</div>
</template>

<script>
// @ is an alias to /src
import GMap from "./GMap.vue";

export default {
	name: "Home",
	components: {
		GMap
	}
};
</script>
