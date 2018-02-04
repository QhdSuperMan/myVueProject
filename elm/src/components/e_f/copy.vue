<template>
	<div class='e_footer' >
		<div class='e_f_list'   ref='shapping'   >
			<transition-group v-if='this.shapping!=""' tag='ul' name='show_shapping'  >
				<li  v-for='(value,item) in this.shapping' class='e_f_listBox'  :key='item' >
					<span class='e_f_LTitle' :title='value.name'  >{{ value.name }}</span>
					<span class='e_f_LRight' >
						<span class='e_f_Lfont' >￥{{ value.price*value.sum }}</span>
						<span class='e_f_Rfont' >{{ value.sum }}</span>
					</span>
					<embed class='e_f_del'  type='image/svg+xml'  :data-sum='item' @click='delsum'  src='./src/svg/remove_circle_outline.svg' />
					<embed class='e_f_add'  type='image/svg+xml'  :data-sum='item' @click='addsum'  src='./src/svg/add_circle_outline.svg' />
				</li>
			</transition-group>
			<div v-else >
				购物车空空如也哦
			</div>
		</div>
		<div class='e_f_bottom' >
			<div class='e_f_cBox' >	
				<div class='e_f_circle' @click='show_cart'>
					<div class='e_f_shapping'  >
						<div class='e_f_cartSum'  >{{ this.shapping.length }}</div>
						<embed class='e_f_shopping_cart' type='image/svg+xml'   src='./src/svg/shopping_cart.svg' />
					</div>
					<div class='e_f_price' >
						￥{{ shappingPrice }}
					</div>
				</div>
			</div>
			<div	class='e_f_setSize'	>另需配送费￥{{assignPrice}}元</div>
			<div	class='e_footer_assign'	 v-if='40-shappingPrice>0'  > 还差￥{{ 40-shappingPrice }}起送</div>
			<div	class='e_footer_ok'	 v-else > 去支付{{ shappingPrice+assignPrice }}美金 </div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			assignPrice:4,
			assignStart:40,
			show_shoppingList:false,
			isOpenChat:false,
			shapping:this.$store.state
		}
	},
	watch:{
		'shapping':function(){
			this.showto()
		}
	},
	computed:{
		shappingPrice:function(){
			if(this.shapping!==''){
				let result=0;
				for(let i=0;i<this.shapping.length;i++){
					result+=this.shapping[i].sum*this.shapping[i].price
				}
				return result
			}else{
				return 0
			}
		}
	},
	methods:{
		show_cart(){
			this.isOpenChat=!this.isOpenChat;
			if(this.isOpenChat){
				let length=-this.shapping.length*50;
				if(length==0)		length=-100;
				if(length<-200)	length=-200;	
				this.$refs.shapping.style.top=length+'px';
			}else{
				this.$refs.shapping.style.top='50px';
			}
		},
		showto(){
			if(this.isOpenChat){
				let length=-this.shapping.length*50;
				if(length==0)		length=-100;
				if(length<-200)	length=-200;	
				this.$refs.shapping.style.top=length+'px';
			}
		},
		addsum(e){
			let item=e.target.getAttribute('data-sum');
			this.shapping[item].sum++;
		},
		delsum(e){
			let item=e.target.getAttribute('data-sum');
			if(this.shapping[item].sum==1) return ;
			this.shapping[item].sum--;
		}
	}

}

</script>

<style lang='scss'>
.show_shapping-enter-active,.show_shapping-leave-active {
	transition:all 1s ease-in-out;
}
.show_shapping-enter{
	transform:translate(0px,200px)
}
.show_shapping-leave-to{
	transform:translate(0px,200px)
}
.e_f_list{
	position:absolute;
	top:50px;
	width:375px!important;
	height:200px!important;
	overflow-x:hidden;
	overflow-y:scroll;
	font-size:18px;
	color:black;
	background-color:white;
	transition:all 1s ease-in-out;
}
.e_f_list::-webkit-scrollerbar{
	display:none;
}
.e_f_del{
	transform:scale(0.04);
	position:absolute;
	top:-360px;
	left:-100px;
}
.e_f_Lfont{
	color:red;
	padding-left:20px
}
.e_f_Rfont{
	position:absolute;
	right:56px;
	top:0px;
}
.e_f_LTitle{
	display:inline-block;
	width:50%;
	height:100%;
	text-overflow:ellipsis;
	overflow:hidden;
	white-space:nowrap;
	vertical-align:middle;
	font-size:18px;
}
.e_f_LRight{
	display:inline-block;
	width:50%;
	height:100%;
	vertical-align:middle;
	font-size:18px;
}
.e_f_add{
	transform:scale(0.04);
	position:absolute;
	top:-360px;
	left:-50px;
}
.e_f_listBox{
	position:relative;
	width:100%;
	font-size:0px;
}
.e_footer{
	position:absolute;
	width:100%;
	height:50px;
	bottom:0px;
	left:0px;
	color:white;
	>div{
		height:100%;
		line-height:50px;
		padding:0px 5px;
	}
}
.e_f_bottom{
	width:100%;
	position:absolute;
	z-index:10;
	background-color:rgb(19,29,40);
}
.e_footer_assign{
	text-align:center;
	position:absolute;
	width:150px;
	right:0px;
	background-color:rgb(45,54,62);
}
.e_f_cartSum{
	position:absolute;
	border-radius:10px;
	right:-10px;
	top:-10px;
	width:30px;
	height:20px;
	background-color:red;
	font-size:14px;
	line-height:18px;
	text-align:center;
}
.e_footer_ok{
	background-color:green;
	text-align:center;
	position:absolute;
	width:150px;
	right:0px;
}
.e_f_cBox{
	position:relative;
}
.e_f_shopping_cart{
	transform:scale(0.03);
	position:absolute;
	top:-360px;
	left:-358px;
}
.e_f_circle{
	width:60px;
	height:60px;
	border-radius:50%;
	background-color:red;
	position:absolute;
	top:-15px;
	left:10px;
	background-color:rgb(19,29,40);
}
.e_f_shapping{
	width:50px;
	height:50px;
	border-radius:50%;
	background-color:rgb(0,160,220);
	position:absolute;
	top:10px;
	left:5px;
}
.e_f_price{
	position:absolute;
	top:15px;
	left:60px;
	font-size:14px;
}
.e_f_setSize{
	font-size:4px;
	position:absolute;
	right:150px;
	width:100px;
}
</style>