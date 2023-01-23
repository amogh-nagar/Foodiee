app.service(
  "outletAdminServices",
  function ($q, $http, $location, $rootScope, $log, reactService) {
    this.getOutletAdminOutlets = function (page) {
      var deffered = $q.defer();
      var token = localStorage.getItem("token");

      $rootScope.isLoading = true;
      $http({
        method: "GET",
        url: "http://localhost:3000/outlet/allOutlets?page=" + page,
        headers: { Authorization: token },
      })
        .then(function (res) {
          $log.info(res);
          $rootScope.outlets = res.data.outlets;
          $rootScope.totalItems = res.data.totalItems;
          $rootScope.isLoading = false;

          deffered.resolve(
            res.data != null && res.data.brands != null ? res.data.brands : []
          );
        })
        .catch(function (err) {
          deffered.reject();
        });
      //   },
      //   0,
      //   false
      // );

      return deffered.promise;
    };
    this.getOutletAdminRoleUsers = function (page) {
      var deffered = $q.defer();
      var token = localStorage.getItem("token");
      $rootScope.isLoading = true;
      $http({
        method: "GET",
        url:
          "http://localhost:3000/outlet/users/" +
          $rootScope.outletId +
          "/" +
          $rootScope.roleId +
          "?page=" +
          page,
        headers: { Authorization: token },
      })
        .then(function (res) {
          $log.info(res);
          $rootScope.users = res.data.users;
          $rootScope.totalItems = res.data.totalItems;
          $rootScope.isLoading = false;

          deffered.resolve(
            res.data != null && res.data.users != null ? res.data.users : []
          );
        })
        .catch(function (err) {
          deffered.reject();
        });
      //   },
      //   0,
      //   false
      // );

      return deffered.promise;
    };
    this.getOutletAdminRoles = function (page) {
      var deffered = $q.defer();
      var token = localStorage.getItem("token");
      $rootScope.isLoading = true;
      $http({
        method: "GET",
        url:
          "http://localhost:3000/outlet/allRoles/" +
          $rootScope.outletId +
          "?page=" +
          page,
        headers: { Authorization: token },
      })
        .then(function (res) {
          $log.info(res);
          $rootScope.roles = res.data.roles;
          $rootScope.totalItems = res.data.totalItems;
          $rootScope.isLoading = false;

          deffered.resolve(
            res.data != null && res.data.roles != null ? res.data.roles : []
          );
        })
        .catch(function (err) {
          deffered.reject();
        });
      //   },
      //   0,
      //   false
      // );

      return deffered.promise;
    };

    this.getOutletUser = function (page) {
      var deffered = $q.defer();
      var token = localStorage.getItem("token");
      $rootScope.isLoading = true;
      //   newDebounce.Invoke(
      // function () {
      $http({
        method: "GET",
        url: "http://localhost:3000/outlet/user/" + $rootScope.userId,
        headers: { Authorization: token },
      })
        .then(function (res) {
          $log.info(res);
          $rootScope.user = res.data.user;
          $rootScope.isLoading = false;
          deffered.resolve(
            res.data != null && res.data.user != null ? res.data.user : []
          );
        })
        .catch(function (err) {
          deffered.reject();
        });
      // },
      //     0,
      //     false
      //   );
      return deffered.promise;
    };
    this.getOutlet = function () {
      var deffered = $q.defer();
      var token = localStorage.getItem("token");
      $rootScope.isLoading = true;
      $http({
        method: "GET",
        url: "http://localhost:3000/outlet/outlet/" + $rootScope.outletId,
        headers: { Authorization: token },
      })
        .then(function (res) {
          $log.info(res);
          $rootScope.outlet = res.data.outlet;
          $rootScope.isLoading = false;

          deffered.resolve(
            res.data != null && res.data.outlet != null ? res.data.outlet : []
          );
        })
        .catch(function (err) {
          deffered.reject();
        });
      //   },
      //   0,
      //   false
      // );

      return deffered.promise;
    };
  }
);
