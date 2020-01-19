import React, { Fragment, useLayoutEffect, useState } from 'react';
import { Grid, Button, CssBaseline, List, ListItem, ListItemText, Typography, Divider } from '@material-ui/core';
import { Redirect, useHistory } from 'react-router';
import Company from '../../models/company';

import EmploymentHistory from '../../models/employmentHistory';

import Constants from '../../utils/constants';
import AppBarCustom from '../../utils/appBar';

import LoginStore from '../../redux-mock/login-store';

const EmployeeHome = () => {

    const [employeeHistory, setEmployeeHistory] = useState(null);
    const [companyList, setCompanyList] = useState([]);

    const history = useHistory();

    //componentWillMount
    useLayoutEffect(() => {
        new EmploymentHistory()
            .byUserId(LoginStore.get("user")["userId"])
            .get()
            .then((listSnapshot) => {
                setEmployeeHistory(listSnapshot.docs);
            });

        new Company()
            .byOwned(LoginStore.get("user")["userId"])
            .get()
            .then((listSnapshot) => {
                setCompanyList(listSnapshot.docs);
            });
    }, []);

    const _getCompanyName = (employee) => {
        let companyVal = EmploymentHistory.getCompany(employee);
      
        let newCompany = companyList.find((company)=>{
            return Company.getId(company) == companyVal;
        });
        return newCompany!= null ? Company.getName(newCompany) : companyVal;
    }

    return (<Fragment>
        <CssBaseline />
        <AppBarCustom title={Constants.TITLE.EMPLOYEE_HOME} />
        <Grid container spacing={1} justify="space-evenly" direction="row">
            <Grid item>
                <Typography variant="h6" color="inherit">
                    {employeeHistory == null ?
                        Constants.Loading :
                        employeeHistory.length == 0
                            ?
                            Constants.ALERT.NODATA :
                            Constants.ALERT.HISTORY}
                </Typography>
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" onClick={() => { history.push("/add-record"); }}>
                    {Constants.BUTTON.ADD}
                </Button>
            </Grid>
        </Grid>
        {
            employeeHistory != null && employeeHistory.length > 0
                ?
                <List>
                    {employeeHistory.map((employee) => {
                        return (<Fragment><ListItem>
                            <Grid container spacing={1} justify="space-evenly" direction="column">
                                <Grid container spacing={1} justify="space-between" direction="row">
                                    <Grid item>    From Date : <ListItemText primary={EmploymentHistory.getFromDate(employee)} />
                                    </Grid>
                                    <Grid item>To Date : <ListItemText primary={EmploymentHistory.getFromDate(employee)} />
                                    </Grid>
                                    <Grid item>    Role  <ListItemText primary={EmploymentHistory.getRole(employee)} />
                                    </Grid>
                                    <Grid item>    Company  <ListItemText primary={_getCompanyName(employee)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ListItem >
                            <Divider />
                        </Fragment>)

                    })}
                </List>
                : <Fragment></Fragment>
        }

    </Fragment >);
}

export default EmployeeHome;