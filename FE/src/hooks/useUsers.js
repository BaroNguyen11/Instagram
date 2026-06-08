import { useEffect, useState } from "react";

const useUsers = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8080/users");
      const data = await res.json();
      setUser(data);
    };
    fetchData()
  
  }, []);
    return user ;   
};
export default useUsers;
