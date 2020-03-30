<template>
  <div class="movie-list">
    <div class="movie-list__list">
      <router-link
        v-for="(movieItem, movieItemIndex) in movieList"
        :key="`${movieItemIndex}-${movieItem.imdbID}`"
        :to="`movies/${movieItem.imdbID}`"
        class="movie-list__item"
      >
        {{ movieItem.Title }}, {{ movieItem.Year }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieList',
  props: {
    movieList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
  .movie-list {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__list {
      display: flex;
      flex-direction: column;
    }
    
    &__item {
      color: #000;
      text-decoration: none;
      padding: 16px;
      border: 1px solid #afafaf;
      border-radius: 4px;
      margin-bottom: 8px;
      transition: background-color 0.3s;

      &:last-child {
        margin-bottom: 0;
      }

      &:hover {
        background-color: #f1f1f1;
      }
    }
  }
</style>