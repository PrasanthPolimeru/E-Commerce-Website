import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const MyOrder = () => {
    const [allorder, setOrder] = useState([]);
    const PER_PAGE = 5; // displays 5 items/records per page
    const [currentPage, setCurrentPage] = useState(0);

    const getorder = () => {
        fetch("http://localhost:1234/orderapi")
            .then(res => res.json())
            .then(orderArray => {
                setOrder(orderArray);
            });
    };

    useEffect(() => {
        getorder();
    }, []);

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allorder.length / PER_PAGE);

    return (
        <div className="container mt-4">
            <div className="row mb-5">
                <div className="col-lg-12">
                    <h1 className="text-center text-info">Manage Order: {allorder.length}</h1>
                </div>
            </div>
            {
                allorder.slice(offset, offset + PER_PAGE).map((order, index) => (
                    <div className="row mb-4" key={index}>
                        <div className="col-lg-3">
                            <div className="card mt-5">
                                <div className="card-header bg-info text-white">User Profile</div>
                                <div className="card-body">
                                    <b>{order.cname}</b>
                                    <p>Mobile No: {order.mobile}</p>
                                    <p>E-mail ID: {order.email}</p>
                                    <p>Address: {order.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <h5 className="text-center text-danger mb-3">
                                Order ID: {order.id}, Date: {order.orderdate}
                            </h5>
                            <table className="table table-bordered">
                                <thead>
                                    <tr className="table-info">
                                        <th>Item Name</th>
                                        <th>Photo</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                         order.myproduct.map((product, index) => (
                                            <tr key={index}>
                                                <td>{product.pname}</td>
                                                <td><img src={product.photo} height="30" width="40" alt={product.pname} /></td>
                                                <td>{product.pprice}</td>
                                                <td>{product.qty}</td>
                                                <td>{product.pprice * product.qty}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            }
            <div className="mt-4 text-center">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
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
    );
};

export default MyOrder;
