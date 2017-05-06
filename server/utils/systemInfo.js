var exec = require('child_process').exec;
var os = require('os');

var OSUtil = {
    getOsType: function() {
        var osType = os.type();
        var regexWin = /^(windows|Windows|WINDOWS|win)/;
        if(regexWin.test(osType))
            return "Windows";
        else
            return osType;
    },

    getOsCoding: function() { //需要重写 TODO
        var ostype = this.getOsType();
        var code = -1;
        if(ostype.indexOf('Windows') > -1) {
            return new Promise(function(resolve, reject) {
			    exec('chcp', function(err, stdout, stderr) {
                    if(err) {
                        return reject(err);
                    } else {
                         var array = stdout.match(/\d+/g);
                         if(array.length > 0) {
                            code = array[0];
                         }
                         return resolve(code);
                    }
			    }.bind(this));
		    }.bind(this));
        } else {
            return new Promise(function(resolve, reject) {
                    return resolve(0);    
                }.bind(this));
        }
    },

    isWindows: function() {
        return this.getOsType().indexOf('Windows') > -1;
    },

    isChineseWindows: function() { //需要重写 TODO
        if(this.isWindows()) {
            this.getOsCoding().then(function(code) {
                console.log(code)
                if(code == 936) {
                    return true;
                } else {
                    return false;
                }
            })
        }
        return false;
    }
}

module.exports = OSUtil;