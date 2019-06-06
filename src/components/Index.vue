<template>
  <div class="index container">
   <div class="card" v-for="burger in burgers" :key="burger.id">
     <div class="card-content">
       <i class="material-icons delete" @click="deleteCard(burger.id)">delete</i>
       <h2 class="indigo-text">{{ burger.title }}</h2>
       <ul class="ingerdients">
         <li v-for="(ing, index) in burger.ingredients" :key="index">
           <span class="chip">{{ ing }}</span>
         </li>
       </ul>
     </div>
     <span class="btn-floating btn-large halfway-fab pink">
       <router-link :to="{name: 'EditBurger', params: {burger_slug: burger.slug}}">
         <i class="material-icons edit">edit</i>
       </router-link>
     </span>
   </div>
  </div>
</template>

<script>
import db from '@/firebase/init';

export default {
  name: 'Index',
  data() {
    return {
      burgers: []
    }
  },
  created() {
    //fetch data from firestore
    db.collection('burgers').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let burger = doc.data()
          burger.id = doc.id
          this.burgers.push(burger)
        })
      }).catch((err) => {
        console.log(err);
      });
  },
  methods: {
    deleteCard(id) {
      // console.log(id)
      db.collection('burgers').doc(id).delete()
        .then(() => {
          this.burgers = this.burgers.filter(burger => {
            return burger.id != id
          })
          }).catch((err) => {
          console.log(err);
        });
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 60px
}
.index h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .ingerdients{
  margin: 30px auto;
}
.index .ingerdients li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: grey;

}

</style>
