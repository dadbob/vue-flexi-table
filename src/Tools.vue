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

<style lang="scss">
  @import '~bulma/sass/utilities/variables';
  @import '~bulma/sass/utilities/controls';
  @import '~bulma/sass/utilities/mixins';
  @import '~bulma/sass/elements/form';
  @import '~bulma/sass/components/level';

  .table-tools {
    margin-bottom: 1rem;
  }
</style>
