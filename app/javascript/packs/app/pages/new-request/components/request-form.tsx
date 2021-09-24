import { Button, FormControl, FormHelperText, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import React from 'react'
import PhoneInput from 'react-phone-input-2';
import { Material } from '../../../models/material';
import FormikSelect from './formik-select';
import MapComponent from './my-map-component';
import * as Yup from 'yup';
import { useHistory } from 'react-router';

export interface RequestFormProps {
  materials: Material[]
}


const RequestForm = ({ materials }) => {

  const request_schema = Yup.object().shape({
    material_id: Yup.string().required('You must fill the material').oneOf(materials.map(el => el.id.toString()), `Material must be one of ${materials.map(el => el.name)}`),
    lat: Yup.number().transform(value => (isNaN(value) ? undefined : value)).required("This value is required"),
    lng: Yup.number().transform(value => (isNaN(value) ? undefined : value)).required("This value is required"),
    phone_number: Yup.string().required(),
    area: Yup.number().transform(value => (isNaN(value) ? undefined : value)).required("This value is required").positive()
  });
  const history = useHistory();

  const handleSubmit = async (values, { setSubmitting }) => {
    const response = await fetch('/api/requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ request: values })
    });

    const responseJson = await response.json();
    console.log("response json ", responseJson);

    if (response.status === 200 && responseJson.success) {
      // request created successfully.
      history.push(`/request/${responseJson.data.id}/providers`)
    } else {
      console.error('An error presented while creating the request');
    }

    setSubmitting(false);
  }

  return (
    <>
      <Typography gutterBottom variant="h5" component="div">
        New Request
      </Typography>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          material_id: '',
          area: '',
          phone_number: '',
          lat: null,
          lng: null
        }}
        validationSchema={request_schema}>
        {
          ({ handleSubmit, values, handleChange, touched, errors, setFieldValue, isSubmitting }) => {
            const showAddressError = (touched.lat && touched.lng) && !!(errors.lat || errors.lng)

            return (
              <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                  <FormikSelect
                    variant="standard"
                    className="mt-8"
                    name="material_id"
                    label="Material"
                    options={materials}
                    fullWidth />
                  <FormControl variant="standard">
                    <PhoneInput
                      country={'de'}
                      value={values.phone_number}
                      onChange={phone => setFieldValue('phone_number', phone)} />
                    {
                      touched.phone_number && errors.phone_number && (
                        <FormHelperText
                          id="phone-input-helper-text"
                          error={touched.phone_number && !!errors.phone_number}>
                          You must set a phone number
                        </FormHelperText>
                      )
                    }
                  </FormControl>
                  <FormControl error variant="standard">
                    <Typography variant="body1">Address</Typography>
                    <Typography variant="body2">Select an address by clicking on the map</Typography>
                    <MapComponent />
                    <FormHelperText
                      id="component-helper-text"
                      error={showAddressError}>
                      {
                        showAddressError && (
                          <span>
                            You must select an address!
                          </span>
                        )
                      }
                    </FormHelperText>
                  </FormControl>
                  <FormControl variant="standard">
                    <TextField
                      InputProps={{
                        endAdornment: <InputAdornment position="end">m²</InputAdornment>
                      }}
                      name='area'
                      label="Area"
                      type="number"
                      placeholder='Area (square meters)'
                      value={values.area}
                      onChange={handleChange}
                      error={touched.area && Boolean(errors.area)}
                      helperText={touched.area && errors.area}>
                    </TextField>
                  </FormControl>
                  <div className="flex row-reverse">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="contained">
                      Create request
                    </Button>
                  </div>
                </Stack>
              </form>
            )
          }
        }
      </Formik>
    </>
  )
}

export default RequestForm;