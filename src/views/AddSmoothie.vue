<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form action="POST" @submit.prevent="AddSmoothie">
      <div class="field title">
        <label for="" class="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div class="field add-ingredient">
        <label for="" class="add-ingredient">Add an ingredient:</label>
        <input type="text" name="add-ingredient" />
      </div>
      <div class="field center-align">
        <button class="btn pink">Add Smoothie</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddSmoothie",
  data() {
    return {
      title: null,
    };
  },
  methods: {
    AddSmoothie() {
      console.log(this.title);
    },
  },
};
</script>

<style lang="scss">
.add-smoothie {
  margin-top: 50px;
  padding: 20px;
  max-width: 500px;
  h2 {
    font-size: 2em;
    margin: 20px auto;
  }
  .field {
    margin: 20px auto;
  }
}
</style>
