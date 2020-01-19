import firebase from '../utils/firebase';

class User {
    
    constructor(){
        this.UserObj = firebase.firestore().collection('User');
    }

    get = ()=>{
        return this.UserObj.get();
    }

    byId = (userId)=>{
        this.UserObj = this.UserObj.where("U_Uid", '==', userId);
        return this;
    }

    byPassword = (password) =>{
        this.UserObj = this.UserObj.where("Password", '==', password);
        return this;
    }

    byEmail = (email) =>{
        this.UserObj = this.UserObj.where("Email", '==', email);
        return this;
    }
}

User.getUserId = (user) => {
    return user.data()["U_Uid"];
}

User.getUserName = (user) => {
    return user.data()["U_Name"];
}

export default User;