import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Loading from '../components/animate/Loading';

const AuthContext = createContext();


export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userInfoLoading, setUserInfoLoading] = useState(false);


  const fetchUserInfo = useCallback(async (uid) => {
    if (!uid) {
      setUserInfo(null);
      return;
    }

    setUserInfoLoading(true);
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserInfo(docSnap.data());
      } else {
        setUserInfo(null);
        console.log("Kullanıcı verisi bulunamadı.");
      }
    } catch (error) {
      console.error("Kullanıcı bilgisi alınamadı:", error);
      setUserInfo(null);
    } finally {
      setUserInfoLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {

        setUserInfoLoading(true);
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {

            setUserInfo(docSnap.data());
          } else {

            setUserInfo({
              name: user.displayName,
              email: user.email,
              usertc: "Belirtilmemiş"
            });
            console.log("Kullanıcı verisi bulunamadı, Auth verisi kullanılıyor.");
          }
        } catch (error) {
          console.error("Kullanıcı bilgisi alınamadı:", error);
          setUserInfo(null);
        } finally {
          setUserInfoLoading(false);
        }

      } else {

        setUserInfo(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);


  const value = useMemo(() => ({
    currentUser,
    userInfo,
    userInfoLoading,
    refreshUserInfo: () => currentUser && fetchUserInfo(currentUser.uid)
  }), [currentUser, userInfo, userInfoLoading, fetchUserInfo]);

  return (
    <AuthContext.Provider value={value}>
      {loading ? <GlobalLoadingScreen /> : children}
    </AuthContext.Provider>
  );
}
const GlobalLoadingScreen = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-white">
      <Loading w="100" h="100" color='black' />
    </div>
  );
};