<template>
  <div class="level">
    <div class="level-left">
      <div class="level-item"><span class="label">{{ label }}</span></div>
      <div class="level-item" v-for="filter in filters">
        <button
          type="button"
          :class="['button', selected === filter ? 'is-primary' : '']"
          v-on:click="onFilterClick(filter)">{{ toUpperCase(filter) }}</button>
      </div>
    </div>
    <div class="level-right"></div>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: 'Filters'
      },

      filters: {
        required: true,
        type: Array
      },

      selected: {
        type: String
      }
    },

    methods: {
      toUpperCase (string) {
        return string[0].toUpperCase() + string.substr(1)
      },

      onFilterClick (filter) {
        this.$emit('filter', filter)
      }
    }
  }
</script>

<style lang="scss">
  
</style>