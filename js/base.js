//获取折扣列表数据
function getDiscoList(pageid,callback){
	$.ajax({
		type:"get",
		date:"json",
		url:"http://192.168.15.96:3000/api/getmoneyctrl?pageid="+pageid,
		// url:"../data/discount.json",
		success:function(data){
			callback(data)
		}
	})
}

function lxl(){

	
}
