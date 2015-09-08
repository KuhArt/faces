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
    $canvas : $('#my-canvas').hide(),
    $vkShare : $('#vk-share-button')
};
},{}],2:[function(require,module,exports){
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
},{"./DOMElements.js":1,"./imageContainer.js":3,"./scrollHandlers.js":5,"./scrollPreventer.js":6,"./sliderSettings.js":7}],3:[function(require,module,exports){
/**
 * Created by artkuh on 14.8.15.
 */

module.exports = (function () {
    var insideImages = images,
        index = -1,
        keys = [],
        activeParts ={} ;
    for (var i = 0, allKeys = Object.keys(insideImages); i < allKeys.length; i += 1) {
        var key = allKeys[i];
        if (insideImages.hasOwnProperty(key)) {
            keys[i] = key;
            activeParts[key] = 0;
        }
    }
  images = undefined;
    return {
        hasNext: function () {
            return index != keys.length - 1;
        },
        hasPrevious: function () {
            return index != 0;
        },
        next: function () {
            index++;
            var key = keys[index],
                obj = {type: key, bodyParts: insideImages[key]};
            return obj;
        },
        previous: function () {
            index--;
            var key = keys[index],
                obj = {type: key, bodyParts: insideImages[key]};
            return obj;
        },
        goToStart: function () {
            index = -1;
            return this;
        },
        getActivePart: function (type) {
            return activeParts[type];
        },
        setActivePart: function (type, index) {
            activeParts[type] = index;
        },
        size: function () {
            return keys.length;
        },
        setActiveDefault: function () {
         for(var key in activeParts){
             if(activeParts.hasOwnProperty(key)){
                 activeParts[key] = 0;
             }
         }
        }

    }

})();

},{}],4:[function(require,module,exports){
$(document).ready(function () {
//    var slider = require('sliderSettings.js');
    var elements = require('./DOMElements.js');
    var buttons = require('./buttons.js');
    var slider = require('./sliderSettings');
    var imagesContainer = require('./imageContainer.js');
    var scroll = require('./scrollPreventer.js');
    var sliderBug = true;
    if (screen.availHeight !== outerHeight
        || screen.availWidth !== outerWidth) {
        if (!elements.$maximizeMassage.is(':visible')) {
            elements.$wrapper.hide();
            elements.$maximizeMassage.show();
        }
    }
    scroll.disableScroll();
    buttons();
    $('html, body').animate({scrollTop: 0}, 'slow');
    $(window).resize(function () {
        elements.$wrapper.css({
            width: window.innerWidth + 'px',
            height: window.innerHeight + 'px'
        });
        if(sliderBug){
            slider.init(imagesContainer.goToStart().next())
            sliderBug =false;
        }

        if (screen.availHeight === outerHeight
            && screen.availWidth === outerWidth) {
            elements.$wrapper.show();
            elements.$maximizeMassage.hide();
        } else {
            if (!elements.$maximizeMassage.is(':visible')) {
                //Hide all body nodes
                elements.$wrapper.hide();
                elements.$maximizeMassage.show();
            }
        }
    });

});




},{"./DOMElements.js":1,"./buttons.js":2,"./imageContainer.js":3,"./scrollPreventer.js":6,"./sliderSettings":7}],5:[function(require,module,exports){
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
                    $('html, body').animate({scrollTop: $('#results').offset().top +10}, 'slow');
                } else {
                    if (event.deltaY > 0) {
                        $('html, body').animate({scrollTop: 0}, 'slow');
                    }
                }
            }
        }
        prevTime = curTime;
        event.preventDefault()
    }
};
},{}],6:[function(require,module,exports){
/**
 * Created by artkuh on 20.8.15.
 */
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

exports.disableScroll = function() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove  = preventDefault; // mobile
    document.onkeydown  = preventDefaultForScrollKeys;
}

exports.enableScroll = function () {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}
},{}],7:[function(require,module,exports){
/**
 * Created by artkuh on 31.8.15.
 */
var elements = require('./DOMElements.js');
var imagesContainer = require('./imageContainer.js')
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
},{"./DOMElements.js":1,"./imageContainer.js":3}]},{},[4]);
