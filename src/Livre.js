// un livre
export default class Livre {
  constructor(id, titre, qtestock, prix) {
    this._id = id;
    this._titre = titre;
    this._qtestock = qtestock;
    this._prix = prix;
  }
  get titre() {
    return this._titre;
  }
  get id() {
    return this._id;
  }
  get prix() {
    return this._prix;
  }

  get qtestock() {
    return this._qtestock;
  }

  // modifier le titre
  set titre(titre) {
    this._titre = titre;
  }

  set prix(prix) {
    this._prix = prix;
  }

  set qtestock(qtestock) {
    this._qtestock = qtestock;
  }

  pourAfficher() {
    return `id : ${this._id} | Titre: ${this._titre} | Prix : ${this._prix} | Quantité stock :${this._qtestock}`;
  }
}
