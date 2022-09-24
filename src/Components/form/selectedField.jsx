import React from 'react';

function SelectField({ label, value, onChange, options, error, name }) {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '');
  };
  const optionsArray = Object.values(options);
  console.log(optionsArray);
  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}>
        {optionsArray &&
          optionsArray.map((option, index) => (
            <option value={Object.keys(options)[index]} key={index}>
              {option.userName}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default SelectField;
