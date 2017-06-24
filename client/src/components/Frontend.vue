<template>
  <div>
    <md-toolbar class="md-dense md-accent">
      <md-button class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title" style="flex: 1">Frontend</h2>
    </md-toolbar>
    <city-contracts-table :contentsEditable="false">
    </city-contracts-table>
  </div>
</template>

<script>
import CityContractsTable from '@/components/CityContractsTable';

export default {
  data() {
    return {
      msg: 'Hello SMS Digital and thank you for this opportunity!',
    };
  },
  components: {
    CityContractsTable,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
