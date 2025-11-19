import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { useAuth } from '../context/AuthContext';
import Button from './Button';
import Loading from './animate/Loading';

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

    if(userInfoLoading){
        <Loading />
    } 

    return (
        <>
            <nav className='flex items-center justify-evenly text-white h-14 bg-blue-950 gap-9 py-10 '>


                <p className={` text-white font-semibold md:text-lg text-sm transition-opacity duration-700 ease-out w-44 

                    ${userInfoLoading ? 'opacity-0' : 'opacity-100'} 
                `}>
                    Hoş Geldin, <br />
                    {displayText || <>&nbsp;</>}
                </p>


                <ul className='flex gap-36'>
                    <li
                        onClick={handleHomeClick}
                        className='cursor-pointer hover:text-blue-300 transition-colors'
                    >ANA SAYFA</li>


                    <li className='cursor-pointer hover:text-blue-300 transition-colors'>
                        HAKKIMDA
                    </li>

                    <li
                        onClick={handleProfileClick}
                        className='cursor-pointer hover:text-blue-300 transition-colors'
                    >
                        PROFİLİM
                    </li>
                </ul>
                <Button
                    onClick={handleLogout}
                    className=" px-4 py-2 bg-gradient-to-br from-[#e61c1c] via-[#eb6565] to-[#e61c1c] text-white rounded hover:bg-gradient-to-b hover:from-[#c73a3a] hover:via-[#c73a3a] hover:to-[#c73a3a] transition-colors"
                    text="Çıkış Yap" />

            </nav>
        </>
    );
});

export default Navbar;


