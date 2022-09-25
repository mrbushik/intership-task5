import React from 'react';

function SelectField({ label, value, onChange, options, error, name, selectId }) {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-1">
      <h5 className="mb-2">{label}</h5>
      <select className={'form-select'} id={name} name={name} value={value} onChange={handleChange}>
        <option value=""></option>
        {options &&
          options.map((option, index) => (
            <option value={selectId[index]} key={index}>
              {option.userName}
            </option>
          ))}
      </select>
    </div>
  );
}

export default SelectField;
