<template>
  <footer>
    <div class="footer_main">
      <div class="footer_author">Design By <a href="https://jairwin.cn" target="_blank" rel="noopener noreferrer nofollow">Jairwin</a></div>
    </div>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style lang="less" scoped>
footer {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  color: #333;
  .footer_main {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #fff;
    .footer_author {
      color: #333;
      a {
        color: #333;
      }
    }
  }
  @media screen and (max-width: 640px) {
    height: 110px;
  }
}
</style>
