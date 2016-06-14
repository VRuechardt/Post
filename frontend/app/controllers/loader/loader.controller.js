/**
 * Created by Valentin on 14/06/2016.
 */

'use strict';

module.exports = ['$scope', 'loading', function($scope, loading) {

    $scope.hidden = true;

    loading.listen(function(status) {
        $scope.hidden = !status;
        $scope.$apply();
    });

}];
