import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Input from '../components/Input';
import Loading from '../components/animate/Loading';
import Label from '../components/Label';
import Button from '../components/Button'; // Zaten import edilmiş, harika!
import UserPageBackground from '../components/background/UserPageBackground';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

export default function UserPage() {
    const { currentUser, userInfo, userInfoLoading , refreshUserInfo } = useAuth();
    const db = getFirestore();
    

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        usertc: ''
    });

    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);

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

    const handleSave = async () => {
        if (!currentUser) {
            setSaveError("Kullanıcı oturumu bulunamadı.");
            return;
        }

        setIsSaving(true);
        setSaveError(null);

        try {
            const userDocRef = doc(db, 'users', currentUser.uid);

            const dataToUpdate = {
                name: formData.name,
                email: formData.email,
                usertc: formData.usertc
            };

            await updateDoc(userDocRef, dataToUpdate);

            await refreshUserInfo();

            setIsEditing(false);
        } catch (error) {
            console.error("Güncelleme hatası:", error);
            setSaveError("Bilgiler güncellenirken bir hata oluştu.");
        } finally {
            setIsSaving(false);
        }
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
                    <div className='bg-white rounded-lg shadow-lg p-8 w-full max-w-md min-w-[200px]'>
                        <h2 className='text-3xl font-bold text-blue-950 mb-6 text-center'>
                            Profil Bilgilerim
                        </h2>
                        <div className='space-y-6'>
                            <div className='flex flex-col gap-4'>
                                <Label text="Ad Soyad" className='block text-sm font-semibold text-gray-700 ' />
                                <Input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    disabled={!isEditing || isSaving}
                                    className='w-full bg-gray-50 border border-gray-300 rounded md:px-4 px-8 py-2 md:py-2 text-gray-800 disabled:text-blue-950 disabled:opacity-70'
                                />
                            </div>
                            <div className='flex flex-col gap-4'>
                                <Label text="E-posta" className='block text-sm font-semibold text-gray-700' />
                                <Input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled={!isEditing || isSaving}
                                    className='w-full bg-gray-50 border border-gray-300 rounded md:px-4 px-8 py-2 md:py-2 text-gray-800 disabled:text-blue-950 disabled:opacity-70'
                                />
                            </div >
                            <div className='flex flex-col gap-4'>
                                <Label
                                    text="T.C Kimlik"
                                    className='block text-sm font-semibold text-gray-700 ' />
                                <Input
                                    name="usertc"
                                    value={formData.usertc}
                                    onChange={handleChange}
                                    disabled={!isEditing || isSaving}
                                    className='w-full bg-gray-50 border border-gray-300 rounded md:px-4 px-8 py-2 md:py-2 text-gray-800 disabled:text-blue-950 disabled:opacity-70'
                                />
                            </div>

                            {saveError && (
                                <div className='text-red-600 text-sm text-center'>
                                    {saveError}
                                </div>
                            )}

                            <div className='flex justify-end gap-4'>
                                {isEditing && (
                                    <Button
                                        text="İptal"
                                        whattype="button"
                                        onClick={() => {
                                            setIsEditing(false);
                                            setSaveError(null);
                                        }}
                                        className='px-6 py-2 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 disabled:opacity-50'
                                    />
                                )}

                                {isEditing ? (
                                    <Button
                                        text={isSaving ? <Loading w='25' h='25' /> : 'Kaydet'}
                                        whattype="button"
                                        onClick={handleSave}
                                        className='px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50'
                                    />
                                ) : (
                                    <Button
                                        text="Düzenle"
                                        whattype="button"
                                        onClick={() => setIsEditing(true)}
                                        className='px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700'
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserPageBackground>
    );
}