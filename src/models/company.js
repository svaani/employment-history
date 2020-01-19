import firebase from '../utils/firebase';

class Company {
    
    constructor(){
        this.UserObj = firebase.firestore().collection('Company');
    }

    ref = ()=>{
        return this.UserObj;
    }

    get = ()=>{
        return this.UserObj.get();
    }

    byOwned = (userId)=>{
        this.UserObj = this.UserObj.where("OwnedBy", '==', userId);
        return this;
    }

    byId = (userId)=>{
        this.UserObj = this.UserObj.where("C_Uid", '==', userId);
        return this;
    }

}

Company.getUserId = (user) => {
    return user.data()["U_Uid"];
}

Company.getId = (user) => {
    return user.data()["C_Uid"];
}

Company.getName = (user) => {
    return user.data()["Name"];
}

export default Company;