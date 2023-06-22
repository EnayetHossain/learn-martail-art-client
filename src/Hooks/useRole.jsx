import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState();
  const token = localStorage.getItem("access-token");

  useEffect(() => {
    fetch(`https://learn-martial-server.vercel.app/users/role/${user?.email}`, {
      headers: {
        authorization: `bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRole(data);
      });
  }, [user, token]);

  return role;
};

export default useRole;
