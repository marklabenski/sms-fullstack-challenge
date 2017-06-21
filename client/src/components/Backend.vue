<template>
  <div>
    <md-toolbar class="md-dense md-transparent">
      <md-button class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>

      <h2 class="md-title md-warning" style="flex: 1">Backend</h2>
    </md-toolbar>
    <city-contracts-table contentsEditable="true">
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
