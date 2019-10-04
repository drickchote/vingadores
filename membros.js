vingadores = document.querySelectorAll("td>img");
arrayVingadores = [
    {
        nome: "Thor",
        caracteristica: "Deus do trovão",
        arma: "Martelo",
        wiki: "https://pt.wikipedia.org/wiki/Thor_(Marvel_Comics)"
    },
    {
        nome: "Tony Stark",
        caracteristica: "Gênio, Bilionário, Playboy, filantropo",
        arma: "Armadura",
        wiki: "https://pt.wikipedia.org/wiki/Homem_de_Ferro"
    },
    {
        nome: "Natasha Romanova",
        caracteristica: "Agente da Shield",
        arma: "Armas de fogo",
        wiki: "https://pt.wikipedia.org/wiki/Vi%C3%BAva_Negra_(Marvel_Comics)"
    },
    {
        nome: " Clint Barton",
        caracteristica: "Agente da Shield",
        arma: "Arco, armas de fogo, espada.",
        wiki: "https://pt.wikipedia.org/wiki/Gavi%C3%A3o_Arqueiro"
    },
    {
        nome: "Steve Rogers",
        caracteristica: "Supersoldado",
        arma: "Escudo",
        wiki: "https://pt.wikipedia.org/wiki/Capit%C3%A3o_Am%C3%A9rica"
    },
    {
        nome: "Bruce Benner / Hulk",
        caracteristica: "Quanto mais irritado, mais forte.",
        arma: "Hulk",
        wiki: "https://pt.wikipedia.org/wiki/Hulk"
    },
    {
        nome: "Wanda Django Maximoff",
        caracteristica: "Mutante",
        arma: "Magia",
        wiki: "https://pt.wikipedia.org/wiki/Feiticeira_Escarlate"
    },
    {
        nome: "Peter Park",
        caracteristica: "Super força, inteligência, Sentido Aranha",
        arma: "Teias de aranha",
        wiki: "https://pt.wikipedia.org/wiki/Homem_Aranha"
    },
    {
        nome: "Carol Danvers",
        caracteristica: "Imbatível",
        arma: "Magia",
        wiki: "https://pt.wikipedia.org/wiki/Carol_Danvers"
    },
    {
        nome: "Doutor Stephen Vincent Strange",
        caracteristica: "protetor da Terra",
        arma: "Magia",
        wiki: "https://pt.wikipedia.org/wiki/Doutor_Estranho"
    }
];
vingadores.forEach((vingador)=>{
    vingador.onclick = (event) =>{
        imagem = event.currentTarget;
        caracteristicasVingador = arrayVingadores[imagem.id];
        document.getElementById("nomeTitle").innerText = caracteristicasVingador["nome"];
        document.getElementById("caracteristica").innerText = "Caracteristica: "+caracteristicasVingador["caracteristica"];
        document.getElementById("arma").innerText = "Arma: "+caracteristicasVingador["arma"];
        document.getElementById("wiki").lastChild.innerText = caracteristicasVingador["wiki"];
        document.getElementById("wiki").lastChild.href = caracteristicasVingador["wiki"];
        document.getElementById("modal").style.display="block";
    }
});

