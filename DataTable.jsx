import React, { useEffect, useState } from 'react';

export default function DataTable() {
  const [formData, setformData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
    checkbox: false,
    Selection: '',
  });

  const [savedData, setSavedData] = useState([]);
  const [editData, seteditData] = useState(null);
  const [currentPage, setcurrentPage] = useState(1);
  const [search, setSearch] = useState("");
 const [sortOrder, setSortOrder] = useState("asc");

  const itemsPerPage = 6;

  function hadlechange(e) {
    const { name, value, type, checked } = e.target;

    setformData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  }

  function handlesubmit(e) {
    e.preventDefault();

    let updatedData;

    if (editData !== null) {
      updatedData = [...savedData];
      updatedData[editData] = formData;
      seteditData(null);
    } else {
      updatedData = [...savedData, formData];
    }

    setSavedData(updatedData);
    localStorage.setItem('data', JSON.stringify(updatedData));

    setformData({
      name: '',
      email: '',
      password: '',
      phone: '',
      gender: '',
      checkbox: false,
      Selection: '',
    });

    alert('Form Submitted');
  }

  useEffect(() => {
    const localdata = JSON.parse(localStorage.getItem('data')) || [];
    setSavedData(localdata);
  }, []);

  function Delete(id) {
    const ans = savedData.filter((el, i) => i !== id);
    setSavedData(ans);
    localStorage.setItem('data', JSON.stringify(ans));
  }

  function Edit(id) {
    setformData(savedData[id]);
    seteditData(id);
  }

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const filteredData = savedData.filter((item) =>
  item.name.toLowerCase().includes(search.toLowerCase()) ||
  item.email.toLowerCase().includes(search.toLowerCase()) ||
  item.phone.includes(search)
  );  

  const sortedData = [...filteredData].sort((a, b) => {
  if (sortOrder === "asc") {
    return a.name.localeCompare(b.name);
  } else {
    return b.name.localeCompare(a.name);
  }
  });

  const currentData = sortedData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);



  
  return (
    <div style={{ width: '90%',  margin: '40px auto',  fontFamily: 'Arial',}}>
      <div style={{ background: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.2)',}}>
        <h2 style={{textAlign: 'center', marginBottom: '20px', }} >
          Registration Form
        </h2>

        <form onSubmit={handlesubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={hadlechange} required
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '5px',
              }}/>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={hadlechange} required
           style={{
                width: '100%',
                padding: '10px',
                marginTop: '5px',
              }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={hadlechange} required
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '5px',
              }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Phone No</label>
            <input type="tel" name="phone" value={formData.phone} onChange={hadlechange} required
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '5px',
              }}/>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Gender: </label>
            <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={hadlechange} required />
            <label style={{ marginRight: '15px', marginLeft: '5px' }}>    
              Male
            </label>
            <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={hadlechange} />
            <label style={{ marginLeft: '5px' }}>Female</label>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <input
              type="checkbox"
              name="checkbox"
              checked={formData.checkbox}
              onChange={hadlechange}
              required/>
            <label style={{ marginLeft: '8px' }}> Accept Terms & Conditions</label>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Select Course</label>
            <select
              name="Selection"
              value={formData.Selection}
              onChange={hadlechange}
              required
              style={{
                width: '100%',
                padding: '10px',
                marginTop: '5px',
              }}>
              <option value="">Select Course</option>
              <option value="Web Development">Web Development</option>
              <option value="AI & ML">AI & ML</option>
              <option value="CyberSecurity">CyberSecurity</option>
            </select>
          </div>

          <button type="submit" style={{   backgroundColor: '#0d6efd',   color: '#fff',   border: 'none',   padding: '10px 20px',   borderRadius: '5px', cursor: 'pointer', }}> {editData !== null ? 'Update' : 'Submit'}</button>
        </form>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
              marginBottom: "20px",
            }}>
          <input  type="text"  placeholder="Search Name"  value={search}  onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "60%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }} />

          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{   padding: "10px",   borderRadius: "5px",}}>
            <option value="asc">Name A-Z</option>
            <option value="desc">Name Z-A</option>
           </select>
          </div>
          
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px',}}>
          <thead>
            <tr>
              {[
                'Name',
                'Password',
                'Email',
                'Phone',
                'Gender',
                'Course',
                'Action',
              ].map((item, index) => (
                <th key={index} style={{border: '1px solid #ddd',padding: '10px', background: '#f2f2f2', }}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentData.map((el, i) => (
              <tr key={i}>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                  {el.name}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                  {el.password}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                  {el.email}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                  {el.phone}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                  {el.gender}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                  {el.Selection}
                </td>

                <td style={{border: '1px solid #ddd',padding: '10px', }}>
                  <button
                    onClick={() => Delete(i)}
                    style={{
                      background: 'red', color: '#fff',  border: 'none', padding: '8px 12px',  marginRight: '10px',   borderRadius: '5px',  cursor: 'pointer',}} >  Delete </button>

                  <button
                    onClick={() => Edit(i)}
                    style={{ background: 'green', color: '#fff', border: 'none',  padding: '8px 12px', borderRadius: '5px',  cursor: 'pointer', }} > Edit </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{  marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center',  gap: '15px',}}>
          <button disabled={currentPage === 1} onClick={() => setcurrentPage(currentPage - 1)} style={{ padding: '8px 15px', border: 'none',  borderRadius: '5px',  background: '#6c757d', color: '#fff',  cursor: 'pointer', }} >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages || 1}
          </span>

          <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setcurrentPage(currentPage + 1)} style={{   padding: '8px 15px', border: 'none', borderRadius: '5px',background: '#6c757d', color: '#fff', cursor: 'pointer', }} >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}