<template>
    <div class="comment" v-if="seller!=''"  ref="scroll">
        <div ref="scroll_main" >
          <div class="c_title">
            <div class="c_title_l" >
              <h1>{{ seller.data.score }}</h1>
              <p>综合评分</p>
              <p>高于周边商家{{ seller.data.rankRate }}%</p>
            </div>
            <div class="c_title_r">
              <p><span>服务态度</span><span>
                <i class="icon iconfont icon-star"></i>
                <i class="icon iconfont icon-star"></i>
                <i class="icon iconfont icon-star"></i>
                <i class="icon iconfont icon-star"></i>
                <i class="icon iconfont icon-star"></i>
                 </span><span class="c_sum" >{{ seller.data.serviceScore }}</span>
              </p>
              <p><span>饭菜评分</span><span>
                <i class="icon iconfont icon-star"></i>
                <i class="icon iconfont icon-star"></i>
                <i class="icon iconfont icon-star"></i>
                <i class="icon iconfont icon-star"></i>
                <i class="icon iconfont icon-star"></i>
                </span><span class="c_sum" >{{ seller.data.foodScore }}</span>
              </p>
              <p><span>送达时间</span><span class="c_text" >{{ seller.data.deliveryTime }}分钟</span></p>
            </div>
          </div>
          <div class="c_line_throunth" ></div>
          <div class="c_comment" >
            <span :class="{ active:rating_contro===0 }"  @click="every" >全部{{ ratings.length }}</span>
            <span :class="{ active:rating_contro===1 }"  @click="everyone" >满意{{ satisfy }}</span>
            <span :class="{ active:rating_contro===2 }"  @click="everytwo" >不满意{{ ratings.length - satisfy}}</span>
          </div>
          <div class="c_main"  v-for="(value,index) in ratings"
               v-if="index<=showTime && rating_type===2 ? true :rating_type === value.rateType ">
            <div class="c_h_L" >
              <img :src="value.avatar" alt="用户头像">
            </div>
            <div class="c_h_R" >
              <div class="c_m_header" >
                <span>{{ value.username }}</span>
                <span class="c_float" >{{ value.rateTime | getTime  }}</span>
                <div class="c_m_icon" >
                  <i v-for="(val,key) in empto" class="icon iconfont icon-star" :class="{y_satr:key<=value.score}" ></i>
                  <span v-if="value.deliveryTime !='' " >{{ value.deliveryTime }} 分钟送达</span>
                </div>
              </div>
              <div class="c_m_body" >
                {{ value.text }}
              </div>
              <div class="c_m_footer" >
                <i v-if="value.rateType===0" class="icon iconfont icon-zan" ></i>
                <i v-else class="icon iconfont icon-cai"></i>
                <span v-for="(i,y) in value.recommend" v-if="y<test()" >
                          {{ i }}...
                      </span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="is_loader" class="is_loader" > 正在加载</div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                rating_contro:0,
                ratings:this.deal_data,
                showTime:2,
                rating_type:2,
                is_loader:false,
                empto:[
                  {},{},{},{},{}
                ]
            }
        },
        methods:{
          every(){
            this.rating_contro = 0;
            this. rating_type = 2;
            this.showtime=2;
          },
          everyone(){
            this.rating_contro = 1;
            this. rating_type = 0;
            this.showtime=2;
          },
          everytwo(){
            this.rating_contro = 2;
            this. rating_type = 1;
            this.showtime=2;
          },
          test(){
              return 2
          },
          scroll(e){
              let height = this.$refs.scroll_main.clientHeight;
              if(height <= e.target.scrollTop + e.target.offsetHeight){
                  this.is_loader=true;
                  setTimeout(()=>{
                    this.showTime=this.showTime+3;
                    this.is_loader=false;
                  },1000)
              }
           }
        },
        filters:{
          getTime(val){
              let date = new Date();
              date.setTime(val);
              return date.toLocaleString();
          }
        },
        computed:{
          satisfy(){
              let sum = 0;
              for(let i=0;i<this.ratings.length;i++){
                  if(this.ratings[i].rateType===0){
                      sum++
                  }
              }
              return sum;
          }
        },
        props:['seller','deal_data'],
        mounted(){
            setTimeout(()=>{
                  this.$refs.scroll.addEventListener('scroll',this.scroll)
            },500)
        }
    }
</script>

<style lang=scss >
  .comment{
    position:fixed;
    width:100%;
    top:180px;
    bottom:50px;
    background-color:white;
    overflow-x:hidden;
    overflow-y:scroll;
    .c_title{
      display:flex;
      width:100%;
      .c_title_l{
        flex:0 0 136px;
        margin:18px 0px;
        justify-content:center;
        text-align:center;
        border-right:solid 2px rgb(230,231,232);
        h1{
          font-size:24px;
          color:rgb(255,153,0);
          line-height:28px;
          margin-bottom:8px;
        }
        p:nth-child(2) {
          font-size:12px;
          color:rgb(7,17,27);
          line-height:12px;
          margin-bottom:8px;
        }
        p:last-child{
          color:rgb(7,17,27);
          font-size:10px;
          line-height:10px;
        }
      }
      .c_title_r{
        padding:18px 24px;
        font-size:12px;
        .c_text{
          color:rgb(147,153,159);
        }
        p{
          line-height:18px;
          padding-bottom:8px;
        }
        p span{
          margin-right:12px;
        }
        p span i:not(:last-child){
          color:rgb(255,153,0);
        }
        .c_sum{
          color:rgb(255,153,0);
        }

      }
    }
    .c_line_throunth{
      width:100%;
      height:32px;
      background-color:rgb(126,173,237);
    }
    .c_comment{
        padding:18px;
        border-bottom:solid 2px rgb(130,135,140);
        span{
          display:inline-block;
          padding:10px;
          margin-right:10px;
          border-radius:5px;
        }
        span:first-child{
          background-color:rgb(204,236,248);
        }
        span:nth-child(2){
          background-color:rgb(204,236,248);
         }
        span:nth-child(3){
          background-color:rgb(204,236,248);
        }
        .active{
          background-color:rgb(0,160,220) !important;
        }
    }
    .c_main{
      padding:18px;
      border-bottom:solid 2px rgb(130,135,140);
      display:flex;
      .c_h_L{
        flex:0 0 40px;
        img{
          width:28px;
          border-radius:50%;
        }
     }
      .c_h_R{
        width:100%;
      }
      .c_m_header{
          width:100%;
          >span:first-child{
            font-size:10px;
            line-height:12px;
          }
          .c_float{
            font-size:10px;
            line-height:12px;
            color:rgb(147,159,157);
            float:right;
          }
          .c_m_icon{
              padding:5px 0px;
              span{
                font-size:10px;
                font-weight:200;
                line-height:10px;
                color:rgb(147,159,157);
              }
          }
          .y_satr{
            color:rgb(255,153,0);
          }
      }
      .c_m_body{
         font-size:12px;
         line-height:28px;
      }
      .c_m_footer{
          line-height:20px;
          i{
            color:rgb(0,160,220);
            padding-right:14px;
          }
          span{
            display:inline-block;
            font-size:10px;
            margin-right:14px;
            border:solid 1px rgba(7,17,27,0.1);
            color:rgb(147,153,159);
          }
      }
    }
}
  .is_loader{
    position:fixed;
    left:23%;
    bottom:30%;
    width:200px;
    height:50px;
    background-color:rgb(130,135,140);
    border-radius:15px;
    line-height:50px;
    text-align:center;
    color:white;
  }
  .comment::-webkit-scrollbar{
    display:none;
  }
</style>
