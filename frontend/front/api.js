const API_URL = "http://localhost:3000"; // seu backend

async function buscarMusicas() {
    const resposta = await fetch(`${API_URL}/musicas`);
    const dados = await resposta.json();

    mostrarMusicas(dados);
}

function mostrarMusicas(musicas) {
    const container = document.getElementById("musicas");

    container.innerHTML = "";

    musicas.forEach(m => {
        container.innerHTML += `
            <div>
                <p>${m.nome}</p>
                <button onclick="tocar('${m.url}')">Play</button>
            </div>
        `;
    });
}

function tocar(url) {
    const audio = new Audio(url);
    audio.play();
}

buscarMusicas();