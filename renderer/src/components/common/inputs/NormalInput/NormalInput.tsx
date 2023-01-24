/* eslint-disable react/jsx-props-no-spreading */
import { Input, InputProps } from 'antd';
import { Controller } from 'react-hook-form';
import InputWrapper from './NormalInput.styles';

type NormalInputPropsType = InputProps & {
  control: any;
  name: string;
};

export default function NormalInput({
  control,
  name,
  ...props
}: NormalInputPropsType) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={props.defaultValue}
      render={({ field: { onChange, value } }) => (
        <InputWrapper {...props} value={value} onChange={v => onChange(v)} />
      )}
    />
  );
}
