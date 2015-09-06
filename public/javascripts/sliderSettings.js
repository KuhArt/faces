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