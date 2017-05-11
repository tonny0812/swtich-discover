var snmp = require('snmp-native');

function SNMPSession(option) {
    this.session = new snmp.Session(option);
}

SNMPSession.prototype.get = function(oid) {
    return new Promise(function(resolve, reject) {
            this.session.get({oid: oid}, function(error, varbinds) {
                if(error) {
                    // return reject(error);
                     return resolve([]);
                } else {
                    return resolve(varbinds);
                }
            }.bind(this));
        }.bind(this));
}

SNMPSession.prototype.close = function() {
    return new Promise(function(resolve, reject) {
                this.session.close();
                return resolve('closeed');
            }.bind(this));
};

function printGetInfo(varbinds) {
    if(varbinds) {
        varbinds.forEach(function (vb) {
            console.log(vb.oid + ' = ' + vb.value + ' (' + vb.type + ')');
        });
        return new Promise(function(resolve, reject) {
            return resolve('done');
        }.bind(this));
    } else {
         return new Promise(function(resolve, reject) {
            return reject('error');
        }.bind(this));
    }
}

var SNMPUtil = {
    SNMPSession: SNMPSession,
    printGetInfo: printGetInfo
}

module.exports = SNMPUtil;