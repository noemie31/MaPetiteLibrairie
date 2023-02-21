<script setup>
import ToDoHeader from "./components/ToDoHeader.vue";
import ToDoList from "./components/ToDoList.vue";
</script>

<template>
  <ToDoHeader />
  <ToDoList />
  <img
    src="./assets/livre.png"
    alt="Icône"
    id="icon1"
    style="visibility: hidden"
  />
  <img
    src="./assets/livre2.png"
    alt="Icône"
    id="icon2"
    style="visibility: hidden"
  />
</template>

<style>
body {
  background-image: url("assets/texturepapier.avif");
  background-repeat: repeat;
  background-attachment: absolute;
  z-index: 1;
}

img#icon1 {
  visibility: visible !important;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10;
  width: 70px;
  height: 50px;
}

img#icon2 {
  visibility: visible !important;
  position: fixed;
  top: 0px;
  right: 0px;
  z-index: 10;
  width: 70px;
  height: 50px;
}
</style>
