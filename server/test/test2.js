var snmp = require('snmp-native');

var session = new snmp.Session({ host: '10.4.41.165', port: 161, community: 'public' });

// console.log(session)

var oid = '.1.3.6.1.2.1.1.1.0';

session.get({ oid:  oid}, function (error, varbinds) {
        console.log('-----------------------------------');
        if (error) {
            console.log('Fail :(' + error);
        } else {
            console.log(varbinds[0].oid + ' = ' + varbinds[0].value + ' (' + varbinds[0].type + ')');
        }
        console.log('-----------------------------------');
    });
// session.getSubtree({ oid:  oid}, function (error, varbinds) {
//         if (error) {
//             console.log('Fail :(');
//         } else {
//             varbinds.forEach(function (vb) {
//                 console.log(vb.oid + ' = ' + vb.value + ' (' + vb.type + ')');
//             });
//         }
//         console.log('-----------------------------------');
//         session.close();
//     });

// var SNMPUtil = require('../snmp/snmpWrapper');

// var snmpSession = new SNMPUtil.SNMPSession({ host: '10.4.41.165', port: 161, community: 'Public' });
// 


// snmpSession.get(oid).then(SNMPUtil.printGetInfo).catch(function(error) {
//         console.log(error);
// });