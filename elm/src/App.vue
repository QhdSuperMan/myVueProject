<template>
	<div id="app" @click="removeChar" >
		<router-view v-wechat-title='$route.meta.title' ></router-view>
		<e_header :seller='seller.data'  ></e_header>
		<ul class='e_nav' >
			<li v-for='(value,index) in controllerBox' @click='Boxchange' :value='index' :class='{e_n_active:index==Box_controller}' >
				{{ value.entry }}
			</li>
		</ul>
		<e_body   :body_data='body_data'  v-if="Box_controller===0" ></e_body>
    <comment v-else-if="Box_controller===1" :seller="seller" :deal_data="deal_data" ></comment>
    <descriptor v-else :seller="seller.data" ></descriptor>
		<e_footer ref="footer" ></e_footer>
	</div>
</template>

<script>
import e_header from	'./components/e_h/e_header.vue';
import e_body	from	'./components/e_b/e_body.vue';
import e_footer	from	'./components/e_f/e_footer.vue';
import comment	 from	'./components/comment/comment.vue';
import descriptor	 from	'./components/descriptor/descriptor.vue';
export default {
  data(){
	return{
		controllerBox:[
			{
				entry:'商品'
			},
			{
				entry:'评论'
			},
			{
				entry:'商家'
			}
		],
		Box_controller:0,
		seller:0,
		body_data:0,
		shappingData:[],
    deal_data:''
	}
  },
  components:{ e_header ,e_body,e_footer,comment,descriptor},
  methods:{
    Boxchange(e){
      this.Box_controller=e.target.value;
    },
    removeChar(e){
      this.$refs.footer.noShowchat(e)
    }
  },
  created(){
	var this_=this;
	this.$http.get('./api/seller').then(function(data){
		this_.seller=data;
	},function(err){
		alert(err)
	});
	this.$http.get('./api/goods').then(function(data){
		this_.body_data=data.data;
	},function(err){
		alert(err)
	})
   this.$http.get('./api/ratings').then(function(data){
       this_.deal_data = data.data
   })
  }

}
</script>

<style lang=scss >
#app{
	width:375px;
	height:667px;
	overflow:hidden;
	position:relative;
}
//隐藏滚动条
#app::-webkit-scrollbar{
	display:none;
}
.e_nav{
	display:flex;
	height:40px;
	font-size:14px;
	align-items:center;
	justify-content:space-between;
	padding:0px;
  border-bottom:solid 2px rgb(130,135,140);
	li{
		width:33%;
		text-align:center;
	}
}
.e_n_active{
	color:red;
	font-size:18px;
	height:100%;
	line-height:40px;
}

</style>
