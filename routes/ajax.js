function createXMLHttpRequestObject() {
  var xhr;
  if (typeof XMLHttpRequest !== 'undefined') {
    xhr = new XMLHttpRequest();
  } else {
    var versions = ["MSXML2.XmlHttp.5.0", 
                    "MSXML2.XmlHttp.4.0",
                    "MSXML2.XmlHttp.3.0", 
                    "MSXML2.XmlHttp.2.0",
                    "Microsoft.XmlHttp"];

    for(var i = 0, len = versions.length; i < len; i++) {
      try {
        xhr = new ActiveXObject(versions[i]);
        break;
      }
      catch(e){}
    }
  }
  return xhr;
}

function makeAjaxRequest(url, callback, method) {
  method = method || 'GET';
  var xhr = createXMLHttpRequestObject();

  xhr.onreadystatechange = ensureReadiness;

  function ensureReadiness() {
    var DONE = 4;
    var OK = 200;

    if (xhr.readyState < DONE) {
      return;
    }

    if (xhr.status !== OK) {
      return;
    }

    if (xhr.readyState === DONE) {
      callback(xhr);
    }
  }

  xhr.open(method, url, true);
  xhr.send('');
}
