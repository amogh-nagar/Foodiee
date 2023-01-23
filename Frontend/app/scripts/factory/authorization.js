app.factory("isSignIn", function ($q, $http, $location, $rootScope, $log) {
  $rootScope.$watch("error", function (newVal, oldVal) {
    $timeout(function () {
      $rootScope.error = "";
    }, 3000);
  });
  return {
    checkAuthentication: function () {
      $log.info("check auth");
      var deffered = $q.defer();
      if (!$rootScope.signin) {
        $location.path("/login");
        deffered.reject();
      } else {
        deffered.resolve();
      }
      return deffered.promise;
    },
  };
});
app.factory(
  "checkPermission",
  function ($q, $http, $location, $rootScope, $log) {
    return {
      check: function (permissions) {
        var deffered = $q.defer();
        for (var i = 0; i < permissions.length; i++) {
          if (!$rootScope.permissions.includes(permissions[i])) {
            deffered.reject();
            $log.info("Rejected");
            return deffered.promise;
          }
        }
        deffered.resolve();
        return deffered.promise;
      },
    };
  }
);

app.factory("checkRole", function ($q, $http, $location, $rootScope, $log) {
  return {
    check: function (desiredRole) {
      var deffered = $q.defer();
      var x = $rootScope.role.entity + $rootScope.role.roleName;
      $log.info(x);
      if (x !== desiredRole) {
        if (!$rootScope.signin) $location.path("/login");
        else {
          if ($rootScope.role.roleName === "superAdmin") {
            $location.path("/superAdminProfile");
          } else if (
            $rootScope.role.entity + $rootScope.role.roleName ===
            "BrandAdmin"
          ) {
            $location.path("/brandAdminProfile");
          } else {
            if ($rootScope.permissions.includes("isReadOutlet")) {
              $location.path("/brandUserOutlet");
            } else if ($rootScope.permissions.includes("isReadDish")) {
              $location.path("/brandUserDish");
            } else {
              $location.path("/login");
              $rootScope.signin = false;
            }
          }
        }

        deffered.reject();
      } else {
        deffered.resolve();
      }
      return deffered.promise;
    },
  };
});
