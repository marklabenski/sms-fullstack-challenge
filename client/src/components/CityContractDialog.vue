<template>
  <div>
    <md-dialog-title>Create new note</md-dialog-title>

    <md-dialog-content>
      <form>
        <md-input-container md-clearable>
          <label>City</label>
          <md-input v-model="cityContract.city" required></md-input>
        </md-input-container>
        <label>Start Date</label>
        <mdl-datepicker
          ref="startDatePicker"
          :default="defaultStartDate"
          v-model="cityContract.start_date"
        ></mdl-datepicker>
        <label>End Date</label>
        <mdl-datepicker
          ref="endDatePicker"
          :default="defaultEndDate"
          v-model="cityContract.end_date"
        ></mdl-datepicker>
        <md-input-container md-clearable>
          <label>Price</label>
          <md-input v-model="cityContract.price" required></md-input>
          <md-icon>attach_money</md-icon>
        </md-input-container>
        <md-input-container md-clearable>
          <label>Status</label>
          <md-input v-model="cityContract.status"></md-input>

        </md-input-container>
        <md-input-container md-clearable>
          <label>Color</label>
          <md-input v-model="cityContract.color"></md-input>
        </md-input-container>
      </form>
    </md-dialog-content>

    <md-dialog-actions>
      <md-button v-if="isNewCityContract" class="md-primary" @click.native="emitEvent('create')">Create</md-button>
      <md-button v-if="!isNewCityContract" class="md-primary" @click.native="emitEvent('update')">Update</md-button>
      <md-button class="md-primary" @click.native="closeDialog()">Cancel</md-button>
    </md-dialog-actions>
  </div>
</template>

<script>
import 'vue-mdl-datepicker/dist/vue-mdl-datepicker.css';
import MdlDatepicker from 'vue-mdl-datepicker';

export default {
  props: ['cityContract', 'dialogRef'],
  components: { MdlDatepicker },
  methods: {
    emitEvent(eventName) {
      this.$emit(eventName, this.cityContract);
      this.closeDialog();
    },
    closeDialog() {
      this.$refs.startDatePicker.date = null;
      this.$refs.startDatePicker.$forceUpdate();
      this.$refs.endDatePicker.date = null;
      this.$refs.endDatePicker.$forceUpdate();
      this.dialogRef.close();
    },
  },
  updated() {
    if (!this.cityContract.start_date) {
      this.cityContract.start_date = new Date();
      this.$refs.startDatePicker.date = new Date();
      this.$refs.startDatePicker.$forceUpdate();
    }
    if (!this.cityContract.end_date) {
      this.cityContract.end_date = new Date();
      this.$refs.endDatePicker.date = new Date();
      this.$refs.endDatePicker.$forceUpdate();
    }
  },
  computed: {
    isNewCityContract() {
      return !this.cityContract.id;
    },
    defaultStartDate() {
      if (!this.cityContract.start_date) {
        return null;
      }
      if (this.$refs.startDatePicker) {
        this.$refs.startDatePicker.date = new Date(this.cityContract.start_date);
        this.$refs.startDatePicker.$forceUpdate();
      }
      return new Date(this.cityContract.start_date);
    },
    defaultEndDate() {
      if (!this.cityContract.end_date) {
        return null;
      }
      if (this.$refs.endDatePicker) {
        this.$refs.endDatePicker.date = new Date(this.cityContract.end_date);
        this.$refs.endDatePicker.$forceUpdate();
      }
      return new Date(this.cityContract.end_date);
    },
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
