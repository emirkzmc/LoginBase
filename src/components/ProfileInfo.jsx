import Input from './Input';
import Label from './Label';
import Button from './Button';
import Loading from './animate/Loading';
import { useSave } from '../hooks/useSave';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';


export default function ProfileInfo({ formData, handleChange }) {
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const { currentUser, refreshUserInfo } = useAuth();

    const { handleSave } = useSave({ currentUser, formData, setIsSaving, setSaveError, setIsEditing, refreshUserInfo });

    const inputFields = [
        {
            name: "name",
            label: "Ad Soyad",
            type: "text",
        },
        {
            name: "email",
            label: "E-posta",
            type: "email",
        },
        {
            name: "usertc",
            label: "T.C Kimlik",
            type: "text",
        },
    ];
    return (
        <div>
            <div className='bg-white dark:bg-black/20 rounded-2xl shadow-lg p-8 w-screen max-w-lg min-w-sm '>
                <h2 className='text-3xl font-bold text-[#66b2e8] dark:text-blue-950 mb-6 text-center'>
                    Profil Bilgilerim
                </h2>
                <div className='space-y-6'>
                    {inputFields.map(({ name, label, type }) => (
                        <div key={name} className="flex flex-col gap-4">
                            <Label text={label} className="block text-sm font-semibold dark:text-gray-200" />
                            <Input
                                name={name}
                                type={type}
                                value={formData[name]}
                                onChange={handleChange}
                                disabled={!isEditing || isSaving}
                                className="w-full bg-gray-50 border border-gray-300 rounded md:px-4 px-8 py-2 md:py-2 text-gray-800 disabled:text-blue-950 disabled:opacity-70"
                            />
                        </div>
                    ))}


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
                                className='px-6 py-2 dark:bg-blue-600 bg-[#66b2e8] hover:bg-blue-300 transition hover:duration-300 hover:ease-in-out text-white rounded-lg font-semibold dark:hover:bg-blue-700'
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
