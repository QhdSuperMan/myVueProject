<template>
    <div class="detail" v-if="detail_contro ">
        <div>
            <div  v-if="detail">
              <img :src="detail.image" alt="美食马上出来哦" class="d_BigImage"></img>
              <i class="icon iconfont icon-enter goback" @click="open" ></i>
            </div>
            <div class="d_artical" >
                  <div class="d_box" >
                    <h1 class="d_artical_title" >{{ detail.name }}</h1>
                    <p  class="d_shop" >
                        <span>月售{{ detail.sellCount }}份</span>
                        <span>好评率{{ detail.rating }}%</span>
                    </p>
                    <div class="d_price" >
                        <span class="d_priceRed" >{{ detail.price }}</span>
                        <span v-if="detail.oldPrice" class="d_oldPrice" >{{ detail.oldPrice }}</span>
                        <div class="d_addShop" @click="d_add_shapping">
                            加入购物车
                        </div>
                    </div>
                  </div>
            </div>
            <div class="line-through" ></div>
            <div class="d_info" >
                <h1>商品介绍</h1>
                <p>{{ detail.info }}</p>
             </div>
            <div class="line-through" ></div>
            <div class="d_rading" >
                  <h1> 商品评价 </h1>
                  <div class="d_rading_type" >
                    <span>全部{{ detail.rating }}</span><span>推荐{{ 38 }}</span><span>吐槽{{ detail.rating-38 }}</span>
                  </div>
            </div>
            <div class="between-space" >
                <i class="icon iconfont icon-zhengquewancheng-yuankuang"></i>只看有内容的东西
            </div>
            <ul class="d_ul" >
              <li v-for="(value,item) in detail.ratings" >
                  <p class="tolocaleTosrtring" >
                    <span>{{ value.rateTime | getDate }}</span>
                    <img :src="value.avatar" alt="用户头像">
                    <span>{{ value.username }}</span>
                  </p>
                  <div class="d_rating_info" >
                    <span v-if="value.rateType===0" >
                        <i    class="icon iconfont icon-zan" ></i>
                        {{ value.text }}
                    </span>
                    <span v-else >
                        <i    class="icon iconfont icon-cai" ></i>
                        {{ value.text }}
                    </span>

                  </div>
              </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                detail_contro:false
            }
        },
        filters:{
            getDate(value){
                let date = new Date();
                date.setTime(value);
                return date.toLocaleString();
            }
        },
        props:['detail'],
        methods:{
            open(){
                this.detail_contro=!this.detail_contro;
            },
          d_add_shapping(){
                 for(let i=0;i<this.$store.state.length;i++){
                    if(this.$store.state[i].name===this.detail.name){
                        this.$store.state[i].count++;
                        return;
                    }
                }
                let a= {
                  name: this.detail.name,
                  price: this.detail.price,
                  count: 1
                }
                this.$store.state.push(a);
                console.log(this.$store.state)
          }
        }
    }
</script>

<style lang=scss >
  .detail{
    position:fixed;
    width:100%;
    top:0px;
    left:0px;
    bottom:50px;
    overflow-y:scroll;
    overflow-x:hidden;
    background-color:white;
    .d_BigImage{
      width:100%;
    }
    .goback{
      font-size:30px;
      position:fixed;
      top:10px;
      left:10px;
      padding:5px;
      font-weight:bold;
    }
    .d_artical{
      width:100%;
      .d_box{
          padding-left:18px;
      }
      .d_artical_title{
          padding:18px 0px 8px 0px;
          font-size:14px;
          font-weight:700;
          line-height:14px;
          color:rgb(7,17,27);
      }
      .d_shop span{
        padding-right:14px;
        font-size:10px;
        line-height:10px;
        color:rgb(147,153,159);
      }
      .d_price{
        padding:18px 0px;
        width:100%;
        .d_priceRed{
          color:red;
          font-size:14px;
          font-weight:700;
          line-height:24px;
        }
        .d_oldPrice{
          font-size:10px;
          font-weight:700;
          color:rgb(147,153,159);
          line-height:24px;
          text-decoration:line-through;
          padding-left:10px;
        }
        .d_addShop{
          float:right;
          width:74px;
          height:24px;
          font-size:10px;
          line-height:24px;
          padding:6px 0px;
          color:white;
          margin-right:18px;
          text-align:center;
          border-radius:14px;
          background-color:rgb(0,160,220);
        }
      }
    }
    .line-through{
      width:100%;
      height:16px;
      background-color:rgb(126,173,237);
      border-top:solid 1px black;
      border-bottom:solid 1px black;
    }
    .d_info{
      padding:18px;
      h1{
        font-size:18px;
        font-weight:bold;
        padding-bottom:6px;
      }
      p{
        font-size:14px;
        font-weight:200;
        line-height:24px;
        color:rgb(77,85,93);
      }
    }
    .d_rading{
      padding:18px;
      h1{
        font-size:18px;
        font-weight:bold;
        padding-bottom:6px;

      }
      span{
        float:left;
        display:inline-block;
        padding:8px 12px;
        margin-right:8px;
        border-radius:5px;
      }
      span:nth-child(1){
        background-color:rgb(0,160,220);
        font-size:14px;
      }
      span:nth-child(2){
        background-color:rgb(204,236,248);
        font-size:8px;
      }
      span:nth-child(3){
        background-color:rgb(233,235,236);
        font-size:8px;
      }
    }
    .between-space{
      width:100%;
      height:30px;
      padding:0px 18px;
      line-height:30px;
      font-size:18px;
      background-color:rgb(126,173,237);
      border-top:solid 1px black;
      border-bottom:solid 1px black;
      i{
        font-size:18px;
        color:rgb(108,111,111);
      }
    }
    .d_ul{
      padding:10px 18px;
      .tolocaleTosrtring{
        font-size:14px;
        color:rgb(147,153,159);
        line-height:20px;
        span:nth-child(3){
          float:right;
          padding:0px 5px;
        }
        img{
          width:15px;
          float:right;
        }
      }
    }
    .d_rating_info{
      padding:10px;
      width:100%;
      height:30px;
      span i{
          color:rgb(0,160,220)
      }
    }
  }
  .d_rading:after{
    content:'';
    display:block;
    clear:both;
  }
  .detail::-webkit-scrollbar{
    display:none;
  }
</style>
