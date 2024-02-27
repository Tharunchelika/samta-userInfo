import React, { useState, useEffect } from 'react';
import './user.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      setSearchHistory(prevHistory => [...prevHistory, searchTerm]);
    }
  };

  const handleSortByName = () => {
    const sortedUsers = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sortedUsers);
  };
  console.log(users);

  return (
    <div className='users'>
      <h1 style={{textAlign:"center"}}>Samta Users</h1>
      <div className='search'>
        <label style={{fontSize:"xx-large",marginLeft:"170px"}}>search user:</label>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button className='btn btn-primary' onClick={handleSearch}>Search</button>
        <button className='btn btn-primary' onClick={handleSortByName}>Sort by Name</button>
      </div>

      <label style={{marginLeft:"380px"}}>Search History</label>
      <ul class="list-group" style={{width:"540px",marginLeft:"380px"}}>
        {searchHistory.map((term, index) => (
          <li class="list-group-item">{term}</li>

        ))}
      </ul>  
      <h2 style={{marginTop:"20px",marginLeft:"170px"}}>Users List</h2>
      <table class="table table-striped" style={{width:"1070px",marginLeft:"180px"}}>
        <thead class="thead-dark">
          <tr>
            <th scope="col">user id</th>
            <th scope="col">username</th>
            <th scope="col">email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default Users;
