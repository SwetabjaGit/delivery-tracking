import React from 'react';
import { Share2, ArrowLeft } from 'lucide-react';

const Navbar = () => {

  const handleShare = () => {
    console.log("Handle Share");
  };

  return (
    <header className="bg-orange-500 text-white p-2 top-0 z-10 shadow-md">
      <div className="flex items-center justify-center p-2">
        {/* <button className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button> */}
        <h1 className="text-xl font-semibold">Track Order</h1>
        {/* <button className="p-2" onClick={handleShare}>
          <Share2 className="w-6 h-6" />
        </button> */}
      </div>
    </header>
  )
}

export default Navbar;