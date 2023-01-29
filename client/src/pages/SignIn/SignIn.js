import "./SignIn.css";
import { Link } from "react-router-dom";

function SignIn(props) {
    return (
        <div className="container">
            <div className="title">
                התחברות
            </div>
            <div className="form">
                <div class="mb-3 row">
                    <label for="inputEmail" class="col-sm-4 col-form-label">אימייל</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputEmail" />
                    </div>
                </div>
                <div class="row">
                    <label for="inputPassword" class="col-sm-4 col-form-label">סיסמה</label>
                    <div class="col-sm-8">
                        <input type="password" class="form-control" id="inputPassword" />
                    </div>
                </div>
            </div>
           
            <div className="footer">
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button class="btn btn-success" type="button">התחברות</button>
                </div>
                <Link to="/signUp">
                    <div>עדיין לא רשומים? לחצו כאן!</div>
                </Link>
            </div>
        </div>
    )
}

export default SignIn;