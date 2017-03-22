(function(){
	var pageid=1;//设置页面id
	var page=0;//页数
	var categoryName="";
	// 获取超值折扣推荐数据
	getDiscoList(pageid,function(date){
		var html=template('discoutRe',date);
		$("#discountUl").html(html);

		page=Math.ceil(date.totalCount/date.pagesize);
		lastPage();
		nextPage();
		selectPage();
	})





		// 上一页
function lastPage(){
	$(".prePage").on('click',function(){
		if(pageid!=1){
			pageid-=1;
			getDiscoList(pageid,function(date){
			// 渲染上一页
				var html=template('discoutRe',date);
				$("#discountUl").html(html);

				//页面跳到顶部
				// $('.prePage').attr('href',"#");
				// 下拉列表显示
				$("option").removeAttr("selected");
				$("[value="+pageid+"]").prop("selected","selected");
			})
		}else{
			$('.prePage').attr('href',"javascript:");
		}				
	})
}
	// 下一页
function nextPage(){
	$(".nextPage").on('click',function(){
		if(pageid!=page){
			pageid+=1;
			
			getDiscoList(pageid,function(date){
				// 渲染下一页
				var html=template('discoutRe',date);
				$("#discountUl").html(html);
				//页面跳到顶部
				// $('.nextPage').attr('href',"#");
				//下拉列表显示
				$("option").removeAttr("selected");
				$("[value="+pageid+"]").prop("selected","true");
			})
		}else{
			$('.nextPage').attr('href',"javascript:");//该按钮不能使用
		}
	})
}
// 下拉列表
function selectPage(){
	var options="";
	//创建下拉项
	for(var i=0;i<page;i++){
		var option="<option value='"+(i+1)+"'>"+(i+1)+"/"+page+"</option>";
		options+=option;
	}
	$(".pageSelect").html(options);//渲染下拉项
	// 选择下拉项
	$(".pageSelect").on("change",function(){

		pageid=+$(':selected')[0].value;//获取选中项的value值
		//将选中的页面渲染出来
		getDiscoList(pageid,function(data){
			var html=template('discoutRe',data);
			$("#discountUl").html(html);
			
		})
	})
}
})()