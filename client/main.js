$(document).ready(function() {

  if(localStorage.getItem('token')) {
    isLogin(true)
  } else {
    isLogin(false)
  }

})

function register() {
  event.preventDefault()

  let firstName = $('#first_name_register').val()
  let lastName = $('#last_name_register').val()
  let email = $('#email_register').val()
  let password = $('#password_register').val()

  $.ajax({
    url: `${baseURL}/users/register`,
    method: 'POST',
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }
  })
  .done(data => {
    // console.log('berhasil', data)
    isLogin(true)
  })
  .fail(err => {
    console.log(err)
  })
}

function isLogin(input) {
  if(input === false) {
    console.log('isLogin ===== FALSE')
    $('.main-content').hide()
    $('.login-content').show()
    $('#navbar-before-login').show()
    $('#navbar-after-login').hide()
    $('#user-table').hide()

  } else {
    console.log('isLogin ===== TRUE')
    $(".main-content").show()
    $('.login-content').hide()
    $("#navbar-before-login").hide()
    $("#navbar-after-login").show()
    $("#register-form").show()
    $("#user-list-todos").show()
    $("#user-table").show()
  }
}