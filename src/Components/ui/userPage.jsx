/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-computed-key */
import React from 'react';
import SelectField from '../form/selectedField';
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
    const dateNow = Date().toString().substring(4, 24);
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const updateData = async () => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let raw = JSON.stringify({
      topic: data.topic,
      massage: data.massage,
      sender: userEmailValue,
      sendingTime: data.date,
    });

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    await fetch(
      `https://task5-4489d-default-rtdb.europe-west1.firebasedatabase.app/users/${data.select}/massages.json`,
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };
  const submitMassage = () => {
    const dateNow = Date().toString().substring(4, 24);
    handleChange({ name: 'date', value: dateNow });
    updateData();
  };
  const indexCurrentUser = Object.values(listOfUsers).findIndex(
    (item) => item.userName === userEmailValue,
  );
  const currentUser = Object.values(listOfUsers)[indexCurrentUser].massages;

  const arrayOfUsers = Object.values(listOfUsers);
  const idOfUsers = Object.keys(listOfUsers);
  arrayOfUsers.splice(indexCurrentUser, 1);
  idOfUsers.splice(indexCurrentUser, 1);
  return (
    <div>
      <div className="text-primary">
        Email авторизованного пользователя: {userEmailValue && userEmailValue}
      </div>
      <div className="d-flex">
        <div className="p-3">
          <SelectField
            options={arrayOfUsers}
            name="select"
            label="Выберите получателя"
            selectId={idOfUsers}
            onChange={handleChange}
          />
          <h3 className="mb-2">Тема письма</h3>
          <TextField label="" name="topic" value={data.topic} onChange={handleChange} />
          <h3 className="mb-2">Ваше сообщение</h3>
          <TextField label="" name="massage" value={data.massage} onChange={handleChange} />
          <button className="btn btn-primary mt-3" onClick={submitMassage}>
            Отправить
          </button>
          {massageError && <p>{massageError}</p>}
        </div>
        <div className="d-flex" style={{ height: 'auto' }}>
          <div className="vr"></div>
        </div>
        <div className="p-3">
          <h3>Ваши сообщения</h3>
          <ReseivedMessages massagesList={currentUser} />
        </div>
      </div>
    </div>
  );
}

export default UsersList;
