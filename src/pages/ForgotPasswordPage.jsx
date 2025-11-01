import React, { useState } from 'react';
// 1. GEREKLİ METOT (Firebase Metodu)
import { sendPasswordResetEmail } from 'firebase/auth'; 
import { auth } from '../firebaseConfig'; 
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Senin özel component'lerin (yollarını kontrol et)
import Button from '../components/Button';
import InputField from '../components/InputField';
import BackgroundForgotPassword  from '../components/background/BackgroundForgotPassword';

export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(""); 
    const [error, setError] = useState("");   


    const handlePasswordReset = async (e) => {
        e.preventDefault(); 
        setError("");
        setMessage("");

        try {
  
            await sendPasswordResetEmail(auth, email);
            setMessage('Şifre sıfırlama e-postası gönderildi. Lütfen gelen kutunuzu kontrol edin.');
            
            setTimeout(() => {
                navigate("/login");
            }, 1000);
            
        } catch (err) {

            if (err.code === 'auth/user-not-found') {
                setError('Bu e-posta adresine kayıtlı bir kullanıcı bulunamadı.');
            } else {
                setError('Bir hata oluştu. Lütfen tekrar deneyin.');
            }
            
        }
    };

    return (
        <BackgroundForgotPassword>
            <form onSubmit={handlePasswordReset} className="flex flex-col items-start justify-start gap-10">
                <p className="text-3xl font-semibold">ŞİFRE YENİLE</p>
                <p className="text-gray-600 -mt-6 max-w-xs">
                    Kayıtlı e-posta adresinizi girin, size şifrenizi sıfırlamanız için bir link göndereceğiz.
                </p>
                
                <div className="flex flex-col gap-6"> 
                    <InputField
                        iconType="emailBox"
                        placeholder="E-posta Adresi"
                        typee="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        iconColor="#c94b4b"
                        focusBorderColor="#c94b4b"
                        required={true}
                    />
                </div>
                

                {message && <p className="text-sm text-green-600 -mt-4">{message}</p>}
                {error && <p className="text-sm text-red-500 -mt-4">{error}</p>}

                <div className="flex flex-col gap-4 items-center justify-center w-full">
 
                    <Button type="submit" variant="danger" whattype="text" text="SIFIRLAMA LİNKİ GÖNDER" />
                    
                    <Link to="/login" className="text-[13px] text-[#397762] hover:text-[#5FE4B8] transition hover:duration-200 active:text-[#72A795]">
                        Giriş'e geri dön
                    </Link>
                </div>
            </form>
        </BackgroundForgotPassword>
    );
}