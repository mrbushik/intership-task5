import React from 'react';

function SelectField({ label, value, onChange, name, userEmailValue }) {
  let arrayOfUsers;
  let idOfUsers;
  let currentUserId;

  const [massageList, setUsersList] = React.useState();
  React.useEffect(() => {
    handleRequest();
  }, []);

  React.useEffect(() => {
    setInterval(() => {
      handleRequest();
    }, 5000);
  }, []);

  const handleRequest = () => {
    fetch(`https://task5-4489d-default-rtdb.europe-west1.firebasedatabase.app/users.json`)
      .then((response) => response.json())
      .then((json) => setUsersList(json));
  };
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  if (massageList) {
    const indexCurrentUser = Object.values(massageList).findIndex(
      (item) => item.userName === userEmailValue,
    );
    arrayOfUsers = Object.values(massageList);
    arrayOfUsers.splice(indexCurrentUser, 1);
    idOfUsers = Object.keys(massageList);
    idOfUsers.splice(indexCurrentUser, 1);
  }
  return (
    <div className="mb-1">
      <h5 className="mb-2">{label}</h5>
      <select className={'form-select'} id={name} name={name} value={value} onChange={handleChange}>
        <option value=""></option>
        {arrayOfUsers &&
          arrayOfUsers.map((option, index) => (
            <option value={idOfUsers[index]} key={index}>
              {option.userName}
            </option>
          ))}
      </select>
    </div>
  );
}

export default SelectField;
