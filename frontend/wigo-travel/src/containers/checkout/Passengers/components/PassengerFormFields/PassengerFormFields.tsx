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

interface Params {
  roomIndex: number
  passengerIndex: number
  register: any
  control: any
  errors: any
}

const roomsPrefix = "rooms"
const passengerPrefix = "passengers"
const arrayFieldName = (
  roomIndex: number,
  passengerIndex: number,
  name: string
) =>
  `${roomsPrefix}[${roomIndex}][${passengerPrefix}][${passengerIndex}][${name}]`
const getError = (
  errors: any,
  roomIndex: number,
  passengerIndex: number,
  fieldName: string
) =>
  errors &&
  errors[roomsPrefix] &&
  errors[roomsPrefix][roomIndex] &&
  errors[roomsPrefix][roomIndex][passengerPrefix] &&
  errors[roomsPrefix][roomIndex][passengerPrefix][passengerIndex] &&
  errors[roomsPrefix][roomIndex][passengerPrefix][passengerIndex] &&
  errors[roomsPrefix][roomIndex][passengerPrefix][passengerIndex][fieldName]
const hasError = (
  errors: any,
  roomIndex: number,
  passengerIndex: number,
  fieldName: string
) => getError(errors, roomIndex, passengerIndex, fieldName) !== undefined

const PassengerFormFields = ({
  roomIndex,
  passengerIndex,
  register,
  control,
  errors,
}: Params) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name={arrayFieldName(roomIndex, passengerIndex, "name")}
            inputRef={register}
            label="Nome"
            variant="outlined"
            size="small"
            fullWidth
            autoComplete="off"
            error={hasError(errors, roomIndex, passengerIndex, "name")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name={arrayFieldName(roomIndex, passengerIndex, "surname")}
            inputRef={register}
            label="Cognome"
            variant="outlined"
            size="small"
            fullWidth
            autoComplete="off"
            error={hasError(errors, roomIndex, passengerIndex, "surname")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomBirthdayPicker
            required
            inputName={arrayFieldName(roomIndex, passengerIndex, "birthday")}
            inputRef={register}
            label="Data di nascita"
            variant="outlined"
            size="small"
            fullWidth
            autoComplete="off"
            error={hasError(errors, roomIndex, passengerIndex, "birthday")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            variant="outlined"
            fullWidth
            size="small"
            error={hasError(errors, roomIndex, passengerIndex, "gender")}
          >
            <InputLabel
              id={`pax${passengerIndex}-room${roomIndex}-gender-label`}
            >
              Sesso
            </InputLabel>
            <Controller
              as={
                <Select
                  labelId={`pax${passengerIndex}-room${roomIndex}-gender-label`}
                  id={`pax${passengerIndex}-room${roomIndex}-gender`}
                  required
                  label="Sesso"
                  inputRef={register}
                >
                  <MenuItem value={"Male"}>Maschio</MenuItem>
                  <MenuItem value={"Female"}>Femmina</MenuItem>
                </Select>
              }
              name={arrayFieldName(roomIndex, passengerIndex, "gender")}
              control={control}
            ></Controller>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

export default PassengerFormFields
