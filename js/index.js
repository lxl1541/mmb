(function(){
	
	$(function(){
		$.ajax({
			type:"get",
			date:"json",
			url:"http://mmb.ittun.com/api/getmoneyctrl",
			success:function(data){
				var html=template('discoutRe',data);
				$("#discountUl").html(html);
			}
		})
		$.ajax({
			type:"get",
			date:"json",
			url:"http://mmb.ittun.com/api/getindexmenu",
			success:function(data){
				var html=template('mainCate',data);
				$(".mainCategory").html(html);
			}
		})
	})
})()