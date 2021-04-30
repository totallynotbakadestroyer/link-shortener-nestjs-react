import {
  Dialog,
  Paper,
  Tab,
} from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import React, { Dispatch, SetStateAction } from 'react';

import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

type SignInProps = {
  tab: string;
  setTab: Dispatch<SetStateAction<'login' | 'signup'>>;
  open: boolean;
  handleClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const SignInModel = ({
  open,
  handleClose,
  tab,
  setTab,
}: SignInProps): JSX.Element => {
  const handleTabChange = (
    event: React.ChangeEvent<unknown>,
    newValue: 'login' | 'signup',
  ) => {
    setTab(newValue);
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <Paper>
        <TabContext value={tab}>
          <TabList variant={'fullWidth'} onChange={handleTabChange}>
            <Tab label="Create new account" value="signup" />
            <Tab label="Log in to existing account" value="login" />
          </TabList>
          <TabPanel value="signup">
            <SignUpForm />
          </TabPanel>
          <TabPanel value="login">
            <LoginForm />
          </TabPanel>
        </TabContext>
      </Paper>
    </Dialog>
  );
};

export default SignInModel;
