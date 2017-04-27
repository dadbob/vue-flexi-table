<template>
  <table class="table">
    <thead>
      <slot name="header">
        <tr>
          <th v-for="column in columns" v-text="column.text"></th>
        </tr>
      </slot>
    </thead>

    <tbody>
      <tr v-if="loading">
        <td :colspan="columns.length" style="text-align: center;">Loading Data</td>
      </tr>

      <tr v-else-if="computedRows.length === 0">
        <td :colspan="columns.length" style="text-align: center;">No Available Data</td>
      </tr>

      <tr v-else v-for="row in computedRows">
        <slot v-for="column in columns" :name="column.name" :value="row[column.name]">
          <td v-html="row[column.name]"></td>
        </slot>
      </tr>
    </tbody>

    <tfoot>
      <slot name="footer">
        <tr>
          <th v-for="column in columns" v-text="column.text"></th>
        </tr>
      </slot>
    </tfoot>
  </table>
</template>

<script>
  import Sifter from 'sifter'
  import debounce from 'lodash/debounce'

  export default {
    props: {
      columns: {
        type: Array
      },

      rows: {
        type: Array,
        required: true
      },

      query: {
        type: String
      },

      /**
       *  Search settings
       *
       *  @param boolean server
       *  @param object settings // For more info: https://github.com/brianreavis/sifter.js/#api
       */
      search: {
        type: Object
      },

      page: {
        type: Number,
        required: true
      },

      perPage: {
        type: Number,
        default: 10
      }
    },

    created () {
      if (this.search) {
        this.checkSearchSettings()
      }
    },

    data () {
      return {
        loading: false, // Used to show loading row

        results: [], // Filled with rows returned by search method

        sifter: new Sifter(this.rows), // Used for searching locally
      }
    },

    computed: {
      /**
       *  Return all rows for current page
       */
      computedRows () {
        /**
         * Query results takes precedence
         */
        if (this.hasQuery) {
          return this.results
        }

        return this.rows.slice(this.start - 1, this.end)
      },

      computedSearchSettings () {
        const defaultSettings = {
          server: false
        }

        return Object.assign({}, defaultSettings, this.search)
      },

      hasQuery () {
        return this.query.length > 0 || !!this.query.trim()
      },

      totalRecords () {
        return this.rows.length
      },

      /* Starting row number of current page */
      start () {
        return (this.totalRecords === 0) ? 0 : (this.page * this.perPage) - (this.perPage - 1)
      },

      /* Ending row number of current page */
      end () {
        return (this.page * this.perPage > this.totalRecords) ? this.totalRecords : this.page * this.perPage
      }
    },

    methods: {
      checkSearchSettings () {
        if (!this.search.server instanceof Boolean) {
          throw "Server option value must be a Boolean"
        }

        if (!this.search.settings instanceof Object) {
          throw "Search settings must be an object"
        }

        if (!this.search.settings.fields instanceof Array) {
          throw "Search fields must be an array"
        }

        if (this.search.settings.fields.length === 0) {
          throw "Search fields cannot be empty."
        }
      },

      onSearch: debounce(function () {
        this.doSearch()
      }, 250),

      /**
       *  Supposed to be named as `search` but is already used as a prop name
       */
      doSearch () {
        if (this.hasQuery && this.totalRecords > 0) {
          this.computedSearchSettings.server ? this.remoteSearch() : this.localSearch()
        } else {
          this.results = []
          this.loading = false
        }
      },

      localSearch () {
        let results = this.sifter.search(this.query, this.computedSearchSettings.settings)

        this.results = results.items.map((item) => {
          return this.rows[item.id]
        })

        this.loading = false
      },

      remoteSearch () {

      }
    },

    watch: {
      query: function (newVal) {
        this.loading = true
        this.onSearch()
      },

      rows: function (newVal) {
        this.sifter.items = newVal
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~bulma/sass/utilities/variables';
  @import '~bulma/sass/elements/table';

  .table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  .table th, .table td {
    vertical-align: middle !important;
  }
</style>