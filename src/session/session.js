import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';
import authAPI from "../apis/auth";
import { useAlert } from '../hook/Context/AlertContext'
import { useUser } from '../hook/Context/UserContext'
import { useHistory, Link } from "react-router-dom";

function Session({ name }) {
    const history = useHistory();
    const { alert, storeAlert } = useAlert();
    const { user, storeUser } = useUser();

    const location = useLocation();
    const query = new URLSearchParams(location.search);

    useEffect(() => {
        if (name == "signup-verification") {
            authAPI.verifyEmail(query.get("verificationCode"))
                .then(
                    response => {
                        if (response.status) {
                            console.log(response);
                            storeAlert({
                                ...alert,
                                successSnackbarOpen: true,
                                successSnackbarMessage: response.message
                            })

                            history.push("/login");
                        } else {
                            storeAlert({
                                ...alert,
                                errorSnackbarOpen: true,
                                errorSnackbarMessage: response.message
                            })
                        }
                    },
                    error => {
                        console.log('error=', error)
                        storeAlert({
                            ...alert,
                            errorSnackbarOpen: true,
                            errorSnackbarMessage: error
                        })
                    }
                )
        } else if (name == "reset-password") {
            authAPI.fotgotLinkVerify(query.get("id"))
                .then(
                    response => {
                        if (response.status) {
                            storeUser({
                                ...user,
                                act_code: query.get("id")
                            })

                            history.push("/reset-password");
                        } else {
                            storeAlert({
                                ...alert,
                                errorSnackbarOpen: true,
                                errorSnackbarMessage: response.message
                            })
                        }
                    },
                    error => {
                        console.log('error=', error)
                        storeAlert({
                            ...alert,
                            errorSnackbarOpen: true,
                            errorSnackbarMessage: error
                        })
                    }
                )
        }

    }, [])

    return <></>;
}

export default Session;