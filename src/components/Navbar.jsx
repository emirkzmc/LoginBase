import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useAuth } from '../context/AuthContext';

const Navbar = memo(function Navbar() {
    const { currentUser, userInfo } = useAuth();
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

    return (
        <> 
        <nav className='flex items-center justify-evenly text-white h-14 bg-blue-950 gap-9 py-10 '>
            {userInfo ? (
                <>
                    <p className='text-white font-semibold text-lg'>
                        Hoş geldin, <br /> {userInfo.name}
                    </p>

                </>
            ) : (
                currentUser && (
                    <p className='text-white font-semibold text-lg'>
                        Hoş geldin, <br /> {currentUser.email}
                    </p>
                )
            )}
            <ul className='flex gap-44'>
                <li
                onClick={handleHomeClick}
                className='cursor-pointer hover:text-blue-300 transition-colors'
                >ANA SAYFA</li>
                <li>HAKKIMDA</li>
                <li 
                    onClick={handleProfileClick}
                    className='cursor-pointer hover:text-blue-300 transition-colors'
                >
                    PROFİLİM
                </li>
            </ul>
            <button
                onClick={handleLogout}
                className=" px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
                Çıkış Yap
            </button>
        </nav>
        </>
    );
});

export default Navbar;