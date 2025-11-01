import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';


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
      setLoading(false);
      

      if (user) {
        await fetchUserInfo(user.uid);
      } else {
        setUserInfo(null);
      }
    });

    return unsubscribe;
  }, [fetchUserInfo]);


  const value = useMemo(() => ({
    currentUser,
    userInfo,
    userInfoLoading,
    refreshUserInfo: () => currentUser && fetchUserInfo(currentUser.uid)
  }), [currentUser, userInfo, userInfoLoading, fetchUserInfo]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}