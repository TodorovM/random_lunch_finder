<template>
  <div class="place">
    <div class="info">
        <div class="card">
          <div class="title">Име</div>
          <div class="description">{{place.name}}</div>
        </div>
        <div class="card">
          <div class="title">Адрес</div>
          <div class="description small">{{place.vicinity}}</div>
        </div>
        <div class="card" v-if="place.opening_hours && place.opening_hours.open_now">
          <div class="title">Отворено</div>
          <div class="description " >{{place.opening_hours.open_now ? "Да" : "Не"}}</div>
        </div>

    </div>
      <div class="map">
        <gmap-map
        :center="center"
        :zoom="17"
        style="width:100%;  height: 400px;"
      >
        <gmap-marker
          :position="center"
          @click="center=center"
        ></gmap-marker>
      </gmap-map>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RandomPlace',
  props: {
      place: Object
  },
  computed: {
    center() {
      return {lat: this.place.geometry.location.lat, lng: this.place.geometry.location.lng} 
    }
  },
}
</script>
<style scoped>
  .info{
    display: flex;
    flex-wrap: wrap;
    padding: 50px 0;
  }
  .card {
    height: 150px;
    width: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(28, 28, 28);
    border-radius: 20px;
    margin: 0 10px;
    text-align: center;
  }
  .description {
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .description.small {
    font-size: 12px;
  }
  .title {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.5)

  }
  
</style>
