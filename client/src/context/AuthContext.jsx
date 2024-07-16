import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [loading, setLoading] = useState(true);
  const [authData, setAuthData] = useState(null);

  const login = (data) => {
    setAuthData({
      userId: data.userId
    });
    localStorage.setItem('token', data.token);

  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem('token');

  };

  const setAuth = (data) => {
    setAuthData({
      userId: data._id
    });
    if(data._id){
      setLoading(false);
    }
    // localStorage.setItem('token', data.token);
  
  }

  return (
    <AuthContext.Provider value={{ authData, login, logout, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
