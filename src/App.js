import './App.css';
import SellerModule from './seller/sellerapp.js';
import UserModule from './user/userapp.js';


function App() {
  //let login = false;
  if (localStorage.getItem("sellerid") == null) {
    return (<UserModule />)
  } else {

    return (<SellerModule />)
  }

  // return (
  //   <>
  //   <SellerModule/>
  //   <UserModule/>
  //   </>
  // );
}

export default App;
