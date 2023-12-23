import axios from "axios";
import Cookies from 'js-cookie';
import { createContext, useState } from "react";
import Swal from "sweetalert2";
import useSWR from "swr";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    // const [loading, setLoading] = useState(true);

    const token = Cookies.get('access_token');
    const [isChecked, setIsChecked] = useState("light");

    const loginwithemailpass = (user) => {
        return new Promise((resolve, reject) => {
            axios.post('https://jobtaskt-server.vercel.app/login', user)
                .then(res => {
                    if (res.data.error === 'InvAlidPassword') {
                        Swal.fire(
                            'Done',
                            'Invalid Credentials',
                            'error'
                        )
                        reject('InvAlidPassword');
                    } else {
                        resolve('Login Successful');
                        Cookies.set('access_token', res.data.data, { expires: 24 / 24 });
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    }


    //logout

    const logOut = () => {
        Cookies.remove('access_token');
        location.reload();
    }
    const fetcher = (url, token) =>
        fetch(url, {
            headers: {
                token
            },
        }).then(res => res.json());


    const { data: users, isLoading: usersLoading, mutate: usersultate } = useSWR('https://jobtaskt-server.vercel.app/users', (url) => fetcher(url, token));
    const { data: currentUser, isLoading: currentUserIsLoading, mutate: currentUserMultate } = useSWR('https://jobtaskt-server.vercel.app/loggeduser', (url) => fetcher(url, token));
    const { data: products, isLoading: productsIsLoading, mutate: productsMultate } = useSWR('https://jobtaskt-server.vercel.app/products', (url) => fetcher(url, token));
    const { data: carts, isLoading: cartsIsLoading, mutate: cartsMultate } = useSWR(`https://jobtaskt-server.vercel.app/carts?email=${currentUser?.email}`, (url) => fetcher(url, token));
    const ltheme = Cookies.get('themes');

    const handleCheckboxChange = () => {

        if (ltheme === "light") {
            Cookies.set('themes', "dark");
        }
        if (ltheme === "dark") {
            Cookies.set('themes', "light");
        }


        if (isChecked === "light") {
            setIsChecked("dark")
            const themeNname = {
                theme: "dark"
            }
            axios.put(`https://jobtaskt-server.vercel.app/loggeduser/${currentUser._id}`, themeNname, {
                headers: {
                    token
                }
            })
                .then((res => {
                    currentUserMultate()
                }))
        }
        if (isChecked === "dark") {
            Cookies.set('themes', "light");
            setIsChecked("light")
            const themeNname = {
                theme: "light"
            }
            axios.put(`https://jobtaskt-server.vercel.app/loggeduser/${currentUser._id}`, themeNname, {
                headers: {
                    token
                }
            })
                .then((res => {
                    currentUserMultate()
                }))
        }
    };
    const authInfo = {
        isChecked,
        handleCheckboxChange,
        loginwithemailpass,
        logOut,
        token,
        currentUser,
        products,
        productsIsLoading,
        productsMultate,
        carts,
        cartsIsLoading,
        cartsMultate

    }

    if (currentUser?.data === "token expired" && ltheme) {
        return (
            <AuthContext.Provider value={authInfo}>
                <div data-theme={ltheme}>
                    {children}
                </div>
            </AuthContext.Provider>
        );
    }

    else {

        return (
            <AuthContext.Provider value={authInfo}>
                <div data-theme={currentUser?.theme}>
                    {children}
                </div>
            </AuthContext.Provider>
        );
    }

};

export default AuthProvider;