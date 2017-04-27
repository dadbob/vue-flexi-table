<template>
  <div>
    <flexi-table-tools label="customer" link="/create" v-on:search="onSearch"></flexi-table-tools>

    <flexi-table :columns="columns" :rows="formattedRows" :query="query" :search="searchOption" :page="dtPage" :perPage="dtPerPage">
      <template slot="address" scope="props">
        <td>
          <div>{{ props.value.street }}</div>
          <div>{{ props.value.city }}, {{ props.value.zipcode }}</div>
        </td>
      </template>

      <template slot="actions" scope="props">
        <td>
          <button type="button" class="button is-small is-outlined is-warning" v-on:click="onEditClick">
            <i class="fa fa-pencil"></i>
          </button>

          <button type="button" class="button is-small is-outlined is-danger" v-on:click="onDeleteClick(props.value)">
            <i class="fa fa-trash"></i>
          </button>
        </td>
      </template>
    </flexi-table>

    <div class="table-pagination">
      <div class="level">
        <div class="level-left"></div>
        <div class="level-right">
          <div class="level-item">
            <flexi-table-length-control v-on:change="dtLengthChange"></flexi-table-length-control>
          </div>

          <div class="level-item">
            <flexi-table-length
              :start="dtStart"
              :end="dtEnd"
              :total="dtTotalRecords"></flexi-table-length>
          </div>

          <div class="level-item">
            <flexi-table-pagination
              :totalPages="dtTotalPages"
              :currentPage="dtPage"
              :pages="dtPagination"
              v-on:prevClick="dtGoPrev"
              v-on:pageClick="dtGoPage"
              v-on:nextClick="dtGoNext"></flexi-table-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {dtMixins, Length, LengthControl, Pagination, Table, Tools} from '../../../src'

  export default {
    components: {
      'flexi-table': Table,
      'flexi-table-tools': Tools,
      'flexi-table-length': Length,
      'flexi-table-pagination': Pagination,
      'flexi-table-length-control': LengthControl
    },

    mixins: [dtMixins],

    created () {
      axios.get('https://jsonplaceholder.typicode.com/users')
        .then(({ data }) => {
          this.dtRows = data
        })
    },

    data () {
      return {
        dtRows: [],

        columns: [
          { name: 'name', text: 'Full Name' },
          { name: 'username', text: 'Username' },
          { name: 'phone', text: 'Phone' },
          { name: 'address', text: 'Address' },
          { name: 'actions', text: 'Actions' }
        ],

        query: '',

        searchOption: {
          server: false,
          settings: {
            fields: ['name', 'username', 'phone', 'address.street', 'address.city', 'address.zipcode'],
            nesting: true
          }
        }
      }
    },

    computed: {
      formattedRows () {
        return this.dtRows.map(function(row) {
          return {
            name: row.name,
            username: row.username,
            phone: row.phone,
            address: row.address,
            actions: row.id
          }
        })
      }
    },

    methods: {
      onEditClick () {
        alert('Edit was clicked!')
      },

      onDeleteClick (id) {
        alert(`Delete ${id} was clicked!`)
      },

      onSearch (query) {
        this.query = query
      }
    }
  }
</script>

<style lang="scss">
  @import '~bulma/sass/utilities/all';
  @import '~bulma/sass/base/minireset';
  @import '~bulma/sass/components/all';
  @import '~bulma/sass/elements/all';
</style>