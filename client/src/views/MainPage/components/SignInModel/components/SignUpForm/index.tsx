import {
  Button,
  Grid,
  LinearProgress,
} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
});

const SignUpForm = (): JSX.Element => (
  <Formik
    initialValues={{
      email: '',
      password: '',
      passwordConfirm: '',
    }}
    validationSchema={LoginSchema}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        alert(JSON.stringify(values, null, 2));
      }, 500);
    }}
  >
    {({ submitForm, isSubmitting }) => (
      <Form>
        <Grid container spacing={2}>
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
              Login
            </Button>
          </Grid>
        </Grid>
      </Form>
    )}
  </Formik>
);

export default SignUpForm;
