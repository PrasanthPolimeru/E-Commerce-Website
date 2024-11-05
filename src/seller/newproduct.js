import { useState } from "react";

const NewProduct = () => {
    let [productinfo, updateInfo] = useState({});
    let [nameError, setNameError] = useState('');
    let [priceError, setPriceError] = useState('');
    let [photoError, setPhotoError] = useState('');
    let [detailsError, setDetailsError] = useState('');

    const pickValue = (obj) => {
        //alert(obj.target.value);
        productinfo[obj.target.name] = obj.target.value;
        //console.log(productinfo);
        updateInfo(productinfo);
    }
    const save = (obj) => {
        obj.preventDefault();  // It protect from page refresh
        //alert("Hi");
        console.log(productinfo);
        let formStatus = true;
        if (!productinfo.pname ) {
            setNameError("Enter Product name !");
            formStatus = false;
        } else {
            setNameError('');
        }

        //price validation
        if (!productinfo.pprice ) {
            setPriceError("Enter Valid Price !");
            formStatus = false;
        } else {
            setPriceError('');
        }

        //photo url
        if (!productinfo.photo) {
            setPhotoError("Enter Photo url !");
            formStatus = false;
        } else {
            setPhotoError('');
        }

        //Details vaidation

        if (!productinfo.pdetails ) {
            setDetailsError("Enter Product Details !");
            formStatus = false;
        } else {
            setDetailsError('');
        }
        if(formStatus==true){
           // alert("Please Wait Sending to Server");
            let url = "http://localhost:1234/productapi";
            let postdata={
                headers:{'Content-type':'application/json'},
                method:"post",
                body:JSON.stringify(productinfo)

            }
            fetch(url,postdata)
            .then(response=>response.json())
            .then(info=>{
                alert(productinfo.pname + "Saved Successfully !");
                obj.target.reset();  // it clear the form
                updateInfo({});
            })
        }
       // alert(formStatus);
    }
    return (
        <div className="container mt-4">
            <form onSubmit={save}>
                <div claasName="row">
                    <div className="col-lg-12 text-center mb-3">
                        <h3 className="text-info"> Enter Product Details </h3>
                        <small className="text-danger"> The * Marked fields are mandatory </small>
                    </div>
                    <div className="row">
                    <div className="col-lg-4 mb-4">
                        <p> Product Name <small className="text-danger"> * </small>  </p>
                        <input className="form-control" type="text" name="pname" onChange={pickValue} />
                        <small className="text-danger"> {nameError} </small>
                    </div>
                    <div className="col-lg-4 mb-4">
                        <p> Product Price <small className="text-danger"> * </small> </p>
                        <input className="form-control" type="number" name="pprice" onChange={pickValue} />
                        <small className="text-danger"> {priceError} </small>
                    </div>
                    <div className="col-lg-4 mb-4">
                        <p> Product Photo URL <small className="text-danger"> * </small> </p>
                        <input className="form-control" type="text" name="photo" onChange={pickValue} />
                        <small className="text-danger"> {photoError} </small>

                    </div>
                    <div className="col-lg-12 mb-4">
                        <p> Product Description <small className="text-danger"> * </small> </p>
                        <textarea className="form-control" type="text" name="pdetails" onChange={pickValue}></textarea>
                        <small className="text-danger"> {detailsError} </small>

                    </div>
                    </div>
                    <div className="col-lg-12 text-center">
                        <button className="btn btn-success m-2" type="submit"> Save Product </button>
                        <button className="btn btn-warning m-2" type="reset"> Clear All </button>
                    </div>
                </div>
            </form>
        </div>
    )

}
export default NewProduct;