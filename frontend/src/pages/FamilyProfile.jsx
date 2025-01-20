// 家族のプロフィール(編集)画面
import React, { useState } from 'react';

function FamilyProfile() {
  const [familyData, setFamilyData] = useState({
    name: '',
    email: '',
    relation: '',
    password: '',
  });

  const [submittedData, setSubmittedData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFamilyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!familyData.name || !familyData.email || !familyData.relation || !familyData.password) {
      alert('全ての項目を入力してください。');
      return;
    }

    if (editIndex !== null) {
      const updatedData = [...submittedData];
      updatedData[editIndex] = familyData;
      setSubmittedData(updatedData);
      setEditIndex(null);
    } else {
      setSubmittedData((prevData) => [...prevData, familyData]);
    }

    setFamilyData({ name: '', email: '', relation: '', password: '' });
  };

  const handleEdit = (index) => {
    const password = prompt('編集するにはパスワードを入力してください:');
    if (password === submittedData[index].password) {
      setFamilyData(submittedData[index]);
      setEditIndex(index);
    } else {
      alert('パスワードが正しくありません。');
    }
  };

  const handleDelete = (index) => {
    const password = prompt('削除するにはパスワードを入力してください:');
    if (password === submittedData[index].password) {
      const updatedData = submittedData.filter((_, i) => i !== index);
      setSubmittedData(updatedData);
    } else {
      alert('パスワードが正しくありません。');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>家族情報登録</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            名前:
            <input
              type="text"
              name="name"
              value={familyData.name}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            メールアドレス:
            <input
              type="email"
              name="email"
              value={familyData.email}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            続き柄:
            <input
              type="text"
              name="relation"
              value={familyData.relation}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            パスワード:
            <input
              type="password"
              name="password"
              value={familyData.password}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </label>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: editIndex !== null ? 'orange' : 'blue',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            cursor: 'pointer',
            borderRadius: '5px',
          }}
        >
          {editIndex !== null ? '更新' : '登録'}
        </button>
      </form>
      <h3>登録された家族情報</h3>
      <ul>
        {submittedData.map((data, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            {data.name} ({data.relation}) - {data.email}
            <div style={{ marginTop: '5px' }}>
              <button
                onClick={() => handleEdit(index)}
                style={{
                  marginRight: '10px',
                  backgroundColor: 'green',
                  color: 'white',
                  padding: '5px 10px',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '5px',
                }}
              >
                編集
              </button>
              <button
                onClick={() => handleDelete(index)}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  padding: '5px 10px',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '5px',
                }}
              >
                削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FamilyProfile;
