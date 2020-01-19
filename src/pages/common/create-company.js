import React, { Fragment,useRef } from 'react';
import { Grid, Button, CssBaseline, TextField, FormControlLabel, Checkbox } from '@material-ui/core';


import Constants from '../../utils/constants';
import Company from '../../models/company';
import LoginStore from '../../redux-mock/login-store';


const CreateCompany = (props) => {

    
    //In react it's good to consider userRef as dom read is faster 
    //and write gives faster percieved performance
    //It's a concious usage after adding some thoughts 
    const companyRef = useRef('');
    let isOwned = false;

    const _createCompany = () => {
        let uid = Date.now();
        new Company()
            .ref()
            .add({
                "Name" : companyRef.current.value,
                "C_Uid" : uid,
                "OwnedBy" : isOwned ? LoginStore.get("user")["userId"] : "null"
            }).then(() => {
                props.onClose(uid);
            });

    }
    return (<Fragment>
        <Grid container spacing={1} justify="space-evenly" direction="column">
            <Grid item>
                <TextField
                    label="Company Name"
                    inputRef={companyRef}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            onChange={() => {isOwned = !isOwned }}
                            color="primary"
                        />
                    }
                    label={Constants.LABEL.OWNIT}
                />
            </Grid>
            <Grid item>
                <Button variant="contained" color="primary" onClick={_createCompany}>
                    {Constants.BUTTON.CREATE_COMPANY}
                </Button>
            </Grid>
        </Grid>
    </Fragment>);
}

export default CreateCompany;