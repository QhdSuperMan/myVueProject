<template>
    <div >
            <transition name="fade" >
              <div class="mask">

              </div>
            </transition>
    </div>
</template>

<script>
    export default{
        data(){
            return {}
        }
    }
</script>

<style lang=scss >
.fade-enter-active,.fade-leave-active{
    transition:all 1s ease-in-out;
}
.fade-enter,.fade-leave-to{

}
.mask{
  position:fixed;
  left:0px;
  top:0px;
  height:100%;
  filter: blur(20px);
  width:100%;
  background-color:rgba(7,17,27,0.6);
}
</style>
