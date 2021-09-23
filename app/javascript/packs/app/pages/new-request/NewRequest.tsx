import { Field, Formik } from 'formik';
import React from 'react';

const NewRequest = () => {
  return (
    <>
      <p>New Request</p>
      <Formik onSubmit={() => {}} initialValues={{}}>
        {
          ({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="request.material" placeholder="Material" as="select">
                <option value="1">Wood</option>
                <option value="1">Carpet</option>
                <option value="1">Tiles</option>
              </Field>
            </form>
          )
        }
      </Formik>
    </>
  )
};

export default NewRequest;