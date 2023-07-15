// Pour le slider : permet de passer d'une page à une autre 
let leftArrow = document.getElementById("left-arrow")
let rightArrow = document.getElementById("right-arrow")
let currentPromo = 1;
addBG()
let timer = 3000

// Change de pub toutes les 3s
setInterval(function() {
    if (currentPromo < 3) {
        deleteBG()
        document.getElementById("slider").style.backgroundImage=`url(images/promo${currentPromo + 1}.png)`
        currentPromo++
        addBG()
    }
    else {
        deleteBG()
        document.getElementById("slider").style.backgroundImage=`url(images/promo1.png)`
        currentPromo = 1
        addBG()
    }
}, timer)

// Change de pub grâce à la flèche gauche
leftArrow.addEventListener("click", () => {
    if (currentPromo > 1) {
        deleteBG()
        document.getElementById("slider").style.backgroundImage=`url(images/promo${currentPromo - 1}.png)`
        currentPromo--
        addBG()
        timer = 3000
    }
    else {
        deleteBG()
        document.getElementById("slider").style.backgroundImage=`url(images/promo3.png)`
        currentPromo = 3
        addBG()
        timer = 3000
    }
})

// Change de pub grâce à la flèche droite
rightArrow.addEventListener("click", () => {
    if (currentPromo < 3) {
        deleteBG()
        document.getElementById("slider").style.backgroundImage=`url(images/promo${currentPromo + 1}.png)`
        currentPromo++
        addBG()
        timer = 3000
    }
    else {
        deleteBG()
        document.getElementById("slider").style.backgroundImage=`url(images/promo1.png)`
        currentPromo = 1
        addBG()
        timer = 3000
    }
})

function addBG() {
    document.querySelector(`#dots :nth-child(${currentPromo})`).style.backgroundColor = ("rgb(214, 214, 214, .7)")
}

function deleteBG() {
    document.querySelector(`#dots :nth-child(${currentPromo})`).style.backgroundColor = "transparent"
}

// Changer le display quand on ajoute le 1er article TODO

const buySections = document.querySelectorAll(".buy-section")
// const buyButtons = document.querySelector(".first-buy")

buySections.forEach((buySection) => {
    buySection.querySelector(".first-buy").addEventListener("click", () => {
        console.log("oui")
        buySection.querySelector(".first-buy").style.display = "none"
        buySection.querySelector(".quantity").style.display = "flex"
    }) 
})

// Pour le compteur d'articles
const quantities = document.querySelectorAll(".buy-section")

let totalItems = parseInt(0);
let totalPrice = 0;
let itemPrice = 0;

quantities.forEach((quantity) => {
    let priceItems = 0
    let previousItems = 0
    let nbItems = quantity.querySelector(".nb-items").value

    
    
    // Ajoute 1 item quand on clique sur le bouton +
    let plusButton = quantity.querySelector(".plus")
    plusButton.addEventListener("click", function(event) {
        if (totalItems >= 15) {
            // Désactive tous les boutons + quand il y a 15 items
            quantities.querySelectorAll(".plus").disabled = true
        }
        // Récupère le prix de l'item
        itemPrice = quantity.querySelector(".price").innerHTML
        if (nbItems < 99) {
            nbItems++
            totalItems++
            quantity.querySelector(".nb-items").value = nbItems;
            totalPrice = totalPrice + parseFloat(itemPrice)
            document.querySelector("#total-price").innerHTML = Math.abs(totalPrice.toFixed(2))
            colorUpdate()
            priceItems = itemPrice * nbItems
            previousItems = nbItems
            if (totalItems >= 15) { 
                document.querySelector("#warning").style.display = "flex";
            }
        }
    })
    
    // Retire 1 item quand on clique sur le bouton -
    minusButton = quantity.querySelector(".minus")
    minusButton.addEventListener("click", () => {
        itemPrice = quantity.querySelector(".price").innerHTML
        if (nbItems > 0) {
            document.getElementById("warning").style.display = "none";
            quantity.querySelector(".plus").disabled = false
            nbItems--
            totalItems--
            quantity.querySelector(".nb-items").value = nbItems;
            totalPrice = totalPrice - parseFloat(itemPrice)
            document.querySelector("#total-price").innerHTML = Math.abs(totalPrice.toFixed(2))
            colorUpdate()
            priceItems = itemPrice * nbItems
            previousItems = nbItems
        }
    })
    
    // Change le nombre d'items en tapant manuellement
    let inputField = quantity.querySelector(".nb-items")
    inputField.addEventListener("keydown", function(event) {

        // si la touche rentrée est e ou -, empêcher son affichage
        if (event.key == "e" || event.key == "-") {
            event.preventDefault();
        }

        // si .... event.key typeof = chiffre
        if (quantity.querySelector(".nb-items").value.length >= 2 && event.key != "Backspace") {
            event.preventDefault();
        }
    })

    // ne prend en compte le nombre rentré par l'utilisateur que lorsqu'il clique ailleurs
    inputField.addEventListener("focusout", function(event) {
        if (quantity.querySelector(".nb-items").value > 15 || quantity.querySelector(".nb-items").value == "") {
            quantity.querySelector(".nb-items").value = 0
            quantity.querySelector(".nb-items").innerHTML = "0"
            quantities.querySelectorAll(".minus").disabled = false
        }
        else {
            nbItems = parseInt(quantity.querySelector(".nb-items").value)
            totalItems = totalItems + nbItems - previousItems
            itemPrice = parseFloat(quantity.querySelector(".price").innerHTML)
            totalPrice = totalPrice + itemPrice * nbItems - priceItems
            document.querySelector("#total-price").innerHTML = Math.abs(totalPrice.toFixed(2))
            priceItems = itemPrice * nbItems
            previousItems = nbItems
            colorUpdate()
            if (totalItems >= 15) {
                document.querySelector("#warning").style.display = "flex";
            }
            else {
                document.querySelector("#warning").style.display = "none";
            }
        }

    })    
})

// Barre de recherche
const articles = document.querySelectorAll(".article")
let displayedArticles = articles.length
document.querySelector("#nb-items-displayed").innerHTML = displayedArticles

let recherche = document.querySelector(".recherche input")
let lettresTapees = []
let rechercheEnCours

// Enregistre ce que l'utilisateur tape dans la barre de recherche
recherche.addEventListener("keydown", function(e) {
    // Supprime le dernier caractère
    if (e.key === "Backspace") {
        lettresTapees.splice(-1)
        rechercheEnCours = lettresTapees.join('').toLowerCase()
    }
    // Ajoute la dernière lettre à l'array
    else {
        lettresTapees.push(e.key)
        rechercheEnCours = lettresTapees.join('').toLowerCase()
    }
    // Vérifie si le contenu de la barre de recherche match avec un nom d'article
    let test = 0
    let testDeux = 0
    articles.forEach((article) => {
        let nomArticle = article.querySelector(".title-article").innerHTML.toLowerCase()
        if (!nomArticle.includes(rechercheEnCours)) {
            article.style.display = "none"
            testDeux++
            if (articles.length - testDeux == 1) {
                document.querySelector("#plural").style.display = "none"
            }
        }
        if (nomArticle.includes(rechercheEnCours)) {
            article.style.display = "flex"
            test++
            displayedArticles = test
            document.querySelector("#nb-items-displayed").innerHTML = displayedArticles
        }
    })
    if (test > 1) {
        document.querySelector("#plural").style.display = "inline"
    }
})

// Change la couleur du prix selon sa valeur
function colorUpdate() {
    if (totalPrice <= 50) {
        document.getElementById("total").style.color = "green";
    }
    else if (totalPrice <= 75) {
        document.getElementById("total").style.color = "orange";
    }
    else {
        document.getElementById("total").style.color = "red";
    }
}

colorUpdate()
