import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import TrackingPage from './pages/TrackingPage';

import io from 'socket.io-client';
const orderId = 'ORDER123';


function App() {
  const socket = io(`${import.meta.env.VITE_BASEURL}`);

  socket.emit('joinOrderRoom', orderId);

  const [navbarTitle, setNavbarTitle] = useState("Customer Map");

  return (
    <div className="min-h-screen">
      <Navbar title={navbarTitle} />
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar collapsed={false} />
        </div>
        <div className="flex-grow transition-all duration-300">
          <TrackingPage 
            socket={socket}
            setNavbarTitle={setNavbarTitle}
          />
        </div>
      </div>
    </div>
  );
}

export default App;