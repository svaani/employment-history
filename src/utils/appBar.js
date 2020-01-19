import React, {useState } from 'react';
import { Redirect,useHistory } from 'react-router';
import { AppBar, Button, IconButton, Typography, Toolbar } from '@material-ui/core';

import Constants from './constants';

import LoginStore from '../redux-mock/login-store';

const AppBarCustom = (props) => {

    const [loginStatus, setLoginStatus] = useState(LoginStore.get("user") == null || LoginStore.get("user")["userId"] == null);
    const history = useHistory();

    const _logout = () => {
        LoginStore.set({});
        setLoginStatus(false);
        history.push("/login");
    }

    if (loginStatus) {
        return <Redirect to="/login" />;
    } else
        return <AppBar position="static">
            <Toolbar>
                <Typography style={{ "width": "90%" }} variant="h6" color="inherit">
                       {props.title}
                </Typography>
                <Button style={{ "display": "inline-block" }}
                    onClick={ _logout}
                    color="inherit">
                    Logout
            </Button>
            </Toolbar>
        </AppBar>;
}

export default AppBarCustom;

/* <IconButton edge="end" color="inherit" aria-label="menu"
                onClick={() => {
                    window.location.href = localStorage.getItem("role") == Constants.ROLES.END_USER
                        ?
                        "/end-user-landing" : "/admin-landing"
                }}>
                Home   |
            </IconButton>*/