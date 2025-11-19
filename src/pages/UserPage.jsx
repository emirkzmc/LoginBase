import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Loading from '../components/animate/Loading';
import UserPageBackground from '../components/background/UserPageBackground';
import ProfileInfo from '../components/ProfileInfo';

export default function UserPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        usertc: ''
    });

    const { userInfo, userInfoLoading, currentUser } = useAuth();

    useEffect(() => {
        if (userInfo || currentUser) {
            setFormData({
                name: userInfo?.name || '',
                email: userInfo?.email || currentUser?.email || '',
                usertc: userInfo?.usertc || 'Belirtilmemiş'
            });
        }
    }, [userInfo, currentUser, userInfoLoading]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };



    if (userInfoLoading) {
        return (
            <UserPageBackground>
                <div className='w-full h-screen flex flex-col overflow-y-hidden'>
                    <Navbar />
                    <div className='flex-grow flex p-4 justify-center items-center'>
                        <Loading />
                    </div>
                </div>
            </UserPageBackground>
        );
    }



    return (
        <UserPageBackground>
            <div className='w-full h-screen flex flex-col'>
                <Navbar />
                <div className='flex-grow flex justify-center items-center p-4'>
                    <ProfileInfo formData={formData}
                        handleChange={handleChange}
                    />
                </div>
            </div>
        </UserPageBackground>
    );
}