
app.directive("file", function () {
    return {
      require: "ngModel",
      restrict: "A",
      link: function ($scope, el, attrs, ngModel) {
        el.bind("change", function (event) {
          var files = event.target.files;
          var file = files[0];
  
          ngModel.$setViewValue(file);
          $scope.$apply();
        });
      },
    };
  });
  
  app.directive("fileread", [
    function () {
      return {
        scope: {
          fileread: "=",
        },
        link: function (scope, element, attributes) {
          element.bind("change", function (changeEvent) {
            var reader = new FileReader();
            reader.onload = function (loadEvent) {
              scope.$apply(function () {
                scope.fileread = loadEvent.target.result;
              });
            };
            reader.readAsDataURL(changeEvent.target.files[0]);
          });
        },
      };
    },
  ]);
  
  