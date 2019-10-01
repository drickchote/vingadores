let n = 10;
let pontuacao = 0; //acertos
let tentativas = 0; //acertos + erros
let jogoIniciado = false;
let tempo;
let random; // vetor com personagens aleatorios


/* chamado ao clicar em "salvar" o nome para iniciar o jogo */
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

//mostra a tela de inserir o nome para iniciar um novo jogo
function telaDeInicio(){
    let telaInsercaoNome = document.getElementById("insercaoNome");
    let nomeInput = document.getElementById("nomeInput");
    nomeInput.innerText = "";
    telaInsercaoNome.style.display = "flex";
}

function mostrarMensagem(mensagem, tipo){
    let caixa = document.getElementById("caixaMensagem");
    let background = tipo == "acertou" ? "#00FF00" : tipo == "errou" ? "#ffffcc" : "#f44336";
    caixa.innerText= mensagem;

    caixa.style.background = background;
    caixa.style.display = "block";
    setTimeout(()=>{
        caixa.style.display="none"
    }, 2000);
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

//vetores usados para diferenciar cartas iguais
let vingadores1 = ["thor1","homemdeferro1", "viuva1", "gaviao1", "capitao1", "hulk1","feiticeira1", "aranha1", "capita1", "dr1"];
let vingadores2 = ["thor2","homemdeferro2", "viuva2", "gaviao2", "capitao2", "hulk2","feiticeira2", "aranha2", "capita2", "dr2"];

function mostrarRanking(){
    let cookie =  document.cookie.split('; ').map(jogador=>{
        if(jogador.split('=')[0].substring(0,"jogador".length)=="jogador"){
            let nome = jogador.split('=')[1].split(',')[0];
            let segundos = jogador.split('=')[1].split(',')[1];
            let tempo = jogador.split('=')[1].split(',')[2];
            let taxaAcerto = jogador.split('=')[1].split(',')[3];
            return {nome:nome, segundos:segundos, tempo: tempo, taxaAcerto: taxaAcerto};
        }   
    });
    /* retorna todas as posições do cookie que não são undefined */
    let todosJogadores = cookie.filter(posicao=>posicao);
    let jogadoresOrdenados = todosJogadores.sort((a, b) => (a.segundos > b.segundos) ? 1 : -1)
    debugger;
}

function excluirRanking(){
    document.cookie.split('; ').map((jogador)=>{
        if(jogador.split('=')[0].substring(0,"jogador".length)=="jogador"){
            document.cookie = jogador.split('=')[0]+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        }
    })
}

function novoJogo(){
    n = 10;
    zerarPontuacao();
    tentativas = 0; //acertos + erros
    jogoIniciado = false;
    document.getElementById("score").style.display = "none";

    tempo = {
        minutos:0,
        segundos:0,
        segundosTotal:0,
        aumentaSegundo(){
            this.segundos++;
            this.segundosTotal++;        
            if(this.segundos==60){
                this.segundos = 0;
                this.minutos++;
            }
            let segundosEscrito = this.segundos>9 ? this.segundos : "0"+this.segundos;
            let minutosEscrito = this.minutos>9? this.minutos : "0"+this.minutos;
            document.getElementById("tempo").innerText = "Tempo:"+minutosEscrito+":"+segundosEscrito;
        }
    }
    // concatena os dois vetores, spread / rest operator
    vingadores = [...vingadores1,...vingadores2];
    //guarda o vetor com elementos aleatorios
    random = retornaAleatorio(vingadores);

    // auxiliar usado para saber quais vingadores já foram achados
    selecionados = [...random]; 
    telaDeInicio();
}
novoJogo();

function fimDeJogo(){

    let score = document.getElementById("score");
    let scoreNome = document.getElementById("nomeJogador").innerText;
    scoreNome = scoreNome.substring(9,scoreNome.length);
    let scoreTempo =  document.getElementById("tempo").innerText;
    scoreTempo = scoreTempo.substring(7,scoreTempo.length);
    let scoreTentativas = tentativas;
    let scoreTaxaAcerto = (pontuacao/tentativas)*100+"%";

    document.getElementById("scoreNome").innerText = scoreNome;
    document.getElementById("scoreTempo").innerText = scoreTempo;
    document.getElementById("scoreTentativas").innerText = scoreTentativas;
    document.getElementById("scoreTaxaAcerto").innerText = scoreTaxaAcerto;
    let quantJogadores = document.cookie.split(';').length;
    document.cookie = "jogador"+quantJogadores+"="+scoreNome+","+tempo.segundosTotal+","+scoreTempo+","+scoreTaxaAcerto+"; expires= Thu, 31 Dec 2020 23:59:59 UTC";
    score.style.display = "flex";    
}

function aumentarPontuacao(){
    pontuacao++;
    document.getElementById("pontuacao").innerText = "Pontuacao: "+pontuacao;
}

function zerarPontuacao(){
    pontuacao=0;
    document.getElementById("pontuacao").innerText = "Pontuacao: "+pontuacao;
}



// salva o nome da primeira carta de cada rodada
let primeiroBotao = null;
let primeiroSelecionado = null;
let segundoBotao = null
let segundoSelecionado = null;

let seleciona = function seleciona(oEvent){
    if(!jogoIniciado){
        return;
    }
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
        mostrarMensagem("Essa opcao já está virada", "alerta");
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
                mostrarMensagem("Selecione uma imagem diferente", "alerta");
            } else {
                segundoBotao = botaoClicado;
                segundoSelecionado = vingadorSelecionado;
                let nomeAtual = segundoSelecionado.substring(0,vingadorSelecionado.length-1);
                let nomePrimeiro = primeiroSelecionado.substring(0,primeiroSelecionado.length-1);
                if(nomeAtual === nomePrimeiro){
                    mostrarMensagem("Você acertou!", "acertou");
                    aumentarPontuacao();
                    tentativas++;
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
                    mostrarMensagem("Você errou!", "errou");
                    tentativas++;
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
    botao.disabled = true;
    let imagem = document.createElement("img");
    imagem.id = "vingador"+i;
    imagem.src="imagens/interrogacao.jpg";
    botao.classList.add("item");
    botao.onclick=seleciona;
   
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
            // vingador.parentElement.disabled = false; ?
        }

        jogoIniciado = true;
        let intervalo = setInterval(() => {
            if(pontuacao==10){
                clearInterval(intervalo);
            }
            tempo.aumentaSegundo();
        }, 1000);
        intervalo;
    }, 6000);
 

}




// inicio();

