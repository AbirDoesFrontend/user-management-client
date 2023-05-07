import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])
  
  const handleOnSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;

    const user = { name , email }

    fetch('http://localhost:5000/users' , {
      method : 'POST',
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      form.reset()
      const newUsers = [...users , data]
      setUsers(newUsers)
    })
  }


  return (
    <>
      <h1>User Management</h1>
      <p>Users : {users.length}</p>
      <form onSubmit={handleOnSubmit}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add User" />
      </form>
      {
        users.map(user => <p key={user.id}>{user.id} : {user.name} : {user.email}</p>)
      }
    </>
  )
}

export default App
