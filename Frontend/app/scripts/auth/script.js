angular
  .module("foodOrdering")
  .controller(
    "loginController",
    function (
      $scope,
      $rootScope,
      $location,
      $log,$timeout,
      $http,socket,
      reactService,
      $httpParamSerializerJQLike
    ) {
      
      var newDebounce = new reactService.Debounce();

      $scope.closeAlert = function () {
        $rootScope.error = "";
      };
      $scope.login = function ($event) {
        $event.preventDefault();
        $log.info("log");
        if (
          !$scope.userForm.email.$viewValue ||
          !$scope.userForm.password.$viewValue
        )
          return;
        $rootScope.email = $scope.userForm.email.$viewValue;
        $rootScope.isLoading = true;
        // newDebounce.Invoke(
        // function () {
        $http({
          method: "POST",
          url: "http://localhost:3000/user/login",
          data: $httpParamSerializerJQLike({
            email: $scope.userForm.email.$viewValue,
            password: $scope.userForm.password.$viewValue,
          }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }).then(
          function (response) {
            $rootScope.isLoading = false;
            var token = response.data.token;
            $log.info("resp", response);
            if (!token || token.length == 0) {
              $rootScope.error =
                "Invalid Credentials, Please try again Login or Signup";
              return;
            }
            localStorage.setItem("token", token);
            $rootScope.user = response.data.user;
            $rootScope.permissions = response.data.user.permissions;
            $rootScope.error = null;
            $rootScope.role = response.data.user.role;
            $rootScope.signin = true;
            
            if ($rootScope.role.roleName === "superAdmin") {
              $location.path("/superAdminProfile");
            } else if (
              $rootScope.role.entity + $rootScope.role.roleName ===
              "BrandAdmin"
            ) {
              $location.path("/brandAdminProfile");
            } else if ($rootScope.role.entity == "Brand") {
              if ($rootScope.permissions.includes("isReadOutlet")) {
                $location.path("/brandUserOutlet");
              } else if ($rootScope.permissions.includes("isReadDish")) {
                $location.path("/brandUserDish");
              }
            } else if (
              $rootScope.role.entity + $rootScope.role.roleName ===
              "OutletAdmin"
            ) {
              $location.path("/outletAdminProfile");
            } else if ($rootScope.role.entity == "Outlet") {
              if ($rootScope.permissions.includes("isReadOutletDishes")) {
                $location.path("/outletUserDish");
              } else if ($rootScope.permissions.includes("isReadOrder")) {
                $location.path("/outletOrder");
              }
            }
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
            if (response.data.message) $rootScope.error = response.data.message;
          }
        );
        // },
        //   0,
        //   false
        // );
      };
    }
  )
  .controller(
    "signupController",
    function (
      $scope,
      $log,
      $location,
      $rootScope,
      $http,
      reactService,
      $httpParamSerializerJQLike
    ) {
      var newDebounce = new reactService.Debounce();

      $scope.uploadFile = function () {
        $log.info($scope.userImage);
      };

      $scope.signup = function ($event) {
        $event.preventDefault();
        if (
          !$scope.userForm.email.$viewValue ||
          !$scope.userForm.email.$viewValue ||
          !$scope.userForm.password.$viewValue
        )
          return;

        var fileFormData = new FormData();
        fileFormData.append("image", $scope.userImage);
        fileFormData.append("name", $scope.userForm.name.$viewValue);
        fileFormData.append("email", $scope.userForm.email.$viewValue);
        fileFormData.append("password", $scope.userForm.password.$viewValue);
        $rootScope.isLoading = true;
        newDebounce.Invoke(
          function () {
            $http
              .post("http://localhost:3000/admin/signup", fileFormData, {
                transformRequest: angular.identity,
                headers: { "Content-Type": undefined },
              })
              .then(
                function (response) {
                  $rootScope.isLoading = false;
                  $event.preventDefault();
                  $log.info(response);
                  if (!response.data.user) {
                    $rootScope.error =
                      "Something went wrong, Please try again Login or Signup";
                    return;
                  }
                  $rootScope.error = "";
                  $location.path("/login");
                },
                function (response) {
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
          },
          0,
          false
        );
      };
    }
  );
