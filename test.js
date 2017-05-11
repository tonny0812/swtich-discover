var pingProbe = require('./server/ping/pingProbe');
var SNMPUtil = require('./server/snmp/snmpWrapper');
var date = new Date();

var oid = '.1.3.6.1.2.1.1.5.0';
var SysDesc = '.1.3.6.1.2.1.1.1.0';

function probeDeviceType(hosts) {
    return new Promise(function(resolve, reject) {
        var endDate = new Date();

        console.log('ping 探测时间：', (endDate - date) / 1000 + 's', hosts.length);

        var aliveHost = [];
        hosts.forEach(function(host) {
            if(host.alive) {
                aliveHost.push(host.ip)
            }
        });
        var sessionArray = [];
        var hostSysDescArray = [];
        var snmpStartDate = new Date();
        aliveHost.forEach(function(ip) {
            var snmpSession = new SNMPUtil.SNMPSession({ host: ip, port: 161, community: 'neusoftdafa' });
            sessionArray.push(snmpSession);
            hostSysDescArray.push(snmpSession.get(SysDesc));
        });
        Promise.all(hostSysDescArray).then(function(hostSysDescs) {
            var snmpEndDate = new Date();
            console.log('SNMP 探测时间：', (snmpEndDate - snmpStartDate) / 1000 + 's', hostSysDescs.length);

            sessionArray.forEach(function(session) {
                session.session.close();
            });
            
            resolve(hostSysDescs);
        });
    });
}
	
pingProbe.probeIpRange('192.168.109.1', '192.168.109.255').then(probeDeviceType).then(function(hosts) {
    var count  = 0;
    hosts.forEach(function(varbinds) {
        if(varbinds.length > 0 ) {
            console.log(varbinds[0].oid + ' = ' + varbinds[0].value + ' (' + varbinds[0].type + ')');
            count ++;
        }
    });
    console.log(count);
});
