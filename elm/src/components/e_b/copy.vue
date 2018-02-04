<template>
<div class='e_body clear_float' v-if='body_data'>
	<div class='e_b_left' ref='opp' >
		<ul class='e_b_leftBox' >
			<li v-for='(value,item) in body_data' :data-name='item' :class='{e_b_sty:item==data}'
				@click='change_r_controller'
			>
				<span v-if='item==1' class='e_b_icon' ></span>{{ value.name }}
			</li>
		</ul>
	</div>
	<div class='e_b_right' @touchstart='sliding'>
		<div class='e_b_scrollBox' ref='scrollbox'  >
			<div class='e_b_box clear_float'  v-for='(value,item) in body_data' :class='"e_b_scroll"+item' >
				<div class='e_b_div' style='clear:both'>{{ value.name }}</div>
				<div class='e_b_img clear_float' v-for='(val,key) in value.foods'  >
					<div class='e_b_imgLeft'>
						<img  :alt='key' :src='val.image' ></img>
					</div>
					<div class='e_b_imgright'>
						<h1>{{val.name}}</h1>
						<p>{{ val.description}}</p>
						<p> 月售{{val.sellCount}} 好评率{{ val.rating}}%</p>
						<span class='e_b_icon_box' >
							<span class='e_b_price' >￥{{ val.price}}</span>
							<span class='e_b_oldPrice' v-if='val.oldPrice'>￥{{ val.oldPrice}}</span>
							<embed  class='e_b_close' type="image/svg+xml" src="./src/svg/add_circle.svg"
							@click='addShop'  :data-name='val.name'  :data-sum=1 :data-src='val.image'  :data-price='val.price' />
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script>
import svg from '../../svg/close.svg'
export default{
	data(){
		return{
			data:1,
			//控制右面显示按钮
			initialize:-1090,
			//购物车
			shoppingBox:[

			]
		}
	},
	computed:{
		right_controller:{
			get:function(){

			},
			set:function(val){
				this.data=val
			}
		}
	},
	methods:{
		animate(x,y){
			var star=new Image();
			star.src='./static/star.png';
			document.body.appendChild(star);
			star.width=20;
			star.style.display='block',
			star.style.position='absolute'
			star.style.top=y-8+'px';
			star.style.left=x-8+'px';
			clearInterval(timer);
			let h=Math.abs(y-600);
			let w=Math.abs(x-60);
			let speedH=h/10;
			let speedW=w/10;
			var timer=setInterval(()=>{
				star.style.left=star.offsetLeft-speedW+'px';
				star.style.top=star.offsetTop+speedH+'px';
				if(star.offsetLeft <=60 || star.offsetTop>=600 ){
					star.style.display='none'
					clearInterval(timer);
					document.body.removeChild(star);
				}
			},50)

		},
		addShop(e){
			this.animate(e.pageX,e.pageY)
			var a={
				name:e.target.getAttribute('data-name'),
				img:e.target.getAttribute('data-src'),
				price:e.target.getAttribute('data-price'),
				sum:e.target.getAttribute('data-sum')
			}
			for(var val of this.$store.state){
				if(val.name==a.name){
					val.sum++;
				}
			}
			e.target.setAttribute('data-sum',2)
			if(a.sum<=1){
				this.$store.state.push(a);
			}
			/*for(let i=0;i<this.shoppingBox.length;i++){
				if(this.shoppingBox[i].name==a.name){
					this.shoppingBox.splice(i,1,a)
				}
			}
			this.$emit('addShopping',this.shoppingBox);*/
		},
		change_r_controller(e){
			let index=e.target.getAttribute('data-name');
			this.right_controller=index;
			let item=document.getElementsByClassName('e_b_scroll'+index)[0];
			let itemBox=document.getElementsByClassName('e_b_scrollBox')[0];
			//itemBox.style.top="-"+item.offsetTop+'px';
			let speed='-'+item.offsetTop+'px';
			itemBox.style.webkitTransform='translate(0,'+ speed +')';
		},
		sliding(e){
			e.preventDefault();
			let slide=document.getElementsByClassName('e_b_right')[0];
			let oldY=e.touches[0].clientY-slide.getBoundingClientRect().top;
			let itemBox=document.getElementsByClassName('e_b_scrollBox')[0];
			slide.ontouchmove=(e)=>{
				let h=e.touches[0].clientY-slide.getBoundingClientRect().top;
				let w=e.touches[0].clientX-slide.getBoundingClientRect().left;
				if((h<=0 || h >= slide.offsetHeight) || (w<=0 || w>slide.offsetWidth)){
					return
				}else{
					let step=parseInt(itemBox.style.transform.slice(itemBox.style.transform.indexOf(',')+1))||-1090
					let speed;
					this.initialize=step;
					this.data=this.right_controller;
					if(h-oldY>=0){
						speed=step+(+this.computed(h,oldY));
						if(speed>=0) return;
						itemBox.style.webkitTransform='translate(0,'+speed+'px)';
					}else{
						speed=step-(+this.computed(h,oldY));
						if(speed<-3330) return;
						itemBox.style.webkitTransform='translate(0,'+speed+'px)';
					}
				}
			}

		},
		computed(a,b){
			let speed=Math.abs(a-b);
			if(speed>100){
				return 32
			}else if(speed>50){
				return 16
			}else if(speed>30){
				return 8
			}else if(speed>10){
				return 4
			}else {
				return 1
			}
		}
	},
	props:[ 'body_data' ],
	mounted(){


	}
}
</script>

<style lang=scss>
.e_b_left{
	width:80px;
	height:420px;
	overflow:auto;
}
.e_b_left::-webkit-scrollbar{
	display:none;
}
.e_b_leftBox{
	font-size:12px;
	li{
		text-align:center;
		line-height:54px;
		width:80px;
		height:54px;
		background-color:#f3f5f7;
	}
	li:nth-child(2){
		line-height:24px;
	}
}
.e_b_icon{
	display:inline-block;
	width:10px;
	height:20px;
	background-image:url('../../common/img/special_4@2x.png');
	background-repeat:no-repeat;
	background-size:12px;
	vertical-align:middle;
}
.e_b_sty{
	background-color:rgb(167,170,174) !important;
}
.e_body>div{
	float:left;
}
.e_b_right{
	width:290px;
	height:486px;
	overflow-x:hidden;
	overflow-y:hidden;
	position:relative;
}
.e_b_scrollBox{
	position:absolute;
	top:0px;
	left:0px;
	transition:all 1s ease-in-out;
	transform:translate(0,-1090px)
}
//隐藏滚动条
.e_b_right::-webkit-scrollbar{
	display:none;
}
.e_b_div{
	padding-left:10px;
	text-align:left;
	background-color:#f3f5f7;
	height:30px;
	line-height:30px;
	width:100%;
}
.e_b_box div{
	float:left;
	color:rgb(147,153,159);
}
.clear_float:after{
	clear:both;
	content:' ';
	display:block;
}
.e_b_imgLeft{
	width:80px;
	height:70px;
	padding:18px 10px 18px 4px;
	vertical-align:middle;
	img{
		width:80px;
	}
}
.e_b_imgright{
	h1{
		font-size:18px;
		font-weight:bold;
		color:black;
	}
	line-height:16px;
	padding:18px 5px 0px 0px;
	width:160px;
	font-size:10px;
}
.e_b_price{
	font-size:18px;
	color:red;
}
.e_b_oldPrice{
	text-decoration:line-through;
	position:relative;
}
.e_b_icon_box{
	position:relative;
}
.e_b_close{
	transform:scale(0.03);
	position:absolute;
	left:-220px;
	bottom:-372px;
}
</style>
