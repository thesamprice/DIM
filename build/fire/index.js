var tabs = require("sdk/tabs");
var pagemod = require("sdk/page-mod");
var pageurl = require("sdk/self").data.url("index.html");

tabs.on('ready', function(tab) {
  console.log('eh')
  console.log('page- ', (tab.url.indexOf(pageurl) !== -1), tab.url, pageurl);

  if(tab.url.indexOf(pageurl) === -1) return;

  var {Cc, Ci} = require("chrome");
  var cookieManager = Cc["@mozilla.org/cookiemanager;1"].getService(Ci.nsICookieManager2);
  var count = cookieManager.getCookiesFromHost("bungie.net");
  while (count.hasMoreElements()){
    var cookie = count.getNext().QueryInterface(Ci.nsICookie2);
    if(cookie.name === 'bungled') {
      cookie = cookie.value;
      break;
    }
  }

  tab.attach({
    contentScript: 'document.cookie="' + cookie + '";'
  });
});


require("sdk/ui/button/action").ActionButton({
  id: "dim",
  label: "Destiny Item Manaer",
  icon: {
    "16": "./favicon-16x16.png",
    "32": "./favicon-16x16.png",
    "64": "./favicon-16x16.png"
  },
  onClick: function() {
    for(var i in tabs) {
      if(tabs[i].url.indexOf(pageurl) !== -1) {
        tabs[i].activate();
        return;
      }
    }
    tabs.open('index.html');
  }
});
