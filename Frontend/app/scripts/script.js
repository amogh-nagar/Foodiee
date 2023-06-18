var app = angular
  .module("foodOrdering", [
    "ui.bootstrap",
    "ui.router",
    "angularCharts",
    "zingchart-angularjs",
    "myApp.filters",
    "myApp.services",
    "myApp.directives",
    "ui.select",
    "oi.select",
  ])
  .config(function ($stateProvider) {
    $stateProvider
      .state("login", {
        url: "/login",
        templateUrl: "views/auth/login.html",
        controller: "loginController",
      })
      .state("signup", {
        url: "/signup",
        templateUrl: "views/auth/signup.html",
        controller: "signupController",
      })
      .state("home", {
        url: "/",
        templateUrl: "views/home.html",
        controller: "home",
      })
      .state("userProfile", {
        url: "/userProfile",
        templateUrl: "views/profile.html",
        controller: "userProfileController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
        },
      });
  });
app.controller(
  "Index",
  function (
    $scope,
    $http,
    $log,
    $rootScope,
    $location,
    $uibModal,
    socket,
    $timeout
  ) {
    $scope.logout = function () {
      $rootScope.signin = false;
      $location.path("/login");
    };
    $scope.$watch("$root.error", function () {
      $timeout(function () {
        $rootScope.error = "";
      }, 3000);
    });
    socket.on("connect", function () {
      $log.info("Connected to Socket");
    });
    $scope.goToCart = function () {
      if (
        !$rootScope.cart ||
        !$rootScope.cart.items ||
        $rootScope.cart.items.length === 0
      )
        return;
      $location.path("/cart");
    };
    $scope.animationsEnabled = true;
  }
);
app
  .controller(
    "userProfileController",
    function ($scope, $rootScope, $http, $uibModal, $log) {
      $scope.isProfileEdit = false;
      $scope.cancelUpdate = function () {
        $scope.isProfileEdit = false;
      };
      $scope.changePassword = function (parentElem) {
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "updatePassword.html",
          controller: "updatePasswordController",
          appendTo: parentElem,
          resolve: {
            status: function () {
              return !$scope.isUpdatePassword;
            },
          },
        });
        modalInstance.result.then(
          function (status) {
            $scope.isUpdatePassword = status;
          },
          function () {
            $log.info("Modal dismissed at: " + new Date());
          }
        );
      };
      $scope.updateEditStatus = function () {
        $scope.isProfileEdit = true;
      };
      $scope.updateProfile = function () {
        var fileFormData = new FormData();
        var file = document.getElementById("userImage").files[0];
        if (file) {
          fileFormData.append("image", file);
        }
        fileFormData.append(
          "name",
          $scope.user.name ? $scope.user.name : $rootScope.user.name
        );
        fileFormData.append(
          "email",
          $scope.user.email ? $scope.user.email : $rootScope.user.email
        );
        // if ($scope.user.userPassword)
        //   fileFormData.append("password", $scope.user.userPassword);
        $rootScope.isLoading = true;
        $http
          .patch(`http://localhost:3000/user/updateProfile`, fileFormData, {
            transformRequest: angular.identity,
            headers: {
              "Content-Type": undefined,
              Authorization: localStorage.getItem("token"),
            },
          })
          .then(
            function (response) {
              $rootScope.isLoading = false;

              $log.info(response);
              $location.path("/userProfile");
            },
            function (response) {
              $log.info(response);
              $rootScope.isLoading = false;

              if (response.data === null) {
                $rootScope.error = "Some error occurred";
                return;
              }
              if (response.data.statusCode == 401) {
                $rootScope.error = response.data.message;
                return;
              }
              if (response.data.message)
                $rootScope.error = response.data.message;
            }
          );
      };
    }
  )
  .controller(
    "updatePasswordController",
    function ($uibModalInstance, $scope, $rootScope, $http, status) {
      $scope.status = status;
      $scope.ok = function () {
        $uibModalInstance.close(status);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss("cancel");
      };
    }
  )
  .controller(
    "confirmModalController",
    function ($scope, $uibModalInstance, status) {
      $scope.status = status;
      $scope.ok = function () {
        $uibModalInstance.close(status);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss("cancel");
      };
    }
  )
  .controller(
    "deleteController",
    function ($scope, $uibModalInstance, deleted) {
      $scope.isdeleted = deleted;
      $scope.ok = function () {
        $uibModalInstance.close(deleted);
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss("cancel");
      };
    }
  );

app.factory(
  "user",
  function ($q, $http, $location, $rootScope, $log, reactService) {
    var newDebounce = new reactService.Debounce();

    return {
      getProfile: function () {
        var deffered = $q.defer();
        var token = localStorage.getItem("token");
        $rootScope.isLoading = true;
        newDebounce.Invoke(
          function () {
            $http({
              method: "GET",
              url: `http://localhost:3000/user/profile/` + $rootScope.user,
              headers: { Authorization: token },
            })
              .then(function (res) {
                $log.info(res);
                $rootScope.user.email = res.data.user.email;
                $rootScope.user.image =
                  res.data.user.image && res.data.user.image.length > 0
                    ? "https://foodorderingaws.s3.ap-south-1.amazonaws.com/" +
                      res.data.user.image
                    : "images/dummy-brandImage.jpg";
                $rootScope.user.name = res.data.user.name;

                $rootScope.isLoading = false;
                deffered.resolve();
              })
              .catch(function (err) {
                deffered.reject();
              });
          },
          0,
          false
        );

        return deffered.promise;
      },
    };
  }
);

app.directive("selectNgFiles", function () {
  return {
    require: "ngModel",
    link: function postLink(scope, elem, attrs, ngModel) {
      elem.on("change", function (e) {
        var files = elem[0].files;
        ngModel.$setViewValue(files);
      });
    },
  };
});
