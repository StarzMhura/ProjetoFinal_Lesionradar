// QUESTIONÁRIO — salva as respostas e envia para a página da ficha

const formulario = document.getElementById("formEsportivo");

// Mostra ou esconde o campo "região afetada".
const campoLesao = document.getElementById("campo-local-lesao");

function atualizaCampoLesao() {
    const temLesao = document.querySelector(
        'input[name="lesao"]:checked'
    );

    const mostrarCampo = temLesao && temLesao.value === "sim";

    campoLesao.classList.toggle("is-hidden", !mostrarCampo);

    // O campo só é obrigatório se a pessoa informar que teve lesão.
    const localLesao = document.getElementById("local-lesao");
    localLesao.required = Boolean(mostrarCampo);
}

document.querySelectorAll('input[name="lesao"]').forEach((radio) => {
    radio.addEventListener("change", atualizaCampoLesao);
});

atualizaCampoLesao();

// Envio do formulário.
formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    // Recupera o valor de uma opção selecionada.
    const marcado = (nome) => {
        const selecionado = document.querySelector(
            `input[name="${nome}"]:checked`
        );

        return selecionado ? selecionado.value : "";
    };

    // Organiza as respostas.
    const dados = {
        nome: document.getElementById("nome").value.trim(),

        idade: document.getElementById("idade").value,

        peso: document.getElementById("peso").value,

        altura: document.getElementById("altura").value,

        esporte: document.getElementById("esporte").value.trim(),

        frequencia: document.getElementById("frequencia").value,

        objetivo: document.getElementById("objetivo").value,

        experiencia: marcado("experiencia"),

        orientacao: marcado("orientacao"),

        lesao: marcado("lesao"),

        localLesao: document.getElementById("local-lesao").value.trim(),

        medidas: {
            cintura: document.getElementById("medida-cintura").value,

            peito: document.getElementById("medida-peito").value,

            braco: document.getElementById("medida-braco").value,

            coxa: document.getElementById("medida-coxa").value,

            quadril: document.getElementById("medida-quadril").value
        }
    };

    // Salva as respostas para que a página da ficha possa recuperá-las.
    localStorage.setItem(
        "fichaLesioRadar",
        JSON.stringify(dados)
    );

    // Abre a página da ficha.
    window.location.href = "ficha.html";
});