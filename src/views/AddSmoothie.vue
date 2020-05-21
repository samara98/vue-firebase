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
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab="addIng"
          v-model="another"
        />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
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
      another: null,
      ingredients: [],
      feedback: null,
    };
  },
  methods: {
    AddSmoothie() {
      console.log(this.title);
      console.log(this.ingredients);
    },
    addIng() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add an ingredient";
      }
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
