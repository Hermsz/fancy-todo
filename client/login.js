
let baseURL = 'http://localhost:3000'

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  
  const id_token = googleUser.getAuthResponse().id_token;
  
  $.ajax({
    url: `${baseURL}/users/google-sign-in`,
    method: 'POST',
    data: {
      token: id_token
    }
  })
  .done(data => {
    // console.log(data, '=========[[[')
    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.userId)
    localStorage.setItem('email', data.email)
    localStorage.setItem('fullName', data.fullName)

  })
  .fail(err => {
    console.log(err)
  })
}

function login() {
  event.preventDefault()
  let email = $('#email-login').val()
  let password = $('#password-login').val()
  $.ajax({
    url: `${baseURL}/users/sign-in`,
    method: 'POST',
    data: {
      email: email,
      password: password
    }
  })
  .done(data => {
    Swal.fire({
      title: 'Success Login',
      position: 'top-end',
      type: 'success',
      showConfirmButton: false,
      timer: 1500
    })
    // console.log(data)
    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.foundUser._id)
    localStorage.setItem('email', data.foundUser.email)
    localStorage.setItem('fullName', data.foundUser.fullName)

    isLogin(true)
  })
  .fail(err => {
    console.log(err)
  })
}

function signOut() {
  Swal.fire({
    title: 'Do you want to leave?',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sign Out'
  })
  .then(selected => {
    if(selected.value) {
      Swal.fire({
        type: 'success',
        title: 'Log out is success',
        showConfirmButton: false,
        timer: 1500
    })
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    localStorage.removeItem('token');
    localStorage.removeItem('userId')
    localStorage.removeItem('email')
    localStorage.removeItem('fullName')
    isLogin(false)
    }
  })
}