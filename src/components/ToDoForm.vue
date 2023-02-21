<script setup>
import { ref } from "vue";
// -- donnée réactive pour la saisie du libellé
const titre = ref("");
const prix = ref("");
const qtestock = ref("");

const emit = defineEmits(["addC"]);
</script>

<template>
  <form @submit.prevent="$emit('addC', titre, prix, qtestock)">
    <!-- 3 champs de saisir pour les 3 paramètres du livres avant de valider sa création-->
    <input type="text" v-model="titre" placeholder="titre ?" />
    <input type="text" v-model="prix" placeholder="prix ?" />
    <input type="text" v-model="qtestock" placeholder="quantité ?" />
    <input type="submit" value="valider" />
  </form>
</template>

<style scoped>
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
