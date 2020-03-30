<template>
  <div
    id="app"
    class="moovist"
  >
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;700&display=swap');

  * {
    box-sizing: border-box;
    outline: none;
  }

  .moovist {
    display: flex;
    font-family: 'Roboto', serif;
    min-height: 100vh;
    padding: 24px;
  }

  .page {
    width: 100%;
  }

  .input {
    border: 1px solid #afafaf;
    border-radius: 4px;
    background-color: transparent;
  }

  .button {
    padding: 8px 16px;
    border: 0;
    border-radius: 4px;
    background-color: #20639b;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: lighten(#20639b, 16);
    }

    &[disabled] {
      background-color: rgb(143, 143, 143);
      cursor: disabled;
    }
  }
</style>
