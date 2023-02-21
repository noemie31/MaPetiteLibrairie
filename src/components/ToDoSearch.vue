<script setup>
import { ref } from "vue";
const titre = ref("");

const emit = defineEmits(["searchC"]);
</script>

<template>
  <form @submit.prevent="$emit('searchC', titre)">
    <input type="text" v-model="titre" placeholder="titre a recherche ?" />
    <input type="submit" value="rechercher" />
  </form>
</template>

<style>
form {
  text-align: center;
}

input {
  background-color: lightcyan;
  border-radius: 20px;
  border: 4px double blue;
  color: blue;
  text-align: center;
  padding: 1.1em;
  width: 300px;
}

input:hover {
  background-color: cyan;
}

input[type="submit"] {
  cursor: pointer;
}
</style>
