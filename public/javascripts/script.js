$(document).ready(function () {
//    var slider = require('sliderSettings.js');
    var elements = require('./DOMElements.js');
    var buttons = require('./buttons.js');
    var slider = require('./sliderSettings');
    var sliderBug = true;
    if (screen.availHeight !== outerHeight
        || screen.availWidth !== outerWidth) {
        if (!elements.$maximizeMassage.is(':visible')) {
            elements.$wrapper.hide();
            elements.$maximizeMassage.show();
            console.log('Not maximize');
        }
    }
    disableScroll();
    buttons();
    $('html, body').animate({scrollTop: 0}, 'slow');
    $(window).resize(function () {
        console.log("window size changed");
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
    console.log(location.origin);

});



