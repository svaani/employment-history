import React, { Fragment, useState,useLayoutEffect } from 'react';
import { Grid, Button, CssBaseline, List, ListItem, ListItemText, Typography, Divider } from '@material-ui/core';
import Constants from '../../utils/constants';
import AppBarCustom from '../../utils/appBar';

import LoginStore from '../../redux-mock/login-store';

import Company from '../../models/company';


const AdminHome = () => {

    const [companyList, setCompanyList] = useState([]);


    //componentWillMount
    useLayoutEffect(() => {
        new Company()
            .byOwned(LoginStore.get("user")["userId"])
            .get()
            .then((listSnapshot) => {
                setCompanyList(listSnapshot.docs);
            });
    }, []);

    return (<Fragment><CssBaseline />
        <AppBarCustom title={Constants.TITLE.ADMIN_HOME} />
        {companyList.map((company)=>{
            return <List>
                <ListItem>
                    {Company.getName(company)}
                </ListItem>
            </List>
        })}
    </Fragment>);
}

export default AdminHome;