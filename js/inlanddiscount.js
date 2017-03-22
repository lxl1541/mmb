(function(){


	getInlandDiscount(function(date){
		var html=template("getDiscountProTemp",date);
		$(".discountPro .row").html(html);
	});
	function getInlandDiscount(callback){
		$.ajax({
			type:"get",
			url:"http://192.168.15.96:3000/api/getinlanddiscount",
			typeDate:"json",
			success:function(date){
				// console.log(date);
				callback(date);
			}
		})
	}
})()