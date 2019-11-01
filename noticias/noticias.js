function getDados(){
    let resposta;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "noticias.json", true);
    
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
    let conteudo = document.getElementById("noticias");
    let noticias = Object.entries(resposta);
    noticias = noticias.map(noticia=>noticia[1]);
    
    noticias.forEach(noticia=>{
        let link = document.createElement("a");
        link.target = "_blank";
        link.href = noticia.href;
        link.innerText = noticia.conteudo_href;
        conteudo.appendChild(link);

        conteudo.appendChild(document.createElement("br"));
       
        let data = document.createElement("i");
        data.innerText = noticia.data;  
        conteudo.appendChild(data);

        conteudo.appendChild(document.createElement("br"));

        
        let descricao = document.createTextNode(noticia.descricao);
        conteudo.appendChild(descricao);

        conteudo.appendChild(document.createElement("br"));
        conteudo.appendChild(document.createElement("br"));
        conteudo.appendChild(document.createElement("br"));
      

    });

}