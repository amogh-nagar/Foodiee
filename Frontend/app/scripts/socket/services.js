angular
  .module("myApp.services", [])
  .value("version", "0.1")
  .factory("socket", function ($rootScope, $log,$timeout) {
    var socket = io.connect("http://127.0.0.1:3000", {
      autoConnect: true,
    });
    
    socket.on("orders", function (data) {
      $log.info('order',data)
      if (
        $rootScope.user.entityDetails[0].entityId === data.outlet._id &&
        $rootScope.user._id == data.outlet.userId
      ) {
        var idx = $rootScope.orders.findIndex(function (order) {
          return order._id === data.order._id;
        });
        if (idx === -1) {
          $rootScope.orders.push(data.order);
        } else {
          $rootScope.orders[idx].outletStatus = "done";
        }
      }
    });
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      },
    };
  });
