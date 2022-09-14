import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/header';
import Home from './components/home';
import Form from './components/form';
import About from './components/about';


const deployedLink = '';
const localLink = 'http://localhost:4000';

export const config = {
  baseUrl: process.env.NODE_ENV === 'development' ? localLink : deployedLink,
};

// console.log(process.env)



function App() {

  // const [loggedIn, setLoggedIn] = useState(false);
  // console.log(loggedIn);
  const [property, setProperty] = useState(JSON.parse(localStorage.getItem('property') || '[]'));

  console.log(property)

  return (
    <div className="App">
      <Router>
        <Header />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
            />
        <Routes>
          <Route exact path="/" element={<Home property={property} setProperty={setProperty} />} />
          <Route path="/add" element={<Form setProperty={setProperty} />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<h1>404 Not Found!</h1>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;