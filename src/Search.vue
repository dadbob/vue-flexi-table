<template>
  <div class="control has-icons-right">
    <input class="input" type="text" :placeholder="placeholder" v-on:input="onSearch">
    <span class="icon is-small is-right">
      <i class="fa fa-search"></i>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: 'Type to search...'
      }
    },

    methods: {
      onSearch (event) {
        this.$emit('search', event.target.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~bulma/sass/utilities/all';
  @import '~bulma/sass/elements/form';
  @import '~bulma/sass/elements/icon';
</style>