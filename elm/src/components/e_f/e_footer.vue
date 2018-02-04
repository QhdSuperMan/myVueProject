<template>
	<div class='e_footer' >
        <masker v-if="mask_contro" > </masker>
        <transition name="isShow_shapping" >
          <div class="e_f_list" v-show="controller" >
            <div class="e_f_scroll_box" ref="char_scroll" >
              <div class="e_f_lTitle"  >
                <span>购物车</span>
                <span class="e_f_titleR" @click="clear">清空</span>
              </div>
              <div v-for='(value,item) in this.$store.state' class="e_f_box" v-if="value.count" >
                <span>{{ value.name }}</span>
                <span class="e_f_bprice">{{ value.price }}</span>
                <div class="e_f_icon">
                      <span calss="e_f_add" >
                        <i  class='icon iconfont icon-jianhao' @click="del_shap(value)" ></i>
                      </span>
                  <span>
                          {{ value.count }}
                      </span>
                  <span calss="e_f_del" >
                         <i class='icon iconfont icon-addition_fill' @click="add_shap(value)" ></i>
                      </span>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <div class="e_f_charCircle" @click="isShowchat" >
          <div class="e_f_clicleBox">
              <div class="e_f_circle">
                  <div class="e_f_shapping">
                        <i class="icon iconfont icon-gouwuche" ></i>
                        <div class="e_f_sum">
                          {{ char_sum }}
                        </div>
                  </div>
              </div>
              <div class="e_f_price">
                  {{ price }}
              </div>
          </div>
          <div class="e_f_dispatch">
              <span>
                需配送费4元
              </span>
          </div>
        </div>
        <div class="e_f_pay" v-if="40-price>=0">
              还差{{ 40-price }}起送
        </div>
        <div class="e_f_payCopy" v-else>
          去支付{{ price + 4 }}
        </div>
	</div>
</template>


<script>
import icon_comp from '../e_b/icon_comp.vue';
import Bscoll from 'better-scroll';
import masker from './mask.vue';
export default{
      data(){
          return{
            controller:false,
            watch_data:this.$store.state,
            char_scroll:'',
            mask_contro:false
          }
      },
      watch:{
        /*watch_data:function(){
          this.char_scroll = new Bscoll(this.$refs.char_scroll,{})
          console.log(this.char_scroll)
        }*/
      },
      computed:{
          price(){
              let result=0;
              for(let i=0;i<this.$store.state.length;i++){
                  result+=this.$store.state[i].price * this.$store.state[i].count;
              }
              return result;
          },
          char_sum(){
              let result = 0;
              for(let i=0;i<this.$store.state.length;i++){
                  result += this.$store.state[i].count;
              }
              return result;
          }
      },
      components:{
          icon_comp,
          masker
      },
      methods:{
          isShowchat(e){
              this.mask_contro = !this.mask_contro
              this.controller = !this.controller;
           },
          noShowchat(e){
              if(e.clientY < 400){
                this.controller = false;
                this.mask_contro = false;
              }
          },
          clear(){
            for(let i=0;i<this.$store.state.length;i++){
              this.$store.state[i].count=0
            }
            this.$store.state.splice(0,this.$store.state.length);
          },
          add_shap(data){
              data.count++;
          },
          del_shap(data){
              data.count--;
              if(data.count===0){
                  for(let i=0;i<this.$store.state.length;i++){
                      if(this.$store.state[i].name===data.name){
                        this.$store.state.splice(i,1);
                        console.log(123)
                      }
                  }
              }
        }
      }
}
</script>

<style lang='scss'>

.isShow_shapping-enter-active,.isShow_shapping-leave-active{
  transition:all .5s ease-in-out;
}
.isShow_shapping-enter,.isShow_shapping-leave-to{
  transform: translateY(200px);
}
.e_footer{
  position:fixed;
  display:flex;
  bottom:0px;
  height:50px;
  width:100%;
  color:white;
  .e_f_charCircle{
    z-index:20;
    position:relative;
    flex:0 0 260px;
    height:100%;
    background-color:rgb(20,29,39);
    div{
      float:left;
    }
    .e_f_dispatch{
      height:100%;
      width:50%;
      span{
        display:inline-block;
        border-left:solid 1px rgb(43,51,59);
        margin:10px 8px;
        padding:10px;
        color:rgb(106,110,114);
        font-size:14px;
        text-align:center;
      }
    }
    .e_f_clicleBox{
      height:100%;
      width:50%;
      .e_f_circle{
        height:60px;
        width:60px;
        margin:-20px 0px 0px 20px;
        text-align:center;
        border-radius:50%;
        background-color:rgb(20,29,39);
        .e_f_shapping{
            position:relative;
            width:50px;
            height:50px;
            border-radius:50%;
            margin:8px 0px 0px 5px;
            background-color:rgb(0,160,220);
            line-height:50px;
            i{
               font-size:30px;
             }
            .e_f_sum{
                width:30px;
                height:20px;
                background-color:red;
                position:absolute;
                border-radius:10px;
                top:-8px;
                right:-8px;
                line-height:20px;
            }
        }
      }
      .e_f_price{
        height:100%;
        padding-left:20px;
        line-height:50px;
        width:20%;
      }
    }
  }
  .e_f_pay{
    flex:1;
    position:relative;
    z-index:2;
    background-color:rgb(43,51,59);
    color:rgb(151,154,156);
    text-align:center;
    padding:20px 0px;
  }
  .e_f_payCopy{
    flex:1;
    position:relative;
    z-index:2;
    background-color:green;
    color:white;
    text-align:center;
    padding:20px 0px;
  }
  .e_f_list{
    position:fixed;
    width:100%;
    height:200px;
    background-color:white;
    bottom:50px;
    overflow-y:scroll;
    .e_f_lTitle{
      height:50px;
      width:100%;
      background-color:#f3f5f7;
      font-size:15px;
      font-weight:200;
      color:rgb(7,17,27);
      line-height:50px;
      span{
        margin:0px 10px;
      }
      .e_f_titleR{
        float:right;
        color:rgb(0,160,220)
      }
    }
    .e_f_box{
      position:relative;
      line-height:50px;
      font-size:18px;
      .e_f_bprice{
        position:absolute;
        top:0px;
        left:200px;
        color:red;
      }
      >span{
        padding:0px 10px;
        color:black
      }
      .e_f_icon{
        position:absolute;
        top:0px;
        right:26px;
        color:black;
        i{
          font-size:26px;
          color::rgb(0,160,220);
        }
      }
    }
  }
  .e_f_list::-webkit-scrollbar{
      display:none;
  }
}

</style>
