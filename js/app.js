// Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const precioMin = document.querySelector('#minimo');
const precioMax = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenedor para los resultados
const resultado = document.querySelector('#resultado');

const yearMax = new Date().getFullYear(); // Año actual
const yearMin = yearMax - 10;

// Generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    precioMin: '',
    precioMax: '',
    puertas: '',
    transmision: '',
    color: '',
}



// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarCoches(autos); // muestra los coches al cargar

    llenarSelect(); // llena el Select de los años
    
});

// Event listaner para los select de búsqueda
marca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;

    filtrarCoche();
});

year.addEventListener('change', (e) => {
    datosBusqueda.year = parseInt(e.target.value);

    filtrarCoche();
});

precioMin.addEventListener('change', (e) => {
    datosBusqueda.precioMin = e.target.value;

    filtrarCoche();
});

precioMax.addEventListener('change', (e) => {
    datosBusqueda.precioMax = e.target.value;

    filtrarCoche();
});

puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarCoche();
});

transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;

    filtrarCoche();
});

color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;

    filtrarCoche();
});


// Funciones
function mostrarCoches(autos) {
    limpiarHTML(); // elimina el html previo

    autos.forEach( auto => {

        const { marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('P');

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} € - Color: ${color}
        `;

        // Insertar en el html
        resultado.appendChild(autoHTML);
    })
}

// Limpiar html
function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

// Genera los años del Select
function llenarSelect() {
    for(let i=yearMax;i>=yearMin;i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // agrega las opciones de año al select
    }
}


// Función que filtra en base a la búsqueda
function filtrarCoche() {
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarPrecioMin).filter(filtrarPrecioMax).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    if(resultado.length) {
        mostrarCoches(resultado);
    } else {
        noResultado();
    }
    
}

function noResultado() {
    
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta','error');
    noResultado.textContent = 'No hay resultados, cambia los términos de búsqueda';
    resultado.appendChild(noResultado);
}


function filtrarMarca(auto) {
    const {marca} = datosBusqueda;
    if(marca) {
        return auto.marca === marca;
    }
    return auto;
}


function filtrarYear(auto) {
    const {year} = datosBusqueda;
    if(year) {
        return auto.year === year;
    }
    return auto;
}


function filtrarPrecioMin(auto) {
    const {precioMin} = datosBusqueda;
    if(precioMin) {
        return auto.precio >= precioMin;
    }
    return auto;
}


function filtrarPrecioMax(auto) {
    const {precioMax} = datosBusqueda;
    if(precioMax) {
        return auto.precio <= precioMax;
    }
    return auto;
}


function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;
    if(puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}


function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;
    if(transmision) {
        return auto.transmision === transmision;
    }
    return auto;
}


function filtrarColor(auto) {
    const {color} = datosBusqueda;
    if(color) {
        return auto.color === color;
    }
    return auto;
}