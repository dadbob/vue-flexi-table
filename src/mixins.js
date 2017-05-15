export default {
  data () {
    return {
      dtPage: 1,
      dtPerPage: 10
    }
  },

  methods: {
    dtGoNext () {
      if (this.dtPage < this.dtTotalPages) {
        this.dtPage++
      }
    },

    dtGoPrev () {
      if (this.dtPage > 1) {
        this.dtPage--
      }
    },

    dtGoPage (page) {
      if (page >= 1 || page <= this.dtTotalPages) {
        this.dtPage = page
      }
    },

    dtLengthChange (length) {
      this.dtPerPage = Number(length)
    },
  },

  computed: {
    dtTotalRecords () { 
      return this.dtRows.length
    },

    dtTotalPages () {
      const pages = this.dtTotalRecords / this.dtPerPage

      return Number.isInteger(pages) ? pages : parseInt(pages) + 1
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
      if (this.dtTotalPages === 0 || this.dtTotalPages === 1) return [1];

      /* This implementation is fixed on this value */
      const MAX_PAGINATION = 10
      let pages = []

      /* We need to show ellipsis when total pages exceed the limit */
      if (this.dtTotalPages > MAX_PAGINATION) {
        /**
         *  We are within the MAX_PAGINATION LIMIT
         *  Subtracted 2 because it is for ('', {last page})
         */
        if (this.dtPage < MAX_PAGINATION - 2) {
          for (let i = 1; pages.length < MAX_PAGINATION - 2; i++) {
            pages.push(i)
          }

          pages = pages.concat(['', this.dtTotalPages])
        }

        /* We are within beyond right ellipsis pages */
        else {
          /**
           *  Next page is 2nd to the last page and up
           *  No need for right ellipsis.
           */
          if ((this.dtPage + 1) >= (this.dtTotalPages - 1)) {
            let rightPages = []
            for (let i = this.dtPage; i <= this.dtTotalPages; i++) {
              rightPages.push(i)
            }

            let leftPages = []
            /* Subtracted 2 because it is for (1, '', {right pages}) */
            for (let i = this.dtPage - 1; (leftPages.length + rightPages.length) < MAX_PAGINATION - 2; i--) {
              leftPages.push(i)
            }

            pages = [1, '', ...leftPages.reverse(), ...rightPages]
          } else {
            /**
             *  Subtracted 6 because it is for: 
             *  (1, '', {current page}, {next page}, '', {last page})
             */
            let leftPages = []
            for (let i = this.dtPage - 1; leftPages.length < MAX_PAGINATION - 6; i--) {
              leftPages.push(i)
            }

            pages = [1, '', ...leftPages.reverse(), this.dtPage, this.dtPage + 1, '', this.dtTotalPages]
          }
        }
      } else {
        for (let i = 1; i <= this.dtTotalPages; i++) {
          pages.push(i)
        }
      }

      return pages
    }
  }
}