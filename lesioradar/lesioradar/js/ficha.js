// Pagina da ficha
const container = document.getElementById("container_ficha");

// ---------- Exercícios ----------
const exercicios = {
    peito:      ["Supino reto", "Supino inclinado", "Cruxifixo", "Flexão de braço", "Cross over"],
    costas:     ["Puxada frontal", "Remada curvada", "Remada unilateral", "Pulldown", "Levantamento terra"],
    ombro:      ["Desenvolvimento com halteres", "Elevação lateral", "Elevação frontal", "Desenvolvimento Arnold"],
    trapezio:   ["Encolhimento com halteres", "Remada alta", "Encolhimento na barra"],
    biceps:     ["Rosca direta", "Rosca alternada", "Rosca martelo", "Rosca concentrada", "Rosca Scott"],
    triceps:    ["Tríceps corda", "Tríceps testa", "Tríceps francês", "Mergulho no banco", "Extensão unilateral"],
    pernas:     ["Agachamento", "Leg press", "Cadeira extensora", "Cadeira flexora", "Stiff", "Panturrilha em pé"],
    gluteos:    ["Agachamento sumô", "Hip thrust", "Passada", "Abdução no cabo", "Elevação pélvica"],
    abdomen:    ["Prancha", "Abdominal crunch", "Abdominal bicicleta", "Elevação de pernas", "Russian twist"],
    cardio:     ["Esteira 20 min", "Bike 20 min", "Pular corda 15 min", "Polichinelo 3x30", "Corrida leve 25 min"],
    corpotodo:  ["Burpee", "Agachamento com salto", "Mountain climber", "Flexão com palma", "Kettlebell swing"],
    mobilidade: ["Alongamento de quadril", "Rotação de ombros", "Gato-vaca", "Agachamento profundo isométrico", "Alongamento de posterior", "Mobilidade de tornozelo"]
};

const nomeGrupo = {
    peito: "peito", costas: "costas", ombro: "ombros", trapezio: "trapézio", biceps: "bíceps", triceps: "tríceps",
    pernas: "pernas", gluteos: "glúteos", abdomen: "abdômen", cardio: "cardio", corpotodo: "corpo todo", mobilidade: "mobilidade"
};

const gruposPorObjetivo = {
    hipertrofia:     [["peito","triceps","ombro"], ["costas","biceps"], ["pernas","gluteos"], ["peito","costas"], ["ombro","triceps","biceps"], ["pernas","gluteos"], ["abdomen","cardio"]],
    emagrecer:       [["corpotodo","cardio"], ["pernas","gluteos","cardio"], ["peito","costas","cardio"], ["corpotodo","abdomen"], ["pernas","cardio"], ["peito","costas","ombro"], ["cardio","abdomen"]],
    condicionamento: [["peito","triceps"], ["costas","biceps"], ["pernas","abdomen"], ["mobilidade","cardio"], ["corpotodo","cardio"], ["pernas","gluteos"], ["cardio","abdomen"]],
    forca:           [["peito","triceps"], ["costas","biceps"], ["pernas","gluteos"], ["ombro","trapezio"], ["peito","costas"], ["pernas"], ["abdomen","cardio"]],
    saude:           [["corpotodo","cardio"], ["pernas","abdomen"], ["peito","costas"], ["cardio","abdomen"], ["pernas","gluteos"], ["ombro","biceps","triceps"], ["cardio"]],
    flexibilidade:   [["mobilidade","cardio"], ["pernas","gluteos"], ["mobilidade"], ["abdomen","mobilidade"], ["pernas"], ["corpotodo","mobilidade"], ["mobilidade"]]
};

const seriesReps = {
    hipertrofia:     { series: 4, reps: "8–12",  descanso: "60–90 s",  duracao: "60–75 min" },
    emagrecer:       { series: 3, reps: "15–20", descanso: "30–45 s",  duracao: "45–60 min" },
    condicionamento: { series: 3, reps: "12–15", descanso: "45–60 s",  duracao: "45–60 min" },
    forca:           { series: 5, reps: "4–6",   descanso: "2–3 min",  duracao: "60–80 min" },
    saude:           { series: 3, reps: "12–15", descanso: "60 s",     duracao: "40–55 min" },
    flexibilidade:   { series: 2, reps: "15",    descanso: "30 s",     duracao: "30–45 min" }
};

const nomeObjetivo = {
    hipertrofia: "Hipertrofia", emagrecer: "Emagrecimento", condicionamento: "Condicionamento",
    forca: "Força", saude: "Saúde e bem-estar", flexibilidade: "Flexibilidade"
};

const diaCurto = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"];
const diaLongo = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

// Palavras da lesão
const regrasLesao = [
    { palavras: ["joelho", "perna", "coxa", "tornozelo", "panturrilha", "pe "], evitar: ["pernas", "gluteos"] },
    { palavras: ["quadril", "gluteo", "virilha"],          evitar: ["gluteos", "pernas"] },
    { palavras: ["ombro", "clavicula"],                    evitar: ["ombro", "trapezio", "peito"] },
    { palavras: ["costas", "lombar", "coluna", "cervical"], evitar: ["costas", "trapezio"] },
    { palavras: ["punho", "braco", "cotovelo", "mao"],     evitar: ["biceps", "triceps"] },
    { palavras: ["peito", "peitoral"],                     evitar: ["peito"] },
    { palavras: ["abdomen", "barriga", "hernia"],          evitar: ["abdomen"] }
];

// ---------- Auxiliares ----------
const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const semAcento = t => String(t || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + " ";
const cap = t => t.charAt(0).toUpperCase() + t.slice(1);

function listaGrupos(grupos) {
    const nomes = grupos.map(g => nomeGrupo[g] || g);
    const texto = nomes.length > 1 ? nomes.slice(0, -1).join(", ") + " e " + nomes[nomes.length - 1] : nomes[0];
    return cap(texto);
}

function prescricao(grupo, config) {
    if (grupo === "cardio")     return { series: "1", reps: "—", descanso: "—" };
    if (grupo === "mobilidade") return { series: "2", reps: "30 s", descanso: "20 s" };
    return config;
}

const iconesStat = {
    cal:    '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/></svg>',
    alvo:   '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/></svg>',
    relogio:'<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    timer:  '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4l2 1.5M9.5 2.5h5M12 2.5v3.5"/></svg>'
};

const iconeUsuario = '<svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="8" r="4.2"/><path d="M4 21c0-4.4 3.6-7.2 8-7.2s8 2.8 8 7.2z"/></svg>';

// ---------- Monta a ficha ----------
function montarDias(dados, config) {
    const objetivo = gruposPorObjetivo[dados.objetivo] ? dados.objetivo : "saude";
    const frequencia = Math.min(Math.max(parseInt(dados.frequencia) || 3, 1), 7);

    const texto = semAcento(dados.localLesao);
    const evitar = new Set();
    if (dados.lesao === "sim") {
        regrasLesao.forEach(r => { if (r.palavras.some(p => texto.includes(p))) r.evitar.forEach(g => evitar.add(g)); });
    }

    const dias = [];
    for (let i = 0; i < frequencia; i++) {
        let grupos = gruposPorObjetivo[objetivo][i].filter(g => !evitar.has(g));
        if (grupos.length === 0) grupos = ["mobilidade"];   // dia inteiro bloqueado -> mobilidade

        const porGrupo = Math.max(2, Math.floor(6 / grupos.length));
        const lista = [];
        grupos.forEach(g => exercicios[g].slice(0, porGrupo).forEach(nome => lista.push({ nome, grupo: g })));

        dias.push({ grupos, exercicios: lista.slice(0, 6) });
    }
    return { dias, evitar };
}

function gerarFicha(dados) {
    const objetivo = nomeObjetivo[dados.objetivo] ? dados.objetivo : "saude";
    const base = seriesReps[objetivo];
    // iniciantes fazem uma série a menos
    const config = { ...base, series: dados.experiencia === "iniciante" ? Math.max(2, base.series - 1) : base.series };

    const { dias } = montarDias(dados, config);

    // chips: idade + esportes separados por vírgula / " e "
    const esportes = String(dados.esporte || "").split(/,|;|\se\s/i).map(s => s.trim()).filter(Boolean).slice(0, 4);
    const chips = [dados.idade ? `${esc(dados.idade)} anos` : "", ...esportes.map(cap).map(esc)].filter(Boolean)
        .map(c => `<span>${c}</span>`).join("");

    const abas = dias.map((d, i) => `
        <button class="ficha_aba${i === 0 ? " ativa" : ""}" type="button" role="tab" data-dia="${i}" aria-selected="${i === 0}">
            <b>${diaCurto[i]}</b> · ${esc(listaGrupos(d.grupos))}
        </button>`).join("");

    const paineis = dias.map((d, i) => {
        const linhas = d.exercicios.map((ex, idx) => {
            const p = prescricao(ex.grupo, config);
            return `
            <tr>
                <td><span class="ficha_num">${idx + 1}</span></td>
                <td><strong>${esc(ex.nome)}</strong><small>${esc(cap(nomeGrupo[ex.grupo]))}</small></td>
                <td>${p.series}</td><td>${p.reps}</td><td>${p.descanso}</td>
            </tr>`;
        }).join("");

        return `
        <article class="ficha_dia" data-painel="${i}" role="tabpanel" ${i === 0 ? "" : "hidden"}>
            <div class="ficha_dia_topo">
                <span class="ficha_badge">DIA ${i + 1}</span>
                <div>
                    <h3>${diaLongo[i]} — ${esc(listaGrupos(d.grupos))}</h3>
                    <small>${d.exercicios.length} exercícios</small>
                </div>
                <span class="ficha_linha"></span>
                <img src="img/treino.png" alt="" aria-hidden="true">
            </div>
            <div class="ficha_tabela_wrap">
                <table class="ficha_tabela">
                    <thead><tr><th>#</th><th>Exercício</th><th>Séries</th><th>Repetições</th><th>Descanso</th></tr></thead>
                    <tbody>${linhas}</tbody>
                </table>
            </div>
        </article>`;
    }).join("");

    const aviso = dados.lesao === "sim" ? `
        <div class="ficha_aviso">
            ⚠️ <strong>Atenção:</strong> você informou lesão/dor em <strong>${esc(dados.localLesao || "região não especificada")}</strong>.
            Os exercícios dessa região foram evitados. Consulte um profissional de saúde antes de treinar.
        </div>` : "";

    container.innerHTML = `
        <section class="ficha_perfil">
            <div class="ficha_avatar" aria-hidden="true">${iconeUsuario}</div>
            <div class="ficha_perfil_info">
                <h2>Seu plano personalizado</h2>
                ${dados.nome ? `<small>${esc(dados.nome)}</small>` : ""}
                <div class="ficha_chips">${chips}</div>
            </div>
            <span class="ficha_foco">Foco: ${esc(nomeObjetivo[objetivo])}</span>
        </section>

        <section class="ficha_stats">
            <div class="ficha_stat">${iconesStat.cal}<div><small>Frequência</small><strong>${dias.length} ${dias.length === 1 ? "dia" : "dias"}/semana</strong></div></div>
            <div class="ficha_stat">${iconesStat.alvo}<div><small>Objetivo</small><strong>${esc(nomeObjetivo[objetivo])}</strong></div></div>
            <div class="ficha_stat">${iconesStat.relogio}<div><small>Duração</small><strong>${config.duracao}</strong></div></div>
            <div class="ficha_stat">${iconesStat.timer}<div><small>Descanso</small><strong>${config.descanso}</strong></div></div>
        </section>

        <div class="ficha_abas" role="tablist">${abas}</div>
        ${paineis}
        ${aviso}

        <div class="ficha_dicas">
            <h4> Dicas importantes</h4>
            <ul>
                <li>Faça 5–10 minutos de aquecimento antes de começar</li>
                <li>Mantenha a execução correta em todos os exercícios</li>
                <li>Hidrate-se bem durante o treino</li>
                <li>Respeite o descanso de ${config.descanso} entre as séries</li>
                <li>Durma bem — o músculo cresce no descanso, não no treino</li>
            </ul>
        </div>

        <div class="ficha_acoes">
            <button type="button" class="Primeiro_botao" onclick="window.print()"> Imprimir</button>
            <a href="questionario.html" class="Primeiro_botao btn_secundario">↩ Refazer questionário</a>
        </div>`;

    // troca de abas
    container.querySelectorAll(".ficha_aba").forEach(aba => {
        aba.addEventListener("click", () => {
            container.querySelectorAll(".ficha_aba").forEach(a => {
                const ativa = a === aba;
                a.classList.toggle("ativa", ativa);
                a.setAttribute("aria-selected", ativa);
            });
            container.querySelectorAll(".ficha_dia").forEach(p => { p.hidden = p.dataset.painel !== aba.dataset.dia; });
        });
    });
}

function mostrarVazio() {
    container.innerHTML = `
        <div class="ficha_vazio">
            <h2>Você ainda não tem uma ficha</h2>
            <p>Responda o questionário rapidinho e o LesioRadar monta um treino pra sua rotina e seus objetivos.</p>
            <a href="questionario.html" class="Primeiro_botao">Criar meu treino ↗</a>
        </div>`;
}

// ---------- Início ----------
let dadosSalvos = null;
try { dadosSalvos = JSON.parse(localStorage.getItem("fichaLesioRadar")); } catch (e) {}

if (dadosSalvos && dadosSalvos.objetivo) gerarFicha(dadosSalvos);
else mostrarVazio();
