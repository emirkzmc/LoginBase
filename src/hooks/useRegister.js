import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword , sendEmailVerification , updateProfile } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export function useRegister() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const register = async (usertc, name, email, password, confirmPassword) => {
    setIsLoading(true);
    setError(null);

    if (usertc.length !== 11) {
      setError("T.C Kimlik numarası 11 haneli olmalıdır.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Şifreler uyuşmuyor!");
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: name,
      });

      await sendEmailVerification(user);
      alert("Kayıt başarılı! Lütfen e-postanı kontrol et ve doğrulama bağlantısına tıkla.");

      await setDoc(doc(db, "users", user.uid), {
        usertc,
        name,
        email,
        createdAt: new Date(),
      });

      if (!user.emailVerified) {
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (err) {
      if (err.code === "auth/weak-password") {
        setError("Şifre çok zayıf. En az 6 karakter olmalı.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("Bu e-posta adresi zaten kullanılıyor.");
      } else {
        setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { register, error, isLoading };
}