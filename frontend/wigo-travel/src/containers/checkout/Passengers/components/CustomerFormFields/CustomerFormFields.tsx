import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core"
import React from "react"
import { Controller } from "react-hook-form"
import CustomBirthdayPicker from "../../../../../components/ui/molecules/CustomBirthdayPicker"

const prefix = "customer"
const fieldName = (name: string) => `${prefix}[${name}]`
const getError = (errors: any, fieldName: string) =>
  errors && errors[prefix] && errors[prefix][fieldName]
const hasError = (errors: any, fieldName: string) =>
  getError(errors, fieldName) !== undefined

interface Props {
  register: any
  control: any
  errors: any
}

const CustomerFormFields = ({ register, control, errors }: Props) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name={fieldName("name")}
            inputRef={register}
            label="Nome"
            variant="outlined"
            size="small"
            fullWidth
            autoComplete="given-name"
            error={hasError(errors, "name")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name={fieldName("surname")}
            inputRef={register}
            label="Cognome"
            variant="outlined"
            size="small"
            fullWidth
            autoComplete="family-name"
            error={hasError(errors, "surname")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomBirthdayPicker
            required
            inputName={fieldName("birthday")}
            inputRef={register}
            label="Data di nascita"
            variant="outlined"
            size="small"
            fullWidth
            autoComplete="bday"
            error={hasError(errors, "birthday")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            variant="outlined"
            fullWidth
            size="small"
            error={hasError(errors, "gender")}
          >
            <InputLabel id="customer-gender-label">Sesso</InputLabel>
            <Controller
              as={
                <Select
                  labelId="customer-gender-label"
                  id="customer-gender"
                  required
                  label="Sesso"
                  inputRef={register}
                >
                  <MenuItem value={"Male"}>Maschio</MenuItem>
                  <MenuItem value={"Female"}>Femmina</MenuItem>
                </Select>
              }
              name={fieldName("gender")}
              control={control}
            ></Controller>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name={fieldName("taxCode")}
            inputRef={register}
            label="Codice fiscale"
            variant="outlined"
            size="small"
            fullWidth
            error={hasError(errors, "taxCode")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name={fieldName("email")}
            inputRef={register}
            label="Email"
            type="email"
            variant="outlined"
            size="small"
            fullWidth
            autoComplete="email"
            error={hasError(errors, "email")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name={fieldName("phone")}
            inputRef={register}
            label="Cellulare"
            variant="outlined"
            size="small"
            fullWidth
            autoComplete="tel"
            error={hasError(errors, "phone")}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default CustomerFormFields
