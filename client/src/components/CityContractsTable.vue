<template>
  <div>
    <md-table md-sort="calories">
      <md-table-header>
        <md-table-row>
          <md-table-head md-sort-by="id">ID</md-table-head>
          <md-table-head md-sort-by="city" md-tooltip="">City</md-table-head>
          <md-table-head md-sort-by="start_date">Start date</md-table-head>
          <md-table-head md-sort-by="end_date">End date</md-table-head>
          <md-table-head md-sort-by="price">Price</md-table-head>
          <md-table-head md-sort-by="status">Status</md-table-head>
          <md-table-head md-sort-by="color">Color</md-table-head>
          <md-table-head v-if="contentsEditable">
            <md-icon>settings</md-icon>
            <span>Actions</span>
          </md-table-head>
        </md-table-row>
      </md-table-header>
      <md-layout md-align="center" md-gutter="16">
        <md-spinner :md-size="150" md-indeterminate v-if="!cityContracts.length && !errors.length"></md-spinner>
      </md-layout>
      <md-table-body v-if="cityContracts && cityContracts.length">

        <md-table-row v-for="(cityContract, index) of cityContracts" :key="cityContract.id" >
          <md-table-cell>{{ cityContract.id }}</md-table-cell>
          <md-table-cell>{{ cityContract.city }}</md-table-cell>
          <md-table-cell>{{ cityContract.start_date | dateFilter }}</md-table-cell>
          <md-table-cell>{{ cityContract.end_date | dateFilter }}</md-table-cell>
          <md-table-cell>{{ cityContract.price }}</md-table-cell>
          <md-table-cell>{{ cityContract.status }}</md-table-cell>
          <md-table-cell>{{ cityContract.color }}</md-table-cell>
          <md-table-cell v-if="contentsEditable">
            <md-button class="md-icon-button md-raised md-primary" v-on:click="editCityContract(cityContract)">
              <md-icon>edit</md-icon>
            </md-button>
            <md-button class="md-icon-button md-raised md-warn" v-on:click="deleteCityContract(cityContract.id)">
              <md-icon>remove</md-icon>
            </md-button>
          </md-table-cell>
        </md-table-row>

      </md-table-body>
      <md-dialog md-open-from="#fab" md-close-to="#fab" ref="dialog2">
        <city-contract-dialog :dialogRef="this.$refs['dialog2']" :cityContract.sync="dialogCityContract"></city-contract-dialog>
      </md-dialog>

    </md-table>

    <md-bottom-bar v-if="pagination && pagination.pages">
      <md-button
        v-for="key of pageButtons"
        v-on:click="openPage(key)"
        class="md-raised"
        v-bind:class="{ 'md-primary': (key === pagination.currentPage) }"
        :disabled="key === '...'">{{ key }}</md-button>
    </md-bottom-bar>
    <md-button class="md-fab md-fab-bottom-right" id="fab" @click.native="openDialog('dialog2')">
      <md-icon>add</md-icon>
    </md-button>
    <ul v-if="errors && errors.length">
      <li v-for="error of errors">
        {{error.message}}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import CityContractDialog from '@/components/CityContractDialog';

export default {
  props: ['contentsEditable'],
  data() {
    return {
      dialogCityContract: {},
      cityContracts: [],
      pagination: {
        currentPage: 1,
      },
      errors: [],
    };
  },
  filters: {
    dateFilter(value) {
      if (!value) return '';
      const date = new Date(value);
      return date.toDateString();
    },
  },
  components: {
    CityContractDialog,
  },
  methods: {
    onOpen() {
      // console.log('Opened');
    },
    onClose(clos) {
      console.log('Closed', clos);
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    deleteCityContract(id) {
      apiService.delete(id)
      .then(() => {
        this.openPage(this.pagination.currentPage);
      })
      .catch((err) => {
        this.errors.push(err);
        this.$refs.snackbar.open();
      });
    },
    editCityContract(cityContract) {
      const updateCityContract = {
        id: cityContract.id,
        price: cityContract.price,
        status: cityContract.status,
        start_date: new Date(cityContract.start_date),
        end_date: new Date(cityContract.end_date),
        city: cityContract.city,
        color: cityContract.color,
      };
      this.dialogCityContract = updateCityContract;

      this.openDialog('cityContractDialog');
    },
    openPage(page) {
      axios.get(`http://192.168.99.100:3000/city_contracts/${page}`)
      .then((response) => {
        this.cityContracts = response.data.docs;
        this.pagination = {
          currentPage: page,
          pages: response.data.pages,
          total: response.data.total,
        };
      })
      .catch((err) => {
        this.errors.push(err);
      });
    },
  },
  computed: {
    pageButtons() {
      let pagesArray = [];
      if (this.pagination.pages <= 10) {
        for (let i; i <= this.pagination.pages; i += 1) {
          pagesArray.push(i);
        }
      } else {
        const currPage = this.pagination.currentPage;
        if (currPage >= 4) {
          pagesArray = [1, 2, '...',
            currPage - 1, currPage, currPage + 1, '...',
            this.pagination.pages,
          ];
        } else {
          pagesArray = [1, 2, 3, 4, '...', this.pagination.pages];
        }
      }
      return pagesArray;
    },
  },
  created() {
    this.openPage(this.pagination.currentPage);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 .md-dialog {
   min-width: 420px;
   max-width: 80%;
   max-height: 100%;
 }
</style>
