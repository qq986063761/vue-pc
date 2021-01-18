<template>
  <div class="drclick-page">
    <button type="danger" v-dr-click @click="click">Danger</button>
  </div>
</template>

<script>
  export default {
    methods: {
      click(event) {
        console.log(event)
      }
    }
  }
</script>

<style>

</style>