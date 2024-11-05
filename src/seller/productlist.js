import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const MyProduct = () => {
    let [allproduct, setProduct] = useState([]);
    let [ordericon, setIcon] = useState("fa fa-arrow-up");
    let [order, setOrder] = useState("asc");
    const getproduct = () => {
        fetch("http://localhost:1234/productapi")
            .then(response => response.json())
            .then(proArray => {
                if (order == "asc") {
                    proArray.sort((a, b) => a.pprice - b.pprice)
                    setProduct(proArray);
                    setOrder("desc");
                    setIcon("fa fa-arrow-up")
                } else {
                    proArray.sort((a, b) => b.pprice - a.pprice)
                    setProduct(proArray);
                    setOrder("asc");
                    setIcon("fa fa-arrow-down")
                }

            })
    }

const delpro=(pid)=>{
   let url="http://localhost:1234/productapi/"+pid;
  let postdata={method:"delete"};
   fetch(url,postdata)
   .then(response=>response.json())
   .then(pinfo=>{
    alert(pinfo.pname + " Deleted Successfully");
    getproduct(); //reload the list after delete
   })
}

    useEffect(() => {
        getproduct();
    }, []);

    let [keyword, setKeyword] = useState('');
    const PER_PAGE = 5; //displays 5 items/records per page
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allproduct.length / PER_PAGE);
    return (
        <div className="container mt-4">
            <div className="row mb-5">
                <div className="col-lg-9">
                    <h3 className="text-center text-info">
                        {allproduct.length} Product In Inventory
                    </h3>
                </div>
                <div className="col-lg-3">
                    <input type="text " className="form-control" placeholder="Search..."
                        onChange={obj => setKeyword(obj.target.value)} />
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12 text-center">
                    <table className="table table-bordered  shadow-lg ">
                        <thead>
                            <tr className="table-info">
                                <th>#ID</th>
                                <th>Product Name</th>
                                <th className="bg-warning mypointer" onClick={getproduct}><i className={ordericon} ></i>Product Price</th>
                                <th>Product Details</th>
                                <th>Product Photo</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                allproduct.slice(offset, offset + PER_PAGE).map((product, index) => {
                                    if (product.pname.toLowerCase().match(keyword.toLowerCase()) || product.pprice.toString().match(keyword))
                                        return (
                                            <tr key={index}>
                                                <td>{product.id}</td>
                                                <td> {product.pname} </td>
                                                <td> Rs. {product.pprice} </td>
                                                <td> {product.pdetails} </td>
                                                <td> <img src={product.photo} height="50" width="70" /></td>
                                                <td>
                                                    <button className="btn btn-danger btn-sm" onClick={delpro.bind(this,product.id)}>
                                                        <i className="fa fa-trash"></i>
                                                        </button>
                                                </td>

                                            </tr>
                                        )
                                })
                            }
                        </tbody>
                    </table>
                    <div classname="mt-4 text-center">
                        <ReactPaginate
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            breakLabel={"..."}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination  justify-content-center"}
                            pageClassName={"page-item "}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active primary"}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}
export default MyProduct;