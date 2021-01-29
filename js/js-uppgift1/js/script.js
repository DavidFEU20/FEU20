

let users = [];


const validateText = (id) => {
  const input = document.querySelector('#'+id);
  const error = document.querySelector('#'+id+'-error');

  if(input.value.trim() === '') {
    error.innerText = 'Must input name';
    return false;
  } else if(input.value.trim().length < 2) {
    error.innerText = 'Name need to be atleast 2 characters'
    return false;
  }
  else {
    error.innerText = '';
    return true;
  }
}
  
const validateEmail = (id) => {
  const input = document.querySelector('#'+id);
  const error = document.querySelector('#'+id+'-error');

  let regEx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

  if(regEx.test(input.value)) {
    error.innerText = '';
    return true;
  } else {
    error.innerText = 'You need to enter a valid email address'
    return false;
  }
}

const validate = () => {

  document.querySelectorAll('input').forEach(input => {
  
    if(input.type === "text") {
      validateText(input.id);
    }
  
    if(input.type === "email") {
      validateEmail(input.id);
    }
    
  })
}


const renderUsers = () => {

  document.querySelector('#output').innerHTML = '';
  users.forEach(user => {

    let html = `
    <div id="${user.id}" class="mr-5 mt-2" >
      <div class="text">
        <h3>${user.firstName} ${user.lastName}</h3>
        <small>${user.email}</small>
      </div>
      <div class="buttons">
        <button class="btn btn-primary">change</button>
        <button class="btn btn-danger">delete</button>
      </div>
    </div>
`

  document.querySelector('#output').innerHTML += html
  })
}



document.querySelector('#regForm').addEventListener('submit', (e) => {
    e.preventDefault();

    validate();
   
    

    if(validateText('firstName') && validateText('lastName') && validateEmail('email')) {
      let user = {
        id : Date.now().toString(),
        firstName : e.currentTarget.firstName.value,
        lastName : e.currentTarget.lastName.value,
        email : e.currentTarget.email.value
        
    }
    
    for( var i = 0; i < users.length; i++){
      if((users[i].firstName === document.querySelector('#firstName').value) && (users[i].lastName === document.querySelector('#lastName').value) && (users[i].email === document.querySelector('#email').value)){
        document.querySelector('#form-error').innerText = 'User already exist'
      return false;
      } else {
        document.querySelector('#form-error').innerText = ''
      
      }
    
    }
    users.push(user);
    // console.dir(users);
    renderUsers();
    // regForm.reset();
    }  
})

const deleteuser = id => {
  users = users.filter(user => user.id != id);
  renderUsers();
}

document.querySelector('#output').addEventListener('click', (e) => {

  if(e.target.classList.contains('btn-danger')) {
    deleteuser(e.target.parentNode.parentNode.id);
    document.querySelector('#btnSubmit').className = "btn btn-primary"
    document.querySelector('#btnChange').className = "btn btn-primary d-none"
    document.querySelector('#form-error').innerText = ''
  } else if (e.target.classList.contains('btn-primary')) {
    for( var i = 0; i < users.length; i++) {
      if(users[i].id === e.target.parentNode.parentNode.id) {
        
        document.querySelector('#regForm').firstName.value = users[i].firstName
        document.querySelector('#regForm').lastName.value = users[i].lastName
        document.querySelector('#regForm').email.value = users[i].email
        document.querySelector('#btnChange').className = "btn btn-primary"
        document.querySelector('#btnSubmit').className = "btn btn-primary d-none"
        document.querySelector('#btnId').className = users[i].id
        document.querySelector('#form-error').innerText = ''
        
      }
    }
    renderUsers();
  }
  
})

document.querySelector('#btnChange').addEventListener('click', (e) => {

  validate();
  
  if(document.querySelector('#btnId').className != '' && validateText('firstName') && validateText('lastName') && validateEmail('email')) {
    for( var i = 0; i < users.length; i++){
      if((users[i].firstName === document.querySelector('#firstName').value) && (users[i].lastName === document.querySelector('#lastName').value) && (users[i].email === document.querySelector('#email').value)){
        document.querySelector('#form-error').innerText = 'User already exist'
      return false;
      } else {
        document.querySelector('#form-error').innerText = ''
      
      }
    
    }
    for( var i = 0; i < users.length; i++) {
      if(users[i].id === document.querySelector('#btnId').className) {
        users[i].firstName = document.querySelector('#regForm').firstName.value
        users[i].lastName = document.querySelector('#regForm').lastName.value
        users[i].email = document.querySelector('#regForm').email.value
        document.querySelector('#btnChange').className = "btn btn-primary d-none"
        document.querySelector('#btnSubmit').className = "btn btn-primary"
        document.querySelector('#btnId').className = ''
        
      }
    }
    renderUsers();
  }
})