(function(){
	$.ajax({
		type:"get",
		data:"json",
		url:"../data/cateTitle.json",
		success:function(data){
			//data: 标题数据
			var html=template("cateTitle",data);
			$(".product-category").html(html);

			$("[titleId='0']").css("border","none");//去掉第一个li的边框


			var flag=false;//用于判断数据是否请求成功
			var arrowFlag=false;
			$(".tt").click(function(){

				var id=$(this).parent().attr("titleId");//获取li的titleid
				var length=$(this).parent().children().length;//获取li子元素个数
				var that=this;
				// 获取分类列表数据
				if(length==1){
					$.ajax({
								type:"get",
								date:"json",
								url:"http://192.168.15.164:3000/api/getcategory?titleid="+id,
								success:function(date){
									var html=template("cateList",date);
									$("[titleId="+id+"]").append(html);
									flag=true;
								}
					});

				 }
				 if(flag){
					 $(this).parent().siblings().children(".tc").hide();//先隐藏所有的tc标签
					 $(this).next().toggle();//显示当前标签
					
				 }
				 if(!arrowFlag){
				 	arrowFlag=true;
					$(that).find("i").removeClass("icon-xiangxiajiantou").addClass("icon-xiangxiajiantou-copy");
				 }else{
				 	arrowFlag=false;
				 	$(that).find("i").removeClass("icon-xiangxiajiantou-copy").addClass("icon-xiangxiajiantou");
				 }


			})

			
		}
	})


})()