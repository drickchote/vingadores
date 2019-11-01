
function getDados(){
    let resposta;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "membros.json", true);
    
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
    let tabela = document.getElementById("membros");
    //let cabecalhos1 = document.getElementById("cabecalhos1");
    let cabecalhos1 = document.createElement("tr");
    //let linha = document.getElementById("herois1");
    let linha = document.createElement("tr");
    tabela.appendChild(cabecalhos1);
    tabela.appendChild(linha);

    let cabecalhos2 = document.createElement("tr");
    let linha2 = document.createElement("tr");
    tabela.appendChild(cabecalhos2);
    tabela.appendChild(linha2);
    
    let imagem_id = 0;
    
    primeira_linha = Object.entries(resposta.membros).slice(0,5);
    primeira_linha.forEach(vingador=>{

        let cabecalho = document.createElement("th");
        cabecalho.innerText = vingador[1].nome;
        cabecalhos1.appendChild(cabecalho);

        let coluna = document.createElement("td");
        let imagem = document.createElement("img");
        imagem.id = imagem_id;
        imagem.src = vingador[1].caminho;
        coluna.appendChild(imagem);
        linha.appendChild(coluna);
        imagem_id++;
    });
    
    segunda_linha = Object.entries(resposta.membros).slice(5,11);
    
    segunda_linha.forEach(vingador=>{
        let cabecalho = document.createElement("th");
        cabecalho.innerText = vingador[1].nome;
        cabecalhos2.appendChild(cabecalho);

        let coluna = document.createElement("td");
        let imagem = document.createElement("img");
        imagem.id = imagem_id;
        imagem.src = vingador[1].caminho;
        coluna.appendChild(imagem);
        linha2.appendChild(coluna);
        imagem_id++;
    });


vingadores = document.querySelectorAll("td>img");

let todosOsVingadores = resposta.informacoes;
todosOsVingadores = Object.entries(todosOsVingadores);
arrayVingadores = todosOsVingadores.map(vingador=>vingador[1]);



vingadores.forEach((vingador)=>{
    vingador.onclick = (event) =>{
        imagem = event.currentTarget;
        let caracteristicasVingador = arrayVingadores[imagem.id];
        document.getElementById("nomeTitle").innerText = caracteristicasVingador["nome"];
        document.getElementById("caracteristica").innerText = "Caracteristica: "+caracteristicasVingador["caracteristica"];
        document.getElementById("arma").innerText = "Arma: "+caracteristicasVingador["arma"];
        document.getElementById("wiki").lastChild.innerText = caracteristicasVingador["wiki"];
        document.getElementById("wiki").lastChild.href = caracteristicasVingador["wiki"];
        document.getElementById("modal").style.display="block";
    }
});

};