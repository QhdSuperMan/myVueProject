<template>
  <div class="descriptor" >
        <div class="d_header" >
            <div>
              <div class="d_title">
                <h1>{{ seller.name }}</h1>
                <div>
                  <i class="icon iconfont icon-star"></i>
                  <i class="icon iconfont icon-star"></i>
                  <i class="icon iconfont icon-star"></i>
                  <i class="icon iconfont icon-star"></i>
                  <i class="icon iconfont icon-star"></i>
                  <span>(661)</span>
                  <span>月售690单</span>
                </div>
              </div>
              <div class="d_collect">
                <p  i v-if="isCollect"><i  @click="isCollect=!isCollect"
                                           class="icon iconfont icon-like_fill" style="color:red"></i></p>
                <p  v-else="isCollect"><i @click="isCollect=!isCollect"
                                          class="icon iconfont icon-like_fill" ></i></p>
                <p v-if="isCollect">    已收藏</p>
                <p v-else="isCollect" > 点击收藏</p>
              </div>
            </div>
        </div>
        <div class="d_body">
            <div class="d_b_box">
              <div><p>起送价</p><p>20 <span>元</span> </p></div>
              <div><p>商家配送</p><p>4<span>元</span></p></div>
              <div><p>平均配送时间</p><p>39<span>分钟</span></p></div>
            </div>
        </div>
        <div class="d_line_through" ></div>
        <div class="d_action">
            <div class="d_act">
                <h1>公告和活动</h1>
                <p>{{ seller.bulletin }}</p>
            </div>
        </div>
        <ul class="d_agio" >
            <li v-for="val in seller.supports" >
                <i ></i><span>{{ val.description }}</span>
            </li>
        </ul>
        <div class="d_line_through" ></div>
        <div class="d_paiture">
              <div class="d_imgBox">
                <img  v-for='img in seller.pics' :src="img" alt="pacture">
              </div>
        </div>
        <div class="d_line_through" ></div>
        <div class="d_footer">
            <div class="d_f_box">
                  <h1>商家信息</h1>
                  <p v-for="index in seller.infos" >
                        {{ index }}
                  </p>
            </div>
        </div>

  </div>
</template>

<script>
  export default{
    data(){
      return {
          isCollect:true
      }
    },
    props:['seller']
  }
</script>

<style lang=scss >
  .descriptor{
    position:fixed;
    width:100%;
    top:180px;
    bottom:50px;
    background-color:white;
    overflow-x:hidden;
    overflow-y:scroll;
    .d_header{
      width:100%;
      >div{
        margin:16px;
        border-bottom:solid 1px black;
        &:after{
          content:'';
          display:block;
          clear:both;
        }
        .d_title{
          float:left;
          h1{
            font-size:20px;
            line-height:20px;
            color:rgb(7,17,27);
            font-weight:bold
          }
          i{
            color:rgb(255,153,0);

          }
          i:nth-child(5){
            color:black;
          }
          div{
            line-height:30px;
            span{
              color:rgb(110,116,122);
              font-size:10px;
            }
          }
        }
        .d_collect{
          float:right;
          width:50px;
          height:100%;
          text-align:center;
          p{
            line-height:20px;
            font-size:10px;
          }
        }
      }
    }
    .d_body{
      width:100%;
      .d_b_box{
          display:flex;
          margin:18px 0px;
          justify-content:space-around;
          align-items: center;
          div{
            text-align:center;
            padding:0px 20px;
            border-right:solid 1px black;
            p:first-child{
              line-height:20px;
              font-size:14px;
              color:rgb(147,157,159);
            }
            p:last-child{
                font-size:24px;
                line-height:24px;
            }
            span{
              font-size:10px;
            }
          }
          div:last-child{
            border:none;
          }
      }
    }
    .d_line_through{
      width:100%;
      height:36px;
      background-color:rgb(130,135,140);
    }
    .d_action{
       width:100%;
       .d_act{
         margin:16px;
         h1{
           font-size:20px;
         }
         p{
           font-size:12px;
           line-height:24px;
           color:rgb(240,20,20);
           font-weight:200;
           padding-left:12px;
         }
       }
    }
    .d_agio{
      padding:18px;
      li{
        padding:10px 12px;
        border-top:solid 1px rgb(0,140,200);
      }
    }
    .d_paiture{
      width:100%;
      .d_imgBox{
        &:after{
          content:'';
          display:block;
          clear:both;
        }
        margin:16px;
        img{
          float:left;
          padding:16px;
          width:130px;
        }
      }
    }
    .d_footer{
      width:100%;
      .d_f_box{
          margin:18px;
          h1{
            font-size:20px;
          }
          p{
            line-height:20px;
            padding:5px 10px;
            border-bottom:solid 2px rgb(0,160,220);
          }
      }
    }
  }
  .descriptor::-webkit-scrollbar{
    display:none;
  }
</style>
