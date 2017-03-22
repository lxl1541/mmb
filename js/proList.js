(function(){
	//设置上一页不跳转

	$('.prePage').attr('href',"javascript:");

	var categoryid=location.search.split("=")[1];//获取传入的分类id
	var pageid=1;//设置页面id
	var page=0;//页数
	var categoryName="";
	
	//渲染分类导航
	$.ajax({
		type:'get',
		dataType:"json",
		url:"http://192.168.15.96:3000/api/getcategorybyid?categoryid="+categoryid,
		success:function(date){//获取分类
			categoryName=date.result[0].category;
			var html=template("cateByid",date);
			$(".proNav").html($(".proNav").html()+html);
		}
	})
	// 渲染商品列表
	getproList(categoryid,pageid,function(date){
		page=Math.ceil(date.totalCount/date.pagesize);//获取页数
		//将商品列表渲染到页面
		var html=template("proLists",date);
		$(".proContent").html(html);
		// 把分类名当做参数
		$(".onePro").on("click",function(){
			var href=$(this).attr("href")+categoryName;
			$(this).attr("href",href);
		})
		// $(".onePro").attr("href",$(".onePro").attr("href")+categoryName);
		lastPage();
		nextPage();
		selectPage();
	})
	

	// 上一页
function lastPage(){
	$(".prePage").on('click',function(){
		console.log(pageid);
		if(pageid!=1){
			pageid-=1;
			
			getproList(categoryid,pageid,function(date){
			// 渲染下一页
			var html=template("proLists",date);
			$(".proContent").html(html);
			//页面跳到顶部
			$('.prePage').attr('href',"#");
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
			
			getproList(categoryid,pageid,function(date){
				// 渲染下一页
				var html=template("proLists",date);
				$(".proContent").html(html);
				//页面跳到顶部
				$('.nextPage').attr('href',"#");
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
		getproList(categoryid,pageid,function(date){
			var html=template("proLists",date);
			$(".proContent").html(html);
		})
	})
}

/**
 *功能: 获取商品列表信息
 *参数:categoryid:number,pageid:number,callback:function
 *返回值:void
 */
function getproList(categoryid,pageid,callback){
	$.ajax({
		type:'get',
		dataType:"json",
		url:"http://192.168.15.96:3000/api/getproductlist?categoryid="+categoryid+"&&pageid="+pageid,
		success:function(date){//获取商品列表信息
			callback(date);
		}
	})
}



})()