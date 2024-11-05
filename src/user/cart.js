import { useState, useEffect } from "react";
const Mycart = () => {
    let [allproduct, setProduct] = useState([]);


    const getProduct = () => {
        fetch("http://localhost:1234/cartapi")
            .then(response => response.json())
            .then(proArray => {
                setProduct(proArray);
            })
    }
    useEffect(() => {
        getProduct();
    }, []);

    const delProduct = (id) => {
        let url = "http://localhost:1234/cartapi/" + id;
        let postdata = { method: "delete" };
        fetch(url, postdata)
            .then(response => response.json())
            .then(pinfo => {
                alert(pinfo.pname + "delete");
                getProduct();

            })

    }
    let totalcost = 0;

    const updateQty = (product, action) => {
        if (action === "Y") {
            product["qty"] = product.qty + 1;
        } else {
            product["qty"] = product.qty - 1;
        }

        if (product.qty <= 0) {
            delProduct(product.id);
        }

        let url = "http://localhost:1234/cartapi/" + product.id;
        let postdata = {
            headers: { 'Content-type': 'application/json' },
            method: "put",
            body: JSON.stringify(product)

        }
        fetch(url, postdata)
            .then(response => response.json())
            .then(info => {
                getProduct();  // reload the cart item list after update quantity
            })
    }

    let [customer, setCustomer] = useState({});

    const pickValue = (obj) => {
        customer[obj.target.name] = obj.target.value;
        setCustomer(customer);
        console.log(customer);
    }
    const save = () => {
        customer["myproduct"] = allproduct;
        const date = new Date();
        customer["orderdate"]= date.toLocaleString();
        
        let url = "http://localhost:1234/orderapi";
        let postdata = {
            headers: { 'Content-type': 'application/json' },
            method: "post",
            body: JSON.stringify(customer)

        }
        fetch(url, postdata)
            .then(response => response.json())
            .then(info => {
                alert( "Hi" + customer.cname);  // reload the cart item list after update quantity
            })

    }


return (
    <div className="container mt-4">
        <div className="row">
            <div className="col-lg-4">

                <div className="p-3 shadow">
                    <h3 className="mb-3"> Coustomer Details  </h3>
                    <div className="mb-4">
                        <label> Coustomer Name </label>
                        <input type="text" className="form-control" name="cname" onChange={pickValue} />
                    </div>
                    <div className="mb-4">
                        <label> Mobile No  </label>
                        <input type="text" className="form-control" name="mobile" onChange={pickValue} />
                    </div>
                    <div className="mb-4">
                        <label> E-Mail-Id  </label>
                        <input type="text" className="form-control" name="email" onChange={pickValue} />
                    </div>
                    <div className="mb-4">
                        <label> Delivery Address  </label>
                        <textarea className="form-control" name="address" onChange={pickValue}>  </textarea>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={save}> Place Order</button>
                    </div>
                </div>
            </div>
            <div className="col-lg-8">
                <p> Total Product : {allproduct.length} </p>
                <table className="table table-bordered" >
                    <thead >
                        <tr className="table-info" >
                            <th>Item Name</th>
                            <th>Photo</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allproduct.map((product, index) => {
                                totalcost = totalcost + (product.pprice * product.qty);
                                return (
                                    <tr key={index}>
                                        <td>{product.pname}</td>
                                        <td><img src={product.photo} height="30" width="40" /></td>
                                        <td>{product.pprice}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm me-2" onClick={obj => updateQty(product, 'N')}> - </button>
                                            {product.qty}
                                            <button className="btn btn-info btn-sm me-2" onClick={obj => updateQty(product, 'Y')}> + </button>
                                        </td>
                                        {/* <td>{product.qty}</td> */}
                                        <td>{product.pprice * product.qty}</td>

                                        <td><button className="btn btn-danger sm" onClick={delProduct.bind(this, product.id)}>
                                            <i className="fa fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td colSpan={5} className="text-center ">
                                <b>  Final Cost Rs. {totalcost}  </b>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

)
}

export default Mycart;