<template>
  <div
    id="app"
    class="moovist"
  >
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100,300;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');

  * {
    box-sizing: border-box;
    outline: none;
  }

  .moovist {
    display: flex;
    font-family: 'Roboto', serif;
    font-weight: 100;
    color: #292929;
    min-height: 100vh;
    padding: 24px;
  }

  .container {
    width: 70vw;
    min-width: 960px;
    display: flex;
    flex-direction: column;
  }

  .page {
    width: 100%;
  }

  .input {
    font-weight: 100;
    border: 1px solid #afafaf;
    border-radius: 4px;
    background-color: transparent;
  }

  .button {
    font-weight: 100;
    font-size: 24px;
    color: #fff;
    padding: 16px 24px;
    border: 0;
    border-radius: 4px;
    background-color: #20639b;
    cursor: pointer;
    transition: background-color 0.3s;
    user-select: none;

    &:hover {
      background-color: lighten(#20639b, 16);
    }

    &[disabled] {
      background-color: rgb(143, 143, 143);
      cursor: disabled;
    }
  }
</style>
