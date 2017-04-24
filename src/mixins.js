export default {
  data () {
    return {
      dtPage: 1,
      dtPerPage: 10
    }
  },

  methods: {
    dtGoNext () {
      if (this.page < this.dtTotalPages) {
        this.dtPage++
      }
    },

    dtGoPrev () {
      if (this.page > 1) {
        this.dtPage--
      }
    },

    dtGoPage (page) {
      if (page >= 1 || page <= this.dtTotalPages) {
        this.dtPage = page
      }
    },

    dtLengthChange (length) {
      this.dtPerPage = length
    },
  },

  computed: {
    dtTotalRecords () {
      return this.dtRows.length
    },

    dtTotalPages () {
      return this.dtTotalRecords / this.dtPerPage
    },

    /* Starting row number of current page */
    dtStart () {
      return (this.dtTotalRecords === 0) ? 0 : (this.dtPage * this.dtPerPage) - (this.dtPerPage - 1)
    },

    /* Ending row number of current page */
    dtEnd () {
      return (this.dtPage * this.dtPerPage > this.dtTotalRecords) ? this.dtTotalRecords : this.dtPage * this.dtPerPage
    },

    /* Create pagination numbers */
    dtPagination () {
      /* Minimum ajacent page number on both sides */
      const ADJACENT_PAGINATION = 3

      /* Max pagination links (and when to show ellipsis) */
      const MAX_PAGINATION = 10

      /* Always append first page */
      let pages = [1]

      /**
       *  We need to show ellipsis when total pages exceed the limit
       */
      if (this.dtTotalPages > MAX_PAGINATION) {
        /**
         *  Append left adjacent pages only if page is greater than 2
         *  else nothing actually is being computed
         */
        if (this.dtPage > 2) {
          pages.push('') // ellipsis
          for (let i = this.dtPage - ADJACENT_PAGINATION; i < this.dtPage; i++) {
            pages.push(i)
          }
        }

        /**
         *  Append current page and right adjancent.
         *  also fills up remaining pages in case left adjacent did not complete.
         *  subtracted 1 because last value will be the this.totalPages
         */
        for (let i = this.dtPage; pages.length < (MAX_PAGINATION - 1); i++) {
          if (i > this.dtTotalPages) {
            pages.push(i)
          }
        }

        /**
         *  Current last page in `pages` array is not
         *  the number of total pages. We add ellipsis.
         */
        if (pages.slice(-1)[0] !== this.dtTotalPages - 1) {
          pages.push('')
        }

        /* Always append the max page as the last page */
        pages.push(this.dtTotalPages)
      } else {
        for (let i = 2; i <= this.dtTotalPages; i++) {
          pages.append(i)
        }
      }

      return pages
    }
  }
}