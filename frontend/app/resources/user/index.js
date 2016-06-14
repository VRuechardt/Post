/**
 * Created by Valentin on 14/06/2016.
 */

module.exports = ['$resource', function($resource) {

    return $resource('/api/users/:userId',
        {
            userId: '@id'
        },
        {
            register: {
                method: 'POST'
            }
        });

}];