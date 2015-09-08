/**
 * Created by artkuh on 31.8.15.
 */
//Refactoring
var elements = require('./DOMElements.js');
var slider = require('./sliderSettings.js');
var handlers = require('./scrollHandlers.js');
var imagesContainer = require('./imageContainer.js');
var scroll = require('./scrollPreventer.js');
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
    $.post('/result', {merge: res}, function (data) {
        elements.$vkShare.empty();
        elements.$vkShare.html(VK.Share.button({url:
        location.origin +'&'+
        '&title=Awesome site&' +
        'description=Awesome Awesome Awesome&' +
        'image='+location.origin+data+'&' +
        'noparse=true'}));
    });
};

module.exports = function () {
    elements.$buttonUp.
        click(function () {
            var bodyPart = imagesContainer.previous();
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
        scroll.enableScroll();
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
        if ($(event.target).is('img')) {

            elements.$demo.empty().append("<div class=\"shape\"><img src=\"images/Face6.png\"></div>");
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