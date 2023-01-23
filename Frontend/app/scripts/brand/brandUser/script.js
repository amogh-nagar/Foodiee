angular
  .module("foodOrdering")
  .config(function ($stateProvider) {
    $stateProvider
      .state("brandUserDish", {
        url: "/brandUserDish",
        templateUrl: "views/brand/brandUser/profileDish.html",
        controller: "brandUserDishController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isReadDish"]);
          },
          dishes: function (brandUserServices) {
            return brandUserServices.getDishes(0);
          },
          superCategories: function (brandUserServices) {
            return brandUserServices.getSuperCategories();
          },
        },
      })
      .state("createDish", {
        url: "/createDish",
        templateUrl: "views/brand/brandUser/createDish.html",
        controller: "createDishController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isCreateDish"]);
          },
          superCategories: function (brandUserServices) {
            return brandUserServices.getSuperCategories();
          },
          taxes: function (brandUserServices) {
            return brandUserServices.getTaxes();
          },
        },
      })
      .state("brandUserOutlet", {
        url: "/brandUserOutlet",
        templateUrl: "views/brand/brandUser/profileOutlet.html",
        controller: "brandUserOutletController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isReadOutlet"]);
          },
          outlets: function (brandUserServices) {
            return brandUserServices.getOutlets(0);
          },
        },
      })
      .state("createOutlet", {
        url: "/createOutlet",
        templateUrl: "views/brand/brandUser/createOutlet.html",
        controller: "createOutletController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isCreateOutlet"]);
          },
          admins: function (brandUserServices) {
            return brandUserServices.getAllOutletAdmins(0);
          },
        },
      })

      .state("updateOutlet", {
        url: "/updateOutlet",
        templateUrl: "views/brand/brandUser/updateOutlet.html",
        controller: "updateOutletController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isUpdateOutlet"]);
          },
          outlet: function (brandUserServices) {
            return brandUserServices.getOutlet();
          },
        },
      })
      .state("/updateDish", {
        url: "/updateDish",
        templateUrl: "views/brand/brandUser/updateDish.html",
        controller: "updateDishController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isUpdateDish"]);
          },
          dish: function (brandUserServices) {
            return brandUserServices.getDish();
          },
          taxes: function (brandUserServices) {
            return brandUserServices.getTaxes();
          },
        },
      })
      .state("brandUserOutletReport", {
        url: "/brandUserOutletReport",
        templateUrl: "views/brand/brandUser/outletReport.html",
        controller: "brandUserOutletReport",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isGenerateOutletReport"]);
          },

          outlets: function (brandUserServices) {
            return brandUserServices.getOutlets(0);
          },
        },
      })
      .state("brandUserDishReport", {
        url: "/brandUserDishReport",
        templateUrl: "views/brand/brandUser/dishReport.html",
        controller: "brandUserDishReport",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isGenerateDishReport"]);
          },
          dishes: function (brandUserServices) {
            return brandUserServices.getDishes(0);
          },
        },
      })
      .state("createOutletAdmin", {
        url: "/createOutletAdmin",
        templateUrl: "views/brand/brandUser/createOutletAdmin.html",
        controller: "createOutletAdminController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isCreateOutletAdmin"]);
          },
        },
      })
      .state("outletAdmins", {
        url: "/outletAdmins",
        templateUrl: "views/brand/brandUser/admins.html",
        controller: "outletAdminsController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isReadOutletAdmin"]);
          },

          outletAdmins: function (brandUserServices) {
            return brandUserServices.getOutletAdmins(0);
          },
        },
      })
      .state("outletAdmin", {
        url: "/outletAdmin",
        templateUrl: "views/brand/brandUser/updateAdmin.html",
        controller: "outletAdminController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isReadOutletAdmin"]);
          },
          getAdmin: function (brandUserServices) {
            return brandUserServices.getAdmin();
          },
        },
      });
  })
  .controller(
    "brandUserDishController",
    function (
      $scope,
      $rootScope,
      $httpParamSerializerJQLike,
      $http,
      $log,
      reactService,
      $location,
      brandUserServices
    ) {
      $scope.openDropDown = false;
      $scope.toggleDrp = function () {
        $scope.openDropDown = !$scope.openDropDown;
        $log.info($scope.openDropDown);
      };
      $scope.selectedCategory = "";
      $scope.selectedSuperCategory = "";
      $scope.updateCategoryEntered = function (category, superCategory) {
        $scope.selectedCategory = category;
        $scope.selectedSuperCategory = superCategory;
        $log.info(category);
        $log.info(superCategory);
      };
      $scope.updateSingleCategory = function (superCategory) {
        $scope.selectedSuperCategory = superCategory;
        $scope.selectedCategory = "";
        brandUserServices
          .getCategories(0, superCategory._id)
          .then(function () {});
      };
      $scope.openDishList = false;
      $scope.toggledropdown = function () {
        $scope.openDishList = !$scope.openDishList;
      };
      $scope.currentPage = 1;
      $scope.itemsPerPage = 8;
      $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };
      $scope.$watch("currentPage", function (newVal, oldVal) {
        setPagingData($scope.currentPage);
        // $log.info(newVal);
        // $log.info(oldVal)
      });
      function setPagingData(page) {
        brandUserServices.getDishes(page).then(function (resp) {});
      }
      $scope.createDish = function () {
        $location.path("/createDish");
      };
      $scope.goToDish = function (dishId) {
        $rootScope.dishId = dishId;
        $location.path("/updateDish");
      };
      $scope.options = ["active", "inactive", "Deleted"];
    }
  )
  .controller(
    "brandUserOutletController",
    function (
      $scope,
      $rootScope,
      $httpParamSerializerJQLike,
      $http,
      $log,
      reactService,
      $location,
      brandUserServices
    ) {
      $scope.currentPage = 1;
      $scope.itemsPerPage = 8;
      $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };
      $scope.$watch("currentPage", function (newVal, oldVal) {
        setPagingData($scope.currentPage);
        // $log.info(newVal);
        // $log.info(oldVal)
      });
      function setPagingData(page) {
        brandUserServices.getOutlets(page).then(function (resp) {});
      }
      $scope.createOutlet = function () {
        $location.path("/createOutlet");
      };

      $scope.options = ["active", "inactive", "Deleted"];
      $scope.goToOutlet = function (outletId, outletName) {
        $rootScope.outletId = outletId;
        $rootScope.outletName = outletName;
        $location.path("/outletAdmins");
      };
    }
  )
  .controller(
    "createDishController",
    function (
      $scope,
      $rootScope,
      $httpParamSerializerJQLike,
      $http,
      $log,
      reactService,
      $location,
      $uibModal,
      brandUserServices
    ) {
      $scope.status = "active";
      $scope.isCreate = false;
      $scope.isSuperCreate = false;
      $scope.updateDishStatus = function (status) {
        $scope.status = status;
      };
      $scope.dish = { superCategory: { name: "" }, category: { name: "" } };
      $scope.getSubCategories = function (superCategory) {
        $log.info(superCategory);
        brandUserServices.getCategories(0, superCategory._id);
      };
      $scope.changeNew = function (ele) {
        if (ele == "super") {
          if ($scope.isSuperCreate) {
            $rootScope.isLoading = true;
            var fileFormData = new FormData();
            fileFormData.append("name", $scope.dish.superCategory.name);
            fileFormData.append(
              "brandId",
              $rootScope.user.entityDetails[0].entityId
            );
            fileFormData.append("description", "");
            $http
              .post(
                `http://localhost:3000/brand/createSuperCategory`,
                fileFormData,
                {
                  transformRequest: angular.identity,
                  headers: {
                    "Content-Type": undefined,
                    Authorization: localStorage.getItem("token"),
                  },
                }
              )
              .then(
                function (resp) {
                  $log.info(resp);
                  $rootScope.isLoading = false;
                  $scope.isSuperCreate = false;
                  $scope.dish.superCategory = resp.data.dishSuperCategory;
                  $rootScope.superCategories.push(resp.data.dishSuperCategory);
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
          } else $scope.isSuperCreate = true;
        } else {
          if ($scope.isCreate) {
            $rootScope.isLoading = true;
            var fileFormData = new FormData();
            fileFormData.append("name", $scope.dish.category.name);
            fileFormData.append(
              "superCategoryId",
              $scope.dish.superCategory._id
            );
            fileFormData.append("description", "");
            $http
              .post(
                `http://localhost:3000/brand/createCategory`,
                fileFormData,
                {
                  transformRequest: angular.identity,
                  headers: {
                    "Content-Type": undefined,
                    Authorization: localStorage.getItem("token"),
                  },
                }
              )
              .then(
                function (resp) {
                  $log.info(resp);
                  $rootScope.isLoading = false;
                  $scope.isCreate = false;
                  $scope.dish.catergory = resp.data.dishCategory;
                  if (!$rootScope.categories) $rootScope.categories = [];
                  $rootScope.categories.push(resp.data.dishCategory);
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
          } else $scope.isCreate = true;
        }
      };

      $scope.cancelNew = function (ele) {
        if (ele == "super") {
          $scope.isSuperCreate = false;
        } else $scope.isCreate = false;
      };
      $scope.toggleDelete = function () {
        $scope.isdeleted = !$scope.isdeleted;
      };
      $scope.taxes = [];
      $scope.addNewTax = function () {
        var idx = $scope.taxes.findIndex(function (tax) {
          return tax.id == $scope.itemTax._id;
        });
        if (idx == -1)
          $scope.taxes.push({
            id: $scope.itemTax._id,
            name: $scope.itemTax.name,
            percentAmount: +$scope.percentAmount,
          });
        else $scope.taxes[idx].percentAmount += $scope.percentAmount;
      };
      $scope.createTax = function (parentSelector) {
        var parentElem = parentSelector
          ? angular.element(
              $document[0].querySelector(".modal-demo " + parentSelector)
            )
          : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "createTax.html",
          controller: "createTaxController",
          appendTo: parentElem,
        });
        modalInstance.result.then(
          function (obj) {
            var fileFormData = new FormData();
            fileFormData.append("name", obj.name);
            fileFormData.append("from", obj.rangeFrom);
            fileFormData.append("to", obj.rangeTo);
            fileFormData.append("brandId", $rootScope.brandId);
            $http
              .post(`http://localhost:3000/brand/createTax`, fileFormData, {
                transformRequest: angular.identity,
                headers: {
                  "Content-Type": undefined,
                  Authorization: localStorage.getItem("token"),
                },
              })
              .then(
                function (response) {
                  $rootScope.isLoading = false;
                  $uibModal.close();
                  $log.info(response);
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
          },
          function () {
            $log.info("Modal dismissed at: " + new Date());
          }
        );
      };
      $scope.createDish = function () {
        $rootScope.isLoading = true;
        var fileFormData = new FormData();
        var file = document.getElementById("dishImage").files[0];
        if (file) {
          fileFormData.append("image", file);
        }
        fileFormData.append("name", $scope.dish.name);
        fileFormData.append("isdeleted", $scope.isdeleted);
        fileFormData.append("status", $scope.status);
        fileFormData.append("price", $scope.dish.price);
        fileFormData.append("description", $scope.dish.description);
        fileFormData.append("superCategoryId", $scope.dish.superCategory._id);
        fileFormData.append(
          "superCategoryName",
          $scope.dish.superCategory.name
        );
        fileFormData.append("categoryId", $scope.dish.category._id);
        fileFormData.append("categoryName", $scope.dish.category.name);
        fileFormData.append("taxes", JSON.stringify($scope.taxes));
        fileFormData.append(
          "brandId",
          $rootScope.user.entityDetails[0].entityId
        );
        $http
          .post(`http://localhost:3000/brand/createDish`, fileFormData, {
            transformRequest: angular.identity,
            headers: {
              "Content-Type": undefined,
              Authorization: localStorage.getItem("token"),
            },
          })
          .then(
            function (response) {
              $log.info(response);
              $rootScope.isLoading = false;
              $location.path("/brandUserDish");
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
      $scope.removeTax = function (oldTax) {
        $scope.taxes = $scope.taxes.filter(function (tax) {
          return tax.id !== oldTax.id;
        });
      };

      $scope.updateTax = function (tax, parentSelector) {
        $log.info(tax);
        var parentElem = parentSelector
          ? angular.element(
              $document[0].querySelector(".modal-demo " + parentSelector)
            )
          : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "updateTax.html",
          controller: "updateTaxController",
          appendTo: parentElem,
          resolve: {
            name: function () {
              return tax.name;
            },
            percentAmount: function () {
              return tax.percentAmount;
            },
          },
        });
        modalInstance.result.then(
          function (obj) {
            var idx = $scope.taxes.find(function (oldtax) {
              return oldtax.id == tax.id;
            });
            $scope.taxes[idx].name = obj.name;
            $scope.taxes[idx].percentAmount = obj.percentAmount;
          },
          function () {
            $log.info("Modal dismissed at: " + new Date());
          }
        );

        var idx = $scope.taxes.find(function (tax) {
          return tax.id == id;
        });
        $scope.taxes[idx].percentAmount = percentAmount;
      };
    }
  )
  .controller(
    "createTaxController",
    function ($scope, $log, $uibModalInstance) {
      $scope.ok = function () {
        $uibModalInstance.close({
          name: $scope.name,
          rangeTo: $scope.rangeTo,
          rangeFrom: $scope.rangeFrom,
        });
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss("cancel");
      };
    }
  )
  .controller(
    "updateTaxController",
    function ($scope, $log, $uibModalInstance, name, percentAmount) {
      $scope.name = name;
      $scope.percentAmount = percentAmount;

      $scope.ok = function () {
        $uibModalInstance.close({
          name: $scope.name,
          percentAmount: $scope.percentAmount,
        });
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss("cancel");
      };
    }
  )
  .controller(
    "updateDishController",
    function (
      $scope,
      $rootScope,
      $log,
      $http,
      $uibModal,
      $httpParamSerializerJQLike,
      $rootScope,
      $location
    ) {
      $scope.isdishEdit = false;
      $scope.cancelUpdate = function () {
        $scope.isdishEdit = false;
      };
      $scope.updateEditStatus = function () {
        $scope.isdishEdit = true;
      };
      $scope.taxes = [];
      $rootScope.dish.taxes.forEach(function (tax) {
        $scope.taxes.push(tax);
      });
      $scope.itemTax = { value: "" };
      $scope.percentAmount = { value: "" };
      $scope.change = function () {
        $log.info($scope.percentAmount);
      };
      $scope.removeTax = function (oldTax) {
        $scope.taxes = $scope.taxes.filter(function (tax) {
          return tax.id !== oldTax.id;
        });
      };
      $scope.addNewTax = function () {
        var idx = $scope.taxes.findIndex(function (tax) {
          return tax.id === $scope.itemTax.value._id;
        });
        if (idx == -1)
          $scope.taxes.push({
            id: $scope.itemTax.value._id,
            name: $scope.itemTax.value.name,
            percentAmount: +$scope.percentAmount.value,
          });
        else $scope.taxes[idx].percentAmount += +$scope.percentAmount.value;
      };
      $scope.createTax = function (parentSelector) {
        var parentElem = parentSelector
          ? angular.element(
              $document[0].querySelector(".modal-demo " + parentSelector)
            )
          : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "createTax.html",
          controller: "createTaxController",
          appendTo: parentElem,
        });
        modalInstance.result.then(
          function (obj) {
            var fileFormData = new FormData();
            fileFormData.append("name", obj.name);
            fileFormData.append("from", obj.rangeFrom);
            fileFormData.append("to", obj.rangeTo);
            fileFormData.append("brandId", $rootScope.brandId);
            $http
              .post(`http://localhost:3000/brand/createTax`, fileFormData, {
                transformRequest: angular.identity,
                headers: {
                  "Content-Type": undefined,
                  Authorization: localStorage.getItem("token"),
                },
              })
              .then(
                function (response) {
                  $rootScope.isLoading = false;
                  $uibModal.close();
                  $log.info(response);
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
          },
          function () {
            $log.info("Modal dismissed at: " + new Date());
          }
        );
      };
      $scope.updateTax = function (tax, parentSelector) {
        $log.info(tax);
        var parentElem = parentSelector
          ? angular.element(
              $document[0].querySelector(".modal-demo " + parentSelector)
            )
          : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "updateTax.html",
          controller: "updateTaxController",
          appendTo: parentElem,
          resolve: {
            name: function () {
              return tax.name;
            },
            percentAmount: function () {
              return tax.percentAmount;
            },
          },
        });
        modalInstance.result.then(
          function (obj) {
            var idx = $scope.taxes.find(function (oldtax) {
              return oldtax.id == tax.id;
            });
            $scope.taxes[idx].name = obj.name;
            $scope.taxes[idx].percentAmount = obj.percentAmount;
          },
          function () {
            $log.info("Modal dismissed at: " + new Date());
          }
        );

        var idx = $scope.taxes.find(function (tax) {
          return tax.id == id;
        });
        $scope.taxes[idx].percentAmount = percentAmount;
      };
      $scope.toggle = {};
      $scope.toggle.switch = $rootScope.dish.status;
      $scope.isdeleted = $rootScope.dish.isdeleted;
      $scope.dish.name = $rootScope.dish.name;
      $scope.dish.price = $rootScope.dish.price;
      $scope.dish.superCategory = $rootScope.dish.superCategory;
      $scope.dish.category = $rootScope.dish.category;
      $scope.dish.description = $rootScope.dish.description;
      $scope.dish.status = $rootScope.dish.status;
      $scope.toggleDishStatus = function (status, parentSelector) {
        $log.info(status);
        var parentElem = parentSelector
          ? angular.element(
              $document[0].querySelector(".modal-demo " + parentSelector)
            )
          : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "myModalContent.html",
          controller: "confirmModalController",
          appendTo: parentElem,
          resolve: {
            status: function () {
              return status;
            },
          },
        });
        modalInstance.result.then(
          function (status) {
            $scope.toggle.switch = status;
          },
          function () {
            $log.info("Modal dismissed at: " + new Date());
          }
        );
      };
      $scope.toggleDelete = function (parentSelector) {
        if (!$scope.isdeleted) {
          var parentElem = parentSelector
            ? angular.element(
                $document[0].querySelector(".modal-demo " + parentSelector)
              )
            : undefined;
          var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: "modal-title",
            ariaDescribedBy: "modal-body",
            templateUrl: "deleteStatus.html",
            controller: "deleteController",
            appendTo: parentElem,
            resolve: {
              deleted: function () {
                return !$scope.isdeleted;
              },
            },
          });
          modalInstance.result.then(
            function (deleted) {
              $scope.isdeleted = true;
            },
            function () {
              $scope.isdeleted = false;
              $log.info("Modal dismissed at: " + new Date());
            }
          );
        } else {
          $scope.isdeleted = false;
        }
      };
      $scope.updateDish = function (dishId) {
        var fileFormData = new FormData();
        var file = document.getElementById("dishImage").files[0];
        if (file) {
          fileFormData.append("image", file);
        }
        fileFormData.append("isdeleted", $scope.isdeleted);
        fileFormData.append("outletStatus", $scope.toggle.switch);
        fileFormData.append(
          "name",
          $scope.dish.name ? $scope.dish.name : $rootScope.dish.name
        );
        fileFormData.append(
          "price",
          $scope.dish.price ? $scope.dish.price : $rootScope.dish.price
        );
        fileFormData.append(
          "description",
          $scope.dish.description
            ? $scope.dish.description
            : $rootScope.dish.description
        );
        $rootScope.isLoading = true;
        $http
          .patch(
            `http://localhost:3000/brand/updateDish?dishId=${dishId}`,
            fileFormData,
            {
              transformRequest: angular.identity,
              headers: {
                "Content-Type": undefined,
                Authorization: localStorage.getItem("token"),
              },
            }
          )
          .then(
            function (response) {
              $rootScope.isLoading = false;

              $log.info(response);
              $location.path("/brandAdminProfile");
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
    "createOutletController",
    function (
      $scope,
      $rootScope,
      $httpParamSerializerJQLike,
      $http,
      $log,
      reactService,
      $location
    ) {
      $scope.selectedAdmins = [];

      $scope.updateAdmins = function (selected) {
        $scope.selectedAdmins = selected;
        $log.info(selected);
      };
      $scope.status = "active";
      $scope.updateOutletStatus = function (status) {
        $scope.status = status;
      };
      $scope.toggleDelete = function () {
        $scope.isdeleted = !$scope.isdeleted;
      };
      $scope.permissions = {
        isCRUDOrder: false,
        isCRUDDish: false,
        isBlockCustomer: false,
      };
      $scope.createOutlet = function () {
        $rootScope.isLoading = true;
        var fileFormData = new FormData();
        var file = document.getElementById("outletImage").files[0];
        if (file) {
          fileFormData.append("image", file);
        }
        fileFormData.append("name", $scope.outlet.name);
        fileFormData.append("isdeleted", $scope.isdeleted);
        fileFormData.append("status", $scope.status);
        fileFormData.append("address", $scope.outlet.address);
        fileFormData.append(
          "brandId",
          $rootScope.user.entityDetails[0].entityId
        );
        fileFormData.append(
          "brandName",
          $rootScope.user.entityDetails[0].entityName
        );

        fileFormData.append("admins", JSON.stringify($scope.selectedAdmins));
        $http
          .post(`http://localhost:3000/brand/createOutlet`, fileFormData, {
            transformRequest: angular.identity,
            headers: {
              "Content-Type": undefined,
              Authorization: localStorage.getItem("token"),
            },
          })
          .then(
            function (response) {
              $log.info(response);
              $rootScope.isLoading = false;
              $location.path("/brandUserOutlet");
            },
            function (response) {
              $rootScope.isLoading = false;
              $log.info(response);
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
    "updateOutletController",
    function (
      $scope,
      $rootScope,
      $log,
      $http,
      $uibModal,
      $httpParamSerializerJQLike,
      $rootScope,
      $location
    ) {
      $scope.isoutletEdit = false;
      $scope.cancelUpdate = function () {
        $scope.isoutletEdit = false;
      };
      $scope.updateEditStatus = function () {
        $scope.isoutletEdit = true;
      };
      $scope.toggle = {};
      $scope.toggle.switch = $rootScope.outlet.status;
      $scope.isdeleted = $rootScope.outlet.isdeleted;

      $scope.toggleOutletStatus = function (status, parentSelector) {
        $log.info(status);
        var parentElem = parentSelector
          ? angular.element(
              $document[0].querySelector(".modal-demo " + parentSelector)
            )
          : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "myModalContent.html",
          controller: "confirmModalController",
          appendTo: parentElem,
          resolve: {
            status: function () {
              return status;
            },
          },
        });
        modalInstance.result.then(
          function (status) {
            $scope.toggle.switch = status;
          },
          function () {
            $log.info("Modal dismissed at: " + new Date());
          }
        );
      };
      $scope.toggleDelete = function (parentSelector) {
        if (!$scope.isdeleted) {
          var parentElem = parentSelector
            ? angular.element(
                $document[0].querySelector(".modal-demo " + parentSelector)
              )
            : undefined;
          var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: "modal-title",
            ariaDescribedBy: "modal-body",
            templateUrl: "deleteStatus.html",
            controller: "deleteController",
            appendTo: parentElem,
            resolve: {
              deleted: function () {
                return !$scope.isdeleted;
              },
            },
          });
          modalInstance.result.then(
            function (deleted) {
              $scope.isdeleted = true;
            },
            function () {
              $scope.isdeleted = false;
              $log.info("Modal dismissed at: " + new Date());
            }
          );
        } else {
          $scope.isdeleted = false;
        }
      };
      $scope.remove = false;
      $scope.removeImage = function () {
        // $scope.remove = true;
        $log.info("remove image");
        $rootScope.isLoading = true;
      };
      $scope.updateOutlet = function (outletId) {
        var fileFormData = new FormData();
        var file = document.getElementById("outletImage").files[0];
        if (file) {
          fileFormData.append("image", file);
        }
        fileFormData.append("isdeleted", $scope.isdeleted);
        fileFormData.append("status", $scope.toggle.switch);
        fileFormData.append("name", $scope.outlet.name);
        fileFormData.append("address", $scope.outlet.address);
        $rootScope.isLoading = true;
        $http
          .patch(
            `http://localhost:3000/brand/updateOutlet?outletId=${outletId}`,
            fileFormData,
            {
              transformRequest: angular.identity,
              headers: {
                "Content-Type": undefined,
                Authorization: localStorage.getItem("token"),
              },
            }
          )
          .then(
            function (response) {
              $log.info(response);
              $rootScope.isLoading = false;
              $location.path("/brandUserOutlet");
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
    "outletAdminsController",
    function (
      $scope,
      $rootScope,
      $httpParamSerializerJQLike,
      $http,
      $log,
      reactService,
      $location
    ) {
      $scope.createOutletAdmin = function () {
        $location.path("/createOutletAdmin");
      };
      $scope.goToAdmin = function (adminId) {
        $rootScope.adminId = adminId;
        $location.path("/outletAdmin");
      };
    }
  )
  .controller(
    "outletAdminController",
    function (
      $scope,
      $rootScope,
      $httpParamSerializerJQLike,
      $http,
      $log,
      reactService,
      $location,
      $uibModal
    ) {
      var _selected;
      $scope.selectedOutlets = [];
      $rootScope.admin.entityDetails.forEach(function (ele) {
        for (var i = 0; i < $rootScope.outlets.length; i++) {
          if ($rootScope.outlets[i]._id == ele.entityId) {
            $scope.selectedOutlets.push($rootScope.outlets[i]);
          }
        }
      });
      $scope.selected = undefined;
      $scope.editPermissions = [];
      var permissions = [
        "isCreateOutletUser",
        "isReadOutletUser",
        "isDeleteOutletUser",
        "isUpdateOutletUser",
        "isGenerateOutletReport",
      ];

      permissions.forEach(function (permission) {
        $scope.editPermissions.push({
          key: permission,
          value: $rootScope.admin.permissions.includes(permission),
        });
      });
      $scope.isAdminEdit = false;
      $scope.cancelUpdate = function () {
        $scope.isAdminEdit = false;
      };
      $scope.updateEditStatus = function () {
        $log.info("edit");
        $scope.isAdminEdit = true;
      };
      $scope.toggle = {};
      $scope.toggle.switch = $rootScope.admin.status;
      $scope.isdeleted = $rootScope.admin.isdeleted;

      $scope.toggleAdminStatus = function (status, parentSelector) {
        $log.info(status);
        var parentElem = parentSelector
          ? angular.element(
              $document[0].querySelector(".modal-demo " + parentSelector)
            )
          : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "myModalContent.html",
          controller: "confirmModalController",
          appendTo: parentElem,
          resolve: {
            status: function () {
              return status;
            },
          },
        });
        modalInstance.result.then(
          function (status) {
            $scope.toggle.switch = status;
          },
          function () {
            $log.info("Modal dismissed at: " + new Date());
          }
        );
      };
      $scope.updateOutlets = function (selected) {
        $scope.selectedOutlets = selected;
        $log.info(selected);
      };
      $scope.toggleDelete = function (parentSelector) {
        if (!$scope.isdeleted) {
          var parentElem = parentSelector
            ? angular.element(
                $document[0].querySelector(".modal-demo " + parentSelector)
              )
            : undefined;
          var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: "modal-title",
            ariaDescribedBy: "modal-body",
            templateUrl: "deleteStatus.html",
            controller: "deleteController",
            appendTo: parentElem,
            resolve: {
              deleted: function () {
                return !$scope.isdeleted;
              },
            },
          });
          modalInstance.result.then(
            function (deleted) {
              $scope.isdeleted = true;
            },
            function () {
              $scope.isdeleted = false;
              $log.info("Modal dismissed at: " + new Date());
            }
          );
        } else {
          $scope.isdeleted = false;
        }
      };
      $scope.updateAdmin = function () {
        var fileFormData = new FormData();
        // var file = document.getElementById("adminImage").files[0];
        // if (file) {
        //   fileFormData.append("image", file);
        // }
        fileFormData.append("isdeleted", $scope.isdeleted);
        fileFormData.append("status", $scope.toggle.switch);
        fileFormData.append(
          "entityDetails",
          JSON.stringify($scope.selectedOutlets)
        );
        var x = [];
        $scope.editPermissions.forEach(function (permission) {
          if (permission.value) {
            x.push(permission.key);
          }
        });
        fileFormData.append("permissions", JSON.stringify(x));
        fileFormData.append("adminId", $rootScope.adminId);
        $rootScope.isLoading = true;
        $http
          .patch(
            `http://localhost:3000/brand/updateOutletAdmin`,
            fileFormData,
            {
              transformRequest: angular.identity,
              headers: {
                "Content-Type": undefined,
                Authorization: localStorage.getItem("token"),
              },
            }
          )
          .then(
            function (response) {
              $rootScope.isLoading = false;

              $log.info(response);
              $location.path("/brandUserOutlet");
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
      $scope.remove = false;
      $scope.removeImage = function () {
        // $scope.remove = true;
        $log.info("remove image");
        $rootScope.isLoading = true;
      };
    }
  )
  .controller(
    "createOutletAdminController",
    function (
      $scope,
      $rootScope,
      $httpParamSerializerJQLike,
      $http,
      $log,
      reactService,
      $location
    ) {
      var newDebounce = new reactService.Debounce();

      $scope.image = null;
      $scope.imageFileName = "";

      $scope.uploadme = {};
      $scope.uploadme.src = "";

      $scope.status = "active";
      $scope.updateAdminStatus = function (status) {
        $log.info($scope.status);
        $scope.status = status;
      };
      $scope.isdeleted = false;
      $scope.toggleDelete = function () {
        $scope.isdeleted = !$scope.isdeleted;
      };
      $scope.adminPermissions = {
        isCreateOutletUser: false,
        isReadOutletUser: false,
        isDeleteOutletUser: false,
        isUpdateOutletUser: false,
      };

      $scope.createOutletAdmin = function () {
        $rootScope.isLoading = true;
        var fileFormData = new FormData();
        fileFormData.append("image", $scope.adminImage);
        fileFormData.append("name", $scope.admin.name);
        fileFormData.append("email", $scope.admin.email);
        fileFormData.append("password", $scope.admin.password);
        fileFormData.append("isdeleted", $scope.isdeleted);
        fileFormData.append("status", $scope.status);
        fileFormData.append("entityId", $rootScope.outletId);
        fileFormData.append("entityName", $rootScope.outletName);
        var permissions = [];
        for (var key in $scope.adminPermissions) {
          if ($scope.adminPermissions[key]) {
            permissions.push(key);
          }
        }
        fileFormData.append("permissions", JSON.stringify(permissions));
        newDebounce.Invoke(
          function () {
            $http
              .post(
                `http://localhost:3000/brand/createOutletAdmin`,
                fileFormData,
                {
                  transformRequest: angular.identity,
                  headers: {
                    "Content-Type": undefined,
                    Authorization: localStorage.getItem("token"),
                  },
                }
              )
              .then(
                function (response) {
                  $rootScope.isLoading = false;
                  $location.path("/brandUserOutlet");
                },
                function (response) {
                  $rootScope.isLoading = false;
                  $log.info(response);
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
  )
  .controller(
    "brandUserDishReport",
    function (
      $scope,
      $rootScope,
      $log,
      $http,
      $location,
      $httpParamSerializerJQLike
    ) {
      $scope.isselected = {};
      $scope.$watch("quantity", function (newVal) {
        $scope.quantity = newVal;
      });

      $scope.$watch("count", function (newVal) {
        $scope.count = newVal;
      });
      $rootScope.dishes.forEach(function (brand) {
        $scope.isselected[brand._id] = false;
      });
      $scope.select = function (brandId) {
        $scope.isselected[brandId] = !$scope.isselected[brandId];
        $log.info($scope.isselected);
      };
      $scope.quantity = false;
      $scope.count = false;
      $scope.reset = function (item) {
        if (item === "quantity") {
          $scope.count = false;
          $scope.quantity = true;
        } else {
          $scope.count = true;
          $scope.quantity = false;
        }
      };

      var selectedDishes = [];
      var colors = [];
      var colorDetails = [];
      $scope.myJson = {};
      function getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      $scope.isHourly = false;
      $scope.generateReport = function () {
        $log.info($scope.quantity);
        $log.info($scope.count);
        var startDate = "";
        var endDate = "";
        colorDetails = [];
        selectedDishes = [];
        colors = [];
        startDate = document.getElementById("startDate").value;
        endDate = document.getElementById("endDate").value;

        if ($scope.isHourly) {
          for (var brandId in $scope.isselected) {
            if ($scope.isselected[brandId] === true) {
              selectedDishes.push(brandId);
            }
          }
          if (selectedDishes && selectedDishes.length > 0) {
            selectedDishes.forEach(function (brand) {
              colors.push({ backgroundColor: getRandomColor() });
            });
          }
        } else {
          for (var dish of $rootScope.dishes) {
            selectedDishes.push(dish._id);
          }
          $rootScope.dishes.forEach(function (brand) {
            colors.push({ backgroundColor: getRandomColor() });
          });
        }
        var url = "";
        if (!$scope.isHourly) {
          url = "http://localhost:3000/report/brand/itemsReport";
        } else {
          if ($scope.quantity) {
            url =
              "http://localhost:3000/report/brand/itemsReportWithDishes/quantity";
          } else {
            url = "http://localhost:3000/report/brand/itemsReportWithDishes";
          }
        }

        $http
          .post(
            url,
            JSON.stringify({
              startDate: startDate,
              endDate: endDate,
              dishIds: selectedDishes,
            }),
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          )
          .then(
            function (response) {
              $scope.myJson = {};
              colorDetails = [];
              if ($scope.isHourly) {
                $scope.itemsReport = Array(response.data.report.length).fill(
                  Array(24).fill(0)
                );
              } else {
                $scope.itemsReport = [];
              }
              $scope.dishNames = [];
              response.data.report.forEach(function (item, index) {
                $scope.dishNames.push(
                  $scope.isHourly ? item.dish : item.dishName
                );
                if ($scope.isHourly)
                  item.hours.forEach(function (hour) {
                    $scope.itemsReport[index][parseInt(hour.hour)] = hour.count;
                  });
                else $scope.itemsReport.push([item.count]);
              });
              if ($scope.isHourly) {
                for (var i = 0; i < $scope.dishNames.length; i++) {
                  colorDetails.push({
                    text: $scope.dishNames[i],
                    style: colors[i].backgroundColor,
                  });
                }
                $scope.colorDetails = colorDetails;
                $scope.myJson.type = "hbar";
                $scope.myJson.plot = {
                  stacked: true,
                  tooltip: {
                    text: "%kt (X) and %v.",
                  },
                };
                $scope.myJson.backgroundColor = "white";
                $scope.myJson.series = colors;
              } else {
                for (var i = 0; i < $rootScope.dishes.length; i++) {
                  colorDetails.push({
                    text: $rootScope.dishes[i].name,
                    style: colors[i].backgroundColor,
                  });
                }
                $log.info("colordetails", colorDetails);
                $scope.colorDetails = colorDetails;
                ($scope.myJson.backgroundColor = "white"),
                  ($scope.myJson.type = "pie"),
                  ($scope.myJson.title = {
                    textAlign: "center",
                    text: "Brand Report",
                    backgroundColor: "transparent",
                  }),
                  ($scope.myJson.plot = {
                    slice: 50,
                  }),
                  ($scope.myJson.series = colors);
              }
              $log.info($scope.itemsReport);
              $log.info($scope.dishNames);
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
    "brandUserOutletReport",
    function (
      $scope,
      $rootScope,
      $log,
      $httpParamSerializerJQLike,
      $http,
      $location,
      reactService,
      brandUserServices
    ) {
      var newDebounce = new reactService.Debounce();

      $scope.isselected = {};
      $scope.currentPage = 1;
      $scope.itemsPerPage = 8;
      $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };
      $scope.$watch("currentPage", function (newVal, oldVal) {
        setPagingData($scope.currentPage);
        // $log.info(newVal);
        // $log.info(oldVal)
      });

      function setPagingData(page) {
        brandUserServices.getOutlets(page).then(function (resp) {});
      }
      $rootScope.outlets.forEach(function (outlet) {
        $scope.isselected[outlet._id] = false;
      });
      $scope.select = function (outletId) {
        $scope.isselected[outletId] = !$scope.isselected[outletId];
        $log.info($scope.isselected);
      };

      $scope.withoutDatePick = false;
      $scope.withDatePick = false;
      $scope.reset = function (item) {
        if (item == "withoutDatePick") {
          $scope.withDatePick = false;
          $scope.withoutDatePick = true;
        } else {
          $scope.withoutDatePick = false;
          $scope.withDatePick = true;
        }
      };
      var selectedOutlets = [];
      var colors = [];
      var colorDetails = [];
      $scope.myJson = {};
      function getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
      $scope.isHourly = false;
      $scope.changeHourStatus = function () {
        $scope.isHourly = !$scope.isHourly;
        $log.info($scope.isHourly);
      };
      $scope.generateReport = function () {
        var startDate = "";
        var endDate = "";
        selectedOutlets = [];
        colors = [];
        colorDetails = [];
        $log.info($scope.isHourly);
        if ($scope.withDatePick) {
          startDate = document.getElementById("startDate").value;
          endDate = document.getElementById("endDate").value;
        }

        for (var outletId in $scope.isselected) {
          if ($scope.isselected[outletId]) {
            selectedOutlets.push(outletId);
          }
        }
        if (selectedOutlets && selectedOutlets.length > 0) {
          selectedOutlets.forEach(function (outlet) {
            colors.push({ backgroundColor: getRandomColor() });
          });
        }
        var url = "";
        if ($scope.withDatePick) {
          if (startDate == "" || endDate == "") {
            $rootScope.error = "Please select start and end date";
            return;
          }
          if ($scope.isHourly) {
            url = "http://localhost:3000/report/brand/outlet/hourly/dates";
          } else {
            url = "http://localhost:3000/report/brand/outlet/total/dates";
          }
        } else {
          if ($scope.isHourly) {
            url = "http://localhost:3000/report/brand/outlet/hourly";
          } else {
            url = "http://localhost:3000/report/brand/outlet/total";
          }
        }

        $scope.datas = [];
        newDebounce.Invoke(
          function () {
            $rootScope.isLoading = true;
            $http
              .post(
                url,
                JSON.stringify({
                  startDate: startDate,
                  endDate: endDate,
                  outletIds: selectedOutlets,
                }),
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              )
              .then(
                function (response) {
                  $log.info(response);
                  $scope.itemsReport = [];
                  $scope.outletNames = [];
                  $scope.selectedSlot = 0;
                  $rootScope.isLoading = false;
                  if ($scope.top3Items) {
                    $scope.graphs = [];
                    var width = 100 / selectedOutlets.length;
                    $scope.myJson = { graphset: [] };
                    $scope.datas = [
                      [],
                      [],
                      [],
                      [],
                      [],
                      [],
                      [],
                      [],
                      [],
                      [],
                      [],
                      [],
                      [],
                      [],
                      [],
                      [],
                      [],
                      [],
                      [],
                      [],
                      [],
                      [],
                      [],
                      [],
                    ];
                    $log.info($scope.datas.length);
                    response.data.report.forEach(function (item, index) {
                      var graph = {};
                      graph.outletName = item.outletName;
                      var h = 0;
                      var a1 = { values: [] },
                        a2 = { values: [] },
                        a3 = { values: [] };
                      item.stats.forEach(function (stat) {
                        var data = { items: [] };
                        data.outletName = item.outletName;

                        while (h < stat.hour) {
                          a1.values.push(0);
                          a2.values.push(0);
                          a3.values.push(0);
                          h++;
                        }

                        var size = stat.dishes.length;
                        if (size >= 1) {
                          a1.values.push(stat.dishes[0].dishQuantity);
                          data.items.push({
                            name: stat.dishes[0].dishName,
                          });
                        } else a1.values.push(0);
                        if (size >= 2) {
                          a2.values.push(stat.dishes[1].dishQuantity);
                          data.items.push({
                            name: stat.dishes[1].dishName,
                          });
                        } else a2.values.push(0);
                        if (size >= 3) {
                          a3.values.push(stat.dishes[2].dishQuantity);
                          data.items.push({
                            name: stat.dishes[2].dishName,
                          });
                        } else a3.values.push(0);
                        while (data.items.length < 3) {
                          data.items.push({
                            name: "",
                          });
                        }
                        $scope.datas[stat.hour].push(data);

                        $log.info("datas", $scope.datas);
                        h++;
                      });
                      while (h < 24) {
                        a1.values.push(0);
                        a2.values.push(0);
                        a3.values.push(0);
                        h++;
                      }
                      var myJson = {
                        type: "hbar",
                        plot: {
                          stacked: true,
                          tooltip: {
                            text: "%kt (X) and %v.",
                          },
                        },
                        plotarea: {
                          //effects main chart region
                          margin: "dynamic",
                        },
                        height: 100 / selectedOutlets.length + "%",
                        width: "100%",
                        backgroundColor: "white",
                        series: [a1, a2, a3],
                      };
                      ($scope.slots = [
                        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                        16, 17, 18, 19, 20, 21, 22, 23,
                      ]),
                        // graph.data = myJson;
                        $scope.myJson.graphset.push(myJson);
                      // $scope.graphs.push(graph);
                    });

                    $log.info($scope.myJson);
                  } else {
                    if ($scope.isHourly) {
                      $scope.myJson = {};

                      response.data.report.forEach(function (item, index) {
                        var stats = [];
                        var hour = 0;
                        colorDetails.push({
                          text: item.outletName,
                          style: colors[index].backgroundColor,
                        });
                        item.sell.forEach(function (stat) {
                          if (hour == stat.hour) {
                            stats.push(stat.sell);
                          } else {
                            while (hour < stat.hour) {
                              stats.push(0);
                              hour++;
                            }
                            stats.push(stat.sell);
                          }
                          hour++;
                        });
                        $scope.itemsReport.push(stats);
                      });
                      ($scope.myJson.type = "hbar"),
                        ($scope.myJson.title = {
                          backgroundColor: "transparent",
                          fontColor: "white",
                          text: "Outlet Reports",
                        });
                      $scope.myJson.scaleX = {
                        "min-value": 0,
                        "max-value": 23,
                      };
                      ($scope.myJson.backgroundColor = "white"),
                        ($scope.myJson.series = colors);
                    } else {
                      $scope.myJson = {};
                      colors = [];
                      colorDetails = [];
                      response.data.report.forEach(function (item) {
                        $scope.itemsReport.push([item.sell]);
                        colors.push({
                          text: item.outletName,
                          values: [item.sell],
                          backgroundColor: getRandomColor(),
                        });

                        $log.info(colors);
                        $scope.outletNames.push(item.outletName);
                      });
                      for (var i = 0; i < colors.length; i++) {
                        colorDetails.push({
                          text: colors[i].text,
                          style: colors[i].backgroundColor,
                        });
                      }
                      ($scope.myJson.backgroundColor = "white"),
                        ($scope.myJson.type = "pie"),
                        ($scope.myJson.title = {
                          textAlign: "center",
                          text: "Outlet Report",
                          backgroundColor: "transparent",
                        }),
                        ($scope.myJson.plot = {
                          slice: 50,
                        }),
                        ($scope.myJson.series = colors);
                    }
                  }
                  $log.info(colorDetails);
                  $scope.colorDetails = colorDetails;

                  $log.info($scope.itemsReport);
                  $log.info($scope.outletNames);
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
          },
          0,
          false
        );
      };
    }
  );
