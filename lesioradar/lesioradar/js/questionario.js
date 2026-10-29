// Questionário
const formulario = document.getElementById("formEsportivo");

// Mostra/esconde o campo "região afetada" conforme a resposta sobre lesão
const campoLesao = document.getElementById("campo-local-lesao");
function atualizaCampoLesao() {
    const temLesao = document.querySelector('input[name="lesao"]:checked');
    campoLesao.classList.toggle("is-hidden", !temLesao || temLesao.value !== "sim");
}
document.querySelectorAll('input[name="lesao"]').forEach(r => r.addEventListener("change", atualizaCampoLesao));
atualizaCampoLesao();

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const marcado = nome => (document.querySelector(`input[name="${nome}"]:checked`) || {}).value;

    const dados = {
        nome:        document.getElementById("nome").value.trim(),
        idade:       document.getElementById("idade").value,
        peso:        document.getElementById("peso").value,
        altura:      document.getElementById("altura").value,
        esporte:     document.getElementById("esporte").value.trim(),
        frequencia:  document.getElementById("frequencia").value,
        objetivo:    document.getElementById("objetivo").value,
        experiencia: marcado("experiencia") || "iniciante",
        orientacao:  marcado("orientacao") || "nao",
        lesao:       marcado("lesao") || "nao",
        localLesao:  document.getElementById("local-lesao").value.trim()
    };

    // A ficha fica salva — assim a aba "Suas fichas" funciona a qualquer hora
    localStorage.setItem("fichaLesioRadar", JSON.stringify(dados));
    window.location.href = "ficha.html";
});
