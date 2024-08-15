import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment"
export const FormInputText = ({ name, control, label, number, position, adornment }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error?.message}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          type={number ? "number" : null}
          InputProps={{
            endAdornment: <InputAdornment position="end">{adornment}</InputAdornment>,
          }}
        />
      )}
    />
  );
};