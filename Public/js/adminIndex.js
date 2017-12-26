var inlineClass = $(".html .inline-class");

for(var i= 0; i< inlineClass.length; i++){
    if( inlineClass.eq(i).text() === "0" ){
        inlineClass.eq(i).text("HTML");
    }else{
        inlineClass.eq(i).text("PHP");
    }
}

//列表功能
var htmlLi = $(".html .ul li");
var activeNum;
//按钮功能
var addClass = $(".functionBox #class");
var btnAdd = $(".btnAdd");
var btnDelete = $(".btnDelete");
var fbChance = $(".functionBox .chance");
var fbOk = $(".functionBox .ok");

//列表点击功能
htmlLi.on("click",function(){
    activeNum = false;
    $(this).children(".activeBox").toggleClass("active");
    var activeBox = $(this).parent().children().children(".activeBox");

    for(var i = 0; i<= $(this).siblings().length; i++ ){
       var activeBoxArr =  activeBox.eq(i).attr("class").split(" ");
       if( activeBoxArr[1] === "active" ){
           activeNum = true;
       }
    }
   if( activeNum === true ){
       $(this).parent().siblings(".btn").children(".btnBox").children(".btnDelete").addClass("available");
       $(this).parent().siblings(".btn").children(".btnBox").children(".btnUpdate").addClass("available");
   }else{
       $(this).parent().siblings(".btn").children(".btnBox").children(".btnDelete").removeClass("available");
       $(this).parent().siblings(".btn").children(".btnBox").children(".btnUpdate").removeClass("available");
   }
});

//添加-按钮事件
btnAdd.on("click",function(){
    $(this).parent().siblings(".functionBox").children(".addTitle").attr("placeholder","请输入内容!");
    $(this).parent().siblings(".functionBox").children(".addText").attr("placeholder","请输入内容!");
    $(this).parent().siblings(".functionBox").children(".addTitle").removeClass("addRed");
    $(this).parent().siblings(".functionBox").children(".addText").removeClass("addRed");
    $(this).parent().siblings(".functionBox").children(".addName").attr("placeholder","请输入内容!");
    $(this).parent().siblings(".functionBox").children(".addPwd").attr("placeholder","请输入内容!");
    $(this).parent().siblings(".functionBox").children(".addName").removeClass("addRed");
    $(this).parent().siblings(".functionBox").children(".addPwd").removeClass("addRed");
    $(this).parent().siblings(".functionBox").show();
    return false;
});
//添加功能-取消按钮
fbChance.on("click",function(){
    $(this).parent().parent().hide();
    return false;
});
//添加功能-确认按钮
fbOk.on("click",function(){
//如果是新闻页
    if( $(this).parent().attr("class") === "fbNews" ){
        if( $(this).parent().siblings(".addTitle").val() && $(this).parent().siblings(".addText").val() ){
            var addNews = $.ajax({
                type:"POST",
                url:"http://www.blog.com/index.php/admin/index/newsAdd",
                dataType:"json",
                data:{
                    "class":addClass.val(),
                    "title":$(this).parent().siblings(".addTitle").val(),
                    "text":$(this).parent().siblings(".addText").val()
                },
                success:function(data){
                    alert("添加成功!");
                    fbChance.eq(0).parent().parent().hide();
                    pageIndex = data["data"];
                    pageSelect(pageIndex,newsPagesNum);
                },
                error:function(err){
                    alert(err);
                }
            })
        }else{
            if( !$(this).parent().siblings(".addTitle").val() ){
                $(this).parent().siblings(".addTitle").attr("placeholder","请输入内容!");
                $(this).parent().siblings(".addTitle").addClass("addRed");
            }
            if( !$(this).parent().siblings(".addText").val() ){
                $(this).parent().siblings(".addText").attr("placeholder","请输入内容!");
                $(this).parent().siblings(".addText").addClass("addRed");
            }
        }
    }
//如果是用户页
    if( $(this).parent().attr("class") === "fbUser" ){
        if( $(this).parent().siblings(".addName").val() && $(this).parent().siblings(".addPwd").val() ){
            var addUser = $.ajax({
                type:"POST",
                url:"http://www.blog.com/index.php/admin/index/userAdd",
                dataType:"json",
                data:{
                    "name":$(this).parent().siblings(".addName").val(),
                    "pwd":$(this).parent().siblings(".addPwd").val()
                },
                success:function(data){
                    alert("添加成功!");
                    fbChance.eq(1).parent().parent().hide();
                    pageIndex = data["data"];
                    pageSelect(pageIndex,userPagesNum);
                },
                error:function(err){
                    alert(err);
                }
            });
        }else{
            if( !$(this).parent().siblings(".addName").val() ){
                $(this).parent().siblings(".addName").attr("placeholder","请输入内容!");
                $(this).parent().siblings(".addName").addClass("addRed");
            }
            if( !$(this).parent().siblings(".addPwd").val() ){
                $(this).parent().siblings(".addPwd").attr("placeholder","请输入内容!");
                $(this).parent().siblings(".addPwd").addClass("addRed");
            }
        }
    }
    return false;
});
//删除功能
btnDelete.on("click",function(){
   if( $(this) )
   var activeBox = $(this).parents(".btn").siblings(".newsUl").children().children(".activeBox");
   var activeBoxIndex = [];
   for( i = 0; i< activeBox.length; i++ ){
       var activeBoxArr =  activeBox.eq(i).attr("class").split(" ");
       if( activeBoxArr[1] === "active" ){
          activeBoxIndex.push(parseInt(activeBox.eq(i).siblings(".id").children().text()));
       }
   }

   var newsDelete = $.ajax({
      type:"POST",
      dataType:"json",
      url:"http://www.blog.com/index.php/admin/index/newsDelete",
      data:{
          "id": activeBoxIndex
      },
      success:function(data){
          console.log(data)
      } ,
       error:function(err){
          console.log(err)
       }
   });

   return false;
});


//分页功能

var newsPageBox = $("#newsPageBox");  //新闻分页
var newsPage = $(".newsPage");       //新闻页数
var userPage = $(".userPage");       //用户页数
var firstPage = $(".firstPage");     //首页
var nextPage = $(".nextPage");        //下一页
var prePage = $(".prePage");         //上一页
var lastPage = $(".lastPage");       //尾页
var pageIndex = 1;                   //新闻页码
var userPageIndex = 1;               //用户页码


for( var j = 1; j <= newsPage.text(); j++ ){     //新闻页默认加载5个分页,如果分页小于5，则加载分页数
    if( j < 6){
        $("<li class='newsPagesNum'>"+j+"</li>").insertBefore(nextPage.eq(0));
    }
}
for( j = 1; j <= userPage.text(); j++ ){     //用户页默认加载5个分页,如果分页小于5，则加载分页数
    if( j < 6){
        $("<li class='userPagesNum'>"+j+"</li>").insertBefore(nextPage.eq(1));
    }
}

//初始化分页
var newsPagesNum = $(".newsPagesNum");
var userPagesNum = $(".userPagesNum");
newsPagesNum.eq(pageIndex-1).addClass("active");
userPagesNum.eq(userPageIndex-1).addClass("active");

//首页点击
firstPage.on("click",function(){
    if( $(this).parent().parent().attr("id") === "newsPageBox" ){   //判断是否是新闻分页
        pageIndex = 1;
        pageSelect(pageIndex,newsPagesNum);
    }
    if(  $(this).parent().parent().attr("id") === "userPageBox" ){  //判断是否是用户分页
        userPageIndex = 1;
        pageSelect(userPageIndex,userPagesNum);
    }
});

//尾页点击
lastPage.on("click",function(){
    if( $(this).parent().parent().attr("id") === "newsPageBox" ){
        pageIndex = parseInt(newsPage.text());
        pageSelect(pageIndex,newsPagesNum);
    }
    if(  $(this).parent().parent().attr("id") === "userPageBox" ){
        userPageIndex = parseInt(userPage.text());
        pageSelect(userPageIndex,userPagesNum);
    }
});

//下一页点击
nextPage.on("click",function(){
    if( $(this).parent().parent().attr("id") === "newsPageBox" ){
        if( pageIndex < parseInt(newsPage.text()) ){
            pageIndex++;
            pageSelect(pageIndex,newsPagesNum);
        }
    }
    if(  $(this).parent().parent().attr("id") === "userPageBox" ){
        if( userPageIndex < parseInt(userPage.text()) ) {
            userPageIndex++;
            pageSelect(userPageIndex, userPagesNum);
        }
    }
});

//上一页点击
prePage.on("click",function(){
    if( $(this).parent().parent().attr("id") === "newsPageBox" ){
        if( pageIndex <= parseInt(newsPage.text()) && pageIndex > 1){
            pageIndex--;
            pageSelect(pageIndex,newsPagesNum);
        }
    }
    if(  $(this).parent().parent().attr("id") === "userPageBox" ){
        if( userPageIndex <= parseInt(userPage.text()) && userPageIndex > 1 ) {
            userPageIndex--;
            pageSelect(userPageIndex, userPagesNum);
        }
    }
});

//直接点击分页
newsPagesNum.on("click",function(){
   pageIndex = parseInt($(this).text());
   pageSelect(pageIndex,newsPagesNum);
});

userPagesNum.on("click",function(){
    userPageIndex = parseInt($(this).text());
    pageSelect(userPageIndex,userPagesNum);
});

function pageSelect(pageIndex,pagesNum){

    if( pagesNum.length >= 5  ){
        if( pageIndex > 3 && pageIndex <= newsPage.text() - 2){       //大于第三页就开始动态变化页码
            var pageIndexChange = pageIndex - 2;
            for(var k = 0; k < 5; k++){
                pagesNum.eq(k).text(pageIndexChange);
                pageIndexChange++;
            }
            pagesNum.eq(2).addClass("active");
            pagesNum.eq(2).siblings().removeClass("active");

        }else if( pageIndex === parseInt(newsPage.text()) - 1 ){       //倒数第二页
            pageIndexChange = pageIndex - 3;
            for( k = 0; k < 5; k++){
                pagesNum.eq(k).text(pageIndexChange);
                pageIndexChange++;
            }
            pagesNum.eq(3).addClass("active");
            pagesNum.eq(3).siblings().removeClass("active");

        }else if( pageIndex === parseInt(newsPage.text()) ){  //尾页
            pageIndexChange = pageIndex - 4;
            for( k = 0; k < 5; k++){
                pagesNum.eq(k).text(pageIndexChange);
                pageIndexChange++;
            }
            pagesNum.eq(4).addClass("active");
            pagesNum.eq(4).siblings().removeClass("active");

        }else if( pageIndex === 1 ){                          //首页
            pageIndexChange = pageIndex ;
            for( k = 0; k < 5; k++){
                pagesNum.eq(k).text(pageIndexChange);
                pageIndexChange++;
            }
            pagesNum.eq(0).addClass("active");
            pagesNum.eq(0).siblings().removeClass("active");

        }else if(pageIndex === 2){                              //第二页
            pageIndexChange = pageIndex - 1;
            for( k = 0; k < 5; k++){
                pagesNum.eq(k).text(pageIndexChange);
                pageIndexChange++;
            }
            pagesNum.eq(1).addClass("active");
            pagesNum.eq(1).siblings().removeClass("active");

        }else if(pageIndex === 3){                             //第三页
            pageIndexChange = pageIndex - 2 ;
            for( k = 0; k < 5; k++){
                pagesNum.eq(k).text(pageIndexChange);
                pageIndexChange++;
            }
            pagesNum.eq(2).addClass("active");
            pagesNum.eq(2).siblings().removeClass("active");
        }
    }else{
        pagesNum.eq(pageIndex-1).addClass("active");
        pagesNum.eq(pageIndex-1).siblings().removeClass("active");
    }


    var pages;
    if( pagesNum.parent().parent().attr("id") === "newsPageBox" ){  //判断是哪一个分页
         pages = "news";
    }else{
         pages = "user";
    }

    var selectHtml = $.ajax({
        type:"POST",
        url:"http://www.blog.com/index.php/admin/index/pageSelect",
        dataType:"json",
        data:{"pageIndex":pageIndex,"page":pages},
        success:function(data){

            var newsUl = $(".html .newsUl li");
            var userUl = $(".html .userUl li");

            var ulSelect =  function(ul){
                for(var i = 0; i<data["data"].length; i++ ){    //遍历数据
                    ul.eq(i).children("p").eq(0).children("span").eq(0).text(data["data"][i].id);
                    if( data["data"][i].class === "0" ){
                        ul.eq(i).children("p").eq(1).children("span").eq(0).text("HTML");
                    }
                    if( data["data"][i].class === "1" ){
                        ul.eq(i).children("p").eq(1).children("span").eq(0).text("PHP");
                    }
                    if( data["data"][i].name ){
                        ul.eq(i).children("p").eq(1).children("span").eq(0).text(data["data"][i].name);
                    }
                    ul.eq(i).children("p").eq(2).children("span").eq(0).text(data["data"][i].title);
                    ul.eq(i).children("p").eq(3).children("span").eq(0).text(data["data"][i].text);
                    ul.eq(i).css("visibility","visible");
                }

                if( data["data"].length < 5 ){
                    for(var j = 5;j >= data["data"].length ; j--){
                        ul.eq(j).css("visibility","hidden");
                    }
                }
            };

            if( pages === "news" ){
                ulSelect(newsUl);
            }else{
                ulSelect(userUl);
            }

        },
        error:function(err){
            console.log(err);
        }
    })

}



