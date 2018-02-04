<template>
<div class='e_header' v-if='seller' >
     <div class='e_h_img'>
	<img  alt=''  :src='seller.avatar'></img>
     </div>
     <div class='e_h_con'>
	<p><span></span>{{ seller.name }}</p>
	<p>{{ seller.description }}/{{ seller.deliveryTime }}分钟送达</p>
	<p  v-if='seller'><span></span>{{ seller.supports[0].description }}
		<div v-if='seller'>{{ seller.supports.length }}个&nbsp; &lt;</div></p>
     </div>
     <div  class='e_h_under'>
	<span>公告</span>{{ seller.bulletin }}
      </div>
</div>
</template>


<script>
export default{
	data(){
		return{
		}
	},
	props:[ 'seller' ]
}

</script>
<style lang=scss>
.e_header{
	background-color:rgba(7,17,27,0.5);
	width:100%;
	color:white;
}
.e_h_con:after{
	content:'';
	display:block;
	clear:both;
	line-heigth:0px;
	height:0px;
}
.e_h_img{
	padding:24px 16px 18px 24px;
	img{
		width:64px;
		border-radius:2px;
	}
	float:left;
}
.e_h_con{
	padding:22px 0px 0px 0px;
	position:relative;
	p:nth-child(1){
		font-size:16px;
		font-weight:bold;
		line-height:24px;
		span{
			display:inline-block;
			width:30px;
			height:18px;
			padding-right:6px;
			vertical-align:text-bottom;
			background:url('../../common/img/brand@2x.png');
			background-repeat:no-repeat;
			background-size:30px 18px;
		}
	}
	p:nth-child(2){
		font-size:12px;
		font-weight:200;
		line-height:24px;
	}
	p:nth-child(3){
		font-size:10px;
		font-weight:200;
		line-height:24px;
		span{
			display:inline-block;
			width:30px;
			height:18px;
			vertical-align:middle;
			background:url('../../common/img/decrease_1@2x.png');
			background-repeat:no-repeat;
			background-size:18px 16px;
		}
	}
	div{
		position:absolute;
		font-size:6px;
		background-color:rgba(0,0,0,0.2);
		width:38px;
		height:24px;
		border-radius:10px 10px;
		bottom:13px;
		right:12px;
		line-height:24px;
	}
}
.e_h_under{
	font-size:10px;
	line-height:28px;
	white-space:nowrap;
	text-overflow:ellipsis;
	overflow:hidden;
	height:28px;
	background-color:rgba(0,0,0,0.2);
	padding-left:12px;
	span{
		color:black;
		background-color:white;
		margin-right:4px;
	}
}
.support-count{

}
</style>