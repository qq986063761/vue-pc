<template>
  <div class="drclick-page">
    <a-button type="danger" v-dr-click @click="click">Danger</a-button>
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