app.directive("loading", function () {
  return {
    restrict: "E",
    replace: true,
    scope: {
      showme: "=",
    },

    templateUrl: "views/components/loader.html",
  };
});

app.directive("orderdone", function () {
  return {
    restrict: "E",
    replace: true,
    scope: {
      showme: "=",
    },

    templateUrl: "views/components/order-done.html",
  };
});
