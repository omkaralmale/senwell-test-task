import './App.css';
import React, { useState, useEffect } from 'react';
import Table from './Table';

function App() {
  const [data, setData] = useState();

  const callApi = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log('Error fetching users:', error));
  }

  useEffect(() => {
    callApi()
  }, [])
  console.log(data);

  const handleDelete = (id) => {
    setData(data.filter((item) => item?.id !== id))
  }

  const onReset = () => {
    callApi()
  }


  return (
    <div className="App">
      <Table list={data} handleDelete={(id) => handleDelete(id)} onReset={onReset} />
    </div>
  );
}

export default App;
