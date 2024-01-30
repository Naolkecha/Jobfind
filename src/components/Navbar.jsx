import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const navigate = useNavigate();
    return (
        <nav className=" bg-gray-300 p-4 ">
            <div className="md:mx-20 flex justify-between items-center   ">
               <div className='flex items-center justify-between w-full md:gap-10'>
                {!menuOpen && <div className="text-black text-lg font-bold ">
                    <Link to="/">JobFind</Link>
                </div>}
            <div className='hidden md:block'>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="text-black  hover:text-blue-500">HOME</Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-black hover:text-blue-500">POST A JOB</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="text-black hover:text-blue-500">JOB LIST</Link>
                    </li>
                    
                </ul>
               
                </div>
                <div className='hidden md:block'>
                <div className='flex items-center gap-3'>

                <div className='flex justify-evenly gap-3'>
                    <p>ETHIOPIA</p>
                    <p
                        onClick={() => navigate('/login')}
                        className='cursor-pointer'
                    >SIGN IN / SIGN UP</p>

               

                <button className='hidden md:block bg-blue-500 px-4 py-1 rounded-full text-white '>
                    POST A JOB
                </button>

                </div>
                </div>
                </div>

                <div className='md:hidden'>
               <div className='flex flex-col items-center justify-center gap-3'>
                <div className='md:hidden'>
                <div className="md:hidden flex items-center justify-end ">
                    <button
                        className="text-black focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
                </div>

                {menuOpen && (
                    <ul className="md:hidden flex flex-col space-y-4 mt-4">
                        <li>
                            <Link to="/" className="text-black hover:text-blue-500">HOME</Link>
                        </li>
                        <li>
                            <Link to="/about" className="text-black hover:text-blue-500">POST A JOB</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="text-black hover:text-blue-500">JOB LIST</Link>
                        </li>
                       
                        <li>
                        <button className='bg-blue-500 px-4 py-1 rounded-full text-white '>
                            POST A JOB
                        </button>
                        </li>
                    </ul>
                )}

</div>
</div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;