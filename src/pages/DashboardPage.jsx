import React from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import DashboardBackground from '../components/background/DashboardBackground';

export default function DashboardPage() {
    const { userInfo, currentUser, userInfoLoading } = useAuth();
    
    // İsmi belirle - önce userInfo'dan, sonra email'den
    const displayName = userInfo?.name || currentUser?.email?.split('@')[0] || 'Kullanıcı';

    return (
        <div className='w-full h-screen flex flex-col overflow-hidden relative'>
            <Navbar/>

            {/* Arka plan gradient */}
            <DashboardBackground> 
                {/* Ana içerik */}
                <div className='relative z-10 flex flex-col items-center justify-center h-full px-4'>
                    {/* Hoşgeldin mesajı - büyük ve vurgulu */}
                    <div className='text-center space-y-4'>
                        <h1 className='md:text-9xl text-5xl font-black text-white leading-none tracking-tight'>
                            <span className='block [-webkit-text-stroke:3px_#00B7FF] text-transparent hover:text-white transition-all duration-500 animate-float'>
                                HOŞGELDİN
                            </span>
                        </h1>
                        {userInfoLoading ? (
                            <p className='md:text-2xl text-lg text-cyan-100 font-medium mt-4 opacity-90'>
                                Yükleniyor...
                            </p>
                        ) : (
                            <p className='md:text-2xl text-lg text-cyan-100 font-medium mt-4 opacity-90'>
                                {displayName}
                            </p>
                        )}
                    </div>

                    
                </div>
            </DashboardBackground>
        </div>
    );
}
