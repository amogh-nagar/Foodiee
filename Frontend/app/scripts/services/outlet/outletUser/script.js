app.service(
  "outletUserServices",
  function ($q, $http, $location, $rootScope, $log, reactService) {
    var newDebounce = new reactService.Debounce();
    this.getOrders = function (page) {
      var deffered = $q.defer();
      var token = localStorage.getItem("token");
      $rootScope.isLoading = true;

      $rootScope.outletId = $rootScope.user.entityDetails[0].entityId;
      newDebounce.Invoke(
        function () {
          $http({
            method: "GET",
            url:
              "http://localhost:3000/outlet/getOrders/" + $rootScope.outletId+"?page="+page,
            headers: { Authorization: token },
          })
            .then(function (res) {
                $log.info(res)
              $rootScope.orders = res.data.orders;
                $rootScope.totalItems = res.data.totalItems;
              $rootScope.isLoading = false;
              deffered.resolve(
                res.data != null && res.data.orders != null
                  ? res.data.orders
                  : []
              );
            })
            .catch(function (err) {
              deffered.reject();
            });
        },
        0,
        false
      );

      return deffered.promise;
    };
    (this.getCart = function () {
      var deffered = $q.defer();
      var res = localStorage.getItem("cart");
      $rootScope.cart = {};
      if (res == null) {
        res = { items: [], totalCartItems: 0, totalCartPrice: 0 };
      } else {
        res = JSON.parse(res);
      }
      $rootScope.cart.items = res.items;
      $rootScope.cart.totalCartItems = res.totalCartItems;
      $rootScope.cart.totalCartPrice = res.totalCartPrice;
      $log.info($rootScope.cart);

      deffered.resolve(
        res.data != null && res.data.cart != null ? res.data.cart : []
      );

      return deffered.promise;
    }),
      (this.getDishes = function (page) {
        var deffered = $q.defer();
        var token = localStorage.getItem("token");
        $rootScope.isLoading = true;

        $rootScope.outletId = $rootScope.user.entityDetails[0].entityId;
        $log.info("OutletId",$rootScope.outletId)
        newDebounce.Invoke(
          function () {
            $http({
              method: "GET",
              url: "http://localhost:3000/outlet/dishes/" + $rootScope.outletId+"?page="+page,
              headers: { Authorization: token },
            })
              .then(function (res) {
                $log.info(res);
                $rootScope.outletsDishes = res.data.dishes;
                //   $rootScope.brandSuperCategories = res.data.brandSuperCategories;
                //   $rootScope.brandCategories = res.data.brandCategories;
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
          },
          1000,
          false
        );

        return deffered.promise;
      });
  }
);
