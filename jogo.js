let n = 10;

vingadores1 = ["thor1","homemdeferro1", "viuva1", "gaviao1", "capitao1", "hulk1","feiticeira1", "aranha1", "capita1", "dr1"];

vingadores2 = ["thor2","homemdeferro2", "viuva2", "gaviao2", "capitao2", "hulk2","feiticeira2", "aranha2", "capita2", "dr2"];


vingadores = [...vingadores1,...vingadores2];

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

let random = retornaAleatorio(vingadores);

for(i = 0; i<random.length; i++){
    let botao = document.createElement("button");
    let imagem = document.createElement("img");
    imagem.id = "vingador"+i;
    imagem.src=random[i].substring(0,random[i].length-1)+".jpg";
    botao.classList.add("item");
    botao.appendChild(imagem)
    let tela = document.getElementById('tela');
    tela.appendChild(botao);
}

function inicio(){
    let textoContador = document.createTextNode("5");
    let contador = document.createElement("div");
    contador.id="contador";
    contador.appendChild(textoContador);
    document.getElementsByTagName("body")[0].appendChild(contador);

    let intervalo = setInterval(()=>{
        if(contador.innerHTML!="1"){
            console.log(contador.innerHTML);
            contador.innerHTML--;
        } else{
            contador.innerHTML = "Começou !";
            clearInterval(intervalo);
        }
    }, 900);

    setTimeout(function(){ 
        contador.style.visibility="hidden";
        for(i=0; i<random.length; i++){
            vingador = document.getElementById("vingador"+i);
            vingador.src="interrogacao.jpg";
        }
    }, 6000);

}
inicio();