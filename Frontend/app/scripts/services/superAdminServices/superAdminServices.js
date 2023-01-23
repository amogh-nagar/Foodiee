app.service(
  "superAdminServices",
  function ($q, $http, $location, $rootScope, $log, reactService) {
    var newDebounce = new reactService.Debounce();
    this.getSuperAdminBrands = function (page) {
      var deffered = $q.defer();
      var token = localStorage.getItem("token");

      $rootScope.isLoading = true;
      $http({
        method: "GET",
        url: "http://localhost:3000/superAdmin/brands?page=" + page,
        headers: { Authorization: token },
      })
        .then(function (res) {
          $log.info(res);
          $rootScope.brands = res.data.brands;
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
    this.getAdmins = function (page) {
      var deffered = $q.defer();
      var token = localStorage.getItem("token");
      $rootScope.isLoading = true;
      $http({
        method: "GET",
        url:
          "http://localhost:3000/superAdmin/admins/" +
          $rootScope.brandId +
          "?page=" +
          page,
        headers: { Authorization: token },
      })
        .then(function (res) {
          $log.info(res);
          $rootScope.admins = res.data.admins;
          $rootScope.totalItems = res.data.totalItems ? res.data.totalItems : 0;
          $rootScope.isLoading = false;

          deffered.resolve(
            res.data != null && res.data.admins != null ? res.data.admins : []
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
    this.getAdmin = function (page) {
      var deffered = $q.defer();
      var token = localStorage.getItem("token");
      $rootScope.isLoading = true;
      $http({
        method: "GET",
        url: "http://localhost:3000/superAdmin/admin/" + $rootScope.adminId,
        headers: { Authorization: token },
      })
        .then(function (res) {
          $log.info(res);
          $rootScope.admin = res.data.user;
          $rootScope.isLoading = false;

          deffered.resolve(
            res.data != null && res.data.admins != null ? res.data.admins : []
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
    this.getAllAdmins = function (page) {
      var deffered = $q.defer();
      var token = localStorage.getItem("token");
      $rootScope.isLoading = true;
      $http({
        method: "GET",
        url: "http://localhost:3000/superAdmin/allAdmins",
        headers: { Authorization: token },
      })
        .then(function (res) {
          $log.info(res);
          $rootScope.admins = res.data.admins;
          $rootScope.isLoading = false;

          deffered.resolve(
            res.data != null && res.data.admins != null ? res.data.admins : []
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
    this.getBrand = function () {
      var deffered = $q.defer();
      var token = localStorage.getItem("token");
      $rootScope.isLoading = true;
      $http({
        method: "GET",
        url: "http://localhost:3000/superAdmin/brand/" + $rootScope.brandId,
        headers: { Authorization: token },
      })
        .then(function (res) {
          $log.info(res);
          $rootScope.brand = res.data.brand;
          $rootScope.isLoading = false;

          deffered.resolve(
            res.data != null && res.data.brand != null ? res.data.brand : []
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
