const url = 'https://restcountries.eu/rest/v2/all'

export default class Country {
    static fetchAll(cb) {
        fetch(url)
            .then(response => response.json())
            .then(data => cb(data));
    }
    static fetchCountryById(code, cb){
        const urlCountry = 'https://restcountries.eu/rest/v2/alpha/'+code
        
        //console.log(urlCountry)

        fetch(urlCountry)
            .then(response => response.json())
            .then(data => cb(data));
    }
}