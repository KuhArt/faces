  var colors = [
        "#eeeeee",
        "#ddddee",
        "#eeccee",
        "#eeeecc"
  ];

  var bodyPartsIndex = 0;
  var partIndex = 0;
  var cookies = document.cookie;
  var eyes = [
  "<div class = \"slide eyes\"><img src=\"images/Eyes3.png\"> </div>",
  "<div class = \"slide eyes\"><img src=\"images/Eyes4.png\"></div>"
  ];
  var noses = [
  "<div class = \"slide noses\"><img src=\"images/Nose1.png\"></div>",
  "<div class = \"slide noses\"><img src=\"images/Nose2.png\"></div>"
  ];
  var lips = [
  "<div class = \"slide lips\"><img src=\"images/Lips3.png\"></div>"  ,
  "<div class = \"slide lips\"><img src=\"images/Lips4.png\"></div>"
  ]; 
  var hair = [
  "<div class = \"slide hair\"><img src=\"images/Hair1.png\"></div>",
  "<div class = \"slide hair\"><img src=\"images/Hair2.png\"></div>"
  ];

  var bodyParts = [
  {type:"eyes",data:eyes},
  {type:"noses",data:noses},
  {type:"lips",data:lips},
  {type:"hair",data:hair}
  ];         

  var activeParts = [];
  var isChanged = false;

  var slider = $('.slider8').bxSlider({
      mode: 'vertical',
      startSlide:0,
      slideWidth: 300,
    //  minSlides: 2,
      adaptiveHeight: true, 
      slideMargin: 0,
      slideSelector: '.slider8 .visible',
      onSlideAfter: function($slideElement, oldIndex, newIndex){
          var element = $('.demo .'+bodyParts[bodyPartsIndex].type);
          if (element.length != 0 ){
          element.remove();
           }
           activeParts[bodyPartsIndex] = newIndex;
          $('.demo').append(bodyParts[bodyPartsIndex].data[newIndex]);
      },
     onSliderLoad: function (index) {
     var element = $('.demo .'+bodyParts[bodyPartsIndex].type);
     if(element.length != 0 ){
      element.remove();
     }
     activeParts[bodyPartsIndex] = index;
     $('.demo').append(bodyParts[bodyPartsIndex].data[index]);
        if($('.demo div').length == bodyParts.length + 1){
          console.log("End Button appeared!!!!");
     $('.endButton').css({"visibility" : "visible"});
     }
    }});

  $(document).ready(function(){

   $('.errorButton').css({visibility:"visible"});
    $('.buttonUp').click(function(event) {
      console.log('buttonUp clicked!');
      bodyPartsIndex--;
      $(this).css({visibility:"visible"});  
      $("body").animate({backgroundColor:colors[bodyPartsIndex]},{duration: 'slow',queue: false});
      $('.slider-wrap').
      animate({top:"0%",transform: "translateY(-150%)"},
      {
        duration:200,
        queue: false,
        complete: function() {
         $('.slider8 .visible').removeClass('visible');
        console.log('.slider .'+bodyParts[bodyPartsIndex].type);
        $('.slider8 .'+bodyParts[bodyPartsIndex].type).addClass('visible');
        slider.reloadSlider({
      mode: 'vertical',
      startSlide:activeParts[bodyPartsIndex],
      slideWidth: 300,
    //  minSlides: 2,
      adaptiveHeight: true, 
      slideMargin: 0,
      slideSelector: '.slider8 .visible',
      onSlideAfter: function($slideElement, oldIndex, newIndex){
          var element = $('.demo .'+bodyParts[bodyPartsIndex].type);
          if (element.length != 0 ){
          element.remove();
           }
           activeParts[bodyPartsIndex] = newIndex;
          $('.demo').append(bodyParts[bodyPartsIndex].data[newIndex]);
      },
     onSliderLoad: function (index) {
     var element = $('.demo .'+bodyParts[bodyPartsIndex].type);
     if(element.length != 0 ){
      element.remove();
     }
     activeParts[bodyPartsIndex] = index;
     $('.demo').append(bodyParts[bodyPartsIndex].data[index]);
        if($('.demo div').length == bodyParts.length + 1){
          console.log("End Button appeared!!!!");
     $('.endButton').css({"visibility" : "visible"});
     }
    }});
        $(this).css({top: "100%",transform: "translateY(100%)"}).
        animate({top:"30%",transform: "translateY(-50%)"},'slow');
      }
    });

    if(bodyPartsIndex == 0){
      $(this).css({visibility:"hidden"});
    }
    if(bodyPartsIndex != bodyParts.length){
      $('.buttonDown').css({visibility:"visible"}); 
    }
  });

$('.buttonDown').click(function(event) {
      bodyPartsIndex++;
      $(this).css({visibility:"visible"}); 
      console.log('buttonDown clicked!');
      $("body").animate({backgroundColor : colors[bodyPartsIndex]},{duration: 'slow', queue: false});
      $('.slider-wrap').
      animate({top:"100%",transform: "translateY(100%)"},
        {
          duration:'slow',
          queue: false,
          complete:function() {
              $('.slider8 .visible').removeClass('visible');
              console.log('.slider .' + bodyParts[bodyPartsIndex].type);
              $('.slider8 .' + bodyParts[bodyPartsIndex].type).addClass('visible');
              slider.reloadSlider(
                {
      mode: 'vertical',
      startSlide:activeParts[bodyPartsIndex],
      slideWidth: 300,
    //  minSlides: 2,
      adaptiveHeight: true, 
      slideMargin: 0,
      slideSelector: '.slider8 .visible',
      onSlideAfter: function($slideElement, oldIndex, newIndex){
          var element = $('.demo .'+bodyParts[bodyPartsIndex].type);
          if (element.length != 0 ){
          element.remove();
           }
           activeParts[bodyPartsIndex] = newIndex;
          $('.demo').append(bodyParts[bodyPartsIndex].data[newIndex]);
      },
     onSliderLoad: function (index) {
     var element = $('.demo .'+bodyParts[bodyPartsIndex].type);
     if(element.length != 0 ){
      element.remove();
     }
     activeParts[bodyPartsIndex] = index;
     $('.demo').append(bodyParts[bodyPartsIndex].data[index]);
        if($('.demo div').length == bodyParts.length + 1){
          console.log("End Button appeared!!!!");
     $('.endButton').css({"visibility" : "visible"});
     }
    }}
                );
              $(this).css({top: "0%",transform: "translateY(-100%)"}).animate({top:"30%",transform: "translateY(-50%)"},'slow');
          }});

    if (bodyPartsIndex == bodyParts.length - 1){
      console.log("buttonDown hidden");
      $(this).css({visibility : "hidden"}); 
    }
    if (bodyPartsIndex != 0){
      $('.buttonUp').css({visibility : "visible"});
    }

  });

  $('.endButton').click(function(){
    $.get("http://localhost:8080/myservlet", 
      {activeParts},
     function(res){
      console.log(res);
    });
    bodyPartsIndex = 0;
    $('.slider8 .visible').removeClass('visible');
              console.log('.slider .' + bodyParts[bodyPartsIndex].type);
    $('.slider8 .' + bodyParts[bodyPartsIndex].type).addClass('visible')
    $('body>div:not(.demo)').css({visibility : "hidden"});
    $('.demo').animate({left:"40%",top:"20%", transform: "translateY(-50%)",transform: "translateX(-50%)"},{duration : "slow"});
    $('.changeButton').css({visibility:"visible"});
    $('.errorButton').css({visibility:"visible"});
  });

     $.get("http://localhost:8080/myservlet", 
      {money:"Money"},
     function(res){
      console.log(res);
    });
     $('.errorButton').click(function(){
       $.get("http://localhost:8080/myservlet",
        {error:"Error"},
            function(res){
             console.log(res);
           }
       )
     });

      $('.changeButton').click(function(event) {
      activeParts = [];
      $('.body').css({background : colors[0]});
      $('.demo').animate({left:"58%",top:"32%", transform: "translateY(-60%)"},{duration : "slow"}).empty().append("<div class=\"shape\"><img src=\"images/Face6.png\"></div>");
      $(this).css({visibility : "hidden"});
      $('.slider-wrap').css({visibility : "visible"});
      slider.reloadSlider({mode: 'vertical',
      startSlide:0,
      slideWidth: 300,
    //  minSlides: 2,
      adaptiveHeight: true, 
      slideMargin: 0,
      slideSelector: '.slider8 .visible',
      onSlideAfter: function($slideElement, oldIndex, newIndex){
          var element = $('.demo .'+bodyParts[bodyPartsIndex].type);
          if (element.length != 0 ){
          element.remove();
           }
           activeParts[bodyPartsIndex] = newIndex;
          $('.demo').append(bodyParts[bodyPartsIndex].data[newIndex]);
      },
     onSliderLoad: function (index) {
     var element = $('.demo .'+bodyParts[bodyPartsIndex].type);
     if(element.length != 0 ){
      element.remove();
     }
     activeParts[bodyPartsIndex] = index;
     $('.demo').append(bodyParts[bodyPartsIndex].data[index]);
        if($('.demo div').length == bodyParts.length + 1){
          console.log("End Button appeared!!!!");
     $('.endButton').css({"visibility" : "visible"});
     }
    }});
      if(bodyPartsIndex != 0){
      $('.buttonUp').css({visibility : "visible"});}
      if(bodyPartsIndex != bodyParts.length){
      $('.buttonDown').css({visibility : "visible"});
    }
    });
    console.log("HI!!!!");
    console.log(document.cookie);
    if (cookies) {
      console.log(cookies);
      var posEqual = cookies.indexOf("=");
      var posSem = cookies.indexOf(";");
      var valueIndex = 0;
      var values = [];  
      while(posEqual > -1){
        if (posSem == -1) {
            values[valueIndex++] = cookies.substring(posEqual + 1);
        }else{
        values[valueIndex++] = cookies.substring(posEqual + 1,posSem);
      }
        console.log(posEqual,posSem);
        posSem = cookies.indexOf(";", posSem + 1)
        posEqual = cookies.indexOf("=", posEqual + 1);
      }
      console.log(values);
      $('.demo').empty().append("<div class=\"shape\"><img src=\"images/Face6.png\"></div>");
      $('body>div:not(.demo)').css({visibility : "hidden"});
      $('.errorButton').css({visibility:"hidden"});
      for(var i = 0; i < bodyParts.length; i++){
          $('.demo').append(bodyParts[i].data[values[i]]);
      }
      $('.demo').css({left:"50%",top:"20%", transform: "translateY(-50%)",transform: "translateX(-50%)"});
      $('.changeButton').css({visibility:"visible"});
    } else {
    $('.buttonUp').css({visibility:"hidden"});
    $('.body').css({background : colors[0]});
  }
  });

 