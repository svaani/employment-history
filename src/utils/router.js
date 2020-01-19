
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from '../pages/login';

import AdminHome from '../pages/admin-home';
import AddRecord from '../pages/add-record';
import EmployeeHome from '../pages/employee-home';
import CreateCompany from '../pages/create-company';
import CompanyView from '../pages/company-view';

const EHRouter = ()=>{
    return <Router>
    <div>
      <Route exact path='/' component={Login} />
      <Route path='/login' component={Login} />

      <Route path='/add-record' component={AddRecord} />
      <Route path='/employee-home' component={EmployeeHome} />
      <Route path='/create-company' component={CreateCompany} />
      <Route path='/company-view' component={CompanyView} />
      <Route path='/admin-home' component={AdminHome} />

    </div>
    </Router>
}

export default EHRouter;
