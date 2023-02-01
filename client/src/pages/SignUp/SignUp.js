import "./SignUp.css";
import { useState, useContext } from "react";
import { signUpWithEmailAndPassword } from "../../Firebase.js"
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from "../../Contexts/GlobalContext";
import { AddUser } from "../../Services/UserService";

function SignUp(props) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const { connectedUser, setConnectedUser } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleSignUp = () => {
        // Verify inputs
        const user = {};
        // Matching error message
        signUpWithEmailAndPassword(email, password)
            .then(() => {
                AddUser(user)
                    .then(() => {
                        setConnectedUser(user);
                    })
                navigate('/');
            });
    }

    return (
        <div className="container">
            <div className="title">
                הרשמה
            </div>
            <div className="form">
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={isAdmin} onClick={() => setIsAdmin(!isAdmin)} />
                    <label class="form-check-label" for="flexCheckDefault">
                        אני מנהל מערכת
                    </label>
                </div>
                <div class="mb-3 row">
                    <label for="inputEmail" class="col-sm-4 col-form-label">שם מלא</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputEmail" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputEmail" class="col-sm-4 col-form-label">אימייל</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputEmail" value={email} onChange={(e) => setEmail(e.target.value)}  />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-4 col-form-label">סיסמה</label>
                    <div class="col-sm-8">
                        <input type="password" class="form-control" id="inputPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div class="row">
                    <label for="inputPassword" class="col-sm-4 col-form-label">אמת סיסמה</label>
                    <div class="col-sm-8">
                        <input type="password" class="form-control" id="inputPassword" value={passwordVerify} onChange={(e) => setPasswordVerify(e.target.value)} />
                    </div>
                </div>
            </div>
           
            <div class="d-grid gap-2 col-6 mx-auto">
                <button class="btn btn-success" type="button" onClick={handleSignUp}>הרשמה</button>
            </div>
        </div>
    )
}

export default SignUp;