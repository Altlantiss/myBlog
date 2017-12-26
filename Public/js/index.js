var mySwiper = new Swiper('.swiper-container',{
    prevButton:'.swiper-button-prev',
    nextButton:'.swiper-button-next',
    simulateTouch : false
});
var swiperSlide = $(".swiper-slide");
swiperSlide.css("width","1190px");

var nav = $(".nav a");
var swiperButton = $(".swiper-button");
var active = 0;

swiperButton.eq(0).on("click",function(){
    active += 1;
    nav.eq(active).addClass("active");
    nav.eq(active).parent().siblings().children().removeClass("active");
});
swiperButton.eq(1).on("click",function(){
    active -= 1;
    nav.eq(active).addClass("active");
    nav.eq(active).parent().siblings().children().removeClass("active");
});

function simClick(index){
    var differ;
    if( index > active ){
        differ = index - active;
        for(var i= 0;i< differ; i++){
            swiperButton.eq(0).click();
        }
    }
    if( index < active ){
        differ = active - index;
        for(var j= 0;j< differ; j++){
            swiperButton.eq(1).click();
        }
    }
}

var index;

var locationIndex = location.search.split("=");
if( locationIndex[1] ){
    index = parseInt(locationIndex[1]);
    Isindex(index);
}


nav.on("click",function(){
    index = $(this).parent().index();
    Isindex(index);
    return false;
});


function Isindex(index){
    switch (index)
    {
        case 0:
            simClick(index);
            break;
        case 1:
            simClick(index);
            break;
        case 2:
            simClick(index);
            break;
        case 3:
            simClick(index);
            break;
    }
}








