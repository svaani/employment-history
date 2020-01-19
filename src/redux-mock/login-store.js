const rootObj = window.INIT_REDUX_MOCK;

//using localstorage as redux persist also uses localstorage 
const LoginStore = {
    set: (key, val) => {
        localStorage.setItem(key, JSON.stringify(val));
    },
    get: (key) => {
        let immediateValue = null//rootObj["LoginStore"][key];
        if(immediateValue == null){
            immediateValue = JSON.parse(localStorage.getItem(key));
        }
        return immediateValue;
    }
}

//rootObj["LoginStore"] = LoginStore;

export default LoginStore;