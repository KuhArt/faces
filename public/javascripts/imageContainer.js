/**
 * Created by artkuh on 14.8.15.
 */

var imagesContainer = (function () {
    console.log(images);
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
    console.log(insideImages,keys,activeParts);
    return {
        hasNext: function () {
            console.log('hasNext: index',index,'max',keys.length - 1);
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
