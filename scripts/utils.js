define([], function() {
  return {
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
      }
  }
});

