<template>
  <div class="table-tools">
    <div class="level">
      <div class="level-left">
        <div class="level-item"><span class="table-title">{{ formattedLabel }}</span></div>
      </div>
      <div class="level-right">
        <div class="level-item"><search v-on:search="onSearch"></search></div>
        <div class="level-item">
          <router-link class="button is-success" :to="link">Create {{ label }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Search from './Search'

  export default {
    props: {
      label: {
        type: String,
        required: true
      },

      link: {
        type: String,
        required: true
      }
    },

    components: {
      Search
    },

    computed: {
      formattedLabel () {
        return this.label[0].toUpperCase() + this.label.substr(1)
      }
    },

    methods: {
      onSearch: function (query) {
        this.$emit('search', query)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~bulma/sass/utilities/all';
  @import '~bulma/sass/elements/form';
  @import '~bulma/sass/elements/icon';
  @import '~bulma/sass/elements/button';
  @import '~bulma/sass/components/level';

  .table-tools {
    box-sizing: border-box;
    width: 100%;

    *,
    *:before,
    *:after {
      box-sizing: inherit
    }

    a {
      text-decoration: none;
    }
  }

  .table-title {
    font-size: 1.5rem;
    font-weight: 700;
  }
</style>