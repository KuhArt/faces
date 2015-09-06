/**
 * Created by artkuh on 31.8.15.
 */
//Refactoring
var elements = require('./DOMElements.js');
var slider = require('./sliderSettings.js');
var handlers = require('./scrollHandlers.js');
var mergeImages = function () {
      var parts = elements.$demo.children();
      console.log(parts);
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
        $('html, body').on('mousewheel', handlers.wheelHandler);
        $('html, body').on('keypress',handlers.keyHandler);
        $("#wrapper>div:not(#demo)").css({visibility: "hidden"});
        elements.$scrollText.css({visibility: 'visible'})
        elements.$resText.css({visibility: 'visible'});
        elements.$results.css({visibility: "visible"});
        elements.$demo.animate({
            left: "50%",
            top: "50%"
        }, {duration: "slow"});
        elements.$demo.find('img').animate({
            transform: "scale(1.5,1.5)"
        }, {duration: "slow"});
        $.get('/result', {hello: 'hello'}, function (data) {
            console.log(data);
        });
        elements.$changeButton.css({visibility: "visible"});
    });


    elements.$changeButton.click(function () {
        $('html, body').off('mousewheel', handlers.wheelHandler);
        $('html, body').off('keypress', handlers.keyHandler);
        elements.$scrollText.css({visibility: 'hidden'});
        elements.$resText.css({visibility: 'hidden'});
        imagesContainer.setActiveDefault();
        $("html, body").animate({scrollTop: 0}, "slow");
        elements.$body.css({overflow: "hidden"});
        elements.$demo
            .animate({
                left: "66%",
                top: "47%"
            }, {duration: "slow"})
            .empty()
            .append("<div class=\"shape\"><img src=\"images/Face6.png\"></div>");
        $(this).css({visibility: "hidden"});
        elements.$slider_wrap.css({visibility: "visible"});
        slider.init(imagesContainer.goToStart().next());
        elements.$buttonUp.css({visibility: "hidden"});
        elements.$buttonDown.css({visibility: "visible"});
    });
};