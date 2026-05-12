function entrar() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (email && senha) {
        // depois você troca isso pelo backend real
        localStorage.setItem("logado", "true");

        window.location.href = "home.html";
    } else {
        alert("Preencha tudo!");
    }
}