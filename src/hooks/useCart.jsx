import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useCart = () => {
const {user} = useContext(AuthContext)
const token = localStorage.getItem('Access_token')

const { refetch, data:cart = []} = useQuery({
    queryKey: ['carts', user?.email],
    queryFn: async () => {
        const res = await fetch(`https://food-delivery-server-olive.vercel.app/carts?email=${user.email}`,{
            headers: {
                authorization: `Bearer ${token}`
            }
        })
       return res.json();

    }
})

    return [cart, refetch];
};

export default useCart;