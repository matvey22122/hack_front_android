import React, {useState} from 'react';
import {ApiContext} from './ApiContext';
import axios from 'axios';
import {API_URL} from '@env';

export const ApiState = ({children}) => {
  const [user, setUser] = useState({
    login: '',
    password: '',
  });

  const [member, setMember] = useState({});

  const Login = async () => {
    try {
      console.log(2)
      const res = await axios.post(`${API_URL}/judge/login`, {...user});
      return res.status === 200;
    } catch (e) {
      console.log(e)
      return false;
    }
  };

  const Logout = () => {
    setUser({
      login: '',
      password: '',
    });
  };

  const estimateMember = async (point) => {
    try {
      const res = await axios.post(`${API_URL}/judge/estimate`, {
        Member: member._id,
        score: point,
        login: user.login,
      });
      return res.status === 200;
    } catch (e) {
      return false;
    }
  };

  return (
    <ApiContext.Provider
      value={{Login, Logout, setUser, user, setMember, member, estimateMember}}>
      {children}
    </ApiContext.Provider>
  );
};
