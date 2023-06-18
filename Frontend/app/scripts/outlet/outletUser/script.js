angular
  .module("foodOrdering")
  .config(function ($stateProvider) {
    $stateProvider
      .state("outletUserDish", {
        url: "/outletUserDish",
        templateUrl: "views/outlet/outletUser/profileDish.html",
        controller: "outletUserDishController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isReadOutletDishes"]);
          },
          dishes: function (outletUserServices) {
            return outletUserServices.getDishes(0);
          },
          cart: function (outletUserServices) {
            return outletUserServices.getCart();
          },
        },
      })
      .state("outletOrder", {
        url: "/outletOrder",
        templateUrl: "views/outlet/outletUser/orders.html",
        controller: "outletOrderController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isReadOrder"]);
          },
          orders: function (outletUserServices) {
            return outletUserServices.getOrders(0);
          },

          cart: function (outletUserServices) {
            return outletUserServices.getCart();
          },
        },
      })
      .state("cart", {
        url: "/cart",
        templateUrl: "views/outlet/outletUser/cart.html",
        controller: "cartPageController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },

          checkPermission: function (checkPermission) {
            return checkPermission.check(["isReadOutletDishes"]);
          },
          recommendedDishes: function (outletUserServices) {
            return outletUserServices.getRecommendedDish(0);
          },
        },
      });
  })
  .controller(
    "outletUserDishController",
    function (
      $scope,
      $rootScope,
      $log,
      $http,
      $location,
      $httpParamSerializerJQLike,
      outletUserServices
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
      };
      $scope.updateSingleCategory = function (superCategory) {
        $scope.selectedSuperCategory = superCategory;
        $scope.selectedCategory = "";
        brandUserServices
          .getCategories(0, superCategory._id)
          .then(function () {});
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
        outletUserServices.getDishes(page).then(function (response) {});
      }

      $scope.dishesAddSub = {};
      $scope.addSub = function (sign, dishId) {
        $log.info(sign, dishId);
        if ($scope.dishesAddSub[`${dishId}`] === undefined)
          $scope.dishesAddSub[`${dishId}`] = 0;
        if (sign == "+") $scope.dishesAddSub[`${dishId}`]++;
        else if (sign == "-" && $scope.dishesAddSub[`${dishId}`] > 0)
          $scope.dishesAddSub[`${dishId}`]--;
        $log.info($scope.dishesAddSub);
      };
      $scope.options = ["active", "inactive", "Deleted"];
      $scope.selectedCategory = "";
      $scope.selectedSuperCategory = "";
      $scope.updateCategoryEntered = function (category, superCategory) {
        $scope.selectedCategory = category;
        $scope.selectedSuperCategory = superCategory;
      };
      $scope.updateSingleCategory = function (superCategory) {
        $scope.selectedSuperCategory = superCategory;
        $scope.selectedCategory = "";
      };
      $scope.submitHandler = function (
        dishId,
        dishName,
        dishPrice,
        amount,
        taxes
      ) {
        // console.log(dishId, dishName, dishPrice, amount);
        if (!amount) return;
        var idx = $rootScope.cart.items.findIndex(function (item) {
          return item.dishId._id == dishId;
        });
        if (idx >= 0) {
          $rootScope.cart.items[idx].quantity += +amount;
        } else
          $rootScope.cart.items.push({
            dishId: {
              _id: dishId,
              name: dishName,
              price: dishPrice,
              taxes: taxes,
            },
            quantity: +amount,
          });
        $rootScope.cart.totalCartItems += +amount;
        $rootScope.cart.totalCartPrice += +amount * dishPrice;
        $log.info($rootScope.cart);
        localStorage.setItem("cart", JSON.stringify($rootScope.cart));
        // $http({
        //   method: "POST",
        //   url: `http://localhost:3000/outlet/updateCart?dishId=${dishId}`,
        //   data: $httpParamSerializerJQLike({
        //     quantity: amount,
        //   }),
        //   headers: {
        //     Authorization: localStorage.getItem("token"),
        //     "Content-Type": "application/x-www-form-urlencoded",
        //   },
        // }).then(
        //   function (response) {
        //     $log.info(response);
        //   },
        //   function (response) {
        //     $log.info(response);
        //     $rootScope.cart.items.pop();
        //     if (response.data === null) {
        //       $rootScope.error = "Some error occurred";
        //       return;
        //     }
        //     if (response.data.statusCode == 401) {
        //       $rootScope.error = response.data.message;
        //       return;
        //     }
        //     if (response.data.message) $rootScope.error = response.data.message;
        //   }
        // );
      };
    }
  )
  .controller(
    "cartPageController",
    function (
      $scope,
      $rootScope,
      $log,
      $http,
      $uibModal,
      $httpParamSerializerJQLike,
      $rootScope,
      $location,outletUserServices
    ) {
      $scope.submitHandler = function (
        dishId,
        dishName,
        dishPrice,
        amount,
        taxes
      ) {
        if (!amount) return;
        var idx = $rootScope.cart.items.findIndex(function (item) {
          return item.dishId._id == dishId;
        });
        if (idx >= 0) {
          $rootScope.cart.items[idx].quantity += +amount;
        } else
          $rootScope.cart.items.push({
            dishId: {
              _id: dishId,
              name: dishName,
              price: dishPrice,
              taxes: taxes,
            },
            quantity: +amount,
          });
        $rootScope.cart.totalCartItems += +amount;
        $rootScope.cart.totalCartPrice += +amount * dishPrice;
        $log.info($rootScope.cart);
        localStorage.setItem("cart", JSON.stringify($rootScope.cart));
      };
      // $scope.$watch("$root.cart",function(){
      //   outletUserServices.getRecommendedDish().then(function(response){})
      // })
      $scope.dishesAddSub = {};
      $scope.addSub = function (sign, dishId) {
        $log.info(sign, dishId);
        if ($scope.dishesAddSub[`${dishId}`] === undefined)
          $scope.dishesAddSub[`${dishId}`] = 0;
        if (sign == "+") $scope.dishesAddSub[`${dishId}`]++;
        else if (sign == "-" && $scope.dishesAddSub[`${dishId}`] > 0)
          $scope.dishesAddSub[`${dishId}`]--;
        $log.info($scope.dishesAddSub);
      };
      $scope.openCart = function (parentSelector) {
        if ($rootScope.cart.totalCartItems == 0) {
          return;
        }
        var parentElem = parentSelector
          ? angular.element(
              $document[0].querySelector(".modal-demo " + parentSelector)
            )
          : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "cart.html",
          controller: "cartModalController",
          appendTo: parentElem,
          size: "lg",
        });
        modalInstance.result.then(
          function (status) {},
          function () {
            $log.info("Modal dismissed at: " + new Date());
          }
        );
      };
    }
  )
  .controller(
    "orderModalController",
    function (
      $scope,
      $rootScope,
      $log,
      $http,
      $httpParamSerializerJQLike,
      $uibModalInstance,
      outletUserServices,
      $timeout,
      order
    ) {
      $scope.isEdit = false;
      $scope.order = order;
      $scope.cancel = function () {
        $uibModalInstance.dismiss("cancel");
      };
      $scope.updateEditStatus = function () {
        $scope.isEdit = !$scope.isEdit;
      };
      $scope.changeContact = function () {};

      $scope.confirmOrder = function () {
        $http({
          method: "POST",
          url: `http://localhost:3000/outlet/createOrder`,
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: $httpParamSerializerJQLike({
            name: $scope.order.name,
            email: $scope.order.email,
            contact: $scope.order.contact,
            type: $scope.order.type,
            status: $scope.order.status,
            cart: $rootScope.cart,
            taxAmount: +$rootScope.taxAmount,
            entityId: $rootScope.user.entityDetails[0].entityId,
            entityName: $rootScope.user.entityDetails[0].entityName,
          }),
        }).then(
          function (res) {
            $log.info(res);
            if (!$rootScope.orders) $rootScope.orders = [];
            $rootScope.orders.push(res.data.order);
            $rootScope.cart.items = [];
            $rootScope.cart.totalCartItems = 0;
            $rootScope.cart.totalCartPrice = 0;

            localStorage.setItem("cart", JSON.stringify($rootScope.cart));

            $uibModalInstance.close();
          },
          function (response) {
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
      };
    }
  )
  .controller(
    "outletOrderController",
    function (
      $scope,
      $rootScope,
      $log,
      $http,
      $uibModal,
      $location,
      $httpParamSerializerJQLike,
      outletUserServices
    ) {
      $scope.currentPage = 1;
      $scope.itemsPerPage = 8;
      $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };
      $scope.$watch("currentPage", function (newVal, oldVal) {
        setPagingData($scope.currentPage).then(function (response) {});
      });
      function setPagingData(page) {
        outletUserServices.getOrders(page);
      }
      $scope.isCollapsed = false;
      $scope.status = "Dine In";
      $scope.updateStatus = function (status) {
        $scope.status = status;
      };
      $scope.deleteOrder = function (id, parentSelector) {
        var parentElem = parentSelector
          ? angular.element(
              $document[0].querySelector(".modal-demo " + parentSelector)
            )
          : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "deleteOrder.html",
          controller: "deleteOrderController",
          appendTo: parentElem,
          resolve: {
            id: function () {
              return id;
            },
          },
        });
        modalInstance.result.then(
          function (id) {},
          function () {
            $log.info("Modal dismissed at: " + new Date());
          }
        );
      };
      $scope.editOrder = function (id, parentSelector) {
        var parentElem = parentSelector
          ? angular.element(
              $document[0].querySelector(".modal-demo " + parentSelector)
            )
          : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "editOrder.html",
          controller: "editOrderController",
          appendTo: parentElem,
          resolve: {
            id: function () {
              return id;
            },
          },
          size: "lg",
        });
        modalInstance.result.then(
          function () {},
          function () {
            $log.info("Modal dismissed at: " + new Date());
          }
        );
      };
    }
  )
  .controller(
    "deleteOrderController",
    function (
      $scope,
      $rootScope,
      $log,
      $http,
      $httpParamSerializerJQLike,
      $uibModalInstance,
      $uibModal,
      $location,
      id
    ) {
      $scope.id = id;
      $scope.ok = function () {
        $http({
          method: "DELETE",
          url: `http://localhost:3000/outlet/deleteOrder?orderId=${id}`,
          data: $httpParamSerializerJQLike({}),
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }).then(
          function (resp) {
            $rootScope.orders = $rootScope.orders.filter(function (order) {
              return order._id != id;
            });
            $uibModalInstance.close(id);
          },
          function (response) {
            $uibModalInstance.close(id);
          }
        );
      };
      $scope.cancel = function () {
        $uibModalInstance.dismiss("cancel");
      };
    }
  )
  .controller(
    "editOrderController",
    function (
      $scope,
      $rootScope,
      $log,
      $http,
      $httpParamSerializerJQLike,
      $uibModalInstance,
      $uibModal,
      $location,
      id
    ) {
      var ele = $rootScope.orders.find(function (ele) {
        return ele._id == id;
      });
      $scope.order = { ...ele };
      $scope.addItemToOrder = function (parentSelector) {
        var parentElem = parentSelector
          ? angular.element(
              $document[0].querySelector(".modal-demo " + parentSelector)
            )
          : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "addItemToOrder.html",
          controller: "addItemToOrderController",
          appendTo: parentElem,
          size: "xl",
          resolve: {
            order: function () {
              return $scope.order;
            },
          },
        });
        modalInstance.result.then(
          function (order) {
            $log.info("order", order);
          },
          function () {
            $log.info("Modal dismissed at: " + new Date());
          }
        );
      };
      $scope.ok = function () {
        $http({
          method: "PATCH",
          url: `http://localhost:3000/outlet/updateOrder?orderId=${id}`,
          data: $httpParamSerializerJQLike({
            customerName: $scope.order.customerName,
            customerEmail: $scope.order.customerEmail,
            customerContact: $scope.order.customerContact,
            dishes: $scope.order.dishes,
            orderPrice: $scope.order.orderPrice,
            orderType: $scope.order.orderType,
            orderStatus: $scope.order.orderStatus,
            orderDate: $scope.order.orderDate,
          }),
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }).then(
          function (response) {
            $log.info(response);
            var idx = $rootScope.orders.findIndex(function (ele) {
              return ele._id == id;
            });
            $rootScope.orders[idx] = $scope.order;
            $location.path("/outletOrder");
            $uibModalInstance.close(id, $scope.order);
          },
          function (response) {
            $log.info(response);
            if (response.data === null) {
              $rootScope.error = "Some error occurred";
              return;
            }
            if (response.data.statusCode == 401) {
              $rootScope.error = response.data.message;
              return;
            }
            if (response.data.message) $rootScope.error = response.data.message;
            $uibModalInstance.close(id, $scope.order);
          }
        );
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss("cancel");
      };
      $scope.addSub = function (sign, dishId) {
        var idx = $scope.order.dishes.findIndex(function (item) {
          return item.dishId._id == dishId;
        });
        if (idx == -1) {
          return;
        }
        var oldQuantity = $scope.order.dishes[idx].quantity;

        if (sign == "+") {
          $scope.order.dishes[idx].quantity++;
        } else {
          if ($scope.order.dishes[idx].quantity > 1) {
            $scope.order.dishes[idx].quantity--;
          } else {
            $scope.order.dishes[idx].quantity--;
            $scope.order.dishes.splice(idx, 1);
          }
        }
        $scope.order.orderPrice +=
          ($scope.order.dishes[idx].quantity - oldQuantity) *
          $scope.order.dishes[idx].dishId.price;
        if ($scope.order.dishes[idx].quantity == 0) {
          $scope.order.dishes.splice(idx, 1);
        }
        $log.info($scope.order);
      };
    }
  )
  .controller(
    "addItemToOrderController",
    function ($scope, $log, $rootScope, $uibModalInstance, order) {
      $scope.submitHandler = function (dishId, dishName, dishPrice, amount) {
        $log.info(dishId, dishName, dishPrice, amount);
        $log.info(order);
        var idx = order.dishes.findIndex(function (item) {
          return item.dishId._id == dishId;
        });
        if (idx >= 0) {
          order.dishes[idx].quantity += +amount;
        } else
          order.dishes.push({
            dishId: { _id: dishId, name: dishName, price: dishPrice },
            quantity: +amount,
          });
        order.orderPrice += +amount * dishPrice;
      };
      $scope.ok = function () {
        $uibModalInstance.close(order);
      };
      $scope.cancel = function () {
        $uibModalInstance.dismiss("cancel");
      };
    }
  )
  .controller(
    "cartModalController",
    function (
      $scope,
      $rootScope,
      $log,
      $http,
      $httpParamSerializerJQLike,
      $uibModalInstance,
      $uibModal,
      outletUserServices,
      $q
    ) {
      $scope.order = {};
      $scope.order.type = "Dine In";
      $scope.ok = function (parentSelector) {
        $uibModalInstance.close();
        var parentElem = parentSelector
          ? angular.element(
              $document[0].querySelector(".modal-demo " + parentSelector)
            )
          : undefined;
        var modalInstance = $uibModal.open({
          animation: true,
          ariaLabelledBy: "modal-title",
          ariaDescribedBy: "modal-body",
          templateUrl: "order.html",
          controller: "orderModalController",
          appendTo: parentElem,
          size: "lg",
          resolve: {
            order: function () {
              return $scope.order;
            },
          },
        });
        modalInstance.result.then(
          function () {},
          function () {
            $log.info("Modal dismissed at: " + new Date());
          }
        );
      };
      $rootScope.taxAmount = 0;
      $rootScope.cart.items.forEach((item) => {
        if(!item.dishId.taxes)return;
        item.dishId.taxes.forEach((tax) => {
          $rootScope.taxAmount +=
            ((tax.percentAmount * item.dishId.price) / 100) * item.quantity;
        });
      });
      $rootScope.taxAmount = Math.floor($rootScope.taxAmount);
      $scope.addSub = function (sign, dishId) {
        var idx = $rootScope.cart.items.findIndex(function (item) {
          return item.dishId._id == dishId;
        });
        if (idx == -1) {
          return;
        }
        var oldQuantity = $rootScope.cart.items[idx].quantity;

        if (sign == "+") {
          $rootScope.cart.items[idx].quantity++;
          $rootScope.cart.totalCartItems++;
          $scope.setCart(
            dishId,
            $rootScope.cart.items[idx].quantity,
            $rootScope.cart.items[idx].dishId.price
          );
        } else {
          $rootScope.cart.totalCartItems--;
          if ($rootScope.cart.items[idx].quantity > 1) {
            $rootScope.cart.items[idx].quantity--;
            $scope.setCart(
              dishId,
              $rootScope.cart.items[idx].quantity,
              $rootScope.cart.items[idx].dishId.price
            );
          } else {
            $rootScope.cart.items[idx].quantity--;
            $rootScope.cart.items.splice(idx, 1);
            $scope.deleteFromCart(dishId);
          }
        }
        $rootScope.cart.items.forEach((item) => {
          item.dishId.taxes.forEach((tax) => {
            $rootScope.taxAmount +=
              ((tax.percentAmount * item.dishId.price) / 100) * item.quantity;
          });
        });
        $rootScope.taxAmount = Math.floor($rootScope.taxAmount);
        $rootScope.cart.totalCartPrice +=
          ($rootScope.cart.items[idx].quantity - oldQuantity) *
          $rootScope.cart.items[idx].dishId.price;
        if ($rootScope.cart.items[idx].quantity == 0) {
          $rootScope.cart.items.splice(idx, 1);
        }
        localStorage.setItem("cart", JSON.stringify($rootScope.cart));
      };
      $scope.deleteFromCart = function (dishId) {
        localStorage.setItem("cart", JSON.stringify($rootScope.cart));
      };
      $scope.setCart = function (dishId, quantity, dishPrice) {
        localStorage.setItem("cart", JSON.stringify($rootScope.cart));
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss("cancel");
      };
    }
  )
  .controller("outletReportController", function ($scope) {});
