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