import { useState } from "react";

const Mylogin = () => {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    let [emailError, setEmailError] = useState('');
    let [paswordError, setPasswordError] = useState('');

    let [message, setMessage] = useState('Enter Login Details');
    let [mybtn, handleBtn] = useState(false);

    const loginCheck = () => {

        let formstatus = true;
        //alert(email + password);
        let epattren = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        //mohi.mca209@gmail.com
        //   username + 2 + domainname + . + extension
        if (!epattren.test(email)) {
            setEmailError(" Invalid Email Id !");
            formstatus = false;
        } else {
            setEmailError('');
        }

        if (password == "") {
            setPasswordError(" Invalid Password !");
            formstatus = false;
        } else {
            setPasswordError('');
        }
        if (formstatus == false) {
            setMessage("Please fill the Details !")
        } else {
            handleBtn("true");
            setMessage("Please Wait Processing...");
            fetch("http://localhost:1234/sellerapi")
                .then(res => res.json())
                .then(accountArray => {
                    let loginstatus = false;
                    for (let i = 0; i < accountArray.length; i++) {
                        let seller = accountArray[i];
                        if (seller.email == email && seller.password == password) {
                            loginstatus = true;
                            localStorage.setItem("sellerid", seller.id);
                            localStorage.setItem("sellername", seller.name);
                            window.location.reload();
                        }
                    }//for end
                    if(loginstatus==false){
                        setMessage(" Fail: Invalid or not Exist");
                        handleBtn(false);
                    }
                })

        }

    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <p className="text-center text-primary"> {message} </p>
                    <div className="card">
                        <div className="card-header bg-danger text-white"><i className="fa fa-lock text-white"></i> Login</div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label>Your E-mail id</label>
                                <input type="email" className="form-control" onChange={obj => setEmail(obj.target.value)} value={email} />
                                <small className="text-danger"> {emailError} </small>
                            </div>
                            <div className="mb-3">
                                <label>Your Password</label>
                                <input type="password" className="form-control" onChange={obj => setPassword(obj.target.value)} value={password} />
                                <small className="text-danger"> {paswordError} </small>
                            </div>
                            <div className="card-footer text-center">
                                <button disabled={mybtn} className="btn btn-danger" onClick={loginCheck}>Login <i className="fa fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default Mylogin;