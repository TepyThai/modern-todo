import React from 'react';
import Select from 'react-select';
import styled from 'styled-components/macro';

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',
  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10
  }
});

const colorStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white', width: 200 }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = data.color;
    return {
      ...styles,
      backgroundColor: isSelected ? color : isFocused ? color : null,
      width: 200,
      ':active': {
        ...styles[':active'],
        backgroundColor: isSelected ? color : color
      }
    };
  },
  input: styles => ({ ...styles, ...dot(), width: 200 }),
  placeholder: styles => ({ ...styles, ...dot(), width: 200 }),
  singleValue: (styles, { data }) => ({
    ...styles,
    ...dot(data.color)
  }),
  menu: styles => ({ ...styles, width: 200 })
};

function Selector({ field, form, options, name, onChange, ...props }) {
  return (
    <Select
      css={`
        margin-bottom: 10px;
      `}
      styles={colorStyles}
      name={field ? field.name : name}
      value={
        field
          ? options.find(option => option.value === field.value)
          : options.value
      }
      onChange={
        field
          ? option => form.setFieldValue(field.name, option.value)
          : option => onChange(option.value)
      }
      {...props}
      options={options}
      onBlur={field ? field.onBlur : null}
      defaultValue={options[0]}
    />
  );
}

export default Selector;
