let n = 10;
let pontuacao = 0;

let tempo = {
    minutos:0,
    segundos:0,
    aumentaSegundo(){
        this.segundos++;        
        if(this.segundos==60){
            this.segundos = 0;
            this.minutos++;
        }
        let segundosEscrito = this.segundos>9 ? this.segundos : "0"+this.segundos;
        let minutosEscrito = this.minutos>9? this.minutos : "0"+this.minutos;
        document.getElementById("tempo").innerText = "Tempo:"+minutosEscrito+":"+segundosEscrito;
    }
}
//vetores usados para diferenciar cartas iguais
vingadores1 = ["thor1","homemdeferro1", "viuva1", "gaviao1", "capitao1", "hulk1","feiticeira1", "aranha1", "capita1", "dr1"];
vingadores2 = ["thor2","homemdeferro2", "viuva2", "gaviao2", "capitao2", "hulk2","feiticeira2", "aranha2", "capita2", "dr2"];


// concatena os dois vetores, spread / rest operator
vingadores = [...vingadores1,...vingadores2];



function salvarNome(){
    let caixa = document.getElementById("informacoes");
    let nomeInput = document.getElementById("nomeInput");
    let nome = nomeInput.value;
    let botaoInput = document.getElementById("botaoInput");
    if(nome.length<3){
        alert("Ponha um nome com no minimo 3 letras");
    } else{
        document.getElementById("nomeJogador").innerText = "Jogador: "+nome;
        document.getElementById("insercaoNome").style.display = "none";
        inicio();
    }
}


//recebe um vetor e retorna o mesmo com posições aleatórias
function retornaAleatorio(vetor) {
    var j, x, i;
    for (i = vingadores.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = vetor[i];
        vetor[i] = vetor[j];
        vetor[j] = x;
    }
    return vetor;
}

function fimDeJogo(){
    alert("Você venceu!");
}

function aumentarPontuacao(){
    pontuacao++;
    document.getElementById("pontuacao").innerText = "Pontuacao: "+pontuacao;
}

//guarda o vetor com elementos aleatorios
let random = retornaAleatorio(vingadores);

// auxiliar usado para saber quais vingadores já foram achados
selecionados = [...random]; 

// salva o nome da primeira carta de cada rodada
let primeiroBotao = null;
let primeiroSelecionado = null;
let segundoBotao = null
let segundoSelecionado = null;

let seleciona = function seleciona(oEvent){
    let botaoClicado = oEvent.currentTarget;
    // botaoClicado.disabled = true;
    let imagem = botaoClicado.firstChild; 
    let idImagem = imagem.id;
    //diferencia id's com 2 numeros de id com 1 número
    let indexvingadorSelecionadoVetorVingadores;
    if(isNaN(idImagem.substring(idImagem.length-2,idImagem.length))){
        indexvingadorSelecionadoVetorVingadores = idImagem.substring(idImagem.length-1,idImagem.length);
    } else {
        indexvingadorSelecionadoVetorVingadores = idImagem.substring(idImagem.length-2,idImagem.length);
    }
    let vingadorSelecionado = vingadores[indexvingadorSelecionadoVetorVingadores];
    let indexvingadorSelecionadoVetorSelecionados = selecionados.indexOf(vingadorSelecionado);
    
    if(indexvingadorSelecionadoVetorSelecionados==-1){
        alert("Essa opcao já foi selecionada");
        botaoClicado.disabled = false;
    } else{
        imagem.src = "imagens/"+vingadorSelecionado.substring(0,vingadorSelecionado.length-1)+".jpg";
        if(segundoSelecionado){
            segundoBotao.firstChild.src = "imagens/interrogacao.jpg";
            primeiroBotao.firstChild.src = "imagens/interrogacao.jpg";
            primeiroSelecionado = null;
            primeiroBotao = null;
            segundoSelecionado = null;
            segundoBotao = null;
            clearTimeout(resetaCartas);
            
        }
        if(primeiroSelecionado){

            if(vingadorSelecionado === primeiroSelecionado){
                alert("Você não pode selecionar o mesmo duas vezes");
            } else {
                segundoBotao = botaoClicado;
                segundoSelecionado = vingadorSelecionado;
                let nomeAtual = segundoSelecionado.substring(0,vingadorSelecionado.length-1);
                let nomePrimeiro = primeiroSelecionado.substring(0,primeiroSelecionado.length-1);
                if(nomeAtual === nomePrimeiro){
                    console.log("Você acertou!");
                    aumentarPontuacao();
                    selecionados.splice(indexvingadorSelecionadoVetorSelecionados, 1);
                    let indexPrimeiroSelecionado = selecionados.indexOf(primeiroSelecionado);
                    selecionados.splice(indexPrimeiroSelecionado,1);
                    primeiroBotao = null;
                    primeiroSelecionado = null;
                    segundoBotao = null;
                    segundoSelecionado = null;
                    if(selecionados.length==0){
                        fimDeJogo();
                    }
                } else{
                    console.log("você errou");
                    var resetaCartas = setTimeout(()=>{
                        if(segundoSelecionado && botaoClicado.firstChild.src !="http://127.0.0.1:5500/imagens/interrogacao.jpg"){
                            botaoClicado.firstChild.src = "imagens/interrogacao.jpg";
                            primeiroBotao.firstChild.src = "imagens/interrogacao.jpg";
                            primeiroSelecionado = null;
                            primeiroBotao = null;
                            segundoSelecionado = null;
                            segundoBotao = null;
                        }
                        resetaCartas = null;
                    }, 2000);
                    resetaCartas;
                    
                }
                
            }
            
        } else{
            primeiroBotao = botaoClicado;
            primeiroSelecionado = vingadorSelecionado;
        }
    }
}


for(i=0; i<random.length; i++){
    let botao = document.createElement("button");
    let imagem = document.createElement("img");
    imagem.id = "vingador"+i;
    imagem.src="imagens/interrogacao.jpg";
    botao.classList.add("item");
    botao.onclick=seleciona;
    botao.disabled = true;
    botao.appendChild(imagem)
    let tela = document.getElementById('tela');
    tela.appendChild(botao);
    
    vingador = document.getElementById("vingador"+i);
    vingador.src="imagens/interrogacao.jpg";
    vingador.parentElement.disabled = false;
}




document.createElement("div");



function inicio(){
    for(i = 0; i<random.length; i++){
        // let botao = document.createElement("button");
        let imagem = document.getElementById("vingador"+i);
        // imagem.id = "vingador"+i;
        imagem.src="imagens/"+random[i].substring(0,random[i].length-1)+".jpg";
        // botao.classList.add("item");
        // botao.onclick=seleciona;
        // botao.disabled = true;
        // botao.appendChild(imagem)
        // let tela = document.getElementById('tela');
        // tela.appendChild(botao);
    }

    let textoContador = document.createTextNode("5");
    let contador = document.createElement("div");
    let texto = document.createElement("p");
    contador.id="contador";
    texto.appendChild(textoContador);
    contador.appendChild(texto);
    document.getElementsByTagName("body")[0].appendChild(contador);

    let intervalo = setInterval(()=>{
        if(contador.lastChild.innerHTML!="1"){
            console.log(contador.lastChild.innerHTML);
            contador.lastChild.innerHTML--;
        } else{
            contador.lastChild.innerHTML = "Começou !";
            clearInterval(intervalo);
        }
    }, 900);

    setTimeout(function(){ 
        contador.style.visibility="hidden";
        for(i=0; i<random.length; i++){
            vingador = document.getElementById("vingador"+i);
            vingador.src="imagens/interrogacao.jpg";
            vingador.parentElement.disabled = false;
        }
        setInterval(() => {
            tempo.aumentaSegundo();
        }, 1000);
    }, 6000);

}




// inicio();

