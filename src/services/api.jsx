import axios from 'axios';


class Api {
    constructor() {
        this.api = axios.create({
            baseURL: 'http://localhost:5000/api',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    }


   signUp = async (data) => {
        try {
            console.log('data', data);
            const response = await axios.post('http://localhost:5000/api/users/register', data);


            return response.data;
        } catch (error) {
            
            console.error(error);
        }
    }


  login = async (data) => {
        
        console.log('data', data.get('email'));
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }


 

    

}


const api = new Api();
export default api;




