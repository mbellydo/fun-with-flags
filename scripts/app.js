import Country from "./country.js"

const app = Vue.createApp({
    data() {
        return {
            countries: [],
            regionFilter: '',
            nameFilter: '',
            countryFilter: '',
            dropdown: false, 
            darkMode: false,
            showFilter: false
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

            let countryName = country.name.toLowerCase()

            let nameFilter = this.nameFilter.toLowerCase()

            let isCountryInName = !nameFilter || countryName.indexOf(nameFilter) != -1

            return isCountryInName && isCountryInRegion
        },

        newTab(country){
            window.open("./country.html?code="+country.alpha3Code, "_blank")
        }
    }
})
  
app.mount('#app')