import "./SignUp.css";

function SignUp(props) {
    return (
        <div className="container">
            <div className="title">
                הרשמה
            </div>
            <div className="form">
                <div class="form-check mb-3">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label class="form-check-label" for="flexCheckDefault">
                        אני מנהל מערכת
                    </label>
                </div>
                <div class="mb-3 row">
                    <label for="inputEmail" class="col-sm-4 col-form-label">שם מלא</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputEmail" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputEmail" class="col-sm-4 col-form-label">אימייל</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" id="inputEmail" />
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-4 col-form-label">סיסמה</label>
                    <div class="col-sm-8">
                        <input type="password" class="form-control" id="inputPassword" />
                    </div>
                </div>
                <div class="row">
                    <label for="inputPassword" class="col-sm-4 col-form-label">אמת סיסמה</label>
                    <div class="col-sm-8">
                        <input type="password" class="form-control" id="inputPassword" />
                    </div>
                </div>
            </div>
           
            <div class="d-grid gap-2 col-6 mx-auto">
                <button class="btn btn-success" type="button">הרשמה</button>
            </div>
        </div>
    )
}

export default SignUp;