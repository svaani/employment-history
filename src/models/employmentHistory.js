import firebase from '../utils/firebase';

class EmploymentHistory {
    
    constructor(){
        this.UserObj = firebase.firestore().collection('EmploymentHistory');
    }

    ref = ()=>{
        return this.UserObj;
    }

    get = ()=>{
        return this.UserObj.get();
    }

    byUserId = (userId)=>{
        this.UserObj = this.UserObj.where("U_Uid", '==', userId);
        return this;
    }

}

EmploymentHistory.getUserId = (user) => {
    return user.data()["U_Uid"];
}

EmploymentHistory.getFromDate = (user) => {
    return user.data()["FromDate"];
}


EmploymentHistory.getToDate = (user) => {
    return user.data()["ToDate"];
}


EmploymentHistory.getRole = (user) => {
    return user.data()["Role"];
}

EmploymentHistory.getCompany = (user) => {
    return user.data()["C_Uid"];
}

export default EmploymentHistory;