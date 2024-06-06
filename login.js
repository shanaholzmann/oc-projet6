const formulaireConnexion = document.getElementById("formulaire-connexion");
const boutonConnexion = document.getElementById("btn-connexion");
const erreurConnexion = document.getElementById("erreur-connexion");

boutonConnexion.addEventListener("click", function () {
    event.preventDefault();
    const email = formulaireConnexion.email.value;
    const password = formulaireConnexion.password.value;
    const login = {
        email,
        password
    };
    const loginRequest = JSON.stringify(login);
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: loginRequest
    })
    .then((response) => response.json())
    // console.log(data)
    .then((data) =>{
        const authToken = data.token
        console.log(data)
        if (data.userId != 1) {
            erreurConnexion.style.opacity = 1;
        } else {
            window.localStorage.setItem("authToken", authToken);
            console.log(authToken)
            window.location.replace("index.html");
        }
    })
});