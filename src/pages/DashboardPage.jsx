import React from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import DashboardBackground from '../components/background/DashboardBackground';
import Loading from '../components/animate/Loading';


export default function DashboardPage() {
    const { userInfo, currentUser, userInfoLoading } = useAuth();
    

    const displayName = userInfo?.name || currentUser?.email?.split('@')[0] || 'Kullanıcı';

    return (
        <div className='w-full h-screen flex flex-col overflow-hidden relative'>
            <Navbar/>

            <DashboardBackground> 
                <div className='relative z-10 flex flex-col items-center justify-center h-full px-4'>

                    <div className='text-center md:space-y-4 space-y-8'>
                        <h1 className='md:text-9xl text-5xl font-black text-white leading-none tracking-tight'>
                            <span 
                                className={`
                                    block [-webkit-text-stroke:3px_#00B7FF] text-transparent 
                                    hover:text-white transition-all duration-700 ease-out
                                    ${userInfoLoading ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'}
                                `}
                            >
                                HOŞGELDİN
                            </span>
                        </h1>
                        {userInfoLoading ? (
                           
                            <div className='pt-45 flex justify-center items-center'> 
                                <Loading />
                            </div>
                        ) : (
                           
                            <p 
                                className={`
                                    md:text-2xl text-[12px] text-cyan-100 font-medium mt-4 opacity-90
                                    transition-all duration-700 ease-out delay-200
                                    ${userInfoLoading ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'}
                                `}
                            >
                                {displayName}
                            </p>
                        )}
                    </div>

                </div>
            </DashboardBackground>
        </div>
    );
}