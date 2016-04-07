var url = '/api/users';
makeAjaxRequest(url, populateTable);

function deleteUser(element) {
  var url = '/api/user/' + element.getAttribute('id');
  makeAjaxRequest(url, function(xhr) {
    window.location = '/';
  }, 'DELETE');
}

function populateTable(xhr) {
  var tableBody = document.getElementById('user-table-body');
  var dataObj = JSON.parse(xhr.responseText);
  var html = '';
  dataObj.forEach(function(user) {
    html = html + '<tr><td>' + user.fname;
    html = html + '</td><td>' + user.lname;
    html = html + '</td><td>' + user.age;
    html = html + '</td><td><a href="add-edit-user.html?id=' + user.id + '">Edit</a>';
    html = html + '</td><td><a href="javascript:;" id="' + user.id + '" onclick="deleteUser(this);">Delete';
    html = html + '</a></td></tr>';
  });
  tableBody.innerHTML = html;
}
