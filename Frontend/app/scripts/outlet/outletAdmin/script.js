angular
  .module("foodOrdering")
  .config(function ($stateProvider) {
    $stateProvider
      .state("outletUsers", {
        url: "/outletUsers",
        templateUrl: "views/outlet/outletAdmin/users.html",
        controller: "outletUsersOfRole",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isReadOutletUser"]);
          },
          users: function (outletAdminServices) {
            return outletAdminServices.getOutletAdminRoleUsers(0);
          },
        },
      })
      .state("outletAdminReport", {
        url: "/outletAdminReport",
        templateUrl: "views/brand/brandUser/outletReport.html",
        controller: "outletAdminReport",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isGenerateOutletReport"]);
          },
          outlets: function (outletAdminServices) {
            return outletAdminServices.getOutletAdminOutlets(0);
          },
        },
      })
      .state("createOutletUser", {
        url: "/createOutletUser",
        templateUrl: "views/outlet/outletAdmin/createUser.html",
        controller: "createOutletUser",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isCreateOutletUser"]);
          },
        },
      })
      .state("outletAdminProfile", {
        url: "/outletAdminProfile",
        templateUrl: "views/outlet/outletAdmin/profile.html",
        controller: "outletAdminProfile",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkRole: function (checkRole) {
            return checkRole.check("OutletAdmin");
          },
          outlets: function (outletAdminServices) {
            return outletAdminServices.getOutletAdminOutlets(0);
          },
        },
      })
      .state("outletRoles", {
        url: "/outletRoles",
        templateUrl: "views/outlet/outletAdmin/rolesOfOutlet.html",
        controller: "rolesOfOutlet",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkRole: function (checkRole) {
            return checkRole.check("OutletAdmin");
          },
          roles: function (outletAdminServices) {
            return outletAdminServices.getOutletAdminRoles(0);
          },
        },
      })
      .state("outletUser", {
        url: "/outletUser",
        templateUrl: "views/outlet/outletAdmin/updateOutletUser.html",
        controller: "updateOutletUser",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkPermission) {
            return checkPermission.check(["isReadOutletUser"]);
          },
          user: function (outletAdminServices) {
            return outletAdminServices.getOutletUser(0);
          },
        },
      })
      .state("updateOutletAdminOutlet", {
        url: "/updateOutletAdminOutlet",
        templateUrl: "views/outlet/outletAdmin/updateOutlet.html",
        controller: "updateOutletAdminOutletAController",
        resolve: {
          checkAuth: function (isSignIn) {
            return isSignIn.checkAuthentication();
          },
          checkPermission: function (checkRole) {
            return checkRole.check("OutletAdmin");
          },
          outlet: function (outletAdminServices) {
            return outletAdminServices.getOutlet();
          },
        },
      });
  })
  .controller(
    "updateOutletAdminOutletAController",
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
            `http://localhost:3000/outlet/updateOutlet?outletId=${outletId}`,
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
    "outletAdminReport",
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
        outletAdminServices
          .getOutletAdminOutlets(page)
          .then(function (resp) {});
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
  )
  .controller(
    "rolesOfOutlet",
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

      $scope.createOutletUser = function () {
        $location.path("/createOutletUser");
      };
      $scope.$watch("currentPage", function (newVal, oldVal) {
        setPagingData($scope.currentPage);
      });

      $scope.options = ["active", "inactive", "Deleted"];
      $scope.goToRole = function (roleId) {
        $rootScope.roleId = roleId;
        $location.path("/outletUsers");
      };
    }
  )
  .controller(
    "outletUsersOfRole",
    function (
      $scope,
      $rootScope,
      $httpParamSerializerJQLike,
      $http,
      $log,
      outletAdminServices,
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
        outletAdminServices
          .getOutletAdminRoleUser(page)
          .then(function (res) {})
          .catch(function (err) {});
      }
      $scope.createOutletUser = function () {
        $location.path("/createOutletUser");
      };
      $scope.options = ["active", "inactive", "Deleted"];
      $scope.goToUser = function (userId) {
        $rootScope.userId = userId;
        $location.path("/outletUser");
      };
    }
  )
  .controller(
    "createOutletUser",
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
        isCreateOrder: false,
        isReadOrder: false,
        isDeleteOrder: false,
        isUpdateOrder: false,
        isReadOutletDishes: false,
      };
      var roleName = "OutletOrderManager";
      $scope.createOrderManager = function () {
        for (var key in $scope.userPermissions) {
          if (key.indexOf("Order") != -1) {
            $scope.userPermissions[key] = true;
          } else {
            $scope.userPermissions[key] = false;
          }
        }
      };

      $scope.createOutletUser = function () {
        $rootScope.isLoading = true;
        var fileFormData = new FormData();
        fileFormData.append("image", $scope.userImage);
        fileFormData.append("name", $scope.user.name);
        fileFormData.append("email", $scope.user.email);
        fileFormData.append("password", $scope.user.password);
        fileFormData.append("isdeleted", $scope.isdeleted);
        fileFormData.append("status", $scope.status);
        fileFormData.append("entityId", $rootScope.outletId);
        fileFormData.append("entityName", $rootScope.outletName);
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
                `http://localhost:3000/outlet/createOutletUser`,
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
                  $location.path("/outletAdminProfile");
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
    "outletAdminProfile",
    function (
      $scope,
      $rootScope,
      $httpParamSerializerJQLike,
      $http,
      $log,
      reactService,
      $location,
      outletAdminServices
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
        outletAdminServices
          .getOutletAdminOutlets(page)
          .then(function (response) {})
          .catch(function (err) {});
      }
      $scope.createOutlet = function () {
        $log.info("create Outlet");
        $location.path("/createOutlet");
      };
      $scope.options = ["active", "inactive", "Deleted"];
      $scope.goToOutlet = function (outletId, outletName) {
        $rootScope.outletId = outletId;
        $rootScope.outletName = outletName;
        $location.path("/outletRoles");
      };
    }
  );
