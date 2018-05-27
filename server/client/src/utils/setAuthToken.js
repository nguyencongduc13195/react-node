import axios from 'axios';
const setAuthToken = (token)=>{
    if(token){
        // mỗi req đều set header authorization
        axios.defaults.headers.common['Authorization'] = token;
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;