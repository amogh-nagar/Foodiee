angular
  .module("foodOrdering")
  .config(function ($stateProvider) {
    $stateProvider
      .state("brandAdminProfile", {
        url: "/brandAdminProfile",
        templateUrl: "views/brand/brandAdmin/profile.html",
        controller: "brandAdminProfileController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkRole: function (checkRole) {
            return checkRole.check("BrandAdmin");
          },
          brands: function (brandAdminServices) {
            return brandAdminServices.getBrandAdminBrands(0);
          },
        },
      })
      .state("roles", {
        url: "/roles",
        templateUrl: "views/brand/brandAdmin/rolesOfBrand.html",
        controller: "rolesOfBrand",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkRole: function (checkRole) {
            return checkRole.check("BrandAdmin");
          },
          roles: function (brandAdminServices) {
            return brandAdminServices.getBrandAdminRoles(0);
          },
        },
      })
      .state("users", {
        url: "/users",
        templateUrl: "views/brand/brandAdmin/users.html",
        controller: "usersOfRole",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isReadBrandUser"]);
          },
          users: function (brandAdminServices) {
            return brandAdminServices.getBrandAdminRoleUsers(0);
          },
        },
      })
      .state("brandUser", {
        url: "/brandUser",
        templateUrl: "views/brand/brandAdmin/updateBrandUser.html",
        controller: "updateBrandUser",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isReadBrandUser"]);
          },
          user: function (brandAdminServices) {
            return brandAdminServices.getBrandUser();
          },
        },
      })
      .state("createBrandUser", {
        url: "/createBrandUser",
        templateUrl: "views/brand/brandAdmin/createUser.html",
        controller: "createBrandUser",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isCreateBrandUser"]);
          },
        },
      })
      .state("brandAdminReport", {
        url: "/brandAdminReport",
        templateUrl: "views/brand/brandAdmin/report.html",
        controller: "brandAdminReport",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkRole: function (checkRole) {
            return checkRole.check("BrandAdmin");
          },
          brands: function (brandAdminServices) {
            return brandAdminServices.getBrandAdminBrands(0);
          },
        },
      })
      .state("brandOutlets", {
        url: "/brandOutlets",
        templateUrl: "views/brand/brandAdmin/profileOutlet.html",
        controller: "brandOutletsController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isReadOutlet"]);
          },
          outlets: function (brandAdminServices) {
            return brandAdminServices.getOutlets(0);
          },
        },
      })
      .state("brandDishes", {
        url: "/brandDishes",
        templateUrl: "views/brand/brandAdmin/profileDish.html",
        controller: "brandDishesController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isReadDish"]);
          },
          dishes: function (brandAdminServices) {
            return brandAdminServices.getDishes(0);
          },
        },
      })
      .state("brandInfo", {
        url: "/brandInfo",
        templateUrl: "views/brand/brandAdmin/brandInfo.html",
        controller: "brandInfoController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkRole: function (checkRole) {
            return checkRole.check("BrandAdmin");
          },
        },
      })
      .state("brandOutletReport", {
        url: "/brandOutletReport",
        templateUrl: "views/brand/brandAdmin/brandOutletReport.html",
        controller: "brandOutletReport",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isGenerateOutletReport"]);
          },
          brands: function (brandAdminServices) {
            return brandAdminServices.getBrandAdminBrands(0);
          },
        },
      })
      .state("brandDishReport", {
        url: "/brandDishReport",
        templateUrl: "views/brand/brandAdmin/brandDishReport.html",
        controller: "brandDishReport",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isGenerateDishReport"]);
          },
          brands: function (brandAdminServices) {
            return brandAdminServices.getBrandAdminBrands(0);
          },
        },
      }) .state("updateBrandAdminBrand", {
        url: "/updateBrandAdminBrand",
        templateUrl: "views/brand/brandAdmin/updateBrand.html",
        controller: "updateBrandAdminBrandController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkRole: function (checkRole) {
            return checkRole.check("BrandAdmin");
          },
          brand: function (brandAdminServices) {
            return brandAdminServices.getBrand();
          },
        },
      });
  })
  .controller(
  "updateBrandAdminBrandController" ,function (
    $scope,
    $rootScope,
    $log,
    $http,
    $uibModal,
    $httpParamSerializerJQLike,
    $rootScope,
    $location
  ) {
    $scope.isbrandEdit = false;
    $scope.cancelUpdate = function () {
      $scope.isbrandEdit = false;
    };
    $scope.updateEditStatus = function () {
      $scope.isbrandEdit = true;
    };
    $scope.toggle = {};
    $scope.toggle.switch = $rootScope.brand.status;
    $scope.isdeleted = $rootScope.brand.isdeleted;

    $scope.toggleBrandStatus = function (status, parentSelector) {
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
    $scope.updateBrand = function (brandId) {
      $log.info(brandId)
      var fileFormData = new FormData();
      var file = document.getElementById("brandImage");
      if (file) {
        file=file.files[0]
        fileFormData.append("image", file);
      }
      fileFormData.append("isdeleted", $scope.isdeleted);
      fileFormData.append("status", $scope.toggle.switch);
      fileFormData.append("name", $scope.brand.name);
      fileFormData.append("description", $scope.brand.description);
      $rootScope.isLoading = true;
      $http
        .patch(
          `http://localhost:3000/brand/updateBrand?brandId=${brandId}`,
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
  })
  .controller(
    "brandOutletReport",
    function (
      $scope,
      $rootScope,
      $httpParamSerializerJQLike,
      $http,
      $log,
      reactService,
      $location,
      brandAdminServices
    ) {
      $scope.updateSelectedBrand = function (brand) {
        $rootScope.brandId = $scope.selectedOutletBrand._id;
        brandAdminServices.getOutlets();
      };
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
        brandAdminServices.getBrandAdminBrands(page).then(function (resp) {});
      }
      if ($rootScope.outlets) {
        $rootScope.outlets.forEach(function (outlet) {
          $scope.isselected[outlet._id] = false;
        });
      }
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
        // newDebounce.Invoke(
        //   function () {
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
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                    17, 18, 19, 20, 21, 22, 23,
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
        //   },
        //   0,
        //   false
        // );
      };
    }
  )
  .controller(
    "brandDishReport",
    function (
      $scope,
      $rootScope,
      $httpParamSerializerJQLike,
      $http,
      $log,
      reactService,
      $location,
      brandAdminServices
    ) {
      $scope.updateSelectedBrand = function (brand) {
        $rootScope.brandId = $scope.selectedOutletBrand._id;
        brandAdminServices.getDishes();
      };

      $scope.isselected = {};
      $scope.$watch("quantity", function (newVal) {
        $scope.quantity = newVal;
      });
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
        brandAdminServices.getDishes(page).then(function (resp) {});
      }
      
      $scope.$watch("count", function (newVal) {
        $scope.count = newVal;
      });
      if ($rootScope.dishes)
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
    "brandOutletsController",
    function (
      $scope,
      $rootScope,
      $httpParamSerializerJQLike,
      $http,
      $log,
      reactService,
      $location,
      brandAdminServices
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
        brandAdminServices.getOutlets(page).then(function (resp) {});
      }
      $scope.createOutlet = function () {
        $location.path("/createOutlet");
      };

      $scope.options = ["active", "inactive", "Deleted"];
      $scope.goToOutlet = function (outletId, outletName) {
        $rootScope.outletId = outletId;
        $rootScope.outletName = outletName;
        $location.path("/updateOutlet");
      };
    }
  )
  .controller(
    "brandDishesController",
    function (
      $scope,
      $rootScope,
      $httpParamSerializerJQLike,
      $http,
      $log,
      reactService,
      $location,brandAdminServices
    ) {
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
      $scope.openDishList = false;
      $scope.toggledropdown = function () {
        $scope.openDishList = !$scope.openDishList;
      };
      $scope.isselected = {};
      $scope.$watch("quantity", function (newVal) {
        $scope.quantity = newVal;
      });
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
        brandAdminServices.getDishes(page).then(function (resp) {});
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
    "brandInfoController",
    function (
      $scope,
      $rootScope,
      $httpParamSerializerJQLike,
      $http,
      $log,

      reactService,
      $location
    ) {
      $scope.goToRole = function () {
        $location.path("/roles");
      };
      $scope.goToOutlet = function () {
        $location.path("/brandOutlets");
      };
      $scope.goToDish = function () {
        $location.path("/brandDishes");
      };
    }
  )
  .controller(
    "brandAdminProfileController",
    function (
      $scope,
      $rootScope,
      $httpParamSerializerJQLike,
      $http,
      $log,
      brandAdminServices,
      reactService,
      $location
    ) {
      $scope.currentPage = 1;
      $scope.itemsPerPage = 8;
      $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };
      $scope.$watch("currentPage", function (newVal, oldVal) {
        setPagingData($scope.currentPage);
      });

      function setPagingData(page) {
        brandAdminServices.getBrandAdminBrands(page).then(function (resp) {});
      }
      $scope.createBrand = function () {
        $log.info("create brand");
        $location.path("/createBrand");
      };
      $scope.options = ["active", "inactive", "Deleted"];
      $scope.goToBrand = function (brandId, brandName) {
        $rootScope.brandId = brandId;
        $rootScope.brandName = brandName;
        $location.path("/brandInfo");
      };
    }
  )
  .controller(
    "rolesOfBrand",
    function (
      $scope,
      $rootScope,
      $httpParamSerializerJQLike,
      $http,
      $log,

      reactService,
      $location
    ) {
      $scope.currentPage = 1;
      $scope.itemsPerPage = 8;
      $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };
      $scope.$watch("currentPage", function (newVal, oldVal) {
        setPagingData($scope.currentPage);
      });

      $scope.createBrandUser = function () {
        $location.path("/createBrandUser");
      };
      $scope.options = ["active", "inactive", "Deleted"];
      $scope.goToRole = function (roleId) {
        $rootScope.roleId = roleId;
        $location.path("/users");
      };
    }
  )
  .controller(
    "usersOfRole",
    function (
      $scope,
      $rootScope,
      $httpParamSerializerJQLike,
      $http,
      $log,
      brandAdminServices,
      reactService,
      $location
    ) {
      $scope.currentPage = 1;
      $scope.itemsPerPage = 8;
      $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
      };
      $scope.$watch("currentPage", function (newVal, oldVal) {
        setPagingData($scope.currentPage);
      });

      function setPagingData(page) {
        brandAdminServices
          .getBrandAdminRoleUsers(page)
          .then(function (resp) {});
      }
      $scope.createBrandUser = function () {
        $location.path("/createBrandUser");
      };
      $scope.options = ["active", "inactive", "Deleted"];
      $scope.goToUser = function (userId) {
        $rootScope.userId = userId;
        $location.path("/brandUser");
      };
    }
  )
  .controller(
    "createBrandUser",
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
      $scope.updateUserStatus = function (status) {
        $log.info($scope.status);
        $scope.status = status;
      };
      $scope.isdeleted = false;
      $scope.toggleDelete = function () {
        $scope.isdeleted = !$scope.isdeleted;
      };
      $scope.userPermissions = {
        isCreateOutlet: false,
        isReadOutlet: false,
        isDeleteOutlet: false,
        isUpdateOutlet: false,
        isCreateOutletAdmin: false,
        isReadOutletAdmin: false,
        isDeleteOutletAdmin: false,
        isUpdateOutletAdmin: false,
        isCreateDish: false,
        isReadDish: false,
        isDeleteDish: false,
        isUpdateDish: false,
        isCreateSuperCategory: false,
        isCreateCategory: false,
        isGenerateOutletReport: false,
        isGenerateDishReport: false,
      };
      var roleName = "BrandOutletManager";
      $scope.createOutletManager = function () {
        roleName = "BrandOutletManager";
        for (var key in $scope.userPermissions) {
          if (key.indexOf("Outlet") != -1) {
            $scope.userPermissions[key] = true;
          } else {
            $scope.userPermissions[key] = false;
          }
        }
      };

      $scope.createDishManager = function () {
        roleName = "BrandDishManager";

        for (var key in $scope.userPermissions) {
          if (
            key.indexOf("Dish") != -1 ||
            key == "isCreateSuperCategory" ||
            key == "isCreateCategory"
          ) {
            $scope.userPermissions[key] = true;
          } else {
            $scope.userPermissions[key] = false;
          }
        }
      };
      $scope.createBrandUser = function () {
        $rootScope.isLoading = true;
        var fileFormData = new FormData();
        fileFormData.append("image", $scope.userImage);
        fileFormData.append("name", $scope.user.name);
        fileFormData.append("email", $scope.user.email);
        fileFormData.append("password", $scope.user.password);
        fileFormData.append("isdeleted", $scope.isdeleted);
        fileFormData.append("status", $scope.status);
        fileFormData.append("entityId", $rootScope.brandId);
        fileFormData.append("entityName", $rootScope.brandName);
        fileFormData.append("roleName", roleName);
        var permissions = [];
        for (var key in $scope.userPermissions) {
          if ($scope.userPermissions[key]) {
            permissions.push(key);
          }
        }
        fileFormData.append("permissions", JSON.stringify(permissions));
        newDebounce.Invoke(
          function () {
            $http
              .post(
                `http://localhost:3000/brand/createBrandUser`,
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
                  $location.path("/brandAdminProfile");
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
    "brandAdminReport",
    function (
      $scope,
      $rootScope,
      $log,
      $httpParamSerializerJQLike,
      $http,
      $location,
      brandAdminServices,
      reactService
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
        brandAdminServices.getBrandAdminBrands(page).then(function (resp) {});
      }
      $rootScope.brands.forEach(function (brand) {
        $scope.isselected[brand._id] = false;
      });
      $scope.select = function (brandId) {
        $scope.isselected[brandId] = !$scope.isselected[brandId];
        $log.info($scope.isselected);
      };

      $scope.withoutDatePick = false;
      $scope.withDatePick = false;
      $scope.reset = function (item) {
        if (item == "withoutDatePick") {
          $scope.withDatePick = false;
        } else {
          $scope.withoutDatePick = false;
        }
      };
      var selectedBrands = [];
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
        selectedBrands = [];
        colors = [];
        colorDetails = [];
        $log.info($scope.isHourly);
        if ($scope.withDatePick) {
          startDate = document.getElementById("startDate").value;
          endDate = document.getElementById("endDate").value;
        }

        for (var brandId in $scope.isselected) {
          if ($scope.isselected[brandId]) {
            selectedBrands.push(brandId);
          }
        }
        if (selectedBrands && selectedBrands.length > 0) {
          selectedBrands.forEach(function (brand) {
            colors.push({ backgroundColor: getRandomColor() });
          });
        }
        var url = "";
        if ($scope.top3Items) {
          if ($scope.withDatePick) {
            if (startDate == "" || endDate == "") {
              $rootScope.error = "Please select start and end date";
              return;
            }
            url =
              "http://localhost:3000/report/admin/brandReport/top3Items/dates/hourly";
          } else {
            url = "http://localhost:3000/report/admin/brandReport/top3Items";
          }
        } else {
          if ($scope.withDatePick) {
            if (startDate == "" || endDate == "") {
              $rootScope.error = "Please select start and end date";
              return;
            }
            if ($scope.isHourly) {
              url =
                "http://localhost:3000/report/admin/brandReport/dates/hourly";
            } else {
              url = "http://localhost:3000/report/admin/brandReport/dates";
            }
          } else {
            if ($scope.isHourly) {
              url = "http://localhost:3000/report/admin/brandReport/hourly";
            } else {
              url = "http://localhost:3000/report/admin/brandReport";
            }
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
                  brandIds: selectedBrands,
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
                  $scope.brandNames = [];
                  $scope.selectedSlot = 0;
                  $rootScope.isLoading = false;
                  if ($scope.top3Items) {
                    $scope.graphs = [];
                    var width = 100 / selectedBrands.length;
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
                      graph.brandName = item.brandName;
                      var h = 0;
                      var a1 = { values: [] },
                        a2 = { values: [] },
                        a3 = { values: [] };
                      item.stats.forEach(function (stat) {
                        var data = { items: [] };
                        data.brandName = item.brandName;

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
                        height: 100 / selectedBrands.length + "%",
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
                          text: item.brandName,
                          style: colors[index].backgroundColor,
                        });
                        item.hours.forEach(function (stat) {
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
                          text: "Brand Reports",
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
                          text: item.brandName,
                          values: [item.sell],
                          backgroundColor: getRandomColor(),
                        });

                        $log.info(colors);
                        $scope.brandNames.push(item.brandName);
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
                          text: "Brand Report",
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
                  $log.info($scope.brandNames);
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
  )
  .controller(
    "updateBrandUser",
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
      $scope.selectedBrands = [];
      $rootScope.user.entityDetails.forEach(function (ele) {
        for (var i = 0; i < $rootScope.brands.length; i++) {
          if ($rootScope.brands[i]._id == ele.entityId) {
            $scope.selectedBrands.push($rootScope.brands[i]);
          }
        }
      });
      
      $scope.selected = undefined;
      $scope.editPermissions = [];
      var permissions = [
        "isCreateOutlet",
        "isReadOutlet",
        "isDeleteOutlet",
        "isUpdateOutlet",
        "isCreateOutletAdmin",
        "isReadOutletAdmin",
        "isDeleteOutletAdmin",
        "isUpdateOutletAdmin",
        "isCreateDish",
        "isReadDish",
        "isDeleteDish",
        "isUpdateDish",
        "isCreateSuperCategory",
        "isCreateCategory",
        "isGenerateOutletReport",
        "isGenerateDishReport",
      ];

      permissions.forEach(function (permission) {
        $scope.editPermissions.push({
          key: permission,
          value: $rootScope.user.permissions.includes(permission),
        });
      });
      $scope.isUserEdit = false;
      $scope.cancelUpdate = function () {
        $scope.isUserEdit = false;
      };
      $scope.updateEditStatus = function () {
        $log.info("edit");
        $scope.isUserEdit = true;
      };
      $scope.toggle = {};
      $scope.toggle.switch = $rootScope.user.status;
      $scope.isdeleted = $rootScope.user.isdeleted;

      $scope.toggleUserStatus = function (status, parentSelector) {
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
      $scope.updateBrands = function (selected) {
        $scope.selectedBrands = selected;
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
      $scope.updateUser = function () {
        var fileFormData = new FormData();
        // var file = document.getElementById("adminImage").files[0];
        // if (file) {
        //   fileFormData.append("image", file);
        // }
        fileFormData.append("isdeleted", $scope.isdeleted);
        fileFormData.append("status", $scope.toggle.switch);
        fileFormData.append(
          "entityDetails",
          JSON.stringify($scope.selectedBrands)
        );
        var x = [];
        $scope.editPermissions.forEach(function (permission) {
          if (permission.value) {
            x.push(permission.key);
          }
        });
        fileFormData.append("permissions", JSON.stringify(x));
        fileFormData.append("userId", $rootScope.userId);
        $rootScope.isLoading = true;
        $http
          .patch(`http://localhost:3000/brand/updateBrandUser`, fileFormData, {
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
      $scope.remove = false;
      $scope.removeImage = function () {
        // $scope.remove = true;
        $log.info("remove image");
        $rootScope.isLoading = true;
      };
    }
  );
