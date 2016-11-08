define([], function() {
  return {
      coinFlip: function () {
          return Boolean(Math.floor(Math.random() * 2));
      },
      loop: function (x, f) {
          for(var i=0;i<x;i++){
            f();
          }
      },
      pickFrom: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      pickFromArr: function (arr) {
        var max = arr.length - 1;
        var min = 0;
        min = Math.ceil(min);
        max = Math.floor(max);
        return arr[Math.floor(Math.random() * (max - min + 1)) + min];
    },
    getUrlParameter: function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),sParameterName,i;
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }
  }
});

