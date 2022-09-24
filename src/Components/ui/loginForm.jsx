/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-computed-key */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import TextField from '../form/textFiled';
function LoginForm({ onChangeAuth, usersList, onEmail }) {
  const [data, setData] = React.useState({
    userName: '',
    massages: [],
  });
  const [loginUserData, setLoginUserData] = React.useState([]);
  const [check, setCheck] = React.useState(true);
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleSubmitNowDate = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      userName: data.userName,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'https://task5-4489d-default-rtdb.europe-west1.firebasedatabase.app/users.json',
      requestOptions,
    )
      .then((response) => response.text())
      .then((result) => onChangeAuth(true))
      .then((result) => onEmail(data.userName))
      .catch((error) => console.log('error', error));
  };
  const submitData = async () => {
    let receivedUsers = Object.values(usersList).map((item) => item);
    let correctUserName = receivedUsers.find((item) => item.userName === data.userName);
    if (correctUserName) {
      setCheck(true);
      console.log('этот ник есть');
      onEmail(data.userName);
      onChangeAuth(true);
    } else {
      setCheck(true);
      console.log('этого ника нет');
      handleSubmitNowDate();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.username === '') {
      setCheck(false);
      return;
    } else {
      submitData();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField label="userName" name="userName" value={data.userName} onChange={handleChange} />

      <button className="btn btn-primary w-100 mx-auto mt-4 mb-4" type="submit">
        Submit
      </button>
      {check ? '' : <p className="text-danger">произошла ошибка заполните данные правильно</p>}
    </form>
  );
}

export default LoginForm;
