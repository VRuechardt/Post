/**
 * Created by Valentin on 14/06/2016.
 */

module.exports = [function() {

    var loading = 0;
    var callbacks = [];

    return {

        load: function() {
            loading++;
            callbacks.forEach(function(cb) {
                cb(loading > 0);
            });
        },
        finish: function() {
            loading--;
            callbacks.forEach(function(cb) {
                cb(loading > 0);
            });
        },
        listen: function(cb) {
            callbacks.push(cb);
        },
        loading: function() {
            return loading > 0;
        }

    }

}];