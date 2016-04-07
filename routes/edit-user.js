document.body.onload = function() {
  setTimeout(function() {
    var id = getParameterByName('id');
    if (id) {
      var url = '/api/user/' + id;
      makeAjaxRequest(url, populateUser);
    }
  }, 500);
}

function populateTextField(id, value) {
  var obj = document.getElementById(id);
  obj.value = value;
}

function populateUser(xhr) {
  var user = JSON.parse(xhr.responseText);
  if (user.id) {
    populateTextField('id', user.id);
    populateTextField('fname', user.fname);
    populateTextField('lname', user.lname);
    populateTextField('age', user.age);
  }
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  url = url.toLowerCase(); // This is just to avoid case sensitiveness  
  name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();// This is just to avoid case sensitiveness for query parameter name
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
