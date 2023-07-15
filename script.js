const produits = document.querySelectorAll('.container .card-content .produit');

let totalProduits = 0;
let prixTotal = 0;


// Pour tous les produits on applique une fonction
produits.forEach((produit) => {
  const nombreProduits = produit.querySelector('.infos-prix .nombre-produit input');
  const prixProduit = parseFloat(produit.querySelector('.infos-prix .prix').innerText);

  //Click sur la poubelle pour supprimer le produit
  //On met à jour les nombre de produits / Sous-Total de l'article / Prix total 
  const poubelle = produit.querySelector('.infos-prix .fa-trash-can');
  poubelle.addEventListener('click', () => {
    const quantiteProduit = parseInt(nombreProduits.value);
    totalProduits -= quantiteProduit;
  
    nombreTotalProduitInitial.innerHTML = totalProduits;

    prixTotal -= prixProduit * quantiteProduit;
    prixTotalInitial.innerHTML = Math.abs(prixTotal).toFixed(2) + '€';

    produit.style.display = 'none';
    colorUpdate();
  });
});

const prixTotalInitial = document.querySelector('.container .cout-panier .total-prix h4');
prixTotalInitial.innerHTML = prixTotal.toFixed(2) + '€';

const nombreTotalProduitInitial = document.querySelector('.container .cout-panier .total-produit h4');
nombreTotalProduitInitial.innerHTML = totalProduits;

produits.forEach((produit) => {
  const plus = produit.querySelector('.infos-prix .nombre-produit .fa-circle-plus');
  const moins = produit.querySelector('.infos-prix .nombre-produit .fa-circle-minus');
  const nombreProduits = produit.querySelector('.infos-prix .nombre-produit input');
  const prixProduit = produit.querySelector('.infos-prix .prix');

  const prixUnitaire = parseFloat(prixProduit.innerText);

  //Click sur le plus pour ajouter un produit
  //On met à jour les nombre de produits / Sous-Total de l'article / Prix total 
  plus.addEventListener('click', () => {
    const nombreActuel = parseInt(nombreProduits.value);
    nombreProduits.value = nombreActuel + 1;

    const nouveauPrix = (nombreActuel + 1) * prixUnitaire;
    prixProduit.innerText = nouveauPrix.toFixed(2) + '€';

    totalProduits += 1;
    nombreTotalProduitInitial.innerHTML = totalProduits;

    prixTotal += prixUnitaire;
    prixTotalInitial.innerHTML = Math.abs(prixTotal).toFixed(2) + '€';

    colorUpdate();
  });

  //Click sur le moins pour supprimer un produit
  //On met à jour les nombre de produits / Sous-Total de l'article / Prix total 
  moins.addEventListener('click', () => {
    const nombreActuel = parseInt(nombreProduits.value);
    if (nombreActuel > 0) {
      nombreProduits.value = nombreActuel - 1;

      const nouveauPrix = (nombreActuel - 1) * prixUnitaire;
      prixProduit.innerText = nouveauPrix.toFixed(2) + '€';

      totalProduits -= 1;
      nombreTotalProduitInitial.innerHTML = totalProduits;

      prixTotal -= prixUnitaire;
      prixTotalInitial.innerHTML = Math.abs(prixTotal).toFixed(2) + '€';

      colorUpdate();
    }
  });



  // Mise en place de l'input pour modifier les valeurs manuellement lorsqu'il perd le focus
  let priceItems = 0;
  let nombreItems = 0;

  nombreProduits.addEventListener('focusout', (event) => {

      const nombreActuel = parseInt(nombreProduits.value);

      const nouveauPrix =  (nombreActuel * prixUnitaire);
      prixProduit.innerText = nouveauPrix.toFixed(2) + '€';

      totalProduits += nombreActuel - nombreItems;
      nombreTotalProduitInitial.innerHTML = totalProduits;

      prixTotal += nouveauPrix - priceItems;
      prixTotalInitial.innerHTML = Math.abs(prixTotal).toFixed(2) + '€';

      priceItems = nombreActuel * prixUnitaire;
      nombreItems = nombreActuel


      colorUpdate();
      
  })

});

//Click sur le bouton Vider le panier pour supprimer tout le panier
//On met à jour les nombre de produits / Sous-Total de l'article / Prix total 
const toutSupprimer = document.querySelector('.supprimer');
toutSupprimer.addEventListener('click', () => {
  produits.forEach((produit) => {
    produit.style.display = 'none';
  });

  totalProduits = 0;
  nombreTotalProduitInitial.innerHTML = totalProduits;

  prixTotal = 0;
  prixTotalInitial.innerHTML = Math.abs(prixTotal).toFixed(2) + '€';

  colorUpdate();
});

colorUpdate();


// Update la couleur du prix en fonction de la valeur du prix 
function colorUpdate() {
  if (Math.abs(prixTotal).toFixed(2) === '0.00') {
    prixTotalInitial.style.color = 'green';
  } else if (prixTotal > 0 && prixTotal <= 50) {
    prixTotalInitial.style.color = 'green';
  } else if (prixTotal > 50 && prixTotal <= 75) {
    prixTotalInitial.style.color = 'orange';
  } else {
    prixTotalInitial.style.color = 'red';
  }
}




//Déclaration du panier complet

// panier = [
//   {
//     nom : 'Cerise',
//     imgSource : 'images/abricot.png',
//     prix : '1€',
//   },
//   {
//     nom : 'Pomme',
//     imgSource : 'images/abricot.png',
//     prix : '1€',
//   },
//   {
//     nom : 'Banane',
//     imgSource : 'images/abricot.png',
//     prix :'1€',
//   },
//   {
//     nom : 'Poire',
//     imgSource : 'images/abricot.png',
//     prix :'1€',
//   },
//   {
//     nom : 'Abricot',
//     imgSource : 'images/abricot.png',
//     prix : '1€',
//   },
//   {
//     nom : 'Orange',
//     imgSource : 'images/abricot.png',
//     prix : '1€',
//   }
  

// ]




// Création des produits si la valeur "value" dans le tableau panier est > 0
// panier.forEach((produit) => {
//   let elementParent = document.querySelector('.card-content');

//   let divProduit = document.createElement('div');
//   divProduit.classList.add('produit');

//   let divInfosProduit = document.createElement('div');
//   divInfosProduit.classList.add('infos-produit');

//   let imgProduit = document.createElement('img');
//   imgProduit.src = produit.imgSource;
//   imgProduit.alt = '';

//   let nomProduit = document.createElement('p');
//   nomProduit.textContent = produit.nom
  
//   let divInfosPrix = document.createElement('div')
//   divInfosPrix.classList.add('infos-prix');

//   let divNombreProduit = document.createElement('div');
//   divNombreProduit.classList.add('nombre-produit');

//   let iconePlus = document.createElement('i');
//   iconePlus.classList.add('fa-solid', 'fa-circle-plus');

//   let iconeMoins = document.createElement('i');
//   iconeMoins.classList.add('fa-solid', 'fa-circle-minus');

//   let inputNombre = document.createElement('input');
//   inputNombre.value = produit.value;
//   inputNombre.type = 'text';

//   let coutProduit = document.createElement('p');
//   coutProduit.classList.add('prix');
//   coutProduit.textContent = produit.prix

//   let iconePoubelle = document.createElement('i');
//   iconePoubelle.classList.add('fa-solid', 'fa-trash-can');

//   //On ajoute les éléments enfants aux éléments parents 

// if (produit.value > 0) {
//   divNombreProduit.appendChild(iconeMoins);
//   divNombreProduit.appendChild(inputNombre);
//   divNombreProduit.appendChild(iconePlus);

//   divInfosPrix.appendChild(divNombreProduit);
//   divInfosPrix.appendChild(coutProduit);
//   divInfosPrix.appendChild(iconePoubelle);

//   divInfosProduit.appendChild(imgProduit);
//   divInfosProduit.appendChild(nomProduit);

//   divProduit.appendChild(divInfosProduit);
//   divProduit.appendChild(divInfosPrix);


//   On ajoute l'élément produit à notre carte
//   elementParent.append(divProduit);
//}

// })