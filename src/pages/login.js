import React, { Fragment, useRef, useState } from 'react';
import { Redirect } from 'react-router';
import { Grid, Button, TextField, CssBaseline, Typography, AppBar, Toolbar } from '@material-ui/core';

import User from '../models/user';

import Constants from '../utils/constants';

const Login = () => {

    //In react it's good to consider userRef as dom read is faster 
    //and write gives faster percieved performance
    //It's a concious usage after adding some thoughts 
    const userName = useRef('');
    const password = useRef('');

    const _login = () => {
        //Get data from firebase
        //as every query is new, it is not possible to extract a variable from Users Instance
        new User()
            .byEmail(userName.current.value.toLowerCase())
            .byPassword(password.current.value)
            .get().then((snapshot) => {
                if (!snapshot.empty) {
                    //treating userId as sessionId
                    let userId = User.getUserId(snapshot.docs[0]);
                    alert(userId);

                }
            })
            .catch((err) => {
                console.log(err);
            });
    }




    return (<Fragment>
        <CssBaseline />
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" color="inherit">
                    {Constants.TITLE.LOGIN}
                </Typography>
            </Toolbar>
        </AppBar>

        <Grid container spacing={1} align="center" justify="center" direction="column">
            <Grid item>
                <TextField label="Email" inputRef={userName} />
            </Grid>
            <Grid item>
                <TextField type="password" label="Password"
                    inputRef={password} />
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" onClick={_login}>
                    {Constants.BUTTON.LOGIN}
                </Button>
            </Grid>
        </Grid>
    </Fragment>);
}

export default Login;