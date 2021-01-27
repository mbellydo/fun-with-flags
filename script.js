// TARGETS

// T1
const countriesEl = document.getElementById('countries');

// T2
const toggleBtn = document.getElementById('toggle');

// T3
const filterBtn = document.getElementById('filter');

// T4
const searchEl = document.getElementById('search');

// T5
const regionFilters = filterBtn.querySelectorAll('li');


// Crida l'API

getCountries();


// Crea un objecte (countries) amb tota la informació de l'API

async function getCountries() {
	const res = await fetch('https://restcountries.eu/rest/v2/all');
	const countries = await res.json();

	displayCountries(countries);
}


function displayCountries(countries) {

    // Repeteix el procés de crear una targeta per cada país (country) de l'objecte countries
	countries.forEach(country => {

        // Crea un <div> que conté cada targeta corresponent a cada país
        const countryEl = document.createElement('div');
        
        // Afegeix la classe 'card' al <div>
        countryEl.classList.add('card');

        // Crea el contingut de cada targeta
		countryEl.innerHTML = `
            <div class="img-container">
                <img src="${country.flag}" alt="Germany" />
            </div>
            <div class="card-body">
                <h3 class="country-name">${country.name}</h3>
                <p>
                    <strong>Population:</strong>
                    ${new Intl.NumberFormat("en-US").format(country.population)}
                </p>
                <p class="country-region">
                    <strong>Region:</strong>
                    ${country.region}
                </p>
                <p>
                    <strong>Capital:</strong>
                    ${country.capital}
                </p>
            </div>
        `;

        // Afegeix la targeta de cada país com a fill del <div> que conté tots els països (T1)
        countriesEl.appendChild(countryEl);
        
	});
}


// Canvia a Dark/Light Mode afegint/treient (classList.toggle) la classe 'dark' al 'body'.

toggleBtn.addEventListener('click', () => {
	document.body.classList.toggle('dark');
});


// FILTRE 'REGIONS'

// Mostra/amaga el llistat de regions afegint/treient (classList.toggle) la classe 'open' al 'filter' (T3).

filterBtn.addEventListener('click', () => {
	filterBtn.classList.toggle('open');
});


// La funció 'filterByRegion' s'activa cada vegada que es fa 'click' a qualsevol (forEach) regió de la llista (T5). 

regionFilters.forEach(filter => {

    filter.addEventListener('click', filterByRegion);

    function filterByRegion() {

        // 'selectedRegion' pren el valor de la regió on s'ha fet 'click'.
        const selectedRegion = filter.innerText;

        // Target al <p> (regió de cada país) de les tarjetes creades a la funció 'displayCountries()'. Crea un array amb totes les regions.
        const countryRegion = document.querySelectorAll('.country-region');

        // Si la regió de cada targeta és la mateixa que la regió seleccionada (selectedRegion) o si se selecciona 'All', es mostren (display: block) les targetes que compleixen qualsevol de les dues condicions. Els països que no compleixen cap de les dues condicions no es mostren (display: none).
		countryRegion.forEach(region => {

			if (region.innerText.includes(selectedRegion) || selectedRegion === 'All') {

                // Per modificar el 'display' de la tarjeta (<div class="card">) del país que conté la regió seleccionada, hem d'anar enrere 2 'parents': .country-region < .card-body < .card
                region.parentElement.parentElement.style.display = 'block';
                
			} else {
				region.parentElement.parentElement.style.display = 'none';
			}
		});
    }
})

// Funció 'comprimida':

/*
regionFilters.forEach(filter => {
	filter.addEventListener('click', () => {
		const value = filter.innerText;
		const countryRegion = document.querySelectorAll('.country-region');

		countryRegion.forEach(region => {
			if (region.innerText.includes(value) || value === 'All') {
				// .card -> .card-body -> .country-region
				region.parentElement.parentElement.style.display = 'block';
			} else {
				region.parentElement.parentElement.style.display = 'none';
			}
		});
	});
});
*/


// BUSCADOR SEARCH:

// La funció 'searchCountry' s'activa cada vegada que 'input' (T4) canvia.
searchEl.addEventListener('input', searchCountry);

function searchCountry(e) {

    // 'searchInput' pren el valor (value) introduït per l'usuari a l'input (T4).
    const searchInput = e.target.value;
    
    // Target al <h3> (nom dels països) de les tarjetes creades a la funció 'displayCountries()'. Crea un array amb tots els noms dels països.
	const countryName = document.querySelectorAll('.country-name');
    
    // Per cada nom de cada país en minúscula (toLowerCase()), utilitza el mètode 'includes()' per filtrar aquells països que inclouen els caràcters de l'input de l'usuari en minúscula (toLowerCase()). Si el resultat és 'true', mostra les trajetes que compleixen la condició (display: block). Si el resultat és 'false', amaga els països que no inclouen els caràcters de l'input (display: none).
	countryName.forEach(name => {

		if (name.innerText.toLowerCase().includes(searchInput.toLowerCase())) {

			// Per modificar el 'display' de la tarjeta (<div class="card">) del país que coincideix amb l'input, hem d'anar enrere 2 'parents': .country-name < .card-body < .card
            name.parentElement.parentElement.style.display = 'block';
            
		} else {
			name.parentElement.parentElement.style.display = 'none';
		}
	});
}

// Funció 'comprimida':

/*
searchEl.addEventListener('input', e => {
	const { value } = e.target; 
	const countryName = document.querySelectorAll('.country-name');

	countryName.forEach(name => {
		if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
			// .card -> .card-body -> .country-name
			name.parentElement.parentElement.style.display = 'block';
		} else {
			name.parentElement.parentElement.style.display = 'none';
		}
	});
});
*/

