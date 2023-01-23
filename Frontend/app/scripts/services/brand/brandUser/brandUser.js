app.service(
  "brandUserServices",
  function ($q, $http, $location, $rootScope, $log, reactService) {
    
    var newDebounce = new reactService.Debounce();
    (this.getDishes = function (page) {
      var deffered = $q.defer();
      var token = localStorage.getItem("token");
      $rootScope.isLoading = true;
      $rootScope.brandId = $rootScope.user.entityDetails[0].entityId;
      newDebounce.Invoke(
        function () {
          $http({
            method: "GET",
            url: "http://localhost:3000/brand/dishes/" + $rootScope.brandId+"?page="+page,
            headers: { Authorization: token },
          })
            .then(function (res) {
              $log.info(res);
              $rootScope.dishes = res.data.dishes;
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
        0,
        false
      );
      return deffered.promise;
    }),
      (this.getOutlets = function (page) {
        var deffered = $q.defer();
        var token = localStorage.getItem("token");
        $rootScope.isLoading = true;
        $rootScope.brandId = $rootScope.user.entityDetails[0].entityId;
        newDebounce.Invoke(
          function () {
            $http({
              method: "GET",
              url: "http://localhost:3000/brand/outlets/" + $rootScope.brandId+"?page="+page,
              headers: { Authorization: token },
            })
              .then(function (res) {
                $log.info(res);
                $rootScope.outlets = res.data.outlets;
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
          },
          0,
          false
        );
        return deffered.promise;
      });
      this.getOutletAdmins=function(page){
        var deffered = $q.defer();
        var token = localStorage.getItem("token");
        $rootScope.isLoading = true;
        $http({
          method: "GET",
          url: "http://localhost:3000/brand/admins/"+$rootScope.outletId+"?page="+page,
          headers: { Authorization: token },
        })
          .then(function (res) {
            $log.info(res);
            $rootScope.outletAdmins = res.data.admins;
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
  
      }
      this.getDish=function(){
        var deffered = $q.defer();
        var token = localStorage.getItem("token");
        $rootScope.isLoading = true;
        $log.info($rootScope.dishId)
        $http({
          method: "GET",
          url: "http://localhost:3000/brand/dish/"+$rootScope.dishId,
          headers: { Authorization: token },
        })
          .then(function (res) {
            $log.info('dishh',res);
            $rootScope.dish = res.data.dish;
            $rootScope.isLoading = false;
    
            deffered.resolve(
              res.data != null && res.data.dish != null ? res.data.dish : []
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
      this.getOutlet=function(){
        var deffered = $q.defer();
        var token = localStorage.getItem("token");
        $rootScope.isLoading = true;
        $http({
          method: "GET",
          url: "http://localhost:3000/brand/outlet/"+$rootScope.outletId,
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
   
      }
      this.getTaxes=function(){
        var deffered = $q.defer();
        var token = localStorage.getItem("token");
        $rootScope.isLoading = true;
        
      $rootScope.brandId = $rootScope.user.entityDetails[0].entityId;
        $http({
          method: "GET",
          url: "http://localhost:3000/brand/taxes/"+$rootScope.brandId,
          headers: { Authorization: token },
        })
          .then(function (res) {
            $log.info('tax',res);
            $rootScope.oldTaxes = res.data.taxes;
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
  
      }
    this.getAdmin=function(page){
        var deffered = $q.defer();
        var token = localStorage.getItem("token");
        $rootScope.isLoading = true;
        $http({
          method: "GET",
          url: "http://localhost:3000/brand/admin/"+$rootScope.adminId,
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
  
      }
      this.getSuperCategories=function(page){
        var deffered = $q.defer();
        var token = localStorage.getItem("token");
        $rootScope.isLoading = true;
        $rootScope.brandId = $rootScope.user.entityDetails[0].entityId;
      
        $http({
          method: "GET",
          url: "http://localhost:3000/brand/getSuperCategories/"+$rootScope.brandId,
          headers: { Authorization: token },
        })
          .then(function (res) {
            $log.info(res);
            $rootScope.superCategories = res.data.superCategories;
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
  
      }
      this.getCategories=function(page,superCategoryId){
        var deffered = $q.defer();
        var token = localStorage.getItem("token");
        $rootScope.isLoading = true;
        $http({
          method: "GET",
          url: "http://localhost:3000/brand/getCategories/"+superCategoryId,
          headers: { Authorization: token },
        })
          .then(function (res) {
            $log.info(res);
            $rootScope.categories = res.data.categories;
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
  
      }
      this.getAllOutletAdmins=function(page){
        var deffered = $q.defer();
        var token = localStorage.getItem("token");
        $rootScope.isLoading = true;
        $http({
          method: "GET",
          url: "http://localhost:3000/brand/allOutletAdmins/"+$rootScope.user.entityDetails[0].entityId,
          headers: { Authorization: token },
        })
          .then(function (res) {
            $log.info(res);
            $rootScope.admins = res.data.admins;
            $rootScope.totalItems=res.data.totalItems?res.data.totalItems:0
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
  
      }
  }
);
