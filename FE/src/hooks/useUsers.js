import { useEffect, useState } from "react";
import { userService } from "../services/userService";

const useUsers = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await userService.getAllUsers()
      setUser(data);
    };
    fetchData()
  
  }, []);
    return user ;   
};
export default useUsers;
