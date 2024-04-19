import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-purple-800 text-white py-3'>
      <div className="logo">
        <span className="font-bold text-xl mx-8">MyTask</span>
      </div>
      <ul className="flex gap-8 mx-9">
        <li className="cursor-pointer hover:font-bold transition-all ">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all">Your Task</li>
      </ul>
    </nav>
  )
}

export default Navbar
