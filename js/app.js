
let btnBuscar = document.getElementById('btnBuscar');
let btnAll = document.getElementById('btnAll');


btnBuscar.addEventListener('click', buscarPokemon);
btnAll.addEventListener('click', initialFunction);

async function fetchPokemon( id ) {
    const pokeName = `https://pokeapi.co/api/v2/pokemon/${ id }/`;
    // fetch(pokeName)   
    //     .then((resp) =>  resp.json())
    //     .then( (data) => {
    //         //mostrarPokemones();
    //         createCardPokemon( data );
    //         console.log(data);
    //     });

   try {
        const response = await fetch(pokeName);
        const data = await response.json();
        createCardPokemon ( data );
        console.log(data);

   } catch (error) {
       console.log(error);
   }

}

async function fetchPokemons( number ) {
    let listado = document.getElementById('listado');
    listado.innerHTML = '';
   for( let i = 1; i<= number; i++){
       await fetchPokemon(i);
   }
}



function createCardPokemon( pokemon ) {
    let listado = document.getElementById('listado');
    

    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = pokemon.sprites.front_default;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = pokemon.name;

    const cardText1 = document.createElement('p');
    cardText1.classList.add('card-text');
    cardText1.textContent = `# ${pokemon.id.toString().padStart(3,0)}`;

    const cardText2 = document.createElement('p');
    cardText2.classList.add('card-text');
    cardText2.textContent = ` ${pokemon.types[0].type.name}`;

   

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText1);
    cardBody.appendChild(cardText2);


    card.appendChild(img);
    card.appendChild(cardBody);

    listado.appendChild(card);
}
function initialFunction(){
    fetchPokemons(20);
    let name = document.getElementById('name');
    name.value = '';
}

initialFunction();


function buscarPokemon () {
    let listado = document.getElementById('listado');
    let name = document.getElementById('name');

    listado.innerHTML = '';

    value = name.value.trim().toLowerCase();
    //console.log(name.value);
    
    fetchPokemon(value);

}

