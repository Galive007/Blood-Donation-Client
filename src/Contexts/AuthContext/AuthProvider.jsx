import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.config';
import axios from 'axios';



const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [roleLoading, setRoleLoading] = useState(true)
    const [role, setRole] = useState('')
    const [userStatus, setUserStatus] = useState('')

    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signinUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const updateUserProfile = (profile) => {
        setLoading(true)
        return updateProfile(auth.currentUser, profile)
    }

    const forgetPassword = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
 

    // observe User State
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            unSubscribe();
        }
    }, [])


    // role
    useEffect(() => {
        if(!user) return;
        axios.get(`https://blood-donation-one-phi.vercel.app/users/role/${user?.email}`)
            .then(res => {
                console.log(res.data.role);
                setRole(res.data.role)
                setUserStatus(res.data.status)
                setRoleLoading(false)
            })
            .catch(error => {
                console.log(error);
            })
    }, [user])

    // console.log(userStatus);
    

    const authInfo = {
        user,
        role,
        loading,
        roleLoading,
        userStatus,
        registerUser,
        signinUser,
        googleSignIn,
        updateUserProfile,
        forgetPassword,
        logOut
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;