import React from 'react';

function SelectField({ label, value, onChange, options, error, name, selectId }) {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '');
  };
  return (
    <div className="mb-1">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}>
        <option value=""></option>
        {options &&
          options.map((option, index) => (
            <option value={selectId[index]} key={index}>
              {option.userName}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default SelectField;
