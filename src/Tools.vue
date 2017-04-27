<template>
  <div class="table-tools">
    <slot>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="field">
              <div class="control has-icons-right">
                <input class="input" type="text" :placeholder="`Find a ${label}`" v-on:input="onSearch">
                <span class="icon is-small is-right">
                  <i class="fa fa-search"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <router-link class="button is-success" :to="link">Create {{ label }}</router-link>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
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

    methods: {
      onSearch: function (event) {
        this.$emit('search', event.target.value)
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
    margin-bottom: 1rem;

    *,
    *:before,
    *:after {
      box-sizing: inherit
    }

    a {
      text-decoration: none;
    }
  }
</style>