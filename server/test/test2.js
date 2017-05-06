var snmp = require('snmp-native');

var session = new snmp.Session({ host: '127.0.0.1', port: 161, community: 'public' });

// console.log(session)



// session.get({ oid:  oid}, function (error, varbinds) {
//         console.log('-----------------------------------');
//         if (error) {
//             console.log('Fail :(');
//         } else {
//             console.log(varbinds[0].oid + ' = ' + varbinds[0].value + ' (' + varbinds[0].type + ')');
//         }
//         console.log('-----------------------------------');
//     });
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

var SNMPUtil = require('../snmp/snmpWrapper');

var snmpSession = new SNMPUtil.SNMPSession({ host: '127.0.0.1', port: 161, community: 'public' });

snmpSession.get(oid).then(SNMPUtil.printGetInfo).catch(function(error) {
        console.log(error);
});