import React, { useEffect, useState } from 'react';
import './FamilyProfile.css';
import { getFamiliesByUserIdFamiliesUsersUserIdGet, getUserMeUsersMeGet, useCreateFamilyFamiliesRegisterPost, useDeleteFamilyFamiliesIdDelete, useUpdateFamilyFamiliesIdPut } from '../api/fastAPISample';
import { useNavigate, Link } from 'react-router-dom';

function FamilyProfile() {
  const navigate = useNavigate();
  const [familyInput, setFamilyInput] = useState({
    familyName: '',
    email: '',
  });
  const [userID, setUserID] = useState(null);
  const [error, setError] = useState(null);
  const [familyData, setFamilyData] = useState(null);
  const [trigger, setTrigger] = useState(false);

  const [editIndex, setEditIndex] = useState(null);

  const createMutation = useCreateFamilyFamiliesRegisterPost();
  
  const deleteMutation = useDeleteFamilyFamiliesIdDelete();
  
  const updateMutation = useUpdateFamilyFamiliesIdPut();

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

    if (!familyInput.familyName || !familyInput.email) {
      alert('全ての項目を入力してください。');
      return;
    }

    if (editIndex == null) {
      createMutation.mutate(
        {
          data: {
            familyName: familyInput.familyName,
            email: familyInput.email,
            userId: userID,
          },
        },
        {
          onSuccess: () => {
            setFamilyInput({ familyName: '', email: '' });
            setTrigger(prevState => !prevState);
          },
          onError: (error) => {
            console.error("登録失敗", error);
          }
        }
      );
    } else {
      updateMutation.mutate(
        {
          id: familyData[editIndex].family_id,
          data: {
            familyName: familyInput.familyName,
            email: familyInput.email,
          },
        },
        {
          onSuccess: () => {
            setFamilyInput({ familyName: '', email: '' });
            setTrigger(prevState => !prevState);
          },
          onError: (error) => {
            console.error("更新失敗", error);
          }
        }
      );

      setEditIndex(null);
    }
  };

  const handleEdit = (index) => {
    setFamilyInput(familyData[index]);
    setEditIndex(index);
  };

  const handleDelete = (id) => {
    const isConfirmed = window.confirm("本当に削除しますか？");

    if (!isConfirmed) {
      return;
    }

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
    <div className="family-container">
      <h2 className="register-title">家族情報登録</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label className="form-label">名前</label>
          <input
            type="text"
            name="familyName"
            value={familyInput.familyName}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">メールアドレス</label>
          <input
            type="email"
            name="email"
            value={familyInput.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button
          type="submit"
          className={`btn ${editIndex !== null ? 'btn--yellow' : 'btn--green'}`}
        >
          {editIndex !== null ? '更新' : '登録'}
        </button>
        
        <Link to="/" className="btn btn--purple">戻る</Link>
      </form>
      <h2 className="info-list-title">登録された家族情報</h2>
      <div className="info-list-container">
        {familyData && familyData.length > 0 && (
          <ul>
            {familyData.map((data, index) => (
              <li key={index}>
                <div className="info-text">{data.family_id} : {data.familyName} - {data.email}</div>
                <div className="info-button-container">
                  <button onClick={() => handleEdit(index)} className="btn--mini btn--yellow">
                    編集
                  </button>
                  <button onClick={() => handleDelete(data.family_id)} className="btn--mini btn--red">
                    削除
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FamilyProfile;
