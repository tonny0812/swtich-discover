var encoding = require('encoding');
var jschardet = require('jschardet');
var iconv = require('iconv-lite');

var exec = require('child_process').exec
var encoding = 'cp936';
var binaryEncoding = 'binary';

// exec('ping -n 1 -i 25 127.0.0.1', { encoding: binaryEncoding }, function(err, stdout, stderr){
//     // console.log(iconv.decode(new Buffer(stdout, binaryEncoding), encoding), iconv.decode(new Buffer(stderr, binaryEncoding), encoding));
// });



// var OSUtil = require('../utils/systemInfo');

// console.log('1',OSUtil.isWindows())
// console.log('2', OSUtil.getOsCoding())
// console.log(OSUtil.isChineseWindows())

var IPParseUtil = require('../utils/ipParse')
var ping = require('ping');
var SNMPUtil = require('../snmp/snmpWrapper');

var hosts = IPParseUtil.parseIpRange('127.0.0.1', '127.0.0.1');

var result = [];

function getHostInfo(host) {
    return ping.promise.probe(host,  {
            timeout: 3,
        }).then(function (res) {
            return new Promise(function(resolve, reject) {                
                return resolve({ip:host, alive:res.alive});
            });
        });
}
hosts.forEach(function (host) {
    result.push(getHostInfo(host));
});

var oid = '.1.3.6.1.2.1.1.5.0';


Promise.all(result).then(function(hosts) {
    var aliveHost = [];
    hosts.forEach(function(host) {
        if(host.alive) {
            console.log(host.ip)
            aliveHost.push(host.ip)
        }
    });
    var sessionArray = [];
    var hostSysDescArray = [];
    aliveHost.forEach(function(ip) {
        var snmpSession = new SNMPUtil.SNMPSession({ host: ip, port: 161, community: 'public' });
        sessionArray.push(snmpSession);
        hostSysDescArray.push(snmpSession.get(oid));
    });
    Promise.all(hostSysDescArray).then(function(hostSysDescs) {
        sessionArray.forEach(function(session) {
            session.session.close();
        });
        hostSysDescs.forEach(function(info) {
            console.log(info)
        });
    });
});

