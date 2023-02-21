<script setup>
import { reactive, onMounted } from "vue";
import ToDoListItem from "./ToDoListItem.vue";
import ToDoForm from "./ToDoForm.vue";
import Livre from "../Livre";
import ToDoSearch from "./ToDoSearch.vue";

const listeL = reactive([]);
//changer avec le rand dans la feuille d'appel
const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/24/livres";

function getTodos() {
  const fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // -- vider la liste des choses
      listeL.splice(0, listeL.length);
      // pour chaque donnée renvoyée par l'API
      //  créer un objet instance de la classe Livre
      //  et l'ajouter dans la liste listeL
      dataJSON.forEach((l) =>
        listeL.push(new Livre(l.id, l.titre, l.qtestock, l.prix))
      );
    })
    .catch((error) => console.log(error));
}

onMounted(() => {
  getTodos();
});

function handlerDelete(id) {
  console.log(id);
  const fetchOptions = {
    method: "DELETE",
  };
  // -- l'id du livre à supprimer doit être
  //  ajouté à la fin de l'url
  fetch(url + "/" + id, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getTodos();
    })
    .catch((error) => console.log(error));
}
function handlerAdd(titre, prix, qtestock) {
  console.log(titre);
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // --  le libelle du nouveau livre est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ titre: titre, qtestock: qtestock, prix: prix }),
  };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getTodos();
    })
    .catch((error) => console.log(error));
}
//function add et remove stock en version asynchrone

function getLivre(id) {
  return new Promise((result, reject) => {
    fetch(url + "/" + id, { method: "get" })
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        if (body["status"] === 0) return reject("Aucun Livre"); //vérifie que le livre existe
        return result(body);
      })
      .catch(reject);
  });
}
function editLivre(body) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // --  le libelle du nouveau livre est envoyé au serveur
  //  via le body de la req AJAX
  fetch(url, {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getTodos();
    })
    .catch((error) => console.log(error));
}

async function handlerIncrement(id) {
  console.log(id);

  let book = await getLivre(id); //await : attend le résultat de Promise de getLivre()
  book.qtestock++;
  editLivre(book);
}

async function handlerDecrement(id) {
  console.log(id);

  let book = await getLivre(id); //await : attend le résultat de Promise de getLivre()
  book.qtestock--;
  if (book.qtestock === 0) {
    handlerDelete(id);
  } else {
    editLivre(book);
  }
}
/*//fonctions add et remove stock en fonction synchrone

function editLivre(body) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // --  le libelle du nouveau livre est envoyé au serveur
  //  via le body de la req AJAX
  fetch(url, {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getTodos();
    })
    .catch((error) => console.log(error));
}

function handlerIncrement(id) {
  console.log(id);

  fetch(url + "/" + id, { method: "get" })
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      if (body["status"] === 0) return console.error("Aucun Livre");
      body.qtestock++;
      editLivre(body);
    })
    .catch(console.error);
}

function handlerDecrement(id) {
  console.log(id);

  fetch(url + "/" + id, { method: "get" })
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      if (body["status"] === 0) return console.error("Aucun Livre");
      body.qtestock--;
      if (body.qtestock === 0) {
        handlerDelete(id);
      } else {
        editLivre(body);
      }
    })
    .catch(console.error);
}*/

//fonction recherche
function handlerSearch(titre) {
  fetch(url + "?search=" + titre, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .then((livres) => {
      [
        ...//concaténation d'object à array
        document.getElementById("livres").children, //obtient un object ressemblant à une array mais sans les méthodes d'array
      ].forEach(
        (child) => child.remove() //on retire tous les éléments enfants de l'élément avec id livre (ne pas mettre de ";" ici, on n'est pas entre crochets)
      );
      //on obtient la liste des livres
      console.log(livres);
      //pour chaque livre
      for (let l of livres) {
        // crée un <li> vierge
        const li = document.createElement("li");
        //change le texte (pas l'html, qui peut permettre un injection HTML) du <li>
        li.innerText = l.titre;
        //on donne le <li> à #livres
        document.getElementById("livres").appendChild(li);
      }
    })
    .catch(console.error);
}
</script>

<template>
  <h3>Rechercher un livre</h3>
  <ToDoSearch @searchC="handlerSearch" />
  <ul id="livres"></ul>
  <h3>Liste des livres</h3>
  <table>
    <!--tableau des livres-->
    <tr>
      <!--entête du tableau (pour ça qu'ici on utilise des th et pas des td, contrairement à ToDoListItem)-->
      <th>Id</th>
      <th>Nom</th>
      <th>Prix</th>
      <th>Quantité</th>
      <th colspan="3">Actions</th>
    </tr>
    <!--contenu du tableau-->
    <ToDoListItem
      v-for="livre of listeL"
      :key="livre.id"
      :livre="livre"
      @deleteC="handlerDelete"
      @incrementC="handlerIncrement"
      @decrementC="handlerDecrement"
    />
  </table>
  <h3>Ajout d'un livre à la bibliothèque</h3>
  <ToDoForm @addC="handlerAdd" />
</template>

<style scoped>
h3 {
  font-family: "cursive", "Comic Sans MS";
  font-size: 1.2em;
  text-align: center;
  color: blue;
  border: 2px solid blue;
  padding: 7px;
}

ul {
  display: align-block;
  list-style-type: none; /*peut télécharger une image de puce*/
  text-align: center;
  color: blue;
  font-size: 1.3em;
}

table {
  margin: auto;
  text-align: center;
  /* coller les bordures des cases du tableau pour ne pas avoir d'espaces*/
  border-collapse: collapse;
}
</style>