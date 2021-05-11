import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  LinearProgress,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React, { useState } from 'react';
import { userService } from 'services/user.service';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  newEmail: Yup.string(),
  oldEmail: Yup.string()
    .email('Invalid email')
    .when('newEmail', {
      is: newEmail => newEmail != null,
      then: Yup.string()
        .email('Invalid email')
        .required('Old email is required'),
    }),
  newPassword: Yup.string(),
  oldPassword: Yup.string().when('newPassword', {
    is: newPassword => newPassword != null,
    then: Yup.string().required('Old password is required'),
  }),
});

const SettingsForm = ({
  handleClose,
}: {
  handleClose: () => void;
}): JSX.Element => {
  const [error, setError] = useState('');

  return (
    <Formik
      initialValues={{
        newEmail: '',
        oldEmail: '',
        newPassword: '',
        oldPassword: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values: any, { setSubmitting }) => {
        try {
          setError('');
          setSubmitting(true);
          await userService.updateUser(values);
          setSubmitting(false);
          handleClose();
        } catch (e) {
          setError(e.response.data.message);
        }
      }}
    >
      {({ values, submitForm, isSubmitting }) => (
        <Form>
          <DialogContent>
            <Grid container spacing={2}>
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error}
                  </Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <Field
                  variant={'outlined'}
                  component={TextField}
                  name="newEmail"
                  fullWidth
                  type="email"
                  label="New Email"
                />
              </Grid>
              {values.newEmail !== '' && (
                <Grid item xs={12}>
                  <Field
                    variant={'outlined'}
                    component={TextField}
                    name="oldEmail"
                    fullWidth
                    type="email"
                    label="Previous Email"
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Field
                  variant={'outlined'}
                  component={TextField}
                  type="password"
                  label="New Password"
                  fullWidth
                  name="newPassword"
                />
              </Grid>
              {values.newPassword !== '' && (
                <Grid item xs={12}>
                  <Field
                    variant={'outlined'}
                    component={TextField}
                    type="password"
                    label="Previous Password"
                    fullWidth
                    name="oldPassword"
                  />
                </Grid>
              )}
              {isSubmitting && (
                <Grid item xs={12}>
                  <LinearProgress />
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={submitForm} color="primary">
              Save
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default SettingsForm;
