/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-computed-key */
import React from 'react';
import SelectField from '../form/selectedField';
import TextArreaField from '../form/textArreaField';
import TextField from '../form/textFiled';
import ReseivedMessages from './reseivedMessages';
import User from './user';

function UsersList({ listOfUsers, onUpdate, onChangeAuth, userEmailValue }) {
  const [massageError, setMassageError] = React.useState('');
  const [data, setData] = React.useState({
    topic: '',
    massage: '',
    select: '',
    date: '',
  });
  const handleChange = (target) => {
    setMassageError('');
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const clearData = () => {
    setData({
      topic: '',
      massage: '',
      select: '',
      date: '',
    });
  };

  const updateData = async () => {
    const dateNow = Date().toString().substring(4, 24);
    // handleChange({ name: 'date', value: dateNow })
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let raw = JSON.stringify({
      topic: data.topic,
      massage: data.massage,
      sender: userEmailValue,
      sendingTime: dateNow,
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    await fetch(
      `https://task5-4489d-default-rtdb.europe-west1.firebasedatabase.app/users/${data.select}/massages.json`,
      // 'https://jsonplaceholder.typicode.com/posts',
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => clearData())
      .catch((error) => console.log('error', error));
  };
  const submitMassage = () => {
    if (!data.massage || !data.topic) {
      setMassageError('Поля с сообщением и темой сообщения');
    } else if (!data.select) {
      setMassageError('Выберите кому вы хотите отправить сообщение');
    } else {
      updateData();
    }
  };
  const indexCurrentUser = Object.values(listOfUsers).findIndex(
    (item) => item.userName === userEmailValue,
  );
  const currentUser = Object.values(listOfUsers)[indexCurrentUser].massages;

  const arrayOfUsers = Object.values(listOfUsers);
  const idOfUsers = Object.keys(listOfUsers);
  arrayOfUsers.splice(indexCurrentUser, 1);
  let currentUserId = idOfUsers.splice(indexCurrentUser, 1);
  // console.log(currentUserId);
  return (
    <div>
      <div className="text-primary m-3">
        Email авторизованного пользователя: {userEmailValue && userEmailValue}
      </div>
      <div className="d-flex">
        <div className="m-3 ">
          <SelectField
            options={arrayOfUsers}
            name="select"
            label="Выберите получателя"
            selectId={idOfUsers}
            value={data.select}
            onChange={handleChange}
          />
          <h5 className="mb-2">Тема письма</h5>
          <TextField
            label=""
            name="topic"
            value={data.topic}
            type="textarrea"
            onChange={handleChange}
          />
          <h5 className="mb-2">Ваше сообщение</h5>
          <TextArreaField name="massage" value={data.massage} onChange={handleChange} />
          {massageError && <p className="text-danger mt-2 mb-0">{massageError}</p>}

          <button className="btn btn-primary mt-3" onClick={submitMassage}>
            Отправить
          </button>
        </div>
        <div className="d-flex" style={{ height: 'auto' }}>
          <div className="vr"></div>
        </div>
        <div className="m-3 ms-4">
          <h3 className="fw-bolder mb-4">Ваши сообщения</h3>
          {listOfUsers && (
            <ReseivedMessages currentUserId={currentUserId} massagesList={currentUser} />
          )}
        </div>
      </div>
    </div>
  );
}

export default UsersList;
