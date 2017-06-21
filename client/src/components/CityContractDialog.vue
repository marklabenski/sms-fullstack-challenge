<template>
  <div>
    <md-dialog-title>Create new note</md-dialog-title>

    <md-dialog-content>
      <form>
        <md-input-container md-clearable>
          <label>City</label>
          <md-input v-model="cityContractModel.city" required></md-input>
        </md-input-container>
        <label>Start Date</label>
        <mdl-datepicker
          v-model="cityContractModel.start_date"
        ></mdl-datepicker>
        <label>End Date</label>
        <mdl-datepicker
          v-model="cityContractModel.end_date"
        ></mdl-datepicker>
        <md-input-container md-clearable>
          <label>Price</label>
          <md-input v-model="cityContractModel.price" required></md-input>
          <md-icon>attach_money</md-icon>
        </md-input-container>
        <md-input-container md-clearable>
          <label>Status</label>
          <md-input v-model="cityContractModel.price"></md-input>

        </md-input-container>
        <md-input-container md-clearable>
          <label>Color</label>
          <md-input v-model="cityContractModel.price"></md-input>
        </md-input-container>
      </form>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button class="md-primary" @click.native="closeDialog('dialog2')">Cancel</md-button>
      <md-button class="md-primary" @click.native="closeDialog('dialog2')">Create</md-button>
    </md-dialog-actions>
  </div>
</template>

<script>
import 'vue-mdl-datepicker/dist/vue-mdl-datepicker.css';
import MdlDatepicker from 'vue-mdl-datepicker';

export default {
  props: ['cityContract', 'dialogRef'],
  components: { MdlDatepicker },
  data() {
    return {
      cityContractModel: this.cityContract,
    };
  },
  methods: {
    closeDialog() {
      this.dialogRef.close('test');
    },
  },
  created() {
    if (!this.cityContractModel) {
      this.cityContractModel = {
        city: '',
        price: '',
        start_date: new Date(),
        end_date: new Date(),
        status: '',
        color: '',
      };
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-style {
  display: block;
  padding: 5px;
  font-size: 16px;
  line-height: 16px;
  background-color: #ffffff;
  border: 1px solid #B7B7B7;
  border-radius: 4px;
}
</style>
