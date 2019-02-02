<template>
  <div>
    <mheader></mheader>
    <Nav></Nav>
    <Content></Content>
    <mfooter></mfooter>
  </div>
</template>

<script>
import axios from '../axios'
import Nav from '../components/Nav'
import Content from '../components/Content'
import mheader from '../components/mheader'
import mfooter from '../components/mfooter'
export default {
  components:{
    mheader,
    mfooter,
    Nav,
    Content
  }
}
</script>

<style scoped>

</style>
