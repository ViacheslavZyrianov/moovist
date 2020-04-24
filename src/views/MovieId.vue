<template>
  <div class="movieId">
    <div
      v-if="movie"
      class="movie"
    >
      <h1 class="movie__title">{{ movie.Title }}</h1>
      <div class="movie__content">
        <div :class="moviePosterClassList(movie.Poster)">
          <img
            :src="movie.Poster"
            :alt="movie.Title"
          >
        </div>
        <div class="movie__description">
          <div
            v-for="movieDescriptionItem in movieDescriptionList"
            :key="Object.keys(movieDescriptionItem)[0]"
            class="movie__description-item"
          >
            <span class="description-item__title">{{ Object.keys(movieDescriptionItem)[0] }}</span>
            <span class="description-item__value">: {{ movieDescriptionItem[Object.keys(movieDescriptionItem)[0]] }}</span>
          </div>
        </div>
      </div>
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
    movie: null,
    movieDescriptionList: []
  }),
  methods: {
    ...mapActions({
      fetchMovieById: 'fetchMovieById'
    }),
    moviePosterClassList (moviePoster) {
      return [
        'movie__poster',
        { 'movie__poster_empty': moviePoster === 'N/A' }
      ]
    }
  },
  async created () {
    this.movie = await this.fetchMovieById(this.$route.params.movieId)
    const movieDescriptionKeyList = ['Plot', 'Actors', 'Director', 'Writer', 'Genre', 'Year', 'Runtime', 'Released', 'Rated', 'Awards']
    this.movieDescriptionList = movieDescriptionKeyList.map(movieDescriptionKey => ({ [movieDescriptionKey]: this.movie[movieDescriptionKey] }))
  }
}
</script>

<style lang="scss" scoped>
  .movie {
    &__poster {
      margin-right: 32px;
      min-width: 288px;
      min-height: 400px;

      &_empty {
        background-image: url('../assets/img/no-poster.png');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    &__content {
      display: flex;
      align-items: flex-start;
    }

    &__description-item {
      margin-bottom: 16px;

      .description-item {
        &__title {
          font-weight: 500;
        }

        &__value {
          line-height: 1.5;
        }
      }
    }
  }
</style>