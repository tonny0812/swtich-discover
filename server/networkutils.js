var PingParser = require('./ping/pingParser');
var PingWrapper = require('./ping/pingWrapper');

var NetworkUtils = {
	PingParser: PingParser,
	PingWrapper: PingWrapper
}

NetworkUtils.PingWrapper.execute('127.0.0.1')
    .then(NetworkUtils.PingParser.parse)
    .then(function(res) {
        console.log(res);
    }).catch(function(error) {
        console.log(error);
    });


module.exports = NetworkUtils;