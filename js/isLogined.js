$(document).ready(function () {
  function checkJSessionID() {
    var cookies = document.cookie.split(";");
    var jsessionExists = false;

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.indexOf("JSESSIONID=") === 0) {
        jsessionExists = true;
        break;
      }
    }

    return jsessionExists;
  }

  var isLoggedin = checkJSessionID();
  console.log(isLoggedin); // true 또는 false
});
