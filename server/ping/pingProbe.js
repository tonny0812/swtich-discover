var ping = require('ping');
var IPParseUtil = require('../utils/ipParse');


function probeIp(ip) {
    return ping.promise.probe(ip,  {
            timeout: 3,
        }).then(function (res) {
            return new Promise(function(resolve, reject) {                
                return resolve({ip:ip, alive:res.alive});
            });
        }).catch(function(error) {
            console.error(error);
        });
}

function probeIpRange(startIp, endIp) {
    var probeResult = [];
    var ips =  IPParseUtil.parseIpRange(startIp, endIp);
    ips.forEach(function (ip) {
        probeResult.push(probeIp(ip));
    });
    var result = [];
    return Promise.all(probeResult).then(function(hosts) {
        hosts.forEach(function(host) {
            result.push({ip: host.ip, alive: host.alive});        
        });
        return Promise.resolve(result);
    });
}

function probeIPSubnet(ip, mask) {
    var probeResult = [];
    var ips =  IPParseUtil.parseIpMaskRange(ip, mask);
    ips.forEach(function (ip) {
        probeResult.push(probeIp(ip));
    });
    var result = [];
    return Promise.all(probeResult).then(function(hosts) {
        hosts.forEach(function(host) {
            result.push({ip: host.ip, alive: host.alive});        
        });
        return Promise.resolve(result);
    });
}

var pingProbe = {
    probeIpRange: probeIpRange,
    probeIPSubnet: probeIPSubnet
}

module.exports = pingProbe;