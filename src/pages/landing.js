import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router';
import { CssBaseline, ListItem, ListItemText } from '@material-ui/core';

import Constants from '../utils/constants';
import AppBarCustom from '../utils/appBar';


const Landing = () => {

    const [nextPage, setNextPage] = useState(null);
    
    let toRender;
    switch (nextPage) {
        case "admin":
            toRender = <Redirect push to="/admin-home" />;
            break;
        case "employee":
            toRender = <Redirect push to="/employee-home" />;
            break;
        default:
            toRender = (<Fragment><CssBaseline />
                <AppBarCustom title={Constants.TITLE.WELCOME} />
                <ListItem>
                    <ListItem button onClick={() => { setNextPage("employee") }}>
                        <ListItemText primary={Constants.LABEL.EMPLOYEE} />
                    </ListItem >

                    <ListItem button onClick={() => { setNextPage("admin") }}>
                        <ListItemText primary={Constants.LABEL.ADMIN} />
                    </ListItem >
                </ListItem>
            </Fragment>);
            break;
    }

    return toRender;
}

export default Landing;