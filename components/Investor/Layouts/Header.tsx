import React, { useEffect, useState } from "react";
import { removeToken, removeStorageData, getCurrentUserData, } from "../../../lib/session";

interface UserData {
  id: number;
}
const Header = () => {
  const [current_user_id, setCurrentUserId] = useState(false);

  function redirectToLogin() {
    window.location.href= "/login";
  }
  function handleLogout(e: any) {
    e.preventDefault();
    removeToken();
    removeStorageData();
    redirectToLogin();
  }
  useEffect(() => {
    const current_user_data: UserData = getCurrentUserData();
    current_user_data.id ? setCurrentUserId(true) : setCurrentUserId(false);
  }, []);
  return (
    <>
       
    </>
  )
}

export default Header