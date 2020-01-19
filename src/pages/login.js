import React, { Fragment, useRef, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Grid, Button, TextField, CssBaseline, Typography, AppBar, Toolbar } from '@material-ui/core';

import User from '../models/user';

import Constants from '../utils/constants';

import LoginStore from '../redux-mock/login-store';

const Login = () => {

    //In react it's good to consider userRef as dom read is faster 
    //and write gives faster percieved performance
    //It's a concious usage after adding some thoughts 
    const userName = useRef('');
    const password = useRef('');


    const [user,setUser] = useState({});

    useEffect(()=>{
        LoginStore.set("user",user
        );
    },[user]);


    //componentDidMount
    useEffect(() => {
      
        //componentWillUnmount
        return () => {
         
        }
      }, []);

    const _login = () => {
        //Get data from firebase
        //as every query is new, it is not possible to extract a variable from Users Instance
        new User()
            .byEmail(userName.current.value.toLowerCase())
            .byPassword(password.current.value)
            .get().then((snapshot) => {
                if (!snapshot.empty) {
                    //treating userId as sessionId
                   setUser({
                    "userId": User.getUserId(snapshot.docs[0]),
                    "userName": User.getUserName(snapshot.docs[0])
                });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    if(user["userId"] != null){
        return <Redirect to="/landing" />;
    } else {
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

    
}

export default Login;