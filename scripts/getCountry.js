import Country from "./country.js"

const app = Vue.createApp({
    data(){
        return{
            country: {},
            countries: [],
            borders: [],
        }
    },
    created(){
        var countryCode = location.search.split('code=')[1]
        //console.log(countryCode)
        
        Country.fetchCountryById(countryCode,(data1) =>{
            this.country = data1
            console.log("Datos Country: ", data1)
            this.getBorders()
        })
        Country.fetchAll((data2) =>{
            this.countries = data2
            console.log("Datos Countries: ", data2)
        })
    },
    methods:{
        getBorders(){
            this.borders = this.country.borders
            /*this.borders.split(",")
            for (var i=0 ; i < this.borders.length ; i++) {
                document.write(this.borders[i] + " ");
            }*/
            let i = 0
            do {
                i = i + 1
                let border = this.borders.pop()
                return border
            } while (i <= this.borders.length);
            /*for (let i = 0 ; i <= this.borders.length ; i++) {
                let border = this.borders.pop()
                //return this.borders.splice(i,1)
                return border
            }*/
        }
    }
})

app.mount('#app')