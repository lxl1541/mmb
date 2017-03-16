(function(){
	
	$(function(){
		// 获取主菜单分类数据
		$.ajax({
			type:"get",
			date:"json",
			// url:"http://mmb.ittun.com/api/getindexmenu",
			url:"../data/menu.json",
			success:function(data){
				var html=template('mainCate',data);
				$(".mainCategory").html(html);

				// 点击更多按钮加载更多
				$("[name='更多']").click(function(){
					// $(".mainCategory").css("height","190").css("overflow","hidden");
					$(".mainCategory").toggleClass("mainCatHidd");
					
				})
			}
		})
		// 获取超值折扣推荐数据
		$.ajax({
			type:"get",
			date:"json",
			// url:"http://192.168.15.164:3000/api/getmoneyctrl",
			url:"../data/discount.json",
			success:function(data){
				var html=template('discoutRe',data);
				$("#discountUl").html(html);
			}
		})

		
		
		
	})
})()