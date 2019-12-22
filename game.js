var config = {
	project: 'dino',
	platform: 'web',
	appid: 'wx6e877afec2fa1ba2',
	appkey: 'wx6e877afec2fa1ba2',
	debug: false,
	inspector: false,
	backend_engine: 'laya',
	res_version: '',
	version: "1.4.8",
	libs: {},
};
if (typeof global === 'undefined') var global = this || {};
if (typeof window === 'undefined') var window = global;
if (typeof document !== 'undefined') document.title = config.project;

function initialize() {
	window.config = config;

	if (!config.debug) {
		var cdn = "https://github.com/SeeYouGit/web/";// 此处配置资源 CDN URL
		// var cdn = "https://file.gugudang.com/res/down/klgw/" + config.platform;
		// if (cdn) {
		// 	config.base_resource_url = cdn;
		// }
		// if (!cdn.startsWith("http://192.168.")) {
		// 	config.base_resource_url += config.res_version + '/';
		// }
		config.stat = false;
	}

	// 设置加载JS脚本的函数
	if (typeof(wx) !== "undefined") {
		window.wx = wx;
		wx.is_simulator = wx.getSystemInfoSync().platform == 'devtools';
		window.load_script = require;
		window.wx.config = config;
	} else if (typeof(swan) !== "undefined") {
		window.swan = swan;
		window.load_script = require;
		window.swan.config = config;
	} else if (typeof(qg) !== "undefined") {
		window.qg = qg;
		window.load_script = require;
		window.qg.config = config;
	} else if (typeof(document) !== 'undefined') { // Web 平台
		window.load_script = function(url) {
			var script = document.createElement("script");
			script.async = false;
			script.src = url;
			return document.body.appendChild(script);
		};
	}
};


function load_lib_module(module, file) {
	var file = file || module;
	var script = "./libs/modules/" + module + "/" + file + (config.debug ? ".js" : ".min.js");
	return window.load_script(script);
}

function load_platform_adapters() {
	switch(config.platform) {
		case 'qq': {
			load_lib_module("wx", "weapp-adapter");
			if (config.backend_engine === 'laya') load_lib_module("laya", "laya.qqmini");
		} break;
		case 'bytedance':
		case 'wechat': {
			load_lib_module("wx", "weapp-adapter");
			if (config.backend_engine === 'laya') load_lib_module("laya", "laya.wxmini");
		} break;
		case 'baidu': {
			load_lib_module("swan", "swan-adapter");
			if (config.backend_engine === 'laya') load_lib_module("laya", "laya.bdmini");
		} break;
		case 'oppo': {
			if (config.backend_engine === 'laya') load_lib_module("laya", "laya.quickgamemini");
		} break;
		case 'web':
		default: {
		} break;
	}

};

function load_game_dependencies() {
	switch (config.backend_engine) {
		case 'laya': {
			load_lib_module("laya", "laya.core");
			load_lib_module("laya", "laya.html");
			load_lib_module("laya", "laya.ui");
			load_lib_module("fairygui", "fairygui.laya");
			if (config.inspector) {
				load_lib_module("laya", "laya.debugtool");
			}
		} break;
		default:
			break;
	}
};

function load_game_bundle() {
	if (typeof(wx) !== 'undefined' && wx.loadSubpackage) {
		const loadTask = wx.loadSubpackage({
			name: 'assets', // name 可以填 name 或者 root
			success: function(res) {
				console.log("分包加载完成");
				//----- 游戏代码 -------
				load_lib_module("bundle");
			},
			fail: function(res) {
			}
		})
	} else {
		load_lib_module("bundle");
	}
};

initialize();
load_platform_adapters();
load_game_dependencies();
load_game_bundle();
