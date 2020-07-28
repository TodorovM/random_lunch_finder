<template>
  <div id="app">
    <div v-if="location">
        <div class="button-container">
        <svg height="50" width="50">
          <circle ref="circle" cx="25" cy="25" r="23" stroke="#E43838" stroke-width="4" fill="transparent" />
        </svg>
        <svg height="50" width="50">
          <circle ref="circle2" cx="25" cy="25" r="23" stroke="rgba(104, 104, 104, 0.3)" stroke-width="4" fill="transparent" />
        </svg>
        <button ref="button" @click="click">{{text}}</button>
      </div>
      <RandomPlace v-if="place" ref="randomPlace" :place=place />
    </div>
    <div v-else>
      <h1>Can't get location or GeoLocation not supported in browser</h1>
    </div>
  </div>
</template>

<script>
import RandomPlace from './components/RandomPlace.vue'
import { TimelineMax } from 'gsap';
export default {
  name: 'App',
  components: {
    RandomPlace
  },
  data () {
    return {
      text: 'Random Select',
      playing: false,
      place: null,
      location: true,
      
    }
  },
  methods: {
    async click() {
      const tl = new TimelineMax();
      const button = this.$refs.button;
      const circle = this.$refs.circle;
      let res;
      try {
        res = await this.getLocation()
      } catch (error) {
        this.location = false;
      }
     
      if (!this.playing) {
        this.playing = true;
        tl.to(button, {backgroundColor: '#E43838', color: '#FFF', duration: .25})
          .to(button, {color: 'transparent', duration: .15})
          .to(button, {fontSize: 0, width: '50px', borderColor:"rgba(104, 104, 104, 0.3)",backgroundColor: "black", duration: .25})
          .to(button, {opacity: 0, duration: .01})
          .to(circle, {strokeDashoffset: 0, duration: 1})
          .call(this.changeText, ["\u2713"])
          .to(button, {fontSize: '15px', duration: .01})
          .to(button, {color:'white', opacity: 1, borderColor:"#E43838",backgroundColor: "#E43838",  duration: .25})
          .to(button, {width: '250px', duration: .25})
          .to(button, {color: 'transparent', duration: .25})
          .call(this.changeText, ["Random Select"])
          .to(button, {backgroundColor:'black', color: "#E43838", duration: .25})
          .to(circle, {strokeDashoffset: 144.44, duration: .05})
          .eventCallback("onComplete", () => {
            this.playing = false;
            const {geometry, name, opening_hours, vicinity} = res.results[Math.floor(Math.random() * res.results.length)];
            this.place = {geometry, name, opening_hours, vicinity};
          });
      }

    },
    placeUrl(obj) {
      return `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${obj.lat},${obj.lang}&radius=1500&type=restaurant&key=AIzaSyA9oi366hqFnNvSLRYsGvDMV4rMUWIqRCA`
    },
    getLocation() {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation){
          reject();
          return;   
        }

        navigator.geolocation.getCurrentPosition((pos) => {
          const obj = {
            lat: pos.coords.latitude,
            lang: pos.coords.longitude
          }
          fetch(this.placeUrl(obj)).then(res => res.json()).then(res => {
            resolve(res)
          })
        }, 
        () => {
          reject();
          return;
        })

      })
    },
    changeText(text){
      this.text = text;
    }
  },
  mounted(){
  }
}
</script>

<style>
html,body{
  height: 100%;
  margin: 0;
}
#app {
  font-family: 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black;
  min-height: 100%;
  color: white;
}

.button-container{
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
}

svg {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
}

svg:first-child{
  z-index: 1;
}

svg:first-child circle{
  stroke-dasharray: 144.44;
  stroke-dashoffset: 144.44;
  transform: rotate(-90deg);
  transform-origin: center;
}


button{
  border: 4px solid #E43838 ;
  background-color: black;
  border-radius: 50px;
  width: 250px;
  height: 50px;
  font-size: 15px;
  color: #E43838;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  z-index: 2
}

button:focus{
  outline: none;
}


</style>
