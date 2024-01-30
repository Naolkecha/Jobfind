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

    registerEmployer = async (data) => {
       
            console.log('data', data);
            const response = await axios.post('http://localhost:5000/api/users/register-employer', data);
            return response;
       
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

    getJobs = async () => {
        try {
            const response = await this.api.get('/jobs');
            console.log('response', response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    getJob = async (id) => {
        try {
            console.log('jobId', id);
            const response = await this.api.get(`/jobs/${id}`);
            console.log('response', response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    applyJob = async (jobId, data) => {
        try {
            const response = await this.api.post(`/applications/${jobId}`, data);
            console.log('response', response);
            return response;
        } catch (error) {
            console.error(error);
        }
    }


    getJobsByEmployer = async () => {
           
        const response = await this.api.get('/jobs');
        return response.data;
        
    }

    addJob = async (data) => {
        try {
            const response = await this.api.post('/jobs', data);
            console.log('response', response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

}




const api = new Api();
export default api;




