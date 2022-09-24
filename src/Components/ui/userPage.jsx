/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-computed-key */
import React from 'react';
import SelectField from '../form/selectedField';
import TextField from '../form/textFiled';
import User from './user';

function UsersList({ listOfUsers, onUpdate, onChangeAuth, userEmailValue }) {
  const [data, setData] = React.useState({
    topic: '',
    massage: '',
    select: '',
  });
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const updateData = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      topic: data.topic,
      massage: data.massage,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      `https://task5-4489d-default-rtdb.europe-west1.firebasedatabase.app/users/${data.select}/massages.json`,
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  };

  return (
    <>
      <div className="text-primary">
        Email авторизованного пользователя: {userEmailValue && userEmailValue}
      </div>
      <SelectField options={listOfUsers} name="select" label="you select" onChange={handleChange} />
      <h3>Тема письма</h3>
      <TextField label="" name="topic" value={data.topic} onChange={handleChange} />
      <h3>Ваше сообщение</h3>
      <TextField label="" name="massage" value={data.massage} onChange={handleChange} />

      <button className="btn btn-primary" onClick={updateData}>
        Отправить
      </button>
    </>
  );
}

export default UsersList;
