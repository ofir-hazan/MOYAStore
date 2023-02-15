import "./SignInUp.css";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Alert from '@mui/material/Alert';
import { logInWithEmailAndPassword } from "../../Firebase.js"
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from "../../Contexts/GlobalContext";
import { validateEmail } from "../../resources/Helpers/helpers";

function SignIn() {
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { connectedUser, setConnectedUser } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleRaiseAlert = (message) => {
        setIsErrorMessage(true);
        setErrorMessage(message);
    }

    const inputValidation = () => {
        if (!email || !password) {
            handleRaiseAlert("All fields are mandatory.");
            return false;
        }

        if (!validateEmail(email)) {
            handleRaiseAlert("Invalid email format.");
            return false;
        }

        return true;
    }

    const handleSignIn = () => {
        if (!inputValidation()) {
            return;
        }
        
        logInWithEmailAndPassword(email, password)
            .then(async (firebaseUser) => {
                await fetch("http://localhost:3001/user/" + firebaseUser.uid)
                    .then(res => res.json())
                    .then((user) => {
                        if (user) {
                            setConnectedUser(user);
                            localStorage.setItem('user', JSON.stringify(user));
                            navigate('/');
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        handleRaiseAlert("Internal error, please try again later")
                    });
            })
            .catch ((error) => {
                handleRaiseAlert(error?.message)
            }); 
    }

    return (
        <>
            <div className="container">
                <div className="title">
                    Welcome to MOYA!
                </div>
                <div className="form">
                    <div class="mb-3 row">
                        <label for="inputEmail" class="col-sm-4 col-form-label">Email</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>
                    <div class="row">
                        <label for="inputPassword" class="col-sm-4 col-form-label">Password</label>
                        <div class="col-sm-8">
                            <input type="password" class="form-control" id="inputPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                </div>
            
                <div className="formFooter">
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button class="btn btn-success" type="button" onClick={handleSignIn}>Sign in now!</button>
                    </div>
                    <div>
                        Not signed in yet? 
                        <Link to="/signUp">Click here!</Link>
                    </div>
                </div>
            </div>
            {isErrorMessage && 
                <Alert onClose={() => setIsErrorMessage(false)} severity="error">{errorMessage}</Alert>}
        </>
    )
}

export default SignIn;