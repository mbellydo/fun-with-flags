const url = 'https://restcountries.eu/rest/v2/all'

export default class Country {
    constructor(name, flag, population, region, capital) {
        this.name = name
        this.flag = flag
        this.population = population
        this.region = region
        this.capital = capital   
    }

    save(){
        const countryOptions = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.name,
                flag: this.flag,
                population: this.population,
                region: this.region,
                capital: this.capital,
            })
        } 
        
        fetch(url, postOptions)
            .catch(error => console.error(error)) 
    }
    static fetchAll(cb) {
        fetch(url)
            .then(response => response.json())
            .then(data => cb(data));
    }
}