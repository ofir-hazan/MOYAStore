import "./SignIn.css";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { logInWithEmailAndPassword } from "../../Firebase.js"
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from "../../Contexts/GlobalContext";
import { validateEmail } from "../../resources/Helpers/helpers";

function SignIn(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { connectedUser, setConnectedUser } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleSignIn = () => {
        // Verify inputs
        if (!validateEmail(email)) {
            return;
        }
        // Matching error message
        logInWithEmailAndPassword(email, password)
            .then(async (firebaseUser) => {
                await fetch("http://localhost:3001/user/" + firebaseUser.uid)
                    .then(res => res.json())
                    .then((user) => {
                        if (user) {
                            setConnectedUser(user);
                            navigate('/');
                        }
                    });
            })
            .catch ((error) => {
                console.log(error);
            }); 
    }

    return (
        <div className="container">
            <div className="title">
                Sign In
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
    )
}

export default SignIn;