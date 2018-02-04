<template>
    <div class="icon_box" >
      <transition name="slide-fade" >
        <span class='ball sliding' v-if="b.count>0"  >
                <i class='icon iconfont icon-jianhao' @click="delCount"></i>
        </span>
      </transition>
       <span class='icon_text' v-if="b.count>0"> {{ b.count }}</span>
        <span class='ball'>
            <i class='icon iconfont icon-addition_fill' @click='addCount'></i>
        </span>
    </div>
</template>

<script>
    export default{
        data(){
            return {
              length:0,
              a: {
                name: this.shopping.name,
                price: this.shopping.price,
                count: 0
              },
              b:{}
           }
        },
        watch:{
           ['$store.state'](){
             for(let i=0;i<this.$store.state.length;i++){
               if(this.$store.state[i].name===this.a.name){
                  this.b=this.$store.state[i];
               }
             }
            }
        },
        props:[ 'shopping' ],
        methods:{
              addCount(e){
                  this.a.count++;
                  this.animation(e);
                  if(this.a.count<2){
                      this.$store.state.push(this.a);
                  }
              },
             delCount(){
               this.b.count--;
               if(this.b.count===0){
                 for(let i=0;i<this.$store.state.length;i++){
                     if(this.$store.state[i].name===this.a.name){
                         this.$store.state.splice(i,1);
                      }
                 }
               }
             },
             animation(e){
                let h = Math.ceil((615-e.clientY));
                let w = Math.ceil((e.clientX-45)/20);
                let star  = new Image();
                star.width = 20;
                star.src='src/components/e_b/star.png';
                star.style.position='absolute';
                star.style.left=e.clientX+'px';
                star.style.top=e.clientY+'px';
                let height=-10;
                let a=(h - 20*height)/200;
                document.body.appendChild(star);
                clearInterval(timer);
                var timer=setInterval(()=>{
                  star.style.left=star.offsetLeft-w+'px';
                  star.style.top=star.offsetTop+ height +'px';
                  height+=a;
                  if(star.offsetLeft <=45 || star.offsetTop>=615 ){
                    star.style.display='none'
                    clearInterval(timer);
                    document.body.removeChild(star);
                  }
                },50)
             }

        }
    }
</script>

<style lang=scss >
  .slide-fade-enter-active {
    transition: all 0.4s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateX(40px) rotate(360deg);
  }
.icon_box{
  flex:1;
  bcakground-color:green;
  display:relative;
  text-align:right;
    font-size:0px;
    color:rgb(0,160,220);
  .sliding{
    position:absolute;
    top:8px;
    right:48px;
  }
  .ball {
    padding:0 5px;
    i{
      font-size:25px;
    }
  }
  .icon_text{
    font-size:16px;
    vertical-align:text-bottom;
    color:black;
  }
}
</style>
