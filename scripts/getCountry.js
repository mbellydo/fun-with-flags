
import Country from "./country.js"

const app = Vue.createApp({
    data(){
        return{
            country: {},
            countries: [],
            darkMode: false,
        }
    },
    created(){
        var countryCode = location.search.split('code=')[1]
        
        Country.fetchCountryById(countryCode,(data1) =>{
            this.country = data1
            console.log("Datos Country: ", data1)
        })
        Country.fetchAll((data2) =>{
            this.countries = data2
            console.log("Datos Countries: ", data2)
        })
    },
    methods: {
        newTab(border){
            window.open("./country.html?code="+border, "_self")
        },
        goIndex() {
            window.open("./index.html", "_self")
        }
    }
})

app.mount('#app')