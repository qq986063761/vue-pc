<template>
  <div class="comment-page">
    <comment-input @on-submit="submit"></comment-input>
  </div>
</template>

<script>
  export default {
    methods: {
      submit({content, usrs}) {
        console.log(content, usrs)
      }
    }
  }
</script>

<style>

</style>