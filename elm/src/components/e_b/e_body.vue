<template>
	<div class='e_body' v-if='body_data' >
		<div class='e_b_Llist' ref="scrollingOne" >
			<ul>
				<li v-for='(value,item) in body_data' class='e_b_menu'
				:class='{e_b_active:item===controll}' @click="changeIndex(item,$event)" >
					<span class='e_b_menuText' >
						<span v-if='item==1' class='icon' ></span>{{ value.name }}
					</span>
				</li>
			</ul>
		</div>
		<div class='e_b_LRlist' ref="scrolling" >
      <div>
        <div  v-for='(value,item) in body_data'   class='e_b_mian' >
          <div class='e_b_title'  >{{ value.name }}</div>
          <div  v-for='(val,key) in value.foods' class='e_b_foods'  >
            <div class='e_b_Rleft' @click="openDetail(val)" >
              <img :src='val.image' alt='美食' ></img>
            </div>
            <div class='e_b_RRight'>
              <h1>{{val.name}}</h1>
              <p class='e_b_desc' v-if='val.description' >{{ val.description}}</p>
              <p > 月售{{val.sellCount}} 好评率{{ val.rating}}%</p>
              <div class='e_b_foodsPrice' >
                <span class="e_b_fon">
                    <span class='e_b_price' >￥{{ val.price}}</span>
                    <span class='e_b_oldPrice' v-if='val.oldPrice'>￥{{ val.oldPrice}}</span>
                </span>
                <icon_comp :shopping='val' ></icon_comp>
              </div>
            </div>
          </div>
        </div>
      </div>
		</div>
    <detail  ref="detail"  :detail="detailInfo" >  </detail>
	</div>
</template>

<script>
import detail from './detail.vue'
import icon_comp from './icon_comp.vue';
import BScroll from 'better-scroll';
export default {
	data(){
		return{
			height_box:[],
      scrollY:1100,
      controll:0,
      scrollBox:'',
      detailInfo:[],
    }
	},
	props:['body_data'],
 computed:{
   menu_controll:{
     get:function() {
       for (let i = 0; i < this.height_box.length; i++) {
         if (this.scrollY >= this.height_box[i] && this.scrollY < this.height_box[i + 1]) {
           return i;
         }
       }
     },
     set:function (value) {
       this.controll = value;
     }
   }

 },
  components:{
    icon_comp,
    detail
  },
  mounted(){
    setTimeout(()=>{
      this.scroll = new BScroll(this.$refs.scrolling,{
          probeType:3,
          click:true
      });
      this.scrollone = new BScroll(this.$refs.scrollingOne,{
          click:true
      });
      this.scroller();
      this.scroll.on('scroll',(pos)=>{
          this.scrollY = Math.abs(Math.round(pos.y))
          this.controll=this.menu_controll;
      })
      this.scrollBox=this.scroll;
    },1000)
  },
  methods: {
    scroller(){
          let listBox = document.getElementsByClassName('e_b_mian');
          let height = 0;
          this.height_box.push(height);
          for(let i=0;i<listBox.length;i++){
                height+=listBox[i].clientHeight;
                this.height_box.push(height);
          }
      },
    changeIndex(item,e){
      this.menu_controll=item;
      //解决pc点击两次原因
      /*if(e._constructed){
          return;
      }*/
      let el = document.getElementsByClassName('e_b_mian')[item];
      this.scrollBox.scrollToElement(el,300)
    },
    openDetail(val){
        this.detailInfo = val;
        this.$refs.detail.open();
    }
  }
}


</script>



<style lang=scss >


.e_body{
	display:flex;
	width:100%;
	position:absolute;
  top:180px;
  bottom:50px;
  overflow:hidden;
}
.e_b_Llist{
   flex:0 0 80px;
   height:100%;
   font-size:12px;
   overflow:hidden;
   ul {
     .e_b_menu{
       display:table;
       line-height:14px;
       padding:0 12px;
       width:56px;
       height:54px;
       .e_b_menuText{
         display:table-cell;
         vertical-align:middle;
         .icon{
           display:inline-block;
           width:15px;
           height:15px;
           background:url('../../common/img/special_3@2x.png') no-repeat;
           background-size:15px;
         }
       }
     }
     .e_b_active{
       background-color:rgb(167,170,174);
       font-weight:bold;
       font-size:15px;
     }
   }
 }
.e_b_LRlist{
	height:100%;
	flex:1;
	.e_b_title{
		width:100%;
		background-color:rgb(147,153,159);
		font-size:12px;
		line-height:36px;
		padding-left:14px;
		height:36px;
	}
	.e_b_foods{
		display:flex;
		padding:18px 18px 0 18px;
		border-bottom:solid 1px rgb(147,153,159);
		.e_b_Rleft{
			flex:0 0 70px;
			height:90px;
			img{
        width:70px;
			}
		}
		.e_b_RRight{
			flex:1;
			padding-left:10px;
			font-size:10px;
			color:rgb(147,153,159);
			>h1{
				font-size:14px;
				font-weight:bold;
				line-height:14px;
				color:black;
				padding:2px 0 8px 0;
			}
			.e_b_desc{
				font-size:10px;
				line-height:10px;
				padding-bottom:8px;
			}
			.e_b_foodsPrice{
        display:flex;
        position:relative;
				padding-top:8px;
        .e_b_fon{
          flex:0 0 80px;
          line-height:25px;
        }
				.e_b_price{
					padding-right:12px;
					color:red;
					font-size:14px;
					font-weight:bold;
				}
				.e_b_oldPrice{
					font-size:10px;
					text-decoration:line-through;
				}
			}
		}
	}

}
</style>
