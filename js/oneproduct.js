(function(){
	var productId=+/\d+/.exec(location.search)[0];
	var flag=/%/.test(location.search);//判断传过来的category是否为汉字
	if(flag){
		var categoryName=decodeURI(/(%[\d\w]+)+/.exec(location.search)[0]);//汉字
	}else{
		var categoryName=location.search.split("=")[2];//单词
	}
	//渲染商品信息
	getProduct(productId,function(date){
		// 渲染商品导航
		var html=$(".proNav").html()+template("proNavTemp",date);
		$(".proNav").html(html);
		//设置分类导航地址和名称
		var href=$(".categoryName").attr("href")+date.result[0].categoryId;
		$(".categoryName").attr("href",href);
		$(".categoryName").html(categoryName);
		// 渲染商品信息
		var html2=$(".proIntroduce").html()+template("proInfoTemp",date);
		$(".proIntroduce").html(html2);
		//渲染商场信息
		$(".fastEnter").before(date.result[0].bjShop).before(date.result[0].bjShop);
	});

	// 渲染商品评价
	getProductCom(productId,function(date){
		var html=template("proComTemp",date)+$(".userEstimate .tc").html();;
		$(".userEstimate .tc").html(html);
	});
	// 点击导航切换
	$(".proOther .ult li a").on("click",function(){
		$(".proOther .ult li a").removeClass('yellow orange jian');
		$(this).addClass("orange jian").parent().siblings().find("a").addClass("yellow");

	})





	/**
	 *功能：获取某个商品信息数据
	 *参数：productId:number,callback:function
	 *返回值：void
	 */
	function getProduct(productId,callback){
		$.ajax({
			type:"get",
			url:"http://192.168.15.96:3000/api/getproduct?productid="+productId,
			dateType:"json",
			success:function(date){
				callback(date);
			}
		})
	}
	/**
	 *功能：获取商品评价数据
	 *参数：productId：number，callback:function
	 *返回值：void
	 */
	 function getProductCom(productId,callback){
	 	$.ajax({
	 		type:"get",
	 		url:"http://192.168.15.96:3000/api/getproductcom?productid="+productId,
	 		dateType:"json",
	 		success:function(date){
	 			// console.log(date);
	 			callback(date);
	 		}
	 	})
	 }

})()