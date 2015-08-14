var colors = [
    "#eeeeee",
    "#ddddee",
    "#eeccee",
    "#eeeecc"
];


$(document).ready(function () {

    var
        $buttonUp = $('div.buttonUp'),
        $buttonDown = $('div.buttonDown'),
        $endButton = $('div.endButton'),
        $changeButton = $('div.changeButton'),
        $body = $('body'),
        $slider_wrap = $('#slider-wrap'),
        $demo = $('#demo'),
        slider = {},

        onSlideAfter = function (bodyPart) {

            return function ($slideElement, oldIndex, newIndex) {
                var element = $demo.find('.' + bodyPart.type);
                if (element.length != 0) {
                    element.remove();
                }
                imagesContainer.setActivePart(bodyPart.type, newIndex);
                $demo.append('<div class = \"' + bodyPart.type + '\"><img src=\"' + bodyPart.bodyParts[newIndex] + '\"> </div>');
            }
        },

        onSliderLoad = function (bodyPart) {

            return function (index) {
                var element = $demo.find('.' + bodyPart.type);

                if (element.length != 0) {
                    element.remove();
                }

                imagesContainer.setActivePart(bodyPart.type, index);
                $demo.append('<div class = \"' + bodyPart.type + '\"><img src=\"' + bodyPart.bodyParts[index] + '\"> </div>');
                    console.log('demo.length:',$demo.find('div').length,'container size:',imagesContainer.size() + 1)
                if ($demo.find('div').length == imagesContainer.size() + 1) {
                    $endButton.css({"visibility": "visible"});
                }
            }
        }

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

    $buttonUp.
        click(function () {
            var bodyPart = imagesContainer.previous();

//                        $body.animate({backgroundColor: colors[bodyPartsIndex]}, {duration: 'slow', queue: false});
            console.log('prev',bodyPart);
            $slider_wrap.
                animate({top: "0%", transform: "translateY(-150%)"},
                {
                    duration: 200,
                    queue: false,
                    complete: function () {
                        slider.init(bodyPart);
                        $(this).
                            css({top: "100%", transform: "translateY(100%)"}).
                            animate({top: "30%", transform: "translateY(-50%)"}, 'slow');
                    }
                });

            if (!imagesContainer.hasPrevious()) {
                $(this).css({visibility: "hidden"});
            }
            if (imagesContainer.hasNext()) {
                $buttonDown.css({visibility: "visible"});
            }
        });

    $buttonDown.click(function () {
        var bodyPart = imagesContainer.next();
        console.log('next',bodyPart,'hasNext:', imagesContainer.hasNext());
        //           $body.animate({backgroundColor: colors[bodyPartsIndex]}, {duration: 'slow', queue: false});
        $slider_wrap.
            animate({top: "100%", transform: "translateY(100%)"},
            {
                duration: 'slow',
                queue: false,
                complete: function () {
                    slider.init(bodyPart);
                    $(this).
                        css({top: "0%", transform: "translateY(-100%)"}).
                        animate({top: "30%", transform: "translateY(-50%)"}, 'slow');
                }
            });

        if (!imagesContainer.hasNext()) {
            $(this).css({visibility: "hidden"});
        }
        if (imagesContainer.hasPrevious()) {
            $buttonUp.css({visibility: "visible"});
        }

    });

    $endButton.click(function () {
        $('body>div:not(#demo)').css({visibility: "hidden"});
        $demo.animate({
            left: "40%",
            top: "20%",
            transform: "translateY(-50%)"
        }, {duration: "slow"});
        $changeButton.css({visibility: "visible"});
    });


    $changeButton.click(function () {
        imagesContainer.setActiveDefault();

        //               $body.css({background: colors[0]});

        $demo
            .animate({
                left: "58%",
                top: "32%",
                transform: "translateY(-60%)"
            }, {duration: "slow"})
            .empty()
            .append("<div class=\"shape\"><img src=\"images/Face6.png\"></div>");

        $(this).css({visibility: "hidden"});

        $slider_wrap.css({visibility: "visible"});

        slider.init(imagesContainer.goToStart().next());

        $buttonUp.css({visibility: "hidden"});
        $buttonDown.css({visibility: "visible"});
    })
})



