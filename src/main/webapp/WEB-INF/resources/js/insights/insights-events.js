angular.module('insights.events', [
    'insights.eventtypes',
    'ui.router',
    'infinite-scroll'
])
    .config(
    [ '$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state("events", {
                    url: "/events",
                    template: "<ul class='nav nav-tabs'><li ui-sref-active='active'><a ui-sref='events.eventtype.list'>Event Types</a></li><li ui-sref-active='active'><a ui-sref='events.eventlog'>Event Log</a></li></ul><div ui-view=''></div>",
                })
                .state("events.eventlog", {
                    url: "/event-log",
                    templateUrl: "view/events-log",
                    controller: 'EventLogController'
                })
        }
    ])
    .controller('EventLogController', function($scope){
        $scope.events = [];
        $scope.busy = false;
        $scope.page = 0;

        $scope.nextPage = function() {
            if ($scope.busy) return;
            $scope.busy = true;

            var url = Insights.basePath + "api/1.0/event/list/" + this.page;
            $http.jsonp(url).success(function(data) {
                var items = data.data.children;
                for (var i = 0; i < items.length; i++) {
                    $scope.events.push(items[i].data);
                }
                $scope.page += 1;
                $scope.busy = false;
            });
        };

    })
;

