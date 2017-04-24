<template>
  <div>{{ start }} - {{ end }} of {{ total }}</div>
</template>

<script>
  export default {
    props: {
      start: {
        type: Number,
        required: true
      },

      end: {
        type: Number,
        required: true
      },

      total: {
        type: Number,
        required: true
      }
    }
  }
</script>
