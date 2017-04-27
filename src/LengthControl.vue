<template>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label>Rows per page: </label>
    </div>
    <div class="control">
      <div class="select">
        <select v-on:change="onChange">
          <option>10</option>
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      onChange (event) {
        this.$emit('change', event.target.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~bulma/sass/utilities/variables';
  @import '~bulma/sass/utilities/controls';
  @import '~bulma/sass/utilities/mixins';
  @import '~bulma/sass/elements/form';
</style>