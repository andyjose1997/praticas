document.addEventListener("DOMContentLoaded", () => {
  // Elementos da busca de escrituras
  const livroInput = document.getElementById("buscarEscritura-livro");
  const capituloInput = document.getElementById("buscarEscritura-capitulo");
  const versiculoInput = document.getElementById("buscarEscritura-versiculo");
  const idiomaSelect = document.getElementById("buscarEscritura-idioma");
  const botao = document.getElementById("buscarEscritura-botao");
  const datalist = document.getElementById("buscarEscritura-listaLivros");

  // Lista de nomes para datalist
  const nomesLivros = [
    "Gênesis", "Êxodo", "Levítico", "Números", "Deuteronômio", "Josué", "Juízes", "Rute",
    "1 Samuel", "2 Samuel", "1 Reis", "2 Reis", "1 Crônicas", "2 Crônicas", "Esdras", "Neemias", "Ester", "Jó",
    "Salmos", "Provérbios", "Eclesiastes", "Cânticos", "Isaías", "Jeremias", "Lamentações", "Ezequiel", "Daniel",
    "Oseias", "Joel", "Amós", "Obadias", "Jonas", "Miqueias", "Naum", "Habacuque", "Sofonias", "Ageu", "Zacarias", "Malaquias",
    "Mateus", "Marcos", "Lucas", "João", "Atos", "Romanos", "1 Coríntios", "2 Coríntios", "Gálatas", "Efésios", "Filipenses",
    "Colossenses", "1 Tessalonicenses", "2 Tessalonicenses", "1 Timóteo", "2 Timóteo", "Tito", "Filemom", "Hebreus", "Tiago",
    "1 Pedro", "2 Pedro", "1 João", "2 João", "3 João", "Judas", "Apocalipse",
    "1 Néfi", "2 Néfi", "Jacó", "Enos", "Jarom", "Ômni", "Palavras de Mórmon", "Mosias", "Alma", "Helamã", "3 Néfi", "4 Néfi",
    "Mórmon", "Éter", "Morôni", "Doutrina e Convênios", "Moisés", "Abraão", "Joseph Smith História", "regras de Fé"
  ];
  nomesLivros.forEach(nome => {
    const opt = document.createElement("option");
    opt.value = nome;
    datalist.appendChild(opt);
  });

  const normalizar = texto =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, "e").replace(/\s+/g, " ").trim().toLowerCase();

  // Dicionários
  const livrosBOM = {
    "1 nefi": "1-ne", "2 nefi": "2-ne", "jaco": "jacob", "enos": "enos",
    "jarom": "jarom", "omni": "omni", "palavras de mormon": "w-of-m",
    "mosias": "mosiah", "alma": "alma", "helama": "hel", "3 nefi": "3-ne",
    "4 nefi": "4-ne", "mormon": "morm", "eter": "ether", "moroni": "moro"
  };
  const livrosPGP = {
    "moises": "moses", "abraao": "abr", "js-h": "js-h",
    "joseph smith historia": "js-h", "regras de fe": "a-of-f", "artigos": "a-of-f"
  };
  const livrosNT = {
    "mateus": "matt", "marcos": "mark", "lucas": "luke", "joao": "john", "atos": "acts", "romanos": "rom",
    "1 corintios": "1-cor", "2 corintios": "2-cor", "galatas": "gal", "efesios": "eph", "filipenses": "philip",
    "colossenses": "col", "1 tessalonicenses": "1-thes", "2 tessalonicenses": "2-thes",
    "1 timoteo": "1-tim", "2 timoteo": "2-tim", "tito": "titus", "filemom": "philem", "hebreus": "heb", "tiago": "james",
    "1 pedro": "1-pet", "2 pedro": "2-pet", "1 joao": "1-jn", "2 joao": "2-jn", "3 joao": "3-jn", "judas": "jude", "apocalipse": "rev"
  };
  const livrosOT = {
    "genesis": "gen", "exodo": "ex", "levitico": "lev", "numeros": "num", "deuteronomio": "deut", "josue": "josh",
    "juizes": "judg", "rute": "ruth", "1 samuel": "1-sam", "2 samuel": "2-sam", "1 reis": "1-kgs", "2 reis": "2-kgs",
    "1 cronicas": "1-chr", "2 cronicas": "2-chr", "esdras": "ezra", "neemias": "neh", "ester": "esth", "jo": "job",
    "salmos": "ps", "proverbios": "prov", "eclesiastes": "eccl", "canticos": "song", "isaias": "isa", "jeremias": "jer",
    "lamentacoes": "lam", "ezequiel": "ezek", "daniel": "dan", "oseias": "hosea", "joel": "joel", "amos": "amos",
    "obadias": "obad", "jonas": "jonah", "miqueias": "micah", "naum": "nahum", "habacuque": "hab", "sofonias": "zeph",
    "ageu": "hag", "zacarias": "zech", "malaquias": "mal"
  };

  botao.addEventListener("click", () => {
    const livro = normalizar(livroInput.value);
    const capitulo = capituloInput.value.trim();
    const versiculo = versiculoInput.value.trim();
    const idioma = idiomaSelect.value;
    const base = "https://www.churchofjesuschrist.org/study/scriptures/";
    let url = "";

    if (livrosBOM[livro]) {
      url = `${base}bofm/${livrosBOM[livro]}/${capitulo}?lang=${idioma}${versiculo ? "#p" + versiculo : ""}`;
    } else if (["d e c", "d c", "doutrina e convenios", "doutrina", "dyc"].includes(livro)) {
      if (!capitulo) return alert("Informe a seção de Doutrina e Convênios.");
      url = `${base}dc-testament/dc/${capitulo}?lang=${idioma}${versiculo ? "&id=p" + versiculo + "#p" + versiculo : ""}`;
    } else if (livrosPGP[livro]) {
      url = `${base}pgp/${livrosPGP[livro]}/${capitulo}?lang=${idioma}${versiculo ? "#p" + versiculo : ""}`;
    } else if (livrosNT[livro]) {
      url = `${base}nt/${livrosNT[livro]}/${capitulo}?lang=${idioma}${versiculo ? "#p" + versiculo : ""}`;
    } else if (livrosOT[livro]) {
      url = `${base}ot/${livrosOT[livro]}/${capitulo}?lang=${idioma}${versiculo ? "#p" + versiculo : ""}`;
    } else {
      return alert("Livro não reconhecido.");
    }

    window.open(url, "_blank");
  });

  // Botões de idiomas e frases
  const botoesIdioma = document.querySelectorAll("#idiomas-botoes button");
  const frasesContainer = document.getElementById("frases-traduzidas");

  const traducoes = {
    por: "Por favor, coloque a inicial do seu idioma nativo no início do seu nome missionário. Por exemplo: P Élder Silva. Isso nos ajuda a organizar melhor os grupos.",
    eng: "Please place the initial of your native language at the beginning of your missionary name. For example: E Elder Johnson. This helps us organize the groups better.",
    spa: "Por favor, coloque la inicial de su idioma nativo al comienzo de su nombre misionero. Por ejemplo: E Élder García. Esto nos ayuda a organizar mejor los grupos.",
    fra: "Veuillez ajouter l’initiale de votre langue maternelle au début de votre nom missionnaire. Par exemple : F Elder Dubois. Cela nous aide à mieux organiser les groupes.",
    ita: "Per favore, metti l'iniziale della tua lingua madre all'inizio del tuo nome missionario. Ad esempio: I Anziano Rossi. Questo ci aiuta a organizzare meglio i gruppi.",
    jpn: "宣教師の名前の最初に母国語の頭文字をつけてください。例：J 長老 たなか。グループの整理がしやすくなります。",
    kor: "선교사 이름 앞에 모국어의 이니셜을 넣어주세요. 예: K 엘더 김. 그룹을 더 잘 정리할 수 있어요."
  };

  botoesIdioma.forEach(botao => {
    botao.addEventListener("click", () => {
      const idioma = botao.dataset.idioma;
      const existente = document.getElementById("frase-" + idioma);

      if (existente) {
        existente.remove();
        botao.classList.remove("selected");
      } else {
        const p = document.createElement("p");
        p.id = "frase-" + idioma;
        p.textContent = traducoes[idioma];
        frasesContainer.appendChild(p);
        botao.classList.add("selected");
      }
    });
  });
});
 const copiarBtn = document.getElementById("copiar-btn");
  const frasesDiv = document.getElementById("frases-traduzidas");

  copiarBtn.addEventListener("click", () => {
    const texto = frasesDiv.innerText || frasesDiv.textContent;
    if (texto.trim() === "") {
      alert("Não há nada para copiar ainda!");
      return;
    }

    navigator.clipboard.writeText(texto)
      .then(() => {
        copiarBtn.textContent = "✅ Copiado!";
        setTimeout(() => {
          copiarBtn.textContent = "📋 Copiar texto";
        }, 2000);
      })
      .catch(err => {
        console.error("Erro ao copiar:", err);
        alert("Erro ao copiar o texto.");
      });
  });
  