var exec = require('child_process').exec;
var os = require('os');
var getOsType = function() {
	var osType = os.type();
	var regexWin = /^(windows|Windows|WINDOWS|win)/;
	if(regexWin.test(osType))
		return "Windows";
	else
		return osType;
};
var Ping = {
	command: function(options) {
		var osFunctions = {
			Windows: "ping -n 1 -i :ttl :domainName",
			Linux: "ping -c 1 -m :ttl :domainName",
			Darwin: "ping -c 1 -m :ttl :domainName"
		};
		var osType = getOsType();
		console.log(osType);
		var osCommand = osFunctions[osType];
		var simbols = osCommand.match(/\:([^ ]+)/g)
		simbols.forEach(function(simbol) {
			var dataSimbol = simbol.substring(1); //Removes the ':' of the simbol
        	osCommand = osCommand.replace(simbol, options[dataSimbol]);
		}.bind(this));
		return osCommand;
	},

	execute: function(domainName, options) {
		options = options || {}
		options = {
			ttl: (options.ttl || 25),
			domainName: domainName
		}
		var command = this.command(options);
		return new Promise(function(resolve, reject) {
			exec(command, function(err, stdout, stderr) {
				if(err) {
					return reject(err);
				} else {
					return resolve(stdout);
				}
			}.bind(this));
		}.bind(this));
	}

};

module.exports = Ping;