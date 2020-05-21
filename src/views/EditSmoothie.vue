<template>
  <div class="edit-smoothie container" v-if="smoothie">
    <h2>Edit {{ smoothie.title }} Smoothie</h2>
  </div>
</template>

<script>
import db from "../firebase/init";

export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
    };
  },
  created() {
    const smoothies = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.smoothie_slug);

    smoothies.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        this.smoothie = {
          id: doc.id,
          ...doc.data(),
        };
      });
    });
  },
};
</script>

<style></style>
