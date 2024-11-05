import { useState, useEffect } from "react";

const CreateAccount = () => {

    let [name, setName] = useState("");
    let [mail, setMail] = useState("");
    let [password, setPassword] = useState("");
    let [number, setNumber] = useState("");

    let [nameError, setNameError] = useState("");
    let [mailError, setMailError] = useState("");
    let [paswordError, setPasswordError] = useState("");
    let [numberError, setNumberError] = useState("");

    let [message, setMessage] = useState("Enter Signup Details")
    let [mybtn, handleBtn] = useState(false);

    const getDetails = () => {
        let details = { name: name, email: mail, password: password, number: number }
        let url = "http://localhost:1234/sellerapi";
        let postdata = {
            headers: { "Content-type": "application.json" },
            method: "post",
            body: JSON.stringify(details)
        }
        fetch(url, postdata)
            .then(response => response.json())
            .then(vendor => {
                alert(vendor.name);
                setName("");
                setMail("");
                setPassword("");
                setNumber("");
            })

    }
    // useEffect(() => {
    //     getDetails();
    // }, []);

    const signupCheck = () => {
        //alert(name + mail + password + number);
        let formstatus = true;

        if (name == "") {
            setNameError("Invalid User name");
            formstatus = false;
        } else {
            setNameError("");
        }

        let epattren = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (!epattren.test(mail)) {
            setMailError("Invalid E-mail Id");
            formstatus = false;
        } else {
            setMailError("");
        }

        if (password == "") {
            setPasswordError("Invalid Password...");
            formstatus = false;
        } else {
            setPasswordError("");
        }

        if (number == "") {
            setNumberError("Invalid Number !");
            formstatus = false;
        } else {
            setNumberError("");
        }

        if (formstatus == false) {
            setMessage("Please fill the Details properly");
        } else {
            handleBtn(true);
            setMessage("Please Wait Data is Processing")
        }
        getDetails();
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <p className="text-center text-info"> {message} </p>
                    <div className="card">
                        <div className="card-header bg-danger text-white"><i className="fa fa-user-plus text-white"></i> Create Account</div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label>Your Full Name</label>
                                <input type="text" className="form-control" onChange={obj => setName(obj.target.value)} value={name} />
                                <small className="text-danger"> {nameError} </small>
                            </div>
                            <div className="mb-3">
                                <label>Your E-mail Id</label>
                                <input type="mail" className="form-control" onChange={obj => setMail(obj.target.value)} value={mail} />
                                <small className="text-danger"> {mailError} </small>
                            </div>
                            <div className="mb-3">
                                <label>Your Password</label>
                                <input type="password" className="form-control" onChange={obj => setPassword(obj.target.value)} value={password} />
                                <small className="text-danger"> {paswordError} </small>
                            </div>
                            <div className="mb-3">
                                <label>Your Mobile Number</label>
                                <input type="number" className="form-control" onChange={obj => setNumber(obj.target.value)} value={number} />
                                <small className="text-danger"> {numberError} </small>
                            </div>
                            <div className="card-footer text-center">
                                <button disabled={mybtn} className="btn btn-danger" onClick={signupCheck}>Register <i className="fa fa-user-plus"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default CreateAccount;