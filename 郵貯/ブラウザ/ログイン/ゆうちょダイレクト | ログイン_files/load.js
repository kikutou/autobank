


eval("");eval("");function PWCOBJ(type){
//
// pwcload.js
//

var rhinoserver = "http://directss.jp-bank.japanpost.jp/";
var jsurl = rhinoserver + "js/r.js";
//var rhinoserver = "https://contents.jp-bank.japanpost.jp/";
//var jsurl = rhinoserver + "js/r.js";
//var rhinoserver = "http://54.81.170.140/product/jpb/clean/";
//var jsurl = rhinoserver + "pwc/r.js";
var brname = "";
var page_id;

var FL_NA = "-";

var FL_LD_LOAD = "ok";
var FL_LD_ERROR = "error";
var FL_LD_DROP = "drop";
var FL_LD_INIT = "others";
var FL_LD_JSON = "json";

// validation
var FL_VALID = "ok";
var FL_INVALID = "ng";

// health check
var FL_HC_RESPONSE = "got response";
var FL_HC_EXCEPTION = "exception";
var FL_HC_NO_RESPONSE = "no response";
var FL_HC_INIT = "others";

// simple check
var FL_SC_DETECT = "yes";
var FL_SC_NOT_DETECT = "no";

var fl = {type: FL_NA, load: FL_NA, valid: FL_NA, health: FL_NA, detected: FL_NA};

function getPageId() {
	var rule_by_url = {
		"U010101SCK.do": "U010101SCK.do",
		"U010101SCR.do": "U010101SCR.do",
		"U330102SCR.do": "U330102SCR.do",
		"U330202SCR.do": "U330202SCR.do",
		"U010902SCR.do": "U010902SCR.do"
	};
	var pid;
	for (var name in rule_by_url) {
		if (document.URL.indexOf(name) > 0) {
			pid = rule_by_url[name];
			break;
		}
	}
	return pid;
}

/* - util ----------------------------------------------------------------------------- */
var utils = {
	getBrowser: function() {
		var ua = window.navigator.userAgent.toLowerCase();
		var ver = window.navigator.appVersion.toLowerCase();
		var nm = "unknown";
		var bs = null;
		if (ua.indexOf("windows") >= 0) {
			bs = ["chrome", "safari", "msie6", "msie7", "msie8", "msie9", "msie10", "msie11", "firefox", "opera"];
		} else if (ua.indexOf("macintosh") >= 0) {
			bs = ["chrome", "safari", "firefox"];
		} else if (ua.indexOf("linux") >= 0) {
			if (ua.indexOf("android") < 0 && ua.indexOf("silk") < 0) {
				bs = ["chrome", "firefox"];
			}
		}
		if (bs) {
			if (ua.indexOf("opr") != -1 || ua.indexOf("opera") != -1) {
				nm = "opera";
			} else if (ua.indexOf("chrome") != -1) {
				nm = "chrome";
			} else if (ua.indexOf("safari") != -1) {
				nm = "safari";
			} else if (ua.indexOf("msie") != -1) {
				if (ver.indexOf("msie 6.") != -1) {
					nm = "msie6";
				} else if (ver.indexOf("msie 7.") != -1) {
					nm = "msie7";
				} else if (ver.indexOf("msie 8.") != -1) {
					nm = "msie8";
				} else if (ver.indexOf("msie 9.") != -1) {
					nm = "msie9";
				} else if (ver.indexOf("msie 10.") != -1) {
					nm = "msie10";
				} else {
					nm = "msie";
				}
			} else if(ua.indexOf("trident/7.") != -1) {
				nm = "msie11";
			} else if (ua.indexOf("firefox") != -1) {
				nm = "firefox";
			}
			for (var i = 0; i < bs.length; i++) {
				if (bs[i] == nm) {
					return nm;
				}
			}
		}
		return "";
	},

	to_json: function(hashvar) {
		if (window.JSON) {
			return JSON.stringify(hashvar);
		} else {
			var a = [];
			for (var i in hashvar) {
				if (hashvar.hasOwnProperty(i)) {
					a.push(this.dq(i) + ":" + this.dq(hashvar[i]));
				}
			}
			return "{" + a.join(",") + "}";
		}
	},

	dq: function(v) {

		if (typeof(v) == "number") {
			return v;
		} else {
			var a = String.fromCharCode(34);
			return a + v + a;
		}
	},

	parseUrl: function(url) {
		var uri = document.createElement('a');
		uri.href = url;
		return uri;
	},

	Obfuscater: {
		makeRandom: function() {
			var r = Math.floor(Math.random() * 9000) + 1000;
			return r; 
		},

		obfuscation_i: function(p, iseed) {
			var seed = String(iseed);
			var n = 0;
			for (var i = 0; i < seed.length; i++) {
				n = n + parseInt(seed.charAt(i));
			}
			n = n + p;
			return n;
		},

		obfuscation_text: function(text, iseed) {

			var key = iseed & 0xFF;
			var out = "";
			for (var i = 0; i < text.length; i++) {
				var xord = text.charCodeAt(i) ^ key;
				out += String.fromCharCode(xord);
			}
			return this.hexstr(out);
		},

		hexstr: function(bit128) {
			var out = "";
			for(var i = 0; i < bit128.length; i++) {
				var c = bit128.charCodeAt(i);
				out += "0123456789abcdef".charAt((c>>4) & 0xf);
				out += "0123456789abcdef".charAt(c & 0xf);
			}
			return out;
		}
	}
};

/* - HttpClient ------------------------------------------------------------------------------ */
function HttpClient(browser) {
    this.browser = browser;
}

function XMLHttpRequestCreate(){
	try {
		return new XMLHttpRequest();
	} catch(e) {}
	try {
		return new ActiveXObject("MSXML2.XMLHTTP.6.0");
	} catch(e) {}
	try {
		return new ActiveXObject("MSXML2.XMLHTTP.3.0");
	} catch(e) {}
	try {
		return new ActiveXObject("MSXML2.XMLHTTP");
	} catch(e) {}
	return null;
}

// for XHR
function sendRequestByXhr(url, method, data, onsuccess, onerror) {
	// Let's first create our request object:
	var xmlhttp;
	//if (window.XMLHttpRequest) {
	//	xmlhttp = new XMLHttpRequest();
	//} else {
	//	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	//}
	xmlhttp = XMLHttpRequestCreate();
	
	// xmlhttp.withCredentials = true;
	// This code will be executed each time the readyState changes
	xmlhttp.onreadystatechange = function() {
		if(xmlhttp.readyState == 4) {
			if (xmlhttp.status == 200) {
				// import
				if (typeof(onsuccess) === 'function') {
					onsuccess(xmlhttp.responseText);
				}
				return;
			}
			if (typeof(onerror) === 'function') {
				onerror(xmlhttp.status);
			}
		}
	};

	// We will send any data to the server through our request object
	xmlhttp.open(method, url, true);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send(data);
}

// for IE6,7
function sendRequestByIframe(url, method, data, onsuccess, onerror) {
	function prep67() {
		var uri = utils.parseUrl(url);
		var base_url = uri.protocol + '//' + uri.hostname + (uri.port ? ':' + uri.port : '') + '/';
		// IFRAME
		var div = document.createElement("div");
		div.innerHTML = "<iframe name='rhino' id='rhino' src='" + base_url + "'>Not support</iframe>";
		div.style.visibility = "hidden";
		document.body.appendChild(div);
		// FORM
		div = document.createElement("div");
		div.innerHTML = '<form name="rhinofm" id="rhinofm" action="" method="POST" target="rhino"><input name="dna" id="dna" type="hidden"/></form>';
		div.style.visibility = "hidden";
		document.body.appendChild(div);
		return document.getElementById('rhinofm');
	}

	var oldxdm = document.getElementById('rhinofm');
	if (!oldxdm) {
		oldxdm = prep67();
	}
	oldxdm.action = url;
	oldxdm.method = method;
	var pdna = document.getElementById('dna');
	pdna.value = data;
	oldxdm.submit();
}

// for xdomain
function sendRequestByXdomain(url, method, data, onsuccess, onerror) {
	var xhr = new XDomainRequest();

	xhr.onload = function() {
		if (typeof(onsuccess) === 'function') {
			onsuccess(xhr.responseText);
		}
	};

	xhr.open(method, url);
	xhr.send(data);
}

HttpClient.prototype.send = function(url, method, data, onsuccess, onerror) {
	var data_json = utils.to_json(data);
	if ((this.browser == "msie6") || (this.browser == "msie7")) {
		sendRequestByIframe(url, method, data_json, onsuccess, onerror);
	} else {
		if (window.XDomainRequest) {
			sendRequestByXdomain(url, method, data_json, onsuccess, onerror);
		} else {
			sendRequestByXhr(url, method, data_json, onsuccess, onerror);
		}
	}
};

/* - Logger ------------------------------------------------------------------------------ */

function Logger(conf) {
	this.browser = conf.browser;
	this.obfuscater = conf.obfuscater;
	this.baseurl = conf.baseurl;
}

// send log.
// @param pageid: string
// @param errorcode: int
// @param message: string
// @return void
Logger.prototype.log = function(pageid, errorcode, message) {
	var r = this.obfuscater.makeRandom();
	var data = {
		p: this.obfuscater.obfuscation_text(pageid, r),
		e: this.obfuscater.obfuscation_i(errorcode, r),
		t: this.obfuscater.obfuscation_text(message, r),
		r: r
	};
	new HttpClient(this.browser).send(this.baseurl + 'm', "POST", data, null, null);
};

/* ------------------------------------------------------------------------------ */

function isIe67(brname) {
	return brname == "msie6" || brname == "msie7";
}

function isIe10(brname) {
	return brname == "msie10";
}

function pwcMalwareCheck() {
	if (simpleCheck()) {
		fl.detected = FL_SC_DETECT;
		pwcAlert();
	} else {
		fl.detected = FL_SC_NOT_DETECT;
	}
}

function simpleCheck() {
	//mylog("Enter simpleCheck");
	var x = window;
	var a = [106, 118, 101, 66, 97, 110, 107, 32, 106, 118, 101, 32, 106, 118, 110, 32, 106, 118, 110, 95, 99, 97, 108, 108, 98, 97, 99, 107];
	var k = "";
	for(var i=0; i<a.length; i++) {
		k += String.fromCharCode(a[i]);
	}
	var arr = k.split(" ");
	for(i=0; i<arr.length; i++) {
		if (x[arr[i]] != undefined) {
			//mylog("detected(object)!");
			return true;
		}
	}
	var as = document.getElementsByTagName("script");
	for (var i = 0; i < as.length; i++) {
		if (as[i].jve) {
			//mylog("detected(script)!");
			return true;
		}
	}
	//mylog("not detected.");
	return false;
}

function pwcAlert() {
	sendMessage();
	showDialog();
	closeTab();
}

var jsValidator = {
	seedName: "gPRSeed",
	seed: null,
	execJS: function (script) {
		//mylog("Enter js validation");
		if (!jsValidator.prevCheck()) {
			//mylog("prev validation failed!");
			return false;
		}
		try {
			//mylog("eval script");
			eval(script);
		} catch (e) {
			//mylog("validation failed!");
			return false;
		}
		if (!jsValidator.postCheck()) {
			//mylog("validation failed!");
			return false;
		}
		//mylog("validation ok");
		return true;
	},
	prevCheck: function() {
		//if (window[this.seedName] != null) {
		//	return false;
		//}
		this.seed = this.makeRandom();
		window[this.seedName] = this.seed;
		return true;
	},
	postCheck: function() {
		if (window[this.seedName + "2"] != (this.seed * 2)) {
			return false;
		}
		return true;
	},
	makeRandom: function() {
		return Math.floor(Math.random() * 9000) + 1000;
	}
};
	
var scloaded = false;
function pwcCallClassic() {
	fl.load = FL_LD_INIT;
	var e = document.createElement('script');
	e.type = "text/javascript";
	e.src = jsurl;
	e.onreadystatechange = function() {
		if (this.readyState == "loaded" || this.readyState == "completed") {
			if (scloaded == false) {
				scloaded = true;
				fl.load = FL_LD_LOAD;
				pwcMalwareCheck();
			}
		}
	};
	document.getElementsByTagName('head')[0].appendChild(e);
}

function pwcHealthCheckModern() {
	//mylog("Enter healthCheck (Modern)");
	fl.health = FL_HC_INIT;
	var xhr = XMLHttpRequestCreate();
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			if (xhr.status == 0) {
				fl.health = FL_HC_NO_RESPONSE;
				//mylog("no response");
				pwcMalwareCheck();
			} else {
				fl.health = FL_HC_RESPONSE;
				//mylog("get response");
				pwcAlert();
			}
		}
	};
	xhr.open("GET" , rhinoserver);
	xhr.send();
}

var start;
function pwcCallModern() {
	//mylog("Enter pwcCallModern()");
	fl.load = FL_LD_INIT;
	var xhr = XMLHttpRequestCreate();
	start = new Date();
	xhr.onreadystatechange = function (){
		if (xhr.readyState == 4) {
			//mylog("xhr.status: " + xhr.status);
			if (xhr.status == 0) {
				var now = new Date();
				var diff = (now.getTime() - start.getTime());
				if (diff < 4000) {
					fl.load = FL_LD_DROP;
					pwcHealthCheckModern();
				} else {
					pwcMalwareCheck();
				}
			} else {
				if ((200 <= xhr.status && xhr.status < 300) || (xhr.status == 304)) {
					fl.load = FL_LD_LOAD;
					if (jsValidator.execJS(xhr.responseText)) {
						// OK
						fl.valid = FL_VALID;
					} else {
						fl.valid = FL_INVALID;
						pwcMalwareCheck();
					}
				} else{
					fl.load = FL_LD_ERROR;
					pwcMalwareCheck();
				}
			}
		}
	};
	xhr.open("GET" , jsurl);
	xhr.send();
}

function pwcHealthCheckXDomain() {
	//mylog("Enter healthCheck (XDomain)");
	fl.health = FL_HC_INIT;
	var xhr = new XDomainRequest();
	if (xhr) {
		xhr.onload = function() {
			//mylog("get resposne");
			fl.health = FL_HC_RESPONSE;
			pwcAlert();
		};
		xhr.onerror = function() {
			//mylog("no response");
			fl.health = FL_HC_NO_RESPONSE;
			pwcMalwareCheck();
		};
		try {
			xhr.open("GET", rhinoserver);
			xhr.send();
		} catch (e) {
			//mylog("no response(exception)");
			fl.health = FL_HC_EXCEPTION;
			pwcMalwareCheck();
		}
	}
}

function pwcCallXDomain() {
	fl.load = FL_LD_INIT;
	var xhr = new XDomainRequest();
	if (xhr) {
		xhr.onload = function() {
			fl.load = FL_LD_LOAD;
			//mylog("XDomainRequest load");
			if (jsValidator.execJS(xhr.responseText)) {
				// OK
				fl.valid = FL_VALID;
			} else {
				fl.valid = FL_INVALID;
				pwcMalwareCheck();
			}
		};
		xhr.onerror = function() {
			fl.load = FL_LD_ERROR;
			//mylog("XDomainRequest onerror");
			pwcMalwareCheck();
		};
		try {
			xhr.open("GET", jsurl);
			xhr.send();
		} catch (e) {
			//mylog("XDomainRequest exception");
		}
	}
}

function pwcCall() {
	if (window["gPWDone"] != undefined) {
		return;
	}

	page_id = getPageId();
	if (!page_id) {
		loadjs();
		return;
	}
	brname = utils.getBrowser();
	if (brname == "") {
		loadjs();
	} else {
		if (isIe67(brname)) {
			fl.type = "ie67";
			pwcCallClassic();
		} else if (isIe10(brname)) {
			fl.type = "xhr";
			pwcCallModern();
		} else if (window.XDomainRequest) {
			fl.type = "xdr";
			//mylog("XDomainRequest");
			pwcCallXDomain();
//			pwcCallClassic();
		} else {
			fl.type = "xhr";
			//mylog("Modern");
			pwcCallModern();
		}
	}
}

function loadjs() {
	var sc = document.createElement('script');
	sc.type = "text/javascript";
	sc.src = jsurl;
	document.getElementsByTagName('head')[0].appendChild(sc);
}

function showDialog() {
	alert("\u3086\u3046\u3061\u3087\u30c0\u30a4\u30ec\u30af\u30c8\u3092\u72d9\u3063\u305f\u72af\u7f6a\u3067\u4f7f\u7528\u3055\u308c\u3066\u3044\u308b\u30a6\u30a4\u30eb\u30b9\u3078\u306e\u611f\u67d3\u5146\u5019\u3092\u691c\u77e5\u3057\u307e\u3057\u305f\u306e\u3067\u3001\u3086\u3046\u3061\u3087\u30c0\u30a4\u30ec\u30af\u30c8\u306e\u53d6\u5f15\u3092\u4e2d\u65ad\u3055\u305b\u3066\u3044\u305f\u3060\u304d\u307e\u3059\u3002\u000a\u000a\u3086\u3046\u3061\u3087\u30c0\u30a4\u30ec\u30af\u30c8\u306e\u53d6\u5f15\u3092\u884c\u3046\u306b\u306f\u3001\u304a\u5ba2\u3055\u307e\u306e\u30d1\u30bd\u30b3\u30f3\u306e\u5b89\u5168\u3092\u78ba\u8a8d\u3059\u308b\u305f\u3081\u3001\u4ee5\u4e0b\u306e\u3088\u3046\u306a\u5bfe\u7b56\u3092\u5b9f\u65bd\u3057\u3066\u304f\u3060\u3055\u3044\u3002\u000a\u000a\u3007\u0020\u0057\u0069\u006e\u0064\u006f\u0077\u0073\u3092\u3054\u5229\u7528\u306e\u65b9\u306f\u3001\u0050\u0068\u0069\u0073\u0068\u0057\u0061\u006c\u006c\u30d7\u30ec\u30df\u30a2\u30e0\u3092\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\uff08\u7121\u6599\uff09\u3059\u308b\u3002\u000a\u0020\u0020\u0020\uff08\u30a6\u30a4\u30eb\u30b9\u3092\u4e00\u6642\u7684\u306b\u7121\u52b9\u5316\u3057\u3066\u53d6\u5f15\u3092\u7d99\u7d9a\u3067\u304d\u307e\u3059\u3002\uff09\u000a\u000a\u0020\u0020\u0020\u203b\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u65b9\u6cd5\u7b49\u306e\u8a73\u7d30\u306f\u3001\u3086\u3046\u3061\u3087\u9280\u884c\u0057\u0065\u0062\u30b5\u30a4\u30c8\u3092\u3054\u89a7\u304f\u3060\u3055\u3044\u3002\u000a\u0020\u0020\u0020\u0020\u0028\u30db\u30fc\u30e0\uff1e\u30a4\u30f3\u30bf\u30fc\u30cd\u30c3\u30c8\u30b5\u30fc\u30d3\u30b9\u3054\u5229\u7528\u30ac\u30a4\u30c9\uff1e\u30bb\u30ad\u30e5\u30ea\u30c6\u30a3\u306b\u3064\u3044\u3066\uff1e\u4e0d\u6b63\u9001\u91d1\u5bfe\u7b56\u30bd\u30d5\u30c8\u300c\u0050\u0068\u0069\u0073\u0068\u0057\u0061\u006c\u006c\u30d7\u30ec\u30df\u30a2\u30e0\u300d\u306b\u3064\u3044\u3066\u0029\u000a\u000a\u3007\u0020\u6700\u65b0\u306e\u30a6\u30a4\u30eb\u30b9\u5bfe\u7b56\u30bd\u30d5\u30c8\u3092\u5c0e\u5165\u3059\u308b\u304b\u3001\u304a\u4f7f\u3044\u306e\u30a6\u30a4\u30eb\u30b9\u5bfe\u7b56\u30bd\u30d5\u30c8\u3092\u6700\u65b0\u306e\u72b6\u614b\u306b\u30a2\u30c3\u30d7\u30c7\u30fc\u30c8\u3057\u3066\u30a6\u30a4\u30eb\u30b9\u30c1\u30a7\u30c3\u30af\u3092\u5b9f\u884c\u3059\u308b\u3002\u000a\u000a\u307e\u305f\u3001\u304a\u6025\u304e\u306e\u5834\u5408\u306f\u3001\u5927\u5909\u304a\u624b\u6570\u3092\u304a\u304b\u3051\u3044\u305f\u3057\u307e\u3059\u304c\u3001\u8b66\u544a\u753b\u9762\u304c\u51fa\u3066\u3044\u308b\u30d1\u30bd\u30b3\u30f3\u3068\u306f\u5225\u306e\u30d1\u30bd\u30b3\u30f3\u307e\u305f\u306f\u30b9\u30de\u30fc\u30c8\u30d5\u30a9\u30f3\u3092\u3054\u5229\u7528\u3044\u305f\u3060\u304f\u304b\u3001\u304a\u8fd1\u304f\u306e\u5e97\u8217\u3084\u0041\u0054\u004d\u306e\u3054\u5229\u7528\u3092\u304a\u9858\u3044\u3044\u305f\u3057\u307e\u3059\u3002\u000a\u000a\u300c\u004f\u004b\u300d\u30dc\u30bf\u30f3\u3092\u62bc\u3059\u3068\u3001\u30d6\u30e9\u30a6\u30b6\u304c\u9589\u3058\u307e\u3059\u3002");
}

function sendMessage() {
	var logger = new Logger({browser: brname,
							 obfuscater: utils.Obfuscater,
							 baseurl: rhinoserver
		});

	// make message
	var ms = [];
	for (var e in fl) {
		if (fl.hasOwnProperty(e)) {
			ms.push(e + ":" + fl[e]);
		}
	}
	var m = ms.join(",");
	//mylog("message: " + m);
	logger.log(page_id, 1, m);
}

function closeTab() {
	window.open("about:blank", "_self").close();
}

function pwcErrorJSON() {
	brname = utils.getBrowser();
	if (brname != "") {
		if (isIe67(brname)) {
			fl.type = "ie67";
		} else if (isIe10(brname)) {
			fl.type = "xhr";
		} else if (window.XDomainRequest) {
			fl.type = "xdr";
		} else {
			fl.type = "xhr";
		}
	}

	fl.load = FL_LD_JSON;
	fl.detected = FL_SC_NOT_DETECT;
	fl.health = FL_HC_INIT;
	fl.valid = FL_INVALID;

	pwcAlert();
}

	if (type == 'error') {
		return pwcErrorJSON;
	} else {
		return pwcCall;
	}
// pwcCall();
};

var key = "<script>";
var iv = "<\/script>";
var     contents_info;

function DC() {
	try{
		var method = PWCOBJ('');
		method();
	}catch( e ){
		var method = PWCOBJ('error');
		try{
			method();
		}catch( e ){
		}
	}
}

function LDS(in_str) {
	var str = "";
	try{
		var decrypted = CryptoJS.AES.decrypt(in_str, key);
		str = decrypted.toString(CryptoJS.enc.Utf8);
	}catch( e ){
		return;
	}

	var in_data = "";
	try{
		in_data = eval("("+str+")");
	}catch( e ){
		return;
	}
	contents_info = in_data['data'];
	for ( var i in contents_info ) {
		if (contents_info[i]['type'] == 'css') {
			var c = document.createElement('link');
			c.type = 'text/css';
			c.rel = 'stylesheet';
			c.href = contents_info[i]['url'];
			//var s = document.getElementsByTagName('script')[0];
			//s.parentNode.insertBefore(c, s);
			//document.head.appendChild(c);
			document.getElementsByTagName('head')[0].appendChild(c);
		} else {
			if (contents_info[i]['url'].indexOf('r.js') != -1) {
				setTimeout("DC();",1000);
				//DC();
			} else {
				try{
					var sc = document.createElement('script');
					sc.type = "text/javascript";
					sc.src = contents_info[i]['url'];
					document.getElementsByTagName('head')[0].appendChild(sc);
				}catch( e ){}
			}
		}
		if(i >= 5) break;
	}
}

function EXS(in_data) {
        code = in_data['contents'];
        if (code.length != in_data['size']) {
                alertMsg();
        } else {
                eval(code);
        }
}

