<template>
  <div id="app">
    <md-toolbar>
      <h2 class="md-title" style="flex: 1">City Contract App</h2>

      <router-link tag="md-button" to="/frontend" class="md-raised md-accent">Frontend</router-link>
      <router-link tag="md-button" to="/backend" class="md-raised">Backend</router-link>

    </md-toolbar>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;

}
</style>
