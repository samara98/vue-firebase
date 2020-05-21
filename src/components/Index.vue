<template>
  <div class="index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)"
          >delete</i
        >
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ ing }} </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../firebase/init";

export default {
  name: "Index",
  props: {
    msg: String,
  },
  data() {
    return {
      smoothies: [
        {
          title: "Ninja Brew",
          slug: "ninja-brew",
          ingredients: ["banana", "coffee", "milk"],
          id: "1",
        },
        {
          title: "Morning Mood",
          slug: "morning-mood",
          ingredients: ["mango", "lime", "juice"],
          id: "2",
        },
      ],
    };
  },
  methods: {
    deleteSmoothie(id) {
      this.smoothies = this.smoothies.filter((smoothie) => {
        return smoothie.id !== id;
      });
    },
  },
  created() {
    // fetch data from the firestore
    const smoothies = db.collection("smoothies");
    smoothies.get().then((snapshot) => {
      snapshot.forEach((doc) => {
        const smoothie = {
          id: doc.id,
          ...doc.data(),
        };
        this.smoothies.push(smoothie);
      });
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
  h2 {
    font-size: 1.8em;
    text-align: center;
    margin-top: 0;
  }
  .ingredients {
    margin: 0 auto;
    li {
      display: inline-block;
    }
  }
  .delete {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.4em;
  }
}
</style>
