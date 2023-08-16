$(document).ready(function () {
  $("button[type='submit']").on("click", function (e) {
    e.preventDefault();

    var email = $("#email").val();
    var password = $("#password").val();
    var storedEmail = localStorage.getItem("storedEmail");
    var storedPassword = localStorage.getItem("storedPassword");

    if (storedEmail && storedPassword) {
      $("#email").val(storedEmail);
      $("#password").val(storedPassword);
    }

    var rememberMe = $("#rememberId").prop("checked");

    const data = {
      email: email,
      password: password,
    };

    $.ajax({
      type: "POST",
      url: "https://ppiyong.shop/api/user/login",
      data: JSON.stringify(data),
      xhrFields: {
        withCredentials: true,
      },
      contentType: "application/json; charset=utf-8",
      success: function (response) {
        console.log(response);
        if (rememberMe) {
          // Store the email and password in localStorage
          localStorage.setItem("storedEmail", email);
          localStorage.setItem("storedPassword", password);
        }
        location.href = "/main.html";
      },
      error: function (req, status, err) {
        console.log(status, err);
      },
    });
  });
});

async function getHeader(url) {
  const headerData = await fetch(url);
  return headerData.headers;
}
