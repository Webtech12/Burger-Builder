<template>
  <div class="index container">
   <div class="card" v-for="burger in burgers" :key="burger.id">
     <div class="card-content">
       <i class="material-icons delete" @click="deleteCard(burger.id)">delete</i>
       <h2 class="indigo-text">{{ burger.title }}</h2>
       <ul class="ingerdients">
         <li v-for="(ing, index) in burger.ingerdients" :key="index">
           <span class="chip">{{ ing }}</span>
         </li>
       </ul>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      burgers: [
        {title: 'Chicken Burger', slug: 'chicken-burger', ingerdients: ['chicken', 'lettuce', 'cloe slaw'], id: '1'},
        {title: 'Beef Burger', slug: 'beef-burger', ingerdients: ['beef', 'cheese', 'tomatoes'], id: '2'}
      ]
    }
  },
  methods: {
    deleteCard(id) {
      this.burgers = this.burgers.filter(burger => {
        return burger.id != id
      })
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
