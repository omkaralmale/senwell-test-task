import React, { useEffect, useState } from 'react';
let timeoutId;
const Table = ({ list, handleDelete, onReset }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(list || []);

  const handleSearchChange = (value) => {
    setSearchTerm(value);

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      const filtered = (list || []).filter(user =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredUsers(filtered);
    }, 1000);
  };


  useEffect(() => {
    if (list) {
      setFilteredUsers(list)
    }
  }, [list])

  const handleDeleteId = (id) => {
    handleDelete(id)
  }
  const handleReset = () => {
    onReset()
  }

  const handleMouseEnter = (index) => {
    document.getElementById(`company-details-${index}`).style.opacity = "1";
    document.getElementById(`company-details-${index}`).style.zIndex = "10";
  };


  const handleMouseLeave = (index) => {
    document.getElementById(`company-details-${index}`).style.opacity = "0";
    document.getElementById(`company-details-${index}`).style.zIndex = "0";
  };

  const header = ["ID", "NAME", "COMPANY", "ADDRESS", "ACTION"]
  return (
    <div>
      <input
        type="text"
        placeholder="Search by Name"
        value={searchTerm}
        onChange={(e) => handleSearchChange(e.target.value)}
        className="border border-gray-300 rounded-full w-60 px-3 py-2 m-2 placeholder:text-sm"
      />
      <button onClick={handleReset} className="bg-black hover:bg-gray-600 text-white px-4  py-2 rounded-full ">RESET</button>
      <table className="w-3/4 border-collapse rounded border border-gray-300 m-2">
        <thead>
          <tr>
            {header.map((item, index) => <th key={index} className="border border-gray-300 p-2 text-sm">{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-2 text-center text-sm">{user.id}</td>
              <td className="border border-gray-300 px-2 text-sm">{user.name}</td>
              <td className="border border-gray-300 px-2 text-sm">
                <div
                  className="relative"
                >
                  <div className="text-sm"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}>{user.company.name}</div>
                  <div className="text-sm absolute bg-white z-50 border border-gray-300 px-2 rounded shadow-md opacity-0 w-max" id={`company-details-${index}`}>
                    <p className="text-sm z-10">{`Catchphrase: ${user.company.catchPhrase}`}</p>
                    <p className="text-sm z-10">{`BS: ${user.company.bs}`}</p>
                  </div>
                </div>
              </td>
              <td className="text-sm border border-gray-300 px-2">{user.address.street}, {user.address.city}, {user.address.zipcode}</td>
              <td className="text-sm border border-gray-300 px-2">
                <button onClick={() => handleDeleteId(user.id)} className="bg-red-700 w-full hover:bg-red-900 text-white my-1 px-2 py-1 rounded-full text-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
