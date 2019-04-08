
$(document).ready(function() {

  $('#form_add_to_do').click(function() {
    addTodo()
    getAllToDo()
  })

  $('#form_edit_to_do').click(function() {
    editTodo()
    getAllToDo()
  })

  $('#mark_complete').click(function() {
    finishTask()
  })

  $('#delete_todo').click(function() {
    deleteTodo()
  })

  getAllToDo()

})

function getAllToDo() {
    // console.log('masuk')

    let id = localStorage.getItem('userId')
    // console.log(id)
    // console.log('masuk')
    $.ajax({
      url: `${baseURL}/todos/${id}`,
      method: 'GET',
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .done(allTodo => {
      // console.log(allTodo)

      allTodo.forEach((todo, i) => {
        // console.log(todo)
        // console.log(typeof todo.dueDate)
        $('#user-list-todos').empty()
        $('#user-list-todos').append(`
        <tr>
          <td scope="row">${i+1}</td>
          <td>${todo.taskName}</td>
          <td>${todo.description}</td>
          <td>${todo.status}</td>
          <td>${new Date(todo.dueDate).toDateString()}</td>
          <td>

          <button onclick="finishTask('${todo._id}')" class="btn btn-success" id="mark_complete">Complete</button>  <button onclick="deleteTodo('${todo._id}')" class="btn btn-danger" id="delete_todo">Delete</button>            
          </td>
          </tr>
          `)
          // console.log(allTaskId)
      });
    })
    .fail(err => {
      console.log(err)
    })
}

function addTodo() {
  // console.log('masukkkkk')
  event.preventDefault()
  let taskName = $('#new_task_name').val()
  let description = $('#new_description').val()
  let dueDate = $('#datetimepicker4').val()
  // console.log(taskName, description, dueDate)
  
  $.ajax({
    url: `${baseURL}/todos`,
    method: `POST`,
    data: {
      taskName: taskName,
      description: description,
      dueDate: dueDate,
      user_id: localStorage.getItem('userId')
    },
    headers: {
      token: localStorage.getItem('token')
    } 
  })
  .done(newTodo => {
    Swal.fire({
      position: 'center',
      type: 'success',
      title: `Success create new task: ${newTodo.taskName}`,
      showConfirmButton: false,
      timer: 2000
    })
    getAllToDo()
  })
  .fail(err => {
    Swal.fire({
      position: 'top',
      type: 'warning',
      title: `${err.message}`,
      showConfirmButton: false,
      timer: 2000
  })
    // console.log('masuk addTodo Error')
    console.log(err.message)
  })
}

function finishTask(task_id) {
  $.ajax({
    url: `${baseURL}/todos/${task_id}/complete`,
    method: `PATCH`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(response => {
    console.log('Berhasil Update')
    getAllToDo()
  })
  .fail(err => {
    console.log(err)
  })
}

function deleteTodo(task_id) {
  console.log(task_id, "------")
  console.log(baseURL)
  $.ajax({
    url: `${baseURL}/todos/${task_id}`,
    method: 'DELETE',
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(response => {
    console.log(response, '00000000')
    // console.log(response, 'ini di dalem delete 1')
    Swal.fire({
      title: 'Are you sure you want to delete this to do ?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete ?'
    })
    .then((selected) => {
      if(selected.value) {
        Swal({
          type: 'success',
          title: 'Deleted File',
          showConfirmButton: false,
          timer: 1500
        })
        getAllToDo()
        }
    })
  })
  .fail(err => {
    console.log(err, '=======')
    console.log('masuk error delete')
    Swal.fire({
      position: 'top',
      type: 'warning',
      title: `Ouch you are not allowed to delete.`,
      showConfirmButton: false,
      timer: 1500
  })
  })

}
