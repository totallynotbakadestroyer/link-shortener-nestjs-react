import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { login } from 'actions/user.actions';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'store';
import { LoginCredentials } from 'types';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const LoginForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values: LoginCredentials, { setSubmitting }) => {
        setSubmitting(true);
        try {
          await dispatch(login(values));
          history.push('/dashboard');
        } catch (e) {
          setSubmitting(false);
        }
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Grid container spacing={2}>
            {users.loginError && (
              <Grid item xs={12}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {users.loginError}
                </Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Field
                variant={'outlined'}
                component={TextField}
                name="email"
                fullWidth
                type="email"
                label="Email"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                variant={'outlined'}
                component={TextField}
                type="password"
                label="Password"
                fullWidth
                name="password"
              />
            </Grid>
            {users.loading && (
              <Grid item xs={12}>
                <LinearProgress />
              </Grid>
            )}
            <Grid item xs={12}>
              <Box textAlign={'end'} mt={1}>
                <Typography variant={'subtitle2'}>Forgot password?</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
