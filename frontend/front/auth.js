function registrar() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    if (!nome || !email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    // Simulação de cadastro (depois vira API)
    const usuario = {
        nome,
        email,
        senha
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    alert("Conta criada com sucesso!");

    window.location.href = "login.html";
}