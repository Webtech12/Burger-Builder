<template>
  <div class="add-burger container">
    <h2 class="center-align indigo-text">Create Burger</h2>
    <form @submit.prevent="AddBurger">
      <div class="field title">
        <label class="title">Burger Title:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div v-for="(ing, index) in ingredients" :key="index">
          <label for="ingredient">Ingredients:</label>
          <input type="text" name="ingredient" v-model="ingredients[index]">
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add Ingredients</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      <label>Press tab Ingredients</label>
      </div>
      <div class="field center-align">
          <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn green">Create Burger</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: "AddBurger",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
      AddBurger(){
          if (this.title) {
              this.feedback = null
              //create slug
              this.slug = slugify(this.title, {
                  replacement: '-',
                  remove: /[$*_+~.()'"!\-:@]/g,
                  lower:true
              })
              db.collection('burgers').add({
                  title: this.title,
                  ingredients: this.ingredients,
                  slug: this.slug
              }).then(() => {
                  this.$router.push({ name: 'Index' })
              }).catch((err) => {
                  console.log(err);
              });
          } else {
              this.feedback = 'Enter Title'
          }
      },
      addIng(){
          if (this.another) {
              this.ingredients.push(this.another)
              this.another = null
              this.feedback = null
          } 
          else {
              this.feedback = "Enter Ingredient"
          }
      },
  },
};
</script>

<style scoped>
.add-burger{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.add-burger h2{
    font-size: 2em;
    margin: 20px auto;
}
.add-burger .field{
    margin: 20px auto;
}
</style>
