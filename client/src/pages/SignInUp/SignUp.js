import "./SignInUp.css";
import { useState, useContext } from "react";
import Alert from '@mui/material/Alert';
import { signUpWithEmailAndPassword } from "../../Firebase.js"
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from "../../Contexts/GlobalContext";
import { validateEmail } from "../../resources/Helpers/helpers";

function SignUp() {
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const { setConnectedUser } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleRaiseAlert = (message) => {
        setIsErrorMessage(true);
        setErrorMessage(message);
    }

    const inputValidation = () => {
        if (!name || !email || !password || !passwordVerify) {
            handleRaiseAlert("All fields are mandatory.");
            return false;
        }

        if (password !== passwordVerify) {
            handleRaiseAlert("Please verify the password correctly.");
            return false;
        }

        if (!validateEmail(email)) {
            handleRaiseAlert("Invalid email format.");
            return false;
        }

        return true;
    }

    const handleSignUp = () => {
        if (!inputValidation()) {
            return;
        }
        
        let user = {
            userName: name,
            email,
            role: "admin"
        };

        signUpWithEmailAndPassword(email, password)
            .then(async (firebaseUser) => {
                user = {...user, uid: firebaseUser.uid}
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user)
                  };
              
                await fetch("http://localhost:3001/user/add", requestOptions)
                    .then(res => res.json())
                    .then((dbUser) => {
                        if (dbUser) {
                            setConnectedUser(user);
                            navigate('/');
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        handleRaiseAlert("Internal error, please try again later")
                    });
            })
            .catch((error) => {
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
                        <label for="inputEmail" class="col-sm-4 col-form-label">Full name</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="inputEmail" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="inputEmail" class="col-sm-4 col-form-label">E-mail</label>
                        <div class="col-sm-8">
                            <input type="text" class="form-control" id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)}  />
                        </div>
                    </div>
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-4 col-form-label">Password</label>
                        <div class="col-sm-8">
                            <input type="password" class="form-control" id="inputPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div class="row">
                        <label for="inputPassword" class="col-sm-4 col-form-label">Verify password</label>
                        <div class="col-sm-8">
                            <input type="password" class="form-control" id="inputPassword" value={passwordVerify} onChange={(e) => setPasswordVerify(e.target.value)} />
                        </div>
                    </div>
                </div>
            
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button class="btn btn-success" type="button" onClick={handleSignUp}>Sign up now!</button>
                </div>
            </div>
            {isErrorMessage && 
                <Alert onClose={() => setIsErrorMessage(false)} severity="error">{errorMessage}</Alert>}
        </>
    )
}

export default SignUp;