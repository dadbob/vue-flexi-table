<template>
  <nav class="pagination">
    <ul class="pagination list">
      <li>
        <button
          type="button"
          class="pagination-link"
          :disabled="onFirstPage"
          v-on:click="onPrevClick">
          <i class="fa fa-chevron-left"></i>
        </button>
      </li>
      <li v-for="page in pages">
        <span v-if="!page" class="pagination-ellipsis">&hellip;</span>
        <button v-else
          type="button"
          class="pagination-link"
          :disabled="currentPage === page"
          v-on:click="onPageClick(page)">{{ page }}</button>
      </li>
      <li>
        <button
          type="button"
          class="pagination-link"
          :disabled="onLastPage || noNextPage"
          v-on:click="onNextClick">
          <i class="fa fa-chevron-right"></i>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    props: {
      currentPage: {
        type: Number,
        required: true
      },

      totalPages: {
        type: Number,
        required: true
      },

      pages: {
        type: Array,
        required: true
      }
    },

    computed: {
      onFirstPage () {
        return this.currentPage === 1
      },

      onLastPage () {
        return this.currentPage === this.totalPages
      },

      noNextPage () {
        return this.totalPages < 2
      }
    },

    methods: {
      onPageClick (page) {
        this.$emit('pageClick', page)
      },

      onPrevClick () {
        this.$emit('prevClick')
      },

      onNextClick () {
        this.$emit('nextClick')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~bulma/sass/utilities/all';
  @import '~bulma/sass/components/pagination';
  @import '~bulma/sass/elements/button';

  .pagination.list {
    padding: 0;
  }

  .pagination.list > li {
    list-style-type: none;
  }
</style>