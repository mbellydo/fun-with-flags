import Country from "./country.js"

const app = Vue.createApp({
    data() {
        return {
            countries: [],
            regionFilter: '',
            nameFilter: '',
            countryFilter: '',
            dropdown: false
        }
    },
    created(){
        Country.fetchAll((data) => {
            this.countries = data
            this.getCountries()            
        })
    },
    methods:{
        getCountries(){
            Country.fetchAll((data) =>{
                this.countries = data
                console.log("Datos recuperados: ", data)
            })
        },
        aplicateFilter(activeRegion){
            this.regionFilter = activeRegion
        },
        showCountry(country){
            let isCountryInRegion = !this.regionFilter || this.regionFilter == country.region

            let isCountryInName = !this.nameFilter || country.name.indexOf(this.nameFilter) != -1

            return isCountryInName && isCountryInRegion
        },
        searchPosition(country){
            let position = this.countries.indexOf(country) != -1
            return position
        },
        newTab(){
            window.open("./country.html", "_blank")
        }
    }
})
  
app.mount('#app')