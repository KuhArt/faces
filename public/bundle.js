(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by artkuh on 31.8.15.
 */
module.exports = {
    $buttonUp: $('#buttonUp').css({visibility: "hidden"}),
    $buttonDown: $('#buttonDown'),
    $endButton: $('#endButton'),
    $changeButton: $('#changeButton'),
    $body: $('body'),
    $slider_wrap: $('#slider-wrap'),
    $demo: $('#demo'),
    $results: $('#results'),
    $maximizeMassage: $('#maximize-msg').hide(),
    $wrapper: $('#wrapper').css({
        width: window.innerWidth + 'px',
        height: window.innerHeight + 'px'
    }),
    $resText: $('#res-text').css({visibility: "hidden"}),
    $scrollText: $('#scroll-text').css({visibility: "hidden"}),
    $canvas : $('#my-canvas').hide()
};
},{}],2:[function(require,module,exports){
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
},{"./DOMElements.js":1,"./scrollHandlers.js":4,"./sliderSettings.js":5}],3:[function(require,module,exports){
$(document).ready(function () {
//    var slider = require('sliderSettings.js');
    var elements = require('./DOMElements.js');
    var buttons = require('./buttons.js');
    disableScroll();
    buttons();
    $('html, body').animate({scrollTop: 0}, 'slow');
    $(window).resize(function () {
        console.log("window size changed");
        elements.$wrapper.css({
            width: window.innerWidth + 'px',
            height: window.innerHeight + 'px'
        });
        if (screen.availHeight === outerHeight
            && screen.availWidth === outerWidth) {
            elements.$wrapper.show();
            elements.$maximizeMassage.hide();
            console.log("Maximize");
        } else {
            if (!elements.$maximizeMassage.is(':visible')) {
                //Hide all body nodes
                elements.$wrapper.hide();
                elements.$maximizeMassage.show();
                console.log('Not maximize');
            }
        }
    });


});




},{"./DOMElements.js":1,"./buttons.js":2}],4:[function(require,module,exports){
/**
 * Created by artkuh on 31.8.15.
 */
module.exports = {
    keyHandler : function (event) {
        if (event.keyCode === 38) {
            $('html, body').animate({scrollTop: 0}, 'slow');
        } else {
            if (event.keyCode === 40) {
                $('html, body').animate({scrollTop: elements.$results.offset().top}, 'slow');
            }
        }
        event.preventDefault();
    },
    wheelHandler : function (event) {
        var curTime = new Date().getTime();
        if (typeof prevTime !== 'undefined') {
            var timeDiff = curTime - prevTime;
            if (timeDiff > 200) {
                if (event.deltaY < 0) {
                    $('html, body').animate({scrollTop: $('#results').offset().top}, 'slow');
                } else {
                    if (event.deltaY > 0) {
                        $('html, body').animate({scrollTop: 0}, 'slow');
                    }
                }
                console.log('New kinetic scroll has started!');
            }
        }
        prevTime = curTime;
        event.preventDefault()
    }
};
},{}],5:[function(require,module,exports){
/**
 * Created by artkuh on 31.8.15.
 */
var elements = require('./DOMElements.js');
var
    slider = {},
    onSlideAfter = function (bodyPart) {

        return function ($slideElement, oldIndex, newIndex) {
            var element = elements.$demo.find('.' + bodyPart.type);
            if (element.length != 0) {
                element.remove();
            }
            imagesContainer.setActivePart(bodyPart.type, newIndex);
           elements.$demo.append('<div class = \"' + bodyPart.type + '\"><img src=\"' + bodyPart.bodyParts[newIndex] + '\"> </div>');
        }
    },

    onSliderLoad = function (bodyPart) {

        return function (index) {
            var element = elements.$demo.find('.' + bodyPart.type);

            if (element.length != 0) {
                element.remove();
            }

            imagesContainer.setActivePart(bodyPart.type, index);
            elements.$demo.append('<div class = \"' + bodyPart.type + '\"><img src=\"' + bodyPart.bodyParts[index] + '\"> </div>');
            console.log('demo.length:', elements.$demo.find('div').length, 'container size:', imagesContainer.size() + 1)
            if (elements.$demo.find('div').length == imagesContainer.size() + 1) {
                elements.$endButton.css({"visibility": "visible"});
            }
        }
    };

slider.init = (function () {
    var firstElement = imagesContainer.next(),
        options = {
            mode: 'vertical',
            startSlide: imagesContainer.getActivePart(firstElement.type),
            slideWidth: 300,
            adaptiveHeight: true,
            slideMargin: 0,
            slideSelector: '.' + firstElement.type,
            onSlideAfter: onSlideAfter(firstElement),
            onSliderLoad: onSliderLoad(firstElement)
        },
        slider = $('.slider8').bxSlider(options);
    return function (bodyPart) {
        options.startSlide = imagesContainer.getActivePart(bodyPart.type);
        options.slideSelector = '.' + bodyPart.type;
        options.onSlideAfter = onSlideAfter(bodyPart);
        options.onSliderLoad = onSliderLoad(bodyPart);
        slider.reloadSlider(options);
    }
})();
module.exports = slider;
},{"./DOMElements.js":1}]},{},[3]);
