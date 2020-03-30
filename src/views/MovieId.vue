<template>
  <div class="movieId">
    <div
      v-if="movie"
      class="movie"
    >
      <h1>{{ movie.Title }}</h1>
      <img
        :src="movie.Poster"
        :alt="movie.Title"
      >
    </div>
    <div
      v-else
      class="loading"
    >
      Loading movie data...
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MovieId',
  data: () => ({
    movie: null
  }),
  methods: {
    ...mapActions({
      fetchMovieById: 'fetchMovieById'
    }),
  },
  async created () {
    this.movie = await this.fetchMovieById(this.$route.params.movieId)
  }
}
</script>