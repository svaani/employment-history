
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from '../pages/login';
import Landing from '../pages/landing';

import AdminHome from '../pages/admin/admin-home';
import AddRecord from '../pages/employee/add-record';
import EmployeeHome from '../pages/employee/employee-home';
import CreateCompany from '../pages/common/create-company';
import CompanyView from '../pages/admin/company-view';

const EHRouter = ()=>{
    return <Router>
      <Route exact path='/' component={Login} />
      <Route path='/login' component={Login} />

      <Route path='/landing' component={Landing} />

      <Route path='/add-record' component={AddRecord} />
      <Route path='/employee-home' component={EmployeeHome} />
      <Route path='/create-company' component={CreateCompany} />
      <Route path='/company-view' component={CompanyView} />
      <Route path='/admin-home' component={AdminHome} />

 </Router>
}

export default EHRouter;
