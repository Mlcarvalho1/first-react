import React from "react";
import { Provider } from "react-redux";
import './css/app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

import store, { persistor } from "./store";
import Header from "./components/Header";
import Routes from "./routes";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Header/>
        <Routes/>
        <ToastContainer/>
      </PersistGate>
    </Provider>
    
  );
}

export default App;
 