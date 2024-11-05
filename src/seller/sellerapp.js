import { HashRouter, Routes, Route, Link } from "react-router-dom";
import SellerHome from "./order";
import ManageProduct from "./productlist";
import NewProduct from "./newproduct";
import MyOrder from "./order";
import MyDashboard from "./dashboard";

const SellerModule = () => {
    return (
        <HashRouter>
            <nav className="navbar navbar-expand-lg bg-body" data-bs-theme="dark">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">Navbar</a>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/"> <i className="fa fa-cogs"></i> Dashboard </Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/inventory"><i className="fa fa-database"></i> Inventory</Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/new-inventory"><i className="fa fa-plus"></i> New Inventory </Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/order"><i className="fa fa-headset"></i> Manage Order </Link>
                            </li>
                            <li className="nav-item me-5">
                                <Link className="nav-link text-warning" onClick={logout} > {localStorage.getItem('sellername')}<i className="fa fa-power-off"></i> Logout </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Routes>

            <Route exact path="/" element={<MyDashboard/>}/> 
            <Route exact path="/inventory" element={<ManageProduct/>} />
            <Route exact path="/new-inventory" element={<NewProduct/>} />
            <Route exact path="/order" element={<MyOrder/>} />

            </Routes>

        </HashRouter>
    )
}
export default SellerModule;

const logout=()=>{
    localStorage.clear();
    window.location.href="./#/login"
    window.location.reload();
}