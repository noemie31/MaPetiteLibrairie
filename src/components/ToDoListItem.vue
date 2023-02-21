<script setup>
defineProps(["livre"]);
const emit = defineEmits(["deleteC", "incrementC", "decrementC"]);
</script>

<template>
  <!--chaque élément est hardcodé, sinon il faudrait interpréter le résultat de la fonction Livre#pourAfficher()-->
  <tr>
    <td>{{ livre.id }}</td>
    <td>{{ livre.titre }}</td>
    <td>{{ livre.prix }}</td>
    <td>{{ livre.qtestock }}</td>
    <td>
      <button @click="$emit('deleteC', livre.id)">Supprimer</button>
    </td>
    <td>
      <button @click="$emit('incrementC', livre.id)">Ajout Stock</button>
    </td>
    <td>
      <button @click="$emit('decrementC', livre.id)">Supprimer Stock</button>
    </td>
  </tr>
</template>

<style>
td,th{
  color:blue;
  text-align: center;
  border: 1px solid blue;
  padding: 10px;
}

button{
  background-color: lightcyan;
  border-radius: 10px;
  padding: 7px;
  border: 4px double blue;
  color: blue;
  text-align: center;
  width: 200px;
  cursor:pointer;
}

button:hover{
  background-color:cyan;
}
</style>