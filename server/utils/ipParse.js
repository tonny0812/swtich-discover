
/*
 * 根据掩码位获取掩码
 *
 */

function getMaskByMaskBit(masks) {
  var ret = '';
  if (masks == 1)
			ret = "128.0.0.0";
		else if (masks == 2)
			ret = "192.0.0.0";
		else if (masks == 3)
			ret = "224.0.0.0";
		else if (masks == 4)
			ret = "240.0.0.0";
		else if (masks == 5)
			ret = "248.0.0.0";
		else if (masks == 6)
			ret = "252.0.0.0";
		else if (masks == 7)
			ret = "254.0.0.0";
		else if (masks == 8)
			ret = "255.0.0.0";
		else if (masks == 9)
			ret = "255.128.0.0";
		else if (masks == 10)
			ret = "255.192.0.0";
		else if (masks == 11)
			ret = "255.224.0.0";
		else if (masks == 12)
			ret = "255.240.0.0";
		else if (masks == 13)
			ret = "255.248.0.0";
		else if (masks == 14)
			ret = "255.252.0.0";
		else if (masks == 15)
			ret = "255.254.0.0";
		else if (masks == 16)
			ret = "255.255.0.0";
		else if (masks == 17)
			ret = "255.255.128.0";
		else if (masks == 18)
			ret = "255.255.192.0";
		else if (masks == 19)
			ret = "255.255.224.0";
		else if (masks == 20)
			ret = "255.255.240.0";
		else if (masks == 21)
			ret = "255.255.248.0";
		else if (masks == 22)
			ret = "255.255.252.0";
		else if (masks == 23)
			ret = "255.255.254.0";
		else if (masks == 24)
			ret = "255.255.255.0";
		else if (masks == 25)
			ret = "255.255.255.128";
		else if (masks == 26)
			ret = "255.255.255.192";
		else if (masks == 27)
			ret = "255.255.255.224";
		else if (masks == 28)
			ret = "255.255.255.240";
		else if (masks == 29)
			ret = "255.255.255.248";
		else if (masks == 30)
			ret = "255.255.255.252";
		else if (masks == 31)
			ret = "255.255.255.254";
		else if (masks == 32)
			ret = "255.255.255.255";
		return ret;
}

/*
 * 根据子网掩码转换为掩码位 如 255.255.255.252转换为掩码位 为 30
 */
function getNetMask(netmarks) {
  var inetmask = 0, count = 0, str;
  var ipList = netmarks.split('.');
  for(var n=0; n<ipList.length; n++) {
    console.log(ipList[n])
    str = getBit(parseInt(ipList[n]));
    count = 0;
    for(var i=0; i<str.length; i++) {
      i = str.indexOf('1', i);
      if(i == -1)
        break;
      count++;
    }
    inetmask += count;
  }
  return inetmask;
}

/*
 * 将十进制数字转换成二进制串
 */
function getBit(num) {
	if(null == num || typeof(num) == 'undefined')
		return '0';
  return num.toString(2)
}

/*
 * 把xx.xx.xx.xx类型的转为数字
 */
function getIpFromString(ip) {
	var ipNum = 0;
	var ipTemp = ip;
	ipNum = ipNum * 256 + parseInt(ipTemp.substr(0,ipTemp.indexOf('.')));
	ipTemp = ipTemp.substr(ipTemp.indexOf(".") + 1, ipTemp.length);
	ipNum = ipNum * 256 + parseInt(ipTemp.substr(0,ipTemp.indexOf('.')));
	ipTemp = ipTemp.substr(ipTemp.indexOf(".") + 1, ipTemp.length);
	ipNum = ipNum * 256 + parseInt(ipTemp.substr(0,ipTemp.indexOf('.')));
	ipTemp = ipTemp.substr(ipTemp.indexOf(".") + 1, ipTemp.length);
	ipNum = ipNum * 256 + parseInt(ipTemp);
	return ipNum;
}

/*
 * 把数字类型的Ip转为一般Ip类型：xx.xx.xx.xx
 */

function getIpFromNum(ip){
	var n1 = ((ip & 4278190080) / 16777216);
	if(n1 < 0) {
		n1 += 256;
	}
	var n2 = ((ip & 16711680) / 65536);
	if(n2< 0) {
		n2+= 256;
	}
	var n3 = ((ip & 65280) / 256);
	if(n3< 0) {
		n3+= 256;
	}
	var n4 = (ip & 255);
	if(n4< 0) {
		n4+= 256;
	}
	return n1+ "." + n2 + "." + n3 +　"." + n4;
}

/*
 * 根据 ip/掩码位 计算IP段的起始IP 如 IP串 218.240.38.69/30
 */
function getBeginIpNum(ip, maskBit) {
	return getIpFromString(ip) & getIpFromString(getMaskByMaskBit(maskBit));
}

/*
 * 根据 ip/掩码位 计算IP段的终止IP 如 IP串 218.240.38.69/30
 */
function getEndIpNum(ip, maskBit) {
	return getIpFromString(ip) + ~getIpFromString(getMaskByMaskBit(maskBit));
}

/*
 * 根据 ip/掩码位 计算IP段的起始IP 如 IP串 218.240.38.69/30
 */
function getBeginIpStr(ip, maskBit) {
	 return getIpFromNum(getBeginIpNum(ip, maskBit));
}

/*
 * 根据 ip/掩码位 计算IP段的起始终止IP 如 IP串 218.240.38.69/30
 */
function getEndIpStr(ip, maskBit) {
	 return getIpFromNum(getEndIpNum(ip, maskBit));
}


/*
 * 返回网段内的所有ip地址
 */

function parseIpRange(ipfrom, ipto) {
	var ips = [];
	var ipfromd = ipfrom.split('.');
	var iptod = ipto.split('.');
	var int_ipf = [];
	var int_ipt = [];
	for(var i=0; i<4; i++) {
    int_ipf[i] = parseInt(ipfromd[i]);
		int_ipt[i] = parseInt(iptod[i]);
	}
	for (var A = int_ipf[0]; A <= int_ipt[0]; A++) {
			for (var B = (A == int_ipf[0] ? int_ipf[1] : 0); B <= (A == int_ipt[0] ? int_ipt[1]
					: 255); B++) {
				for (var C = (B == int_ipf[1] ? int_ipf[2] : 0); C <= (B == int_ipt[1] ? int_ipt[2]
						: 255); C++) {
					for (var D = (C == int_ipf[2] ? int_ipf[3] : 0); D <= (C == int_ipt[2] ? int_ipt[3]
							: 255); D++) {
						ips.push(String(A + "." + B + "." + C + "." + D));
					}
				}
			}
		}
		return ips;
}

/*
 * 根据掩码获取子网大小
 */
function getPoolMax(maskBit) {
	if (maskBit <= 0 || maskBit >= 32) {
			return 0;
		}
		return parseInt(Math.pow(2, 32 - maskBit) - 2);
}

/*
 * 根据网段获取网络大小
 */
function getPoolMax(ipfrom, ipto) {
	var ipfromNum = getIpFromString(ipfrom);
	var iptoNum = getIpFromString(ipto);
	return iptoNum - ipfromNum + 1;
}


/*
 *使用
 */

function parseIpMaskRange(ip, mask) {
	var list = [];
	if('32' === mask) {
		list.push(ip);
	} else {
		var startIp = getBeginIpStr(ip, mask);
		var endIp = getEndIpStr(ip, mask);
		if('31' !== mask) {
			var startIpd = startIp.split('.');
			var endIpd = endIp.split('.');
			var subStart = startIpd[0] + '.' + startIpd[1] + '.' + startIpd[2] + '.';
			var subEnd = endIpd[0] + '.' + endIpd[1] + '.' + endIpd[2] + '.';
			startIp = subStart +  (parseInt(startIpd[3]) + 1);
			endIp = subEnd + (parseInt(endIpd[3]) - 1);
		}
		console.log(startIp + '--' + endIp)
		list = parseIpRange(startIp, endIp);
	}
	return list;
}


var IPPareseUtil = {
    parseIpMaskRange: parseIpMaskRange,
    parseIpRange: parseIpRange
}

module.exports = IPPareseUtil;