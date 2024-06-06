//Récupération des travaux eventuellement stockées dans le localStorage
let travaux = window.localStorage.getItem('travaux');

if (travaux === null){
    // Récupération des travaux depuis l'API
    const reponse = await fetch('http://localhost:5678/api/works/');
    travaux = await reponse.json();
    // Transformation des pièces en JSON
    const travauxValeur = JSON.stringify(travaux);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("travaux", travauxValeur);
}else{
    travaux = JSON.parse(travaux);
}

function genererTravaux(travaux){
    for (let i = 0; i < travaux.length; i++) {
        const article = travaux[i];
        // Récupération de l'élément du DOM qui accueillera les travaux
        const sectionGallerie = document.querySelector(".gallery");
        // Création d’une balise dédiée à un travail
        const travauxElement = document.createElement("figure");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerText = article.title;
        // On rattache la balise figure a la section Gallerie
        sectionGallerie.appendChild(travauxElement);
        travauxElement.appendChild(imageElement);
        travauxElement.appendChild(nomElement);
    
     }
}

genererTravaux(travaux);



const boutonFiltrerTous = document.querySelector(".btn-filtrer-tous");

boutonFiltrerTous.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML = "";
    genererTravaux(travaux);
    const clearFilters = document.querySelectorAll(".filtre-actif")
    clearFilters.forEach(filter => {
        filter.classList.remove("filtre-actif")
    })
    boutonFiltrerTous.classList.add("filtre-actif")
});


const boutonFiltrerObjets = document.querySelector(".btn-filtrer-objets");

boutonFiltrerObjets.addEventListener("click", function () {
    const travauxFiltres = travaux.filter(function (travail) {
        return travail.categoryId == 1;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererTravaux(travauxFiltres);
    const clearFilters = document.querySelectorAll(".filtre-actif")
    clearFilters.forEach(filter => {
        filter.classList.remove("filtre-actif")
    })
    boutonFiltrerObjets.classList.add("filtre-actif")
});

const boutonFiltrerAppartements = document.querySelector(".btn-filtrer-appartements");

boutonFiltrerAppartements.addEventListener("click", function () {
    const travauxFiltres = travaux.filter(function (travail) {
        return travail.categoryId == 2;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererTravaux(travauxFiltres);
    const clearFilters = document.querySelectorAll(".filtre-actif")
    clearFilters.forEach(filter => {
        filter.classList.remove("filtre-actif")
    })
    boutonFiltrerAppartements.classList.add("filtre-actif")
});

const boutonFiltrerHotels = document.querySelector(".btn-filtrer-hotels");

boutonFiltrerHotels.addEventListener("click", function () {
    const travauxFiltres = travaux.filter(function (travail) {
        return travail.categoryId == 3;
    });
    document.querySelector(".gallery").innerHTML = "";
    genererTravaux(travauxFiltres);
    const clearFilters = document.querySelectorAll(".filtre-actif")
    clearFilters.forEach(filter => {
        filter.classList.remove("filtre-actif")
    })
    boutonFiltrerHotels.classList.add("filtre-actif")
});

// if (authentification === null){
//     console.log("No AuthToken in local storage")
// }else{
//     console.log("AuthToken present in local storage")
// }

let authentification = window.localStorage.getItem('authToken');

if (authentification != null){
    console.log("AuthToken present in local storage");

    document.getElementById("login").innerHTML = '<a href=index.html>logout</a>';
    const boutonLogOut = document.getElementById("login");
    boutonLogOut.addEventListener("click", function(){
        event.preventDefault();
        window.localStorage.removeItem("authToken");
        window.location.replace("index.html");
    });

    const modifierProjets = document.getElementById("projets");
    const boutonModifierProjets = document.createElement("button");
    // modifierProjets.appendChild(boutonModifierProjets)
    boutonModifierProjets.classList.add("bouton-modifier")
    boutonModifierProjets.setAttribute("type", "button")
    boutonModifierProjets.setAttribute("aria-haspopup", "dialog")
    boutonModifierProjets.setAttribute("aria-controls", "dialog")
    boutonModifierProjets.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier';
    modifierProjets.parentNode.insertBefore(boutonModifierProjets, modifierProjets.nextSibling)

    const modeEdition = document.querySelector("body");
    const bandeauModeEdition = document.createElement("div");
    bandeauModeEdition.classList.add("bandeau-edition");
    bandeauModeEdition.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> <p>Mode édition</p>';
    modeEdition.prepend(bandeauModeEdition);

    document.addEventListener("DOMContentLoaded", () => {
        const declencheurs = document.querySelectorAll('[aria-haspopup="dialog"]');
        const doc = document.querySelector(".js-document");

        const ouvrirModale = function (dialog){
            dialog.setAttribute("aria-hidden", false);
            doc.setAttribute("aria-hidden", true);
        };
        const fermerModale = function (dialog) {
            dialog.setAttribute('aria-hidden', true);
            doc.setAttribute('aria-hidden', false);
        };
        declencheurs.forEach((declencheur) => {
            const dialog = document.getElementById(declencheur.getAttribute("aria-controls"));
            const rejetDeclencheurs = dialog.querySelectorAll('[data-dismiss]');
            declencheur.addEventListener("click", function(){
                event.preventDefault();
                ouvrirModale(dialog);
            });

            rejetDeclencheurs.forEach((rejetDeclencheur) => {
                const rejetDialog = document.getElementById(rejetDeclencheur.dataset.dismiss);
                rejetDeclencheur.addEventListener("click", function(){
                    event.preventDefault();
                    fermerModale(rejetDialog);
                });
            });

            window.addEventListener("click", function() {
                if (event.target === dialog){
                    fermerModale(dialog)
                }
            });
        })    
    })

    function genererTravauxSuppression(travaux){
        for (let i = 0; i < travaux.length; i++) {
            const articleSuppression = travaux[i];
            // Récupération de l'élément du DOM qui accueillera les travaux
            const sectionSuppression = document.querySelector(".cadre-suppression");
            // Création d’une balise dédiée à un travail
            const travauxSuppression = document.createElement("figure");
            sectionSuppression.appendChild(travauxSuppression);
            // Création des balises 
            const imageSuppression = document.createElement("img");
            imageSuppression.src = articleSuppression.imageUrl;
            travauxSuppression.appendChild(imageSuppression);
            const boutonSuppression = document.createElement("i");
            boutonSuppression.classList.add("fa-solid", "fa-trash-can");
            const travauxSuppressionId = articleSuppression.id
            boutonSuppression.setAttribute("id", travauxSuppressionId)
            // On rattache la balise figure a la section Gallerie
            travauxSuppression.appendChild(boutonSuppression);
            const supprimerTravail = document.getElementById(articleSuppression.id)
            supprimerTravail.addEventListener("click", function(){
                console.log("deleting work ID " + articleSuppression.id )
                clicSupprimerTravail(articleSuppression.id);
            })
        }
    }
    
    function clicSupprimerTravail(id){
        console.log("deleting work ID " + id )
        fetch("http://localhost:5678/api/works/"+id, {
            method: "DELETE",
            headers: { "accept" : "application/json", "Authorization" : "Bearer " + authentification},
        })
        .then(response => {
            window.localStorage.removeItem("travaux");
            location.reload();
        })
    }

    genererTravauxSuppression(travaux);

    const boutonAjoutPhoto = document.querySelector(".bouton-ajout-photo")
    let click = 0
    boutonAjoutPhoto.addEventListener("click", function modale2(event){
        event.preventDefault();
        click++;
        const sectionSuppression = document.querySelector(".cadre-suppression");
        sectionSuppression.innerHTML="";
        boutonAjoutPhoto.innerHTML = "Valider";
        boutonAjoutPhoto.classList.add("bouton-ajout-photo-gris");
        boutonAjoutPhoto.classList.remove("bouton-ajout-photo");
        const titreModale = document.getElementById("titre-modale");
        titreModale.innerHTML = "Ajout photo";
        const contenuModale = document.querySelector(".contenu-modale");
        const cadreAjoutPhoto = document.createElement("div");
        cadreAjoutPhoto.classList.add("cadre-ajout-photo");
        contenuModale.appendChild(cadreAjoutPhoto);
        const imageAjoutPhoto = document.createElement("i");
        imageAjoutPhoto.classList.add("fa-regular", "fa-image");
        cadreAjoutPhoto.appendChild(imageAjoutPhoto);
        const browseAjoutPhoto = document.createElement("button");
        browseAjoutPhoto.textContent = "+ Ajouter photo";
        browseAjoutPhoto.addEventListener("click", function() {
            photoInput.click();
        })
        
        const photoInput = document.createElement("input");
        photoInput.type = "file";
        photoInput.accept = "image/jpeg,image/png";
        photoInput.id = "image-uploadee"
        photoInput.style.display = "none";
        cadreAjoutPhoto.appendChild(browseAjoutPhoto);
        cadreAjoutPhoto.appendChild(photoInput);
        const texteAjoutPhoto = document.createElement("p");
        texteAjoutPhoto.innerHTML = "jpg, png: 4mo max";
        cadreAjoutPhoto.appendChild(texteAjoutPhoto);

        const titreAjoutPhoto = document.createElement("h3");
        titreAjoutPhoto.textContent = "Titre"
        contenuModale.appendChild(titreAjoutPhoto)
        const champTitreAjoutPhoto = document.createElement("input")
        champTitreAjoutPhoto.type = "name"
        contenuModale.appendChild(champTitreAjoutPhoto)
        const categorieAjoutPhoto = document.createElement("h3");
        categorieAjoutPhoto.textContent = "Catégorie";
        contenuModale.appendChild(categorieAjoutPhoto);

        const listeCategories = document.createElement("select");
        const option1 = document.createElement("option");
        option1.value = "1";
        option1.textContent = "Objets";
        listeCategories.appendChild(option1);
        const option2 = document.createElement("option");
        option2.value = "2";
        option2.textContent = "Appartements";
        listeCategories.appendChild(option2);
        const option3 = document.createElement("option");
        option3.value = "3";
        option3.textContent = "Hôtels & restaurants";
        listeCategories.appendChild(option3);
        contenuModale.appendChild(listeCategories);
        var imageBinary = 0
        const imageUploadee = document.getElementById("image-uploadee")
        imageUploadee.onchange = function () {
            // console.log(this.files[0].size)
            if(this.files[0].size > 4194304){
                alert("Fichier trop volumineux");
                this.value = "";
            }else{
                const [imageUploadeePreview] = imageUploadee.files
                cadreAjoutPhoto.innerHTML="";
                const cadrePhotoUploadee = document.createElement("img");
                cadrePhotoUploadee.src = URL.createObjectURL(imageUploadeePreview);
                cadrePhotoUploadee.id = "image-uploadee";
                cadreAjoutPhoto.appendChild(cadrePhotoUploadee)
                boutonAjoutPhoto.classList.remove("bouton-ajout-photo-gris");
                boutonAjoutPhoto.classList.add("bouton-ajout-photo");
            }
        }
        if (click >=1) {
            // console.log(click)
            boutonAjoutPhoto.removeEventListener("click", modale2);
        }
        boutonAjoutPhoto.addEventListener("click", function uploadPictureToGallery(event){
            const formData = new FormData();
            formData.append('image', imageUploadee.files[0]);
            formData.append('title', champTitreAjoutPhoto.value);
            formData.append('category', listeCategories.value);
            fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: { "accept" : "application/json", "Authorization" : "Bearer " + authentification},
                body: formData
            })
            .then(response => {
                window.localStorage.removeItem("travaux");
                console.log("test")
                // location.reload();
                const cadrePhotoUploadee = URL.createObjectURL(imageUploadee.files[0])
                let laSourceDeLimage =
                        cadrePhotoUploadee;
                    let laFigcaption = champTitreAjoutPhoto.value;
                    let laGallery = document.querySelector("div.gallery");
                    laGallery.innerHTML += `
                        <figure>
                            <img src="${laSourceDeLimage}">
                            <figcaption>${laFigcaption}</figcaption>
                        </figure>
                    `;
            })

        })
    })

}else{
    console.log("No AuthToken in local storage")
}