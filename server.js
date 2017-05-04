var snmp = require('snmp-native');


// Create a Session with explicit default host, port, and community.
var sessioncisco = new snmp.Session({ host: '10.224.2.48', port: 161, community: 'sdmt2010' });
var sessionh3c = new snmp.Session({ host: '10.224.1.254', port: 161, community: 'sdmt2010' });
var sessionhuawei = new snmp.Session({ host: '10.224.1.253', port: 161, community: 'sdmt2010' });

var SysDesc = '.1.3.6.1.2.1.1.1.0';
var sysUptime = '.1.3.6.1.2.1.1.3.0';
var SysName = '.1.3.6.1.2.1.1.5.0';
var IfNumber = '.1.3.6.1.2.1.2.1.0'
var IfDescr = '.1.3.6.1.2.1.2.2.1.2';
var IfPhysAddress = '.1.3.6.1.2.1.2.2.1.6';
var IfOperStatus = '.1.3.6.1.2.1.2.2.1.8';
 
var tmp = '.1.3.6.1.2.1.1.6';



var oid = tmp;
var type = 'walk';

switch(type) {
    case 'get':
        getSwitchDeviceInfo(oid);
        break;
    case 'walk':
        walkSwitchDeviceInfo(oid);
        break;
}

function walkSwitchDeviceInfo(oid) {
    sessioncisco.getSubtree({ oid:  oid}, function (error, varbinds) {
        console.log('cisco');
        if (error) {
            console.log('Fail :(');
        } else {
            varbinds.forEach(function (vb) {
                console.log(vb.oid + ' = ' + vb.value + ' (' + vb.type + ')');
            });
        }
        console.log('-----------------------------------');
        sessioncisco.close();
    });

    sessionh3c.getSubtree({ oid: oid }, function (error, varbinds) {
        console.log('H3C');
        if (error) {
            console.log('Fail :(');
        } else {
             varbinds.forEach(function (vb) {
                console.log(vb.oid + ' = ' + vb.value + ' (' + vb.type + ')');
            });
        }
        console.log('-----------------------------------');
        sessionh3c.close();
    });

    sessionhuawei.getSubtree({ oid: oid }, function (error, varbinds) {
        console.log('HW');
        if (error) {
            console.log('Fail :(');
        } else {
             varbinds.forEach(function (vb) {
                console.log(vb.oid + ' = ' + vb.value + ' (' + vb.type + ')');
             });
        }
        console.log('-----------------------------------');
        sessionhuawei.close();
    });

   
}


function getSwitchDeviceInfo(oid) {
    sessioncisco.get({ oid:  oid}, function (error, varbinds) {
        console.log('cisco');
        if (error) {
            console.log('Fail :(');
        } else {
            console.log(varbinds[0].oid + ' = ' + varbinds[0].value + ' (' + varbinds[0].type + ')');
        }
        console.log('-----------------------------------');
        sessioncisco.close();
    });

    sessionh3c.get({ oid: oid }, function (error, varbinds) {
        console.log('H3C');
        if (error) {
            console.log('Fail :(');
        } else {
            console.log(varbinds[0].oid + ' = ' + varbinds[0].value + ' (' + varbinds[0].type + ')');
        }
        console.log('-----------------------------------');
        sessionh3c.close();
    });

    sessionhuawei.get({ oid: oid }, function (error, varbinds) {
        console.log('HW');
        if (error) {
            console.log('Fail :(');
        } else {
            console.log(varbinds[0].oid + ' = ' + varbinds[0].value + ' (' + varbinds[0].type + ')');
        }
        console.log('-----------------------------------');
        sessionhuawei.close();
    });
}


