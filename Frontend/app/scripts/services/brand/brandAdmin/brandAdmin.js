app.service(
  "brandAdminServices",
  function ($q, $http, $location, $rootScope, $log, reactService) {
    this.getBrandAdminBrands = function (page) {
      var deffered = $q.defer();
      var token = localStorage.getItem("token");

      $rootScope.isLoading = true;
      $http({
        method: "GET",
        url: "http://localhost:3000/brand/allBrands?page="+page,
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
    this.getBrandAdminRoles = function (page) {
      var deffered = $q.defer();
      var token = localStorage.getItem("token");
      $rootScope.isLoading = true;
      $http({
        method: "GET",
        url: "http://localhost:3000/brand/allRoles/" + $rootScope.brandId+"?page="+page,
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
    this.getBrandAdminRoleUsers = function (page) {
      var deffered = $q.defer();
      var token = localStorage.getItem("token");
      $rootScope.isLoading = true;
      $http({
        method: "GET",
        url:
          "http://localhost:3000/brand/users/" +
          $rootScope.brandId +
          "/" +
          $rootScope.roleId+"?page="+page,
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
    this.getDishes = function (page) {
      var deffered = $q.defer();
      var token = localStorage.getItem("token");
      $rootScope.isLoading = true;
    //   newDebounce.Invoke(
        // function () {
          $http({
            method: "GET",
            url: "http://localhost:3000/brand/dishes/" + $rootScope.brandId+"?page="+page,
            headers: { Authorization: token },
          })
            .then(function (res) {
              $log.info(res);
              $rootScope.dishes = res.data.dishes;
              // $rootScope.brandSuperCategories = res.data.brandSuperCategories;
              // $rootScope.brandCategories = res.data.brandCategories;
              $rootScope.totalItems = res.data.totalItems;
              $rootScope.isLoading = false;
              deffered.resolve(
                res.data != null && res.data.dishes != null
                  ? res.data.dishes
                  : []
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
    this.getOutlets = function (page) {
      var deffered = $q.defer();
      var token = localStorage.getItem("token");
      $rootScope.isLoading = true;
    //   newDebounce.Invoke(
        // function () {
          $http({
            method: "GET",
            url: "http://localhost:3000/brand/outlets/" + $rootScope.brandId+"?page="+page,
            headers: { Authorization: token },
          })
            .then(function (res) {
              $log.info(res);
              $rootScope.outlets = res.data.outlets;
              // $rootScope.brandSuperCategories = res.data.brandSuperCategories;
              // $rootScope.brandCategories = res.data.brandCategories;
              $rootScope.totalItems = res.data.totalItems;
              $rootScope.isLoading = false;
              deffered.resolve(
                res.data != null && res.data.outlets != null
                  ? res.data.outlets
                  : []
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
    this.getBrandUser=function () {
        var deffered = $q.defer();
        var token = localStorage.getItem("token");
        $rootScope.isLoading = true;
      //   newDebounce.Invoke(
          // function () {
            $http({
              method: "GET",
              url: "http://localhost:3000/brand/user/" + $rootScope.userId,
              headers: { Authorization: token },
            })
              .then(function (res) {
                $log.info(res);
                $rootScope.user = res.data.user;
                $rootScope.isLoading = false;
                deffered.resolve(
                  res.data != null && res.data.user != null
                    ? res.data.user
                    : []
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
      }
      this.getBrand=function(){
        var deffered = $q.defer();
        var token = localStorage.getItem("token");
        $rootScope.isLoading = true;
        $http({
          method: "GET",
          url: "http://localhost:3000/brand/brand/"+$rootScope.brandId,
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
   
      }
  }
);
