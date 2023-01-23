'use strict'
app.service("reactService", [
  "$timeout",
  "$q",
  function ($timeout, $q) {
    this.Debounce = function () {
      var timeout;

      this.Invoke = function (func, wait, immediate) {
        var context = this,
          args = arguments;
        var later = function () {
          timeout = null;
          if (!immediate) {
            func.apply(context, args);
          }
        };
        var callNow = immediate && !timeout;
        if (timeout) {
          $timeout.cancel(timeout);
        }
        timeout = $timeout(later, wait);
        if (callNow) {
          func.apply(context, args);
        }
      };
      return this;
    };
  },
]);
