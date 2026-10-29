// TEMA DIA / NOITE — usado em todas as páginas
// A classe é aplicada na hora (antes da página aparecer) para não piscar.
(function () {
    var raiz = document.documentElement;
    try {
        if (localStorage.getItem("tema") === "light") raiz.classList.add("light_mode");
    } catch (e) {}

    document.addEventListener("DOMContentLoaded", function () {
        var botao = document.getElementById("toggleTema");
        if (!botao) return;

        botao.addEventListener("click", function () {
            var claro = raiz.classList.toggle("light_mode");
            try { localStorage.setItem("tema", claro ? "light" : "dark"); } catch (e) {}
        });
    });
})();
