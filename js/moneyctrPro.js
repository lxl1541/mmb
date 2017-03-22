(function(){
	var productId=location.search.split("=")[1];
	console.log(productId);



	getMoneyctrlPro(productId,function(date){
		var html=template("moneyctrProTemp",date);
		$(".onePro").html(html);

		var html2=template("proCityTemp",date);
		$(".area").html(html2);
	});




	/**	
	 *功能：获取省钱控详情页信息
	 *参数：productId：number
	 *返回值：void
	 */
	function getMoneyctrlPro(productId,callback){
		$.ajax({
			type:"get",
			url:"http://192.168.15.96:3000/api/getmoneyctrlproduct?productid="+productId,
			dateType:"json",
			success:function(date){
				console.log(date);
				callback(date);
			}
		})
	}
})()