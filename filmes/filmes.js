function getDados(){
    let resposta;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "filmes.json", true);
    
    xhttp.onreadystatechange= function() {
        if (this.readyState == 4 && this.status == 200) {
            resposta = JSON.parse(this.response)
            setDados(resposta);
        }
    };
    xhttp.send();
}
getDados();

function setDados(resposta){
    let tabela = document.getElementById("filmes");
    let filmes = Object.entries(resposta.filmes);
    let cabecalhos = Object.entries(resposta.cabecalhos);
    
    cabecalhos = cabecalhos.map(cabecalho=>cabecalho[1]);
    filmes = filmes.map(filme=>filme[1]);
    
    let linha_cabecalhos = document.createElement("tr");

    cabecalhos.forEach(cabecalho=>{
        let th = document.createElement("th");
        th.innerText = cabecalho;
        linha_cabecalhos.appendChild(th);

    });
    tabela.appendChild(linha_cabecalhos);
    filmes.forEach(filme=>{

        let linha_filmes = document.createElement("tr");

        let coluna1 = document.createElement('td');
        coluna1.className = "filme";

        let titulo_filme = document.createTextNode(filme.nome_filme);
        coluna1.appendChild(titulo_filme);

        coluna1.appendChild(document.createElement("br"));
        coluna1.appendChild(document.createElement("br"));

        let imagem_filme = document.createElement("img");
        imagem_filme.src = filme.caminho;
        imagem_filme.alt = filme.alt;
        imagem_filme.title = filme.title;
        coluna1.appendChild(imagem_filme);

        linha_filmes.appendChild(coluna1);


        let coluna2 = document.createElement('td');
        coluna2.className = "descricao";

        /* Paragrafos com descrição: */
        paragrafos = Object.entries(filme.paragrafos);
        paragrafos = paragrafos.map(paragrafo=>paragrafo[1])


        paragrafos.forEach(paragrafo=>{
            let p = document.createElement("p");
            p.innerText = paragrafo;
            coluna2.appendChild(p);
        })

        let link = document.createElement("a");
        link.href = filme.resenha_link;
        link.innerHTML = filme.texto_link;
        coluna2.appendChild(link);

        coluna2.appendChild(document.createElement("br"));
        coluna2.appendChild(document.createElement("br"));

        let iframe = document.createElement("iframe");
        iframe.src = filme.iframe;
        coluna2.appendChild(iframe);

        linha_filmes.appendChild(coluna2);
        
        tabela.appendChild(linha_filmes);

    });
}