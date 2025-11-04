import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { db } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";


export default function Signup() {
  const [usertc, setUsertc] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleTcChange = (e) => {
    const value = e.target.value;

    if (/^[0-9]*$/.test(value)) {

      if (value.length <= 11) {
        setUsertc(value);
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (usertc.length != 11){
      setError("T.C Kimlik numarası 11 haneli olmalıdır.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Şifreler uyuşmuyor!")
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

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {
      if (err.code === "auth/weak-password") {
        setError("Şifre çok zayıf. En az 6 karakter olmalı.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("Bu e-posta adresi zaten kullanılıyor.");
      } else {
        setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    }

  };

  return (
    <>
      <form onSubmit={handleRegister} className="flex flex-col items-start justify-start gap-10">

        <p className="text-3xl font-semibold">KAYIT OL</p>

        <div className="flex flex-col gap-7">
          <InputField
            iconType="user"
            placeholder="Ad-Soyad"
            typee="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            iconColor="#3fa1e8"
            focusBorderColor="#326fa8"
          />

          <InputField
            iconType="user"
            placeholder="T.C Kimlik"
            typee="text"
            value={usertc}
            onChange={handleTcChange}
            maxLength={11}
            inputMode="numeric"
            iconColor="#3fa1e8"
            focusBorderColor="#326fa8"
          />

          <InputField
            iconType="email"
            placeholder="E-posta Adresi"
            typee="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            iconColor="#3fa1e8"
            focusBorderColor="#326fa8"
          />
          <InputField
            iconType="password"
            placeholder="Şifre"
            typee="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPassword={isChecked}
            iconColor="#3fa1e8"
            focusBorderColor="#326fa8"
          />
          <InputField
            iconType="password"
            placeholder="Şifre Tekrar"
            typee="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            showPassword={isChecked}
            iconColor="#3fa1e8"
            focusBorderColor="#326fa8"
          />
        </div>

        <div className="flex justify-between gap-8">
          <div className="flex items-center">
            <label className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#326fa8] cursor-pointer">
              <Input
                typee="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <span>Şifreyi Göster</span></label>
          </div>


        </div>
        <div className="flex flex-col gap-7 items-center justify-center">
          <Button type="submit" variant="secondary" whattype="text" text="KAYIT OL" />
          <Link
            to="/login"
            className="text-[13px] pt-3 text-[#397762] hover:text-[#8EDBFF] active:text-[#0D5080] transition hover:duration-300"
          >
            Zaten bir hesabın var mı?
          </Link>
        </div>
        {error && <p className="max-w-xs text-sm text-red-500">{error}</p>}

      </form>
    </>
  );
}