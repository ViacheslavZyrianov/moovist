<template>
  <div :class="pageHomeClassList">
    <label
      for="movieSearch"
      class="page_home__title"
    >
      MOOVIST
    </label>
    <form
      @submit.prevent="onSearchMovies"
      class="movie-search__form"
    >
      <input
        v-model="movieSearch"
        type="text"
        placeholder="Search for a movie..."
        class="input form__input"
      >
      <button
        :disabled="isSubmitButtonDisabled"
        type="submit"
        class="button form__button"
      >
        Search
      </button>
    </form>
    <template v-if="isMovieListVisible">
      <div class="movie-search__controls">
        <div class="movie-search__total">
          Found {{ movieListTotalCount }} movies
        </div>
        <div class="movie-search__filter-list">
          <div
            v-for="filterItem in filterList"
            :key="filterItem.id"
            class="filter-list__filter-item"
          >
            <label
              :for="filterItem.id"
              class="filter-item__label"
            >
              {{ filterItem.label }}
            </label>
            <input
              :id="filterItem.id"
              :name="filterItem.name"
              :value="filterItem.value"
              v-model="selectedFilter"
              type="radio"
            >
          </div>
        </div>
      </div>
      <MovieList
        :movie-list="movieListFiltered"
        class="movie-search__movie-list"
      />
      <button
        v-if="isButtonShowMoreMoviesVisible"
        class="button"
        @click="onFetchMoreMovies"
      >
        Show more movies
      </button>
    </template>
    <div class="movie-search__error">
      {{ movieListError }}
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import MovieList from '@/components/MovieList.vue'

export default {
  name: 'Home',
  data: () => ({
    movieSearch: '',
    movieList: [],
    movieListTotalCount: 0,
    movieListError: null,
    filterList: [
      {
        label: 'All',
        value: 'all',
        name: 'filter-by-type',
        id: 'filter-all'
      },
      {
        label: 'Movies',
        value: 'movie',
        name: 'filter-by-type',
        id: 'filter-movie'
      },
      {
        label: 'Series',
        value: 'series',
        name: 'filter-by-type',
        id: 'filter-series'
      }
    ],
    selectedFilter: 'all',
    currentPage: 1
  }),
  components: {
    MovieList
  },
  computed: {
    isButtonShowMoreMoviesVisible () {
      return this.movieListTotalCount - this.currentPage * 10 > 0
    },
    isSubmitButtonDisabled () {
      return this.movieSearch.length < 3
    },
    isMovieListVisible () {
      return this.movieList.length > 0 && !this.movieListError
    },
    pageHomeClassList () {
      return [
        'page',
        'page_home',
        { 'page_home-with-search-results': this.movieList.length > 0 }
      ]
    },
    movieListFiltered () {
      return this.selectedFilter === 'all' ? this.movieList : this.movieList.filter(movie => movie.Type === this.selectedFilter)
    }
  },
  methods: {
    ...mapActions({
      fetchMovieList: 'fetchMovieList'
    }),
    async onFetchMovieList () {
      const movieListData = await this.fetchMovieList({
        search: this.movieSearch,
        page: this.currentPage
      })
      this.movieListError = movieListData.Error 
      if (this.movieListError) {
        this.currentPage = 1
        this.movieList = []
      } else {
        this.movieList = [...this.movieList, ...movieListData.Search]
        this.movieListTotalCount = movieListData.totalResults
      }
    },
    async onSearchMovies () {
      this.currentPage = 1
      this.movieList = []
      await this.onFetchMovieList()
    },
    async onFetchMoreMovies () {
      this.currentPage += 1
      await this.onFetchMovieList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .page_home {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &-with-search-results {
      justify-content: flex-start;
    }
    
    &__title {
      font-size: 72px;
      font-weight: 700;
      text-align: center;
      margin-bottom: 24px;
    }
  }
  
  .movie-search {
    &__controls {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }

    &__filter-list {        
      display: flex;
    }

    &__form {
      display: flex;
      width: 100%;
      margin-bottom: 32px;
    }

    &__movie-list {
      margin-bottom: 32px;
    }
  }

  .filter-list {
    &__filter-item {
      user-select: none;
      margin-left: 8px;
    }
  }

  .form {
    &__input {
      flex: 1;
      width: 100%;
      padding: 16px;
      margin-right: 16px;
      font-size: 24px;
    }

    &__button {
      min-width: 200px;
    }
  }
</style>
