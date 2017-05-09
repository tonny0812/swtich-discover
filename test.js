var pingProbe = require('./server/ping/pingProbe');
var date = new Date();

// pingProbe.probeIpRange('10.4.45.1', '10.4.46.255').then(function(result) {
//     var endDate = new Date();

//     console.log((endDate - date) / 1000 + 's', result.length);
// });

pingProbe.probeIPSubnet('10.4.45.0', '22').then(function(result) {
    var endDate = new Date();

    console.log((endDate - date) / 1000 + 's', result.length);
})