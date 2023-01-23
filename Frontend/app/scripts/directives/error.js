app.directive("errormsg", function () {
  return {
    restrict: "E",
    replace: true,
    scope: {
      showme: "=",
    },
    templateUrl: "views/components/error.html",
  };
});
