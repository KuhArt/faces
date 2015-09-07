/**
 * Created by artkuh on 31.8.15.
 */
//Refactoring
var elements = require('./DOMElements.js');
var slider = require('./sliderSettings.js');
var handlers = require('./scrollHandlers.js');
var mergeImages = function () {
    var parts = elements.$demo.find('img'),
        canvas = document.getElementById('my-canvas'),
        context = canvas.getContext('2d');
    for (var i = 0, max = parts.length; i < max; i += 1) {
        var img = new Image();
        img.src = parts[i].src;
        context.drawImage(img,0,0,300,300);
    }
    var res = canvas.toDataURL("img/png");
    context.clearRect(0, 0, canvas.width, canvas.height);
    elements.$demo.empty();
    elements.$demo.html("<img " + "src=" + "\"" + res + "\"" + "/>");
    console.log("Image",location.origin +"/"+elements.$demo.find('img')[0].src);
    $.get('/result', {merge: res}, function (data) {
        console.log(data);
        console.log(location.origin+data);
        elements.$vkShare.html(VK.Share.button({url:
        location.origin +'&'+
        '&title=Заголовок статьи&' +
        'description=Краткое описание статьи&' +
        'image='+location.origin+data+'&' +
        'noparse=true'}));
    //    window.location.href = data.redirect;
    });

    //elements.$vkShare.html(VK.Share.button({
    //    url: location.origin,
    //    title: 'Хороший сайт',
    //    description: 'Это мой собственный сайт, я его очень долго делал',
    //        image: 'https://pp.vk.me/c629425/v629425850/9498/COFKIzmSBw8.jpg',
    //    noparse: true
    //}));
    console.log(res);
};

module.exports = function () {
    elements.$buttonUp.
        click(function () {
            var bodyPart = imagesContainer.previous();
            console.log('prev', bodyPart);
            elements.$slider_wrap.
                animate({top: "-30%"},
                {
                    duration: 200,
                    queue: false,
                    complete: function () {
                        slider.init(bodyPart);
                        $(this).
                            css({top: "120%"}).
                            animate({top: "50%"}, 'slow');
                    }
                });

            if (!imagesContainer.hasPrevious()) {
                $(this).css({visibility: "hidden"});
            }
            if (imagesContainer.hasNext()) {
                elements.$buttonDown.css({visibility: "visible"});
            }
        });

    elements.$buttonDown.click(function () {
        var bodyPart = imagesContainer.next();
        console.log('next', bodyPart, 'hasNext:', imagesContainer.hasNext());
        elements.$slider_wrap.
            animate({top: "150%"},
            {
                duration: 'slow',
                queue: false,
                complete: function () {
                    slider.init(bodyPart);
                    $(this).
                        css({top: "-50%"}).
                        animate({top: "50%"}, 'slow');
                }
            });

        if (!imagesContainer.hasNext()) {
            $(this).css({visibility: "hidden"});
        }
        if (imagesContainer.hasPrevious()) {
            elements.$buttonUp.css({visibility: "visible"});
        }

    });

    elements.$endButton.click(function () {
        mergeImages();
        enableScroll();
        $('html, body')
            .on('mousewheel', handlers.wheelHandler)
            .on('keypress', handlers.keyHandler);
        $("#wrapper>div:not(#demo)").css({visibility: "hidden"});
        elements.$canvas.css({visibility: 'visible'});
        elements.$scrollText.css({visibility: 'visible'});
        elements.$resText.css({visibility: 'visible'});
        elements.$results.css({visibility: "visible"});
        elements.$vkShare.css({visibility: "visible"});
        elements.$demo.animate({
            left: "50%",
            top: "50%"
        }, {duration: "slow"});
        elements.$demo.find('img').animate({
            transform: "scale(1.5,1.5)"
        }, {duration: "slow"});

        elements.$changeButton.css({visibility: "visible"});
    });

    elements.$results.on('click', function (event) {
        console.log(event.target);
        if ($(event.target).is('img')) {
            console.log('image click');

            elements.$demo.empty().append("<div class=\"shape\"><img src=\"images/Face6.png\"></div>");
            console.log($(event.target).parents()[1]);
            $($(event.target).parents()[1])
                .clone()
                .contents()
                .appendTo(elements.$demo);
            mergeImages();
            elements.$demo.find('img').css({transform: "scale(1.5,1.5)"});
            $("html, body").animate({scrollTop: 0}, 'slow');
        }
    });
    elements.$changeButton.click(function () {
        $('html, body')
            .off('mousewheel', handlers.wheelHandler)
            .off('keypress', handlers.keyHandler)
            .animate({scrollTop: 0}, "slow");
        elements.$scrollText.css({visibility: 'hidden'});
        elements.$resText.css({visibility: 'hidden'});
        elements.$buttonUp.css({visibility: "hidden"});
        elements.$buttonDown.css({visibility: "visible"});
        elements.$slider_wrap.css({visibility: "visible"});

        imagesContainer.setActiveDefault();
        elements.$demo
            .animate({
                left: "66%",
                top: "47%"
            }, {duration: "slow"})
            .empty()
            .append("<div class=\"shape\"><img src=\"images/Face6.png\"></div>");
        $(this).css({visibility: "hidden"});
        slider.init(imagesContainer.goToStart().next());
    });
};