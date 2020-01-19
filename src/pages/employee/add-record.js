import React, { Fragment, useRef, useLayoutEffect, useState } from 'react';
import { Grid, Button, CssBaseline, MenuItem, Select, FormControl, InputLabel, OutlinedInput, TextField, Dialog } from '@material-ui/core';
import { Redirect, useHistory } from 'react-router';

import EmploymentHistory from '../../models/employmentHistory';

import Constants from '../../utils/constants';
import AppBarCustom from '../../utils/appBar';

import CreateCompany from '../common/create-company';
import LoginStore from '../../redux-mock/login-store';

import Company from '../../models/company';

const AddRecord = () => {

    const history = useHistory();

    //In react it's good to consider userRef as dom read is faster 
    //and write gives faster percieved performance
    //It's a concious usage after adding some thoughts 
    const fromDate = useRef('');
    const toDate = useRef('');
    const [companyName,setCompanyName] = useState('');
    const roleName = useRef('');

    const [companyList, setCompanyList] = useState(null);
    const [openCreateOption, setOpenCreateOption] = useState(false);
    

    //componentWillMount
    useLayoutEffect(() => {
        _loadCompanies("");
    }, []);

    const _loadCompanies = (val)=>{
        new Company()
            .get()
            .then((listSnapshot) => {
                setCompanyList(listSnapshot.docs);
                setCompanyName(val);
            });
    }


    const _addRecord = () => {
        if (fromDate.current.value.length == 0
            || companyName.length == 0
            || toDate.current.value.length == 0
            || roleName.current.value.length == 0) {
            alert(Constants.ALERT.MANDATORY_MESSAGE);
            return;
        }
        new EmploymentHistory()
            .ref()
            .add({
                "FromDate": fromDate.current.value,
                "ToDate": toDate.current.value,
                "EH_Uid": Date.now(),//unique id
                "Role": roleName.current.value,
                "U_Uid": LoginStore.get('user')["userId"],
                "C_Uid": companyName
            }).then(() => {
                alert("Success");
                history.push("/employee-home");
            });
    }

    const _updateNewCompany = (val) => {
        setOpenCreateOption(false);
        _loadCompanies(val);
    }

    return (<Fragment>
        <CssBaseline />
        <AppBarCustom title={Constants.TITLE.ADD_RECORD} />
        <Grid container spacing={1} justify="space-evenly" direction="column">
            <Grid item>
                <TextField
                    label="From Date"
                    type="date"
                    inputRef={fromDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                /><TextField
                    label="To Date"
                    type="date"
                    inputRef={toDate}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Grid>
            <Grid item>
                <FormControl variant="outlined">
                    <InputLabel htmlFor="role_name">
                        {Constants.LABEL.ROLENAME}

                    </InputLabel>
                    <OutlinedInput
                        inputRef={roleName}
                        id="role_name"
                        labelWidth={100}
                    />
                </FormControl>
            </Grid>

            <Grid item>
                <InputLabel id="company_name" >
                    Select Company
            </InputLabel>
                <Select style={{ "width": "50%", "margin": "20px" }}
                    labelId="company_name"
                    value={companyName}
                    onChange={(event) => {setCompanyName(event.target.value); if (event.target.value == 0) {setOpenCreateOption(true);setCompanyName(event.target.value);} }}
                >
                    {
                        companyList != null ?
                            companyList.map((company) =>
                                <MenuItem key={Company.getId(company)} value={Company.getId(company)}>
                                    {Company.getName(company)}
                                </MenuItem>
                            )
                            :
                            <MenuItem>Loading..</MenuItem>
                    }
                    <MenuItem value={0}>
                        {Constants.BUTTON.CREATE_COMPANY}
                    </MenuItem>
                </Select>
            </Grid>

            <Grid item>
                <Dialog aria-labelledby="simple-dialog-title" open={openCreateOption}>
                    <CreateCompany onClose={_updateNewCompany}></CreateCompany>
                </Dialog>
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" onClick={_addRecord}>
                    {Constants.BUTTON.SAVE}
                </Button>
            </Grid>
        </Grid>
    </Fragment>);
}

export default AddRecord;