<template>
  <div class="edit-smoothie container" v-if="smoothie">
    <h2>Edit {{ smoothie.title }} Smoothie</h2>
    <form action="POST" @submit.prevent="EditSmoothie">
      <div class="field title">
        <label for="title" class="title">Smoothie Title:</label>
        <input
          id="title"
          type="text"
          name="title"
          v-model.trim="smoothie.title"
        />
      </div>
      <div
        v-for="(ing, index) in smoothie.ingredients"
        :key="index"
        class="field"
      >
        <label for="">ingredient</label>
        <input
          type="text"
          name="ingredient"
          v-model="smoothie.ingredients[index]"
        />
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient" class="add-ingredient"
          >Add an ingredient:</label
        >
        <input
          id="add-ingredient"
          type="text"
          name="add-ingredient"
          @keydown.tab="addIng"
          v-model.trim="another"
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
import slugify from "slugify";
import db from "../firebase/init";

export default {
  name: "EditSmoothie",
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null,
    };
  },
  methods: {
    EditSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null;
        // create a slug
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: "-",
          remove: /[$*_+~.()'"!\-:@\\]/g,
          lower: true,
        });
        const smoothies = db.collection("smoothies");
        smoothies
          .doc(this.smoothie.id)
          .update(this.smoothie)
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        this.feedback = "You must enter a smoothie title";
      }
    },
    addIng() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must enter a value to add an ingredient";
      }
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(
        (ingredient) => {
          return ingredient !== ing;
        }
      );
    },
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

<style lang="scss">
.edit-smoothie {
  margin-top: 50px;
  padding: 20px;
  max-width: 500px;
  h2 {
    font-size: 2em;
    margin: 20px auto;
  }
  .field {
    margin: 20px auto;
    position: relative;
  }
  .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
  }
}
</style>
