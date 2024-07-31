import axios from 'axios';

const axiosPublic = axios.create({
    baseURL:'food-delivery-server-gray.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;