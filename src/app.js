const base_Url_Personajes = 'https://rickandmortyapi.com/api/character/?name=Pers';
const base_Url_Episodios = 'https://rickandmortyapi.com/api/episode/id';

const boton = document.getElementById('bot');

//funcion princial API 
async function apiCapitulos(){
    
    for(var id=1;id<=41;id++){   
        var url = `${base_Url_Episodios.replace('id',id)}`
        await fetch(url)
        .then((respuesta)=>respuesta.json())
        .then((ResponseJson) => mostrarEpisodios(ResponseJson))
    }
}


boton.addEventListener('click',function(){
    const Person = document.getElementById('Per');
    const url = `${base_Url_Personajes.replace('Pers',Person.value)}`

    fetch(url)
        .then((respuesta)=>respuesta.json())
        .then((ResponseJson) => mostrarData(ResponseJson))
        .catch(error => console.log(error));
})

const mostrarData = (ResponseJson) => {
    //Aqui convertimos El Json como Obejto a un Array
    const arrayPer = Object.entries(ResponseJson.results);
    
    addCharacter(arrayPer);
}


const mostrarEpisodios = (ResponseJson) =>{

    const infoEpisodios = document.getElementById('infoEpisodios');
    const newHijo = document.createElement('div');
    //newHijo.setAttribute("id", "hijo1");
    newHijo.setAttribute("class","infoCapitulos");
    var informacionContent = `
            <p> <b>${ResponseJson.id}</b></p>
            <p class=""> ${ResponseJson.name}</p>
            <p class=""> ${ResponseJson.air_date}</p>
            <p class=""> ${ResponseJson.episode}</p>      
        `;
    newHijo.innerHTML = informacionContent;
    infoEpisodios.appendChild(newHijo);

}

function addCharacter(arrayPer){

    /*Aqui vamos a remover el div creado por Default en html
    para posteriormente poder crearlo dinamicamente
    las veces que sean necesarias*/
    const infoP = document.getElementById('infoP');
    const hijo1 = document.getElementById('hijo1');
    infoP.removeChild(hijo1);
    //Esta Creacion dinámica nos permite borrar la pantalla en cada Busqueda
    const newHijo = document.createElement('div');
    newHijo.setAttribute("id", "hijo1");
    newHijo.setAttribute("class","infoGlobal")
    infoP.append(newHijo);
    
    arrayPer.forEach((element)=>{
        const infoPersonajes = document.getElementById('hijo1');
        
        const informacion = document.createElement('div');
        informacion.setAttribute("class","sub_recuadro");
        /*informacion.classList.add('infP');
        en element[1] 1-> hace referencia a la posicion del arreglo en esta Api [1] es
        donde se encuentra la informacion de cada Personaje dentro de Results*/
        var informacionContent = `
            <p class="box-name"> ${element[1].name}</p>
            <p class=""><b> ${element[1].status}</b></p>
            <p class=""> ${element[1].species}</p>
            <p class=""> ${element[1].gender}</p>
            <img src="${element[1].image}" class="img-per">        
        `;
        informacion.innerHTML = informacionContent;
        infoPersonajes.appendChild(informacion);
    })
}

const botonPersonajes = document.getElementById('botonPersonajes');
const botonCapitulos = document.getElementById('botonEpisodios');
const menuPrincipal = document.getElementById('menuPrincipal');
const seccionPersonaje = document.getElementById('SeccionPersonaje');
const seccionCapitulos = document.getElementById('SeccionEpisodio');

botonPersonajes.addEventListener('click',function(){
    seccionPersonaje.style.display = 'block';
    menuPrincipal.style.display = 'none';
    seccionCapitulos.style.display = 'none';
})

botonCapitulos.addEventListener('click',function(){
    seccionCapitulos.style.display = 'block';
    seccionPersonaje.style.display = 'none';
    menuPrincipal.style.display = 'none';
    apiCapitulos();
})


//SECION DE BOTON REGRESAR, LOGICA Y COMPONENTE VISUAL
const botonRegresar = document.querySelectorAll('.regresoMenu');
const regresarMenu = function(evento){
    seccionPersonaje.style.display = "none";
    seccionCapitulos.style.display='none';
    menuPrincipal.style.display = 'block';
}
 botonRegresar.forEach(boton =>{
    boton.addEventListener('click',regresarMenu);
 });