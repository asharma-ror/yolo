import { Box, makeStyles, Theme, Typography } from "@material-ui/core"
import React from "react"
import { indexes } from "../../../../../utils/arrayUtils"
import CustomerFormFields from "../CustomerFormFields/CustomerFormFields"
import PassengerFormFields from "../PassengerFormFields/PassengerFormFields"
import { Occupancy } from "../../../../../features/checkout/checkoutTypes"

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    margin: theme.spacing(2, 0),
  },
  formTitle: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(1),
  },
}))

interface Props {
  occupancy: Occupancy
  register: any
  control: any
  errors: any
}

const AdditionalPassenger = ({
  paxIndex,
  roomIndex,
  register,
  control,
  errors,
}: any) => {
  const classes = useStyles()
  return (
    <div>
      <Box mb={1}>
        <Typography variant="h6" className={classes.formTitle}>
          Dati passeggero {paxIndex + 1}
        </Typography>
      </Box>
      <PassengerFormFields
        roomIndex={roomIndex}
        passengerIndex={paxIndex}
        register={register}
        control={control}
        errors={errors}
      />
    </div>
  )
}

const TravelersForm = ({ occupancy, register, control, errors }: Props) => {
  const classes = useStyles()
  return (
    <div>
      <form noValidate className={classes.form}>
        <Typography variant="h6" className={classes.formTitle}>
          Inserisci i tuoi dati
        </Typography>
        <CustomerFormFields
          register={register}
          control={control}
          errors={errors}
        />
        {indexes(1, occupancy.rooms[0].totAdults - 1).map((paxIndex) => (
          <AdditionalPassenger
            key={`pax-${paxIndex}`}
            roomIndex={0}
            paxIndex={paxIndex - 1}
            register={register}
            control={control}
            errors={errors}
          />
        ))}
        {occupancy.rooms.length > 1 ? (
          <>
            {indexes(1, occupancy.rooms.length - 1).map((roomIndex) => (
              <Box key={`room-${roomIndex}`} my={2}>
                <Typography variant="h6" className={classes.formTitle}>
                  Stanza {roomIndex + 1}
                </Typography>
                {indexes(0, occupancy.rooms[roomIndex].totAdults).map(
                  (paxIndex) => (
                    <AdditionalPassenger
                      key={`pax-${roomIndex}-${paxIndex}`}
                      roomIndex={roomIndex}
                      paxIndex={paxIndex}
                      register={register}
                      control={control}
                      errors={errors}
                    />
                  )
                )}
              </Box>
            ))}
          </>
        ) : undefined}
      </form>
    </div>
  )
}

export default TravelersForm
