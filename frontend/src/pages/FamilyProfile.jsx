import React, { useEffect, useState } from 'react';
import './FamilyProfile.css';
import { getFamiliesByUserIdFamiliesUsersUserIdGet, getUserMeUsersMeGet, useCreateFamilyFamiliesRegisterPost, useDeleteFamilyFamiliesIdDelete } from '../api/fastAPISample';
import { useNavigate } from 'react-router-dom';

function FamilyProfile() {
  const navigate = useNavigate();
  const [familyInput, setFamilyInput] = useState({
    name: '',
    email: '',
  });
  const [userID, setUserID] = useState(null);
  const [error, setError] = useState(null);
  const [familyData, setFamilyData] = useState(null);
  const [trigger, setTrigger] = useState(false);

  const [editIndex, setEditIndex] = useState(null);

  const createMutation = useCreateFamilyFamiliesRegisterPost();
  
  const deleteMutation = useDeleteFamilyFamiliesIdDelete();
  

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token');

      if (!token) {
        setError('ログイン情報がありません。ログインしてください');
        navigate('/');
        return;
      }

      try {
        const options = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };
        const data = await getUserMeUsersMeGet(options);

        setUserID(data.data.user_id);
      } catch (err) {
        setError(err.response?.data?.detail || 'ユーザー情報の取得に失敗しました');
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchFamilyData = async () => {
      if (!userID) return;

      try {
        const data = await getFamiliesByUserIdFamiliesUsersUserIdGet(userID);
        setFamilyData(data.data);
      } catch (err) {
        setError(err.response?.data?.detail || '家族情報の取得に失敗しました');
      }
    };

    fetchFamilyData();
  }, [userID, trigger]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFamilyInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!familyInput.name || !familyInput.email) {
      alert('全ての項目を入力してください。');
      return;
    }

    createMutation.mutate(
      {
        data: {
          familyName: familyInput.name,
          email: familyInput.email,
          userId: userID,
        },
      },
      {
        onSuccess: () => {
          setFamilyInput({ name: '', email: '' });
          setTrigger(prevState => !prevState);
        },
        onError: (error) => {
          console.error("登録失敗", error);
        }
      }
    );

    // setEditIndex(null);
  };

  const handleEdit = (index) => {
    setFamilyInput(familyData[index]);
    setEditIndex(index);
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(
      {id},
      {
        onSuccess: () => {
          setTrigger(prevState => !prevState);
        },
        onError: (error) => {
          console.error("削除失敗", error);
        }
      }
    );
  };

  return (
    <div className="container">
      <h2>家族情報登録</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            名前:
            <input
              type="text"
              name="name"
              value={familyInput.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            メールアドレス:
            <input
              type="email"
              name="email"
              value={familyInput.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <button
          type="submit"
          className={`submit-button ${editIndex !== null ? 'edit-mode' : ''}`}
        >
          {editIndex !== null ? '更新' : '登録'}
        </button>
      </form>
      <h3>登録された家族情報</h3>
      {familyData && familyData.length > 0 && (
        <ul>
          {familyData.map((data, index) => (
            <li key={index}>
              {data.family_id} : {data.familyName} - {data.email}
              <div>
                <button
                  onClick={() => handleEdit(index)}
                  className="edit-button"
                >
                  編集
                </button>
                <button
                  onClick={() => handleDelete(data.family_id)}
                  className="delete-button"
                >
                  削除
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FamilyProfile;
