import axios from 'axios';

const axiosPublic = axios.create({
    baseURL:'https://food-delivery-server-olive.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;