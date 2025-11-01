import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function UserPage() {
    const { currentUser, userInfo, userInfoLoading } = useAuth();


    const loading = userInfoLoading;

    if (loading) {
        return (
            <div className='w-full h-screen flex flex-col overflow-y-hidden'>
                <Navbar />
                <div className='flex items-center justify-center flex-1 bg-gradient-to-b from-blue-400 to-blue-900'>
                    <p className='text-white text-xl'>Yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='w-full h-screen flex flex-col overflow-y-hidden'>
            <Navbar />
            <div className='flex flex-col gap-8 items-center justify-center flex-1 bg-gradient-to-b from-blue-400 to-blue-900'>
                <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md'>
                    <h2 className='text-3xl font-bold text-blue-950 mb-6 text-center'>
                        Profil Bilgilerim
                    </h2>
                    <div className='space-y-4'>
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                Ad Soyad
                            </label>
                            <div className='bg-gray-50 border border-gray-300 rounded px-4 py-2 text-gray-800'>
                                {userInfo?.name || 'Belirtilmemiş'}
                            </div>
                        </div>
                        <div>
                            <label className='block text-sm font-semibold text-gray-700 mb-2'>
                                E-posta
                            </label>
                            <div className='bg-gray-50 border border-gray-300 rounded px-4 py-2 text-gray-800'>
                                {userInfo?.email || currentUser?.email || 'Belirtilmemiş'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}