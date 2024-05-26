import React, { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    //create an account

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    //sign up with gmail

    const signUpWithGmail = () => {
        setLoading(true);
        return signInWithPopup(auth, GoogleProvider)
    }

    //login with email & password

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

      // logout 
      const logOut = () =>{
        return signOut(auth);
    }

    // update profile

    const updateUserProfile = (name, photoURL) => {
       return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
          })
    }

    // check signed in user
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            // console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        });
  
        return () =>{
            return unsubscribe();
        }
    }, [])


    const authInfo ={
         user,
         loading,
         createUser,
         signUpWithGmail,
         login,
         logOut,
         updateUserProfile,
         
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;