// Controle de navegação entre telas
function irPara(telaId) {
    document.querySelectorAll(".tela").forEach(tela => tela.classList.add("hidden"));
    document.getElementById(telaId).classList.remove("hidden");

    if (telaId === "tela3") atualizarLista();
    if (telaId === "tela4") atualizarDisponiveis();
    if (telaId === "tela5") atualizarResumo();
}

// Dados
let doacoes = JSON.parse(localStorage.getItem("doacoes")) || [];

// Salvar doações no localStorage
function salvarDoacoes() {
    localStorage.setItem("doacoes", JSON.stringify(doacoes));
}

// Função cadastrar alimentos
function cadastrarDoacao() {
    const nome = document.getElementById("nome").value;
    const alimento = document.getElementById("alimento").value;
    const quantidade = document.getElementById("quantidade").value;
    const data = document.getElementById("data").value;

    if (!nome || !alimento || !quantidade || !data) {
        mostrarMensagem("❌ Preencha todos os campos.");
        return;
    }

    const doacao = {
        doador: nome,
        alimento,
        quantidade,
        data: new Date(data).toLocaleDateString()
    };

    doacoes.push(doacao);
    salvarDoacoes();
    mostrarMensagem("✅ Doação cadastrada!");
    limparCampos();
}

// Atualizar lista para revisão
function atualizarLista() {
    const lista = document.getElementById("listaDoacoes");
    lista.innerHTML = "";

    if (doacoes.length === 0) {
        lista.innerHTML = "<li>Nenhuma doação cadastrada.</li>";
        return;
    }

    doacoes.forEach((d, i) => {
        const li = document.createElement("li");
        li.textContent = `${i + 1}. ${d.alimento} - ${d.quantidade} | Doador: ${d.doador} | Data: ${d.data}`;
        lista.appendChild(li);
    });
}

// Atualizar lista de doações disponíveis
function atualizarDisponiveis() {
    const lista = document.getElementById("listaDisponiveis");
    lista.innerHTML = "";

    if (doacoes.length === 0) {
        lista.innerHTML = "<li>Nenhuma doação disponível.</li>";
        return;
    }

    doacoes.forEach((d, i) => {
        const li = document.createElement("li");
        li.textContent = `${i + 1}. ${d.alimento} - ${d.quantidade} | Doador: ${d.doador}`;
        lista.appendChild(li);
    });
}

// Solicitar doação
function solicitarDoacao() {
    const numero = parseInt(document.getElementById("numeroDoacao").value);

    if (isNaN(numero) || numero < 1 || numero > doacoes.length) {
        mostrarMensagem("❌ Número inválido.");
        return;
    }

    const doacao = doacoes.splice(numero - 1, 1)[0];
    salvarDoacoes();
    mostrarMensagem(`✅ Você solicitou: ${doacao.alimento} - ${doacao.quantidade}`);
    atualizarDisponiveis();
}

// Atualizar resumo final
function atualizarResumo() {
    const listaResumo = document.getElementById("listaResumo");
    listaResumo.innerHTML = "";

    if (doacoes.length === 0) {
        listaResumo.innerHTML = "<li>Nenhuma doação cadastrada.</li>";
        return;
    }

    doacoes.forEach((d, i) => {
        const li = document.createElement("li");
        li.textContent = `${i + 1}. ${d.alimento} - ${d.quantidade} | Doador: ${d.doador} | Data: ${d.data}`;
        listaResumo.appendChild(li);
    });
}

function mostrarMensagem(msg) {
    document.getElementById("mensagem").textContent = msg;
}

function limparCampos() {
    document.getElementById("nome").value = "";
    document.getElementById("alimento").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("data").value = "";
}

// Inicializa listas ao carregar
atualizarLista();
