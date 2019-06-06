<template>
  <div class="edit-burger container">
      <h2>Edit {{ burger.title }} </h2>
      <form @submit.prevent="EditBurger">
      <div class="field title">
        <label class="title">Burger Title:</label>
        <input type="text" name="title" v-model="burger.title">
      </div>
      <div class="field" v-for="(ing, index) in burger.ingredients" :key="index">
          <label for="ingredient">Ingredients:</label>
          <input type="text" name="ingredient" v-model="burger.ingredients[index]">
          <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add Ingredients</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      <label>Press tab Ingredients</label>
      </div>
      <div class="field center-align">
          <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn green">Update Burger</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'EditBurger',
  data() {
      return {
          burger:null,
          another:null,
          feedback:null
      }
  },
   methods: {
       EditBurger(){
           if (this.burger.title) {
              this.feedback = null
              //create slug
              this.burger.slug = slugify(this.burger.title, {
                  replacement: '-',
                  remove: /[$*_+~.()'"!\-:@]/g,
                  lower:true
              })
              db.collection('burgers').doc(this.burger.id).update({
                  title: this.burger.title,
                  ingredients: this.burger.ingredients,
                  slug: this.burger.slug
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
              this.burger.ingredients.push(this.another)
              this.another = null
              this.feedback = null
          } 
          else {
              this.feedback = "Enter Ingredient"
          }
      },
      deleteIng(ing){
          this.burger.ingredients =  this.burger.ingredients.filter(ingredient => {
              return ingredient != ing
          })
      },
  },
  created() {
      let ref = db.collection('burgers').where('slug', '==', this.$route.params.burger_slug)
      ref.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.burger = doc.data()
                this.burger.id = doc.id
            })
        }).catch((err) => {
            console.log(err);
        });
  },
 
}
</script>


<style scoped>
.edit-burger{
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.edit-burger h2{
    font-size: 2em;
    margin: 20px auto;
}
.edit-burger .field{
    margin: 20px auto;
    position: relative;
}
.edit-burger .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>
