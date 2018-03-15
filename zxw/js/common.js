function getgoods(classID,pageCode,goodsID){//获取商品列表
	$.ajax({
		type:'get',
		url:'http://datainfo.duapp.com/shopdata/getGoods.php',
		data:{goodsID:goodsID,classID:classID,pageCode:pageCode},
		dataType:'jsonp',
		success:function(data){
			$.each(data,function(index){
				var box = $('<div></div>');
				var imgs=$("<img src='"+data[index].goodsListImg+"'/>");
				imgs.data("id",data[index].goodsID);
				var names=$('<p>'+data[index].goodsName+'</p>');
				var pic=$('<span>￥'+data[index].price+'</span>');
				var dis=$('<strong>￥999</strong>')
				box.append(imgs);
				box.append(names);
				box.append(pic);
				box.append(dis);
				$('section').find(".content").append(box);
			})
		}
	})
}
function bodyScale(){//适配不同的分辨率
	var devicewidth=document.documentElement.clientWidth;
	var scale=devicewidth/640;
	document.body.style.zoom=scale;
}
function getgoodsdetail(goodsID){//获取商品详情列表
	$.ajax({
		type:'get',
		url:'http://datainfo.duapp.com/shopdata/getGoods.php',
		data:{goodsID:goodsID},
		dataType:'jsonp',
		success:function(data){
			var str = data[0].imgsUrl;
			var arr = JSON.parse(str);
			var sw = $('<div class="swiper-container"></div>');
			var page = $('<div class="swiper-pagination"></div>');
			var swiper_wrapper = $('<div class="swiper-wrapper"></div>');
			$.each(arr,function(index){
//				var imgs = $('<img src="'+arr[index]+'">');
//				var lis = $('<li></li>');
//				lis.append(imgs);
//				$('.banner').append(lis);
				var swiper_slide = $('<div class="swiper-slide"><img src="'+arr[index]+'"></div>');
				swiper_wrapper.append(swiper_slide);
		//		<div class="swiper-container sw">
		//			<div class="swiper-wrapper"> 
		//				<div class="swiper-slide s1">Slide 1
		//					<p class="ani hh" swiper-animate-effect="flash" swiper-animate-duration="0.5s" swiper-animate-delay="0.3s"></p>
		//				</div> 
		//				<div class="swiper-slide s2">Slide 2
		//					<p class="ani hh" swiper-animate-effect="fadeInUp" swiper-animate-duration="1s" swiper-animate-delay="1s"></p>
		//				</div> 
		//				<div class="swiper-slide s3">Slide 3</div> 
		//			</div>
		//		</div>
			})
			sw.append(swiper_wrapper);
			sw.append(page);
			$('.banner').append(sw);
			
			
			var p1 = $('<p>'+data[0].goodsName+'</p>');
			var p2 = $('<span>￥'+(data[0].price*data[0].discount/10)+'</span>');
			var dis = $('<span>'+data[0].price+'</span>')
			var p3 = $('<p>购买人数：'+data[0].buynumber+'</p>');
			$('.goodsdetail').append(p1);
			$('.goodsdetail').append(p2);
			$('.goodsdetail').append(dis);
			$('.goodsdetail').append(p3);
			var img1 = $('<img src="'+arr[0]+'">');
			var p = $('<p>'+data[0].detail+'</p>');
			$('.detail').append(img1);
			$('.detail').append(p);
		}
	})
}
//function getgoods_shop(goodsID,index){//获取商品详情列表-购物车页面
//	$.ajax({
//		type:'get',
//		url:'http://datainfo.duapp.com/shopdata/getGoods.php',
//		data:{goodsID:goodsID},
//		dataType:'jsonp',
//		success:function(data){
////			console.log(data);
//			var img = $('<img src="'+data[0].goodsListImg+'">');
//			var goodsName = $('<p class="goodsName">'+data[0].goodsName+'</p>');
//			var goodsClass = $('<p class="goodsClass">'+data[0].className+'</p>');
//			var goodsPrice = $('<p class="goodsPrice">单价:<span class="price">￥'+data[0].price+'</span></p>');
//			var goodsNum = $('<span class="goodsNum">数量:</span><span class="ico_reduce">-</span><input type="text" class="operation" value="1"><span class="ico_plus">+</span>')
//			var div = $('<div class="shopping-lis"><div>');
//			var div1 = $('<div class="div_right"></div>')
//			div1.append(goodsName);
//			div1.append(goodsClass);
//			div1.append(goodsPrice);
//			div1.append(goodsNum);
//			div.append(img);
//			div.append(div1);
//			$('section').append(div);
//			//计算商品的总价格
//			var id_number = localStorage.key(index);
//			var nu = JSON.parse(localStorage.getItem(id_number)).single_num;
//			console.log(data[0].price);
//			priceAll += nu*data[0].price;
//			console.log(priceAll);
//		}
//	})
//}
function updateShop(userID,goodsID,num){//购物车更新
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/updatecar.php",
		dataType:"json",
		data:{userID:userID,goodsID:goodsID,number:num},
		success:function(data){
			
		}
	});
}
function getShop(userID){//查看购物车
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		async:true,
		dataType:"jsonp",
		data:{userID:userID},
		success:function(data){
			$('section').empty();
			$('.shop-list').empty();
			var priceAll = 0;
			$.each(data,function(index){
				var img = $('<img src="'+data[index].goodsListImg+'" data-id='+data[index].goodsID+'>');
				var goodsName = $('<p class="goodsName">'+data[index].goodsName+'</p>');
				var goodsClass = $('<p class="goodsClass">'+data[index].className+'</p>');
				var goodsPrice = $('<p class="goodsPrice">单价:￥<span class="price">'+data[index].price+'</span></p>');
				var goodsNum = $('<span class="goodsNum">数量:</span><span class="ico_reduce">-</span><input type="text" class="operation" value="'+data[index].number+'"><span class="ico_plus">+</span>')
				var div = $('<div class="shopping-lis"><div>');
				var div1 = $('<div class="div_right"></div>');
				var del = $('<div class="del"><i class="iconfont del-ico">&#xe68d;</i></div>');
				div1.append(goodsName);
				div1.append(goodsClass);
				div1.append(goodsPrice);
				div1.append(goodsNum);
				div.append(img);
				div.append(div1);
				div.append(del);
				$('section').append(div);
				priceAll += data[index].number * data[index].price;
			})
			var shop_number = $('<span class="shop_number">商品数量:<i class="hehe">'+parseInt(localStorage.getItem('allNum'))+'</i></span>');
			var total_price1 = $('<span class="total_price1">应付总额（不含运费）:</span>');
			var total_price2 = $('<span class="total_price2">'+priceAll+'</span>');
			$('.shop-list').append(shop_number);
			$('.shop-list').append(total_price1);
			$('.shop-list').append(total_price2);
		}
	});
}
//获取购物车总的商品数量
function getShopNum(userID){//查看购物车
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		async:true,
		dataType:"jsonp",
		data:{userID:userID},
		success:function(data){
			var num = 0;
			$.each(data,function(index){
				num += parseInt(data[index].number);
			})
			localStorage.setItem('allNum',num);
			$('.shopping-num').html(num);
		}
	});
}

//function dataSubmit(userID,n){
//	
//	$.ajax({
//		type:'get',
//		url:'http://datainfo.duapp.com/lottery/fruitsubmit.php',
//		dataType:'json',
//		data:{fruit:n,userID:userID},
//		success:function(data){
//			return data;
//		}
//	})	
//}
