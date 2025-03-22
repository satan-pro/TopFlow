import Upcoming from "../components/Upcoming";
import MyProgress from "../components/MyProgress";
import Searchbar from "../components/Searchbar";
import Statistics from "../components/Statistics";
import MyCalendar from "../components/MyCalendar";
import MyAssignment from "../components/MyAssignment";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [user, setUser] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/dashboard`, {withCredentials: true})
    .then((response) => {
      console.log(response);
      setUser(response);
    })
    .catch((err)=>{
      console.log("Not logged in", err);
    })
  }, []);

  console.log(user);

  return (
    <div className="flex-1 h-screen p-4 overflow-scroll bg-gray-100">
      <Searchbar className="w-full" />
      <MyProgress />
      <div className="flex w-full justify-between  space-x-4">
        <div className="flex-col w-4/6">
          <Statistics />
          <MyAssignment />
        </div>
        <div className="flex-col w-2/6">
          <MyCalendar />
          <Upcoming />
        </div>
      </div>
    </div>
  );
}
