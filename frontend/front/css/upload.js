function voltarHome() {
    window.location.href = "home.html";
}

function upload() {
    const nome = document.getElementById("nome").value;
    const artista = document.getElementById("artista").value;
    const arquivo = document.getElementById("arquivo").files[0];
    const status = document.getElementById("status");

    if (!nome || !artista || !arquivo) {
        status.innerText = "Preencha todos os campos!";
        return;
    }

    // 🔥 SIMULAÇÃO (depois vira API real)
    const musica = {
        nome,
        artista,
        arquivo: arquivo.name
    };

    let musicas = JSON.parse(localStorage.getItem("musicas")) || [];
    musicas.push(musica);

    localStorage.setItem("musicas", JSON.stringify(musicas));

    status.innerText = "Música enviada com sucesso! 🎉";

    // limpa campos
    document.getElementById("nome").value = "";
    document.getElementById("artista").value = "";
    document.getElementById("arquivo").value = "";
}