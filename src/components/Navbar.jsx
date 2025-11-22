import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import Loading from './animate/Loading';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = memo(function Navbar() {

    const { currentUser, userInfo, userInfoLoading } = useAuth();
    const navigate = useNavigate();

    const handleLogout = useCallback(async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (err) {
            console.error('Çıkış yapılamadı:', err);
        }
    }, [navigate]);

    const handleProfileClick = useCallback(() => {
        navigate('/user');
    }, [navigate]);

    const handleHomeClick = useCallback(() => {
        navigate('/');
    }, [navigate]);


    const displayText = userInfo ? userInfo.name : (currentUser ? currentUser.email : null);

    if (userInfoLoading) {
        <Loading />
    }

    return (
        <>
            <nav className='flex items-center justify-evenly text-black dark:text-white h-14 bg-[#66b2e8] dark:bg-blue-950 gap-9 py-10 '>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                >
                    <p className={` text-[#092f4a] dark:text-white font-semibold md:text-lg text-sm transition-opacity duration-700 ease-out w-44 

                    ${userInfoLoading ? 'opacity-0' : 'opacity-100'} 
                `}>
                        Hoş Geldin, <br />
                        {displayText || <>&nbsp;</>}
                    </p>
                </motion.div>

                <ul className='flex gap-36 dark:text-white text-[#092f4a]'>
                    <li
                        onClick={handleHomeClick}
                        className='cursor-pointer hover:text-blue-300 transition-colors'
                    >ANA SAYFA</li>


                    <li
                        onClick={handleProfileClick}
                        className='cursor-pointer hover:text-blue-300 transition-colors'
                    >
                        PROFİLİM
                    </li>
                </ul>
                <div className='flex space-x-12'>
                    <ThemeToggle />
                    <Button
                        onClick={handleLogout}
                        className=" px-4 py-2 bg-gradient-to-br from-[#3778a1] via-[#5196c2] to-[#62b1e3] hover:bg-gradient-to-br hover:from-[#448bb8] hover:via-[#448bb8] hover:to-[#448bb8]  border-blue-400 text-blue-100 dark:bg-gradient-to-br dark:from-[#072d47] dark:via-[#184666] dark:to-[#0e3b59] border dark:border-gray-700 dark:text-white rounded-3xl dark:hover:bg-gradient-to-r dark:hover:from-[#00080d]/10 dark:hover:to-[#00080d]/10 transition hover:duration-400 hover:ease-in-out"
                        text="Çıkış Yap" />
                </div>

            </nav>
        </>
    );
});

export default Navbar;


