function pesquisar() {
  // Obtém a seção HTML onde os resultados serão exibidos
  let section = document.getElementById("resultados-pesquisa");

  let campoPesquisa = document.getElementById("campo-pesquisa").value;

  // Fazer verificação se o campo de pesquisa não estiver correto
  if (!campoPesquisa) {
    section.innerHTML = "<p>Nada foi encontrado. Você precisa digitar o nome da raça</p>";
    return; // Sai da função se não houver pesquisa
  }

  // Inicializa uma string vazia para armazenar os resultados
  let resultados = "";

  // Função para remover acentos das strings
  function removerAcentos(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  // Itera sobre cada dado da lista de dados
  for (let dado of dados) {
    let racaGato = dado.raça;

    // Remove acentos do nome da raça
    let racaSemAcento = removerAcentos(racaGato);

    // Transforma a raça para maiúsculo e minúsculo
    let racaMaiusculo = racaSemAcento.toUpperCase();
    let racaMinusculo = racaSemAcento.toLowerCase();

    // Remove acentos do campo de pesquisa e transforma para maiúsculo e minúsculo
    let pesquisaSemAcento = removerAcentos(campoPesquisa);
    let pesquisaMaiusculo = pesquisaSemAcento.toUpperCase();
    let pesquisaMinusculo = pesquisaSemAcento.toLowerCase();

    // Verifica se o nome da raça inclui o texto pesquisado, ignorando acentos e capitalização
    if (racaMinusculo.includes(pesquisaMinusculo) || racaMaiusculo.includes(pesquisaMaiusculo)) {
      resultados += `
        <div class="item-resultado">
          <h2>${dado.raça}</h2>
          <p class="descricao-meta">As características da raça ${dado.raça} são: ${dado.caracteristicas}</p>
          <p class="descricao-meta">A sua pelagem é ${dado.pelagem} e sua expectativa de vida é de ${dado.expectativaDeVida} anos.</p>
          <p class="descricao-meta">O seu país de origem é: ${dado.paisDeOrigem}</p>
          <a href=${dado.link} target="_blank">Mais informações</a>
        </div>
      `;
    }
  }

  // Atribui os resultados gerados à seção HTML
  section.innerHTML = resultados || "<p>Nada foi encontrado. Digite raças como: Persa, Exótico, Agorá, Ragdoll, Siames, British Shorthair, Abíssinio, Sphynx, Vira Lata...</p>";
}