import { Button, Grid, LinearProgress } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { signUp } from 'actions/user.actions';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { SignUpCredentials } from 'types';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
});

const SignUpForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users);

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={(values: SignUpCredentials, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        dispatch(signUp(values, resetForm));
        setSubmitting(false);
      }}
    >
      {({ submitForm, isSubmitting }) => (
        <Form>
          <Grid container spacing={2}>
            {users.signUpError && (
              <Grid item xs={12}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  {users.signUpError}
                </Alert>
              </Grid>
            )}
            {users.signUpSuccess && (
              <Grid item xs={12}>
                <Alert severity="success">
                  <AlertTitle>Success</AlertTitle>
                  Congrats! You have successfully created your account. You can
                  log in now!
                </Alert>
              </Grid>
            )}
            <Grid item xs={12}>
              <Field
                variant={'outlined'}
                component={TextField}
                name="username"
                fullWidth
                label="Username"
              />
            </Grid>
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
            <Grid item xs={12} md={6}>
              <Field
                variant={'outlined'}
                component={TextField}
                type="password"
                label="Password"
                fullWidth
                name="password"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Field
                variant={'outlined'}
                component={TextField}
                type="password"
                label="Password confirmation"
                fullWidth
                name="passwordConfirm"
              />
            </Grid>
            {isSubmitting && (
              <Grid item xs={12}>
                <LinearProgress />
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
              >
                Sign up
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
