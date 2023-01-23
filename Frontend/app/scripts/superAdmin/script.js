angular
  .module("foodOrdering")
  .config(function ($stateProvider) {
    $stateProvider
      .state("superAdminProfile", {
        url: "/superAdminProfile",
        templateUrl: "views/superAdmin/profile.html",
        controller: "superAdminProfileController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isReadBrand"]);
          },
          brands: function (superAdminServices) {
            return superAdminServices.getSuperAdminBrands(0);
          },
        },
      })
      .state("admins", {
        url: "/admins",
        templateUrl: "views/superAdmin/admins.html",
        controller: "superAdminsBrandAdminController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isReadBrandAdmin"]);
          },
          getAdmins: function (superAdminServices) {
            return superAdminServices.getAdmins(0);
          },
        },
      })
      .state("admin", {
        url: "/admin",
        templateUrl: "views/superAdmin/updateAdmin.html",
        controller: "superAdminsBrandUpdateAdminController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isReadBrandAdmin"]);
          },
          getAdmin: function (superAdminServices) {
            return superAdminServices.getAdmin();
          },
        },
      })
      .state("createBrand", {
        url: "/createBrand",
        templateUrl: "views/superAdmin/createBrand.html",
        controller: "createBrand",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isCreateBrand"]);
          },
          getAdmins: function (superAdminServices) {
            return superAdminServices.getAllAdmins(0);
          },
        },
      })
      .state("createBrandAdmin", {
        url: "/createBrandAdmin",
        templateUrl: "views/superAdmin/createAdmin.html",
        controller: "createBrandAdmin",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isCreateBrandAdmin"]);
          },
        },
      })
      .state("superAdminReport", {
        url: "/superAdminReport",
        templateUrl: "views/superAdmin/report.html",
        controller: "superAdminReport",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkRole: function (checkRole) {
            return checkRole.check("superAdmin");
          },

          brands: function (superAdminServices) {
            return superAdminServices.getSuperAdminBrands(0);
          },
        },
      })
      .state("updateBrand", {
        url: "/updateBrand",
        templateUrl: "views/superAdmin/updateBrand.html",
        controller: "updateBrandController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isUpdateBrand"]);
          },
          brand: function (superAdminServices) {
            return superAdminServices.getBrand();
          },
        },
      });
  })
  .controller(
    "superAdminProfileController",
    function (
      $scope,
      $rootScope,
      $httpParamSerializerJQLike,
      $http,
      $log,
      reactService,
      $location,
      superAdminServices
    ) {
      var newDebounce = new reactService.Debounce();

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
        superAdminServices.getSuperAdminBrands(page).then(function (resp) {});
      }
      $scope.createBrand = function () {
        $log.info("create brand");
        $location.path("/createBrand");
      };
      $scope.options = ["active", "inactive", "Deleted"];
      $scope.goToBrand = function (brandId, brandName) {
        $rootScope.brandId = brandId;
        $rootScope.brandName = brandName;
        $location.path("/admins");
      };
    }
  )
  .controller(
    "superAdminsBrandAdminController",
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

      $scope.createAdmin = function () {
        $location.path("/createAdmin");
      };
      $scope.options = ["active", "inactive", "Deleted"];
      $scope.goToAdmin = function (adminId) {
        $rootScope.adminId = adminId;
        $location.path("/admin");
      };
      $scope.createBrandAdmin = function () {
        $location.path("/createBrandAdmin");
      };
    }
  )
  .controller(
    "superAdminsBrandUpdateAdminController",
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
      $scope.selectedBrands = [];
      $rootScope.admin.entityDetails.forEach(function (ele) {
        for (var i = 0; i < $rootScope.brands.length; i++) {
          if ($rootScope.brands[i]._id == ele.entityId) {
            $scope.selectedBrands.push($rootScope.brands[i]);
          }
        }
      });
      $scope.selected = undefined;
      $scope.editPermissions = [];
      var permissions = [
        "isCreateBrandUser",
        "isReadBrandUser",
        "isDeleteBrandUser",
        "isUpdateBrandUser",
        "isGenerateBrandReport",
        "isReadDish",
        "isUpdateDish",
        "isDeleteDish",
        "isCreateDish",
        "isReadOutlet",
        "isUpdateOutlet",
        "isDeleteOutlet",
        "isCreateOutlet",
        "isGenerateDishReport",
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
          JSON.stringify($scope.selectedBrands)
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
          .patch(`http://localhost:3000/superAdmin/updateAdmin`, fileFormData, {
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
              $location.path("/superAdminProfile");
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
    "createBrandAdmin",
    function (
      $scope,
      $rootScope,
      $log,
      $http,
      $httpParamSerializerJQLike,
      $rootScope,
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
        isCreateBrandUser: false,
        isReadBrandUser: false,
        isDeleteBrandUser: false,
        isUpdateBrandUser: false,
        isGenerateBrandReport: false,
        isReadDish: false,
        isUpdateDish: false,
        isDeleteDish: false,
        isCreateDish: false,
        isReadOutlet: false,
        isUpdateOutlet: false,
        isDeleteOutlet: false,
        isCreateOutlet: false,
        isGenerateDishReport: false,
        isGenerateOutletReport: false,
      };
      $scope.selectAll = function () {
        for (var key in $scope.adminPermissions) {
          $scope.adminPermissions[key] = true;
        }
      };
      $scope.createBrandAdmin = function () {
        $rootScope.isLoading = true;
        var fileFormData = new FormData();
        fileFormData.append("image", $scope.adminImage);
        fileFormData.append("name", $scope.admin.name);
        fileFormData.append("email", $scope.admin.email);
        fileFormData.append("password", $scope.admin.password);
        fileFormData.append("isdeleted", $scope.isdeleted);
        fileFormData.append("status", $scope.status);
        fileFormData.append("entityId", $rootScope.brandId);
        fileFormData.append("entityName", "Brand");
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
                `http://localhost:3000/superAdmin/createAdmin`,
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
                  $location.path("/superAdminProfile");
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
    "createBrand",
    function (
      $scope,
      $rootScope,
      $log,
      $http,
      $httpParamSerializerJQLike,
      $rootScope,
      reactService,
      $location
    ) {
      var newDebounce = new reactService.Debounce();
      $scope.selectedAdmins = [];

      $scope.updateAdmins = function (selected) {
        $scope.selectedAdmins = selected;
        $log.info(selected);
      };
      $scope.image = null;
      $scope.imageFileName = "";

      $scope.uploadme = {};
      $scope.uploadme.src = "";

      $scope.status = "active";
      $scope.updateBrandStatus = function (status) {
        $log.info($scope.status);
        $scope.status = status;
      };
      $scope.isdeleted = false;
      $scope.toggleDelete = function () {
        $scope.isdeleted = !$scope.isdeleted;
      };
      $scope.createBrand = function () {
        // $rootScope.isLoading = true;
        var fileFormData = new FormData();
        fileFormData.append("image", $scope.brandImage);
        fileFormData.append("name", $scope.brand.name);
        fileFormData.append("isdeleted", $scope.isdeleted);
        fileFormData.append("status", $scope.status);
        fileFormData.append("description", $scope.brand.description);

        fileFormData.append("admins", JSON.stringify($scope.selectedAdmins));
        // newDebounce.Invoke(
        //   function () {
        $http
          .post(`http://localhost:3000/superAdmin/createBrand`, fileFormData, {
            transformRequest: angular.identity,
            headers: {
              "Content-Type": undefined,
              Authorization: localStorage.getItem("token"),
            },
          })
          .then(
            function (response) {
              $rootScope.isLoading = false;
              $location.path("/superAdminProfile");
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
        //   },
        //   0,
        //   false
        // );
      };
    }
  )
  .controller(
    "superAdminReport",
    function (
      $scope,
      $rootScope,
      $log,
      $httpParamSerializerJQLike,
      $http,
      $location,
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
        superAdminServices.getSuperAdminBrands(page).then(function (resp) {});
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
              "http://localhost:3000/report/superAdmin/brandReport/top3Items/dates/hourly";
          } else {
            url =
              "http://localhost:3000/report/superAdmin/brandReport/top3Items";
          }
        } else {
          if ($scope.withDatePick) {
            if (startDate == "" || endDate == "") {
              $rootScope.error = "Please select start and end date";
              return;
            }
            if ($scope.isHourly) {
              url =
                "http://localhost:3000/report/superAdmin/brandReport/dates/hourly";
            } else {
              url = "http://localhost:3000/report/superAdmin/brandReport/dates";
            }
          } else {
            if ($scope.isHourly) {
              url =
                "http://localhost:3000/report/superAdmin/brandReport/hourly";
            } else {
              url = "http://localhost:3000/report/superAdmin/brandReport";
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
    "updateBrandController",
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
        $log.info(brandId);
        var fileFormData = new FormData();
        var file = document.getElementById("brandImage");
        if (file) {
          file = file.files[0];
          fileFormData.append("image", file);
        }
        fileFormData.append("isdeleted", $scope.isdeleted);
        fileFormData.append("status", $scope.toggle.switch);
        fileFormData.append("name", $scope.brand.name);
        fileFormData.append("description", $scope.brand.description);
        $rootScope.isLoading = true;
        $http
          .patch(
            `http://localhost:3000/superAdmin/updateBrand?brandId=${brandId}`,
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
              $location.path("/superAdminProfile");
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
  );
