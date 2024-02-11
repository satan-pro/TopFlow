import { useState, useEffect } from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { CircularProgress, CircularProgressLabel, Progress } from "@chakra-ui/react";
import axios from "axios";

function Searchbar() {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(searchValue); //search value from here
    setSearchValue("");
  };

  return (
    <div className="">
      <form onSubmit={handleFormSubmit}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.500" />}
          />
          <Input
            className="w-full"
            type="text"
            placeholder="Search for a project, task, etc.."
            value={searchValue}
            onChange={handleInputChange}
          />
        </InputGroup>
      </form>
    </div>
  );
}

function ProgressCard(props) {
  return (
    <div className="flex flex-col p-6 justify-end inline-block bg-red-400 w-48 rounded-xl gap-3">
      <h1 className="text-2xl text-black font-bold">{props.heading}</h1>
      <div className="flex flex-row text-sm justify-start gap-1">
        <p className="inline-block text-black font-semibold">{props.tasks} tasks | </p>
        <p className="inline-block text-black font-semibold">{props.percentComplete} %</p>
      </div>
      <Progress value={props.percentComplete} size='xs' colorScheme="blackAlpha"/>
    </div>
  );
}

function MyProgress() {
  const [getData, setGetData] = useState([{}]);

  useEffect(() => {
    axios.get("http://localhost:5000/dashboard").then((response) => {
      setGetData(response.data.userData);
      /*  console.log(response.data.userData); */
    });
  }, []);

  console.log(getData);

  return (
    <div>
      <h1 className="text-2xl font-semibold my-2">My Progress</h1>
      <div className="flex bg-indigo-950 w-full p-4 h-64 rounded-lg text-white">
        <div className="w-1/2">
          <h1 className="text-xl">Hi John!</h1>
          <p className="text-5xl mb-8 mt-8">
            You have completed {getData.completed && getData.completed.length>0? getData.completed[0].completedTasks : 0} tasks
            this week
          </p>
          <a className="bg-white rounded-2xl px-4 text-indigo-950 p-1" href="/">
            See All <i class="ri-arrow-right-up-line"></i>
          </a>
        </div>
        <div className="w-1/2 bg-indigo-950 m-4 flex gap-x-2 overflow-x-hidden overflow-y-hidden whitespace-nowrap">
          {/* <div className="inline-block bg-lime-400 w-48 rounded-xl"></div>
          <div className="inline-block bg-red-400 w-48 rounded-xl"></div>
          <div className="inline-block bg-yellow-400 w-48 rounded-xl"></div> */}
          {getData.completed && getData.completed.length>0? (getData.completed.map((user, index) => {
            return (
              <ProgressCard
                key={index}
                heading={user.title}
                tasks={user.tasks}
                percentComplete={(user.completedTasks / user.tasks) * 100}
              />
            );
          })):null}
        </div>
      </div>
    </div>
  );
}

function Statistics() {
  return (
    <div>
      <h1 className="text-2xl font-semibold my-2">Statistics</h1>
      <div className="flex gap-x-4">
        <div className=" flex-col justify-center items-center space-y-8 w-36 h-36 rounded-lg p-2 bg-gray-100">
          <h1 className="text-6xl font-semibold">2</h1>
          <p className="text-sm">projects completed</p>
        </div>
        <div className="w-36 h-36 rounded-lg p-2 bg-gray-100 flex-col ">
          <div className=" flex justify-center items-center">
            <CircularProgress
              value={40}
              color="blue.400"
              size="90px"
              thickness="6px"
            >
              <CircularProgressLabel>40%</CircularProgressLabel>
            </CircularProgress>
          </div>
          <p className="text-sm">project progress</p>
        </div>
      </div>
    </div>
  );
}
function Assignment() {
  return (
    <div>
      <h2>My Assignments</h2>
    </div>
  );
}
function Calender() {
  return (
    <div>
      <h2>Calender</h2>
    </div>
  );
}
function Upcoming() {
  return (
    <div>
      <h2>Upcoming</h2>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="flex-1 h-screen p-4">
      {/* <div className="overflow-auto h-full bg-orange-300 w-fit">
        <MyCard />
        <MyCard />
      </div> */}
      <Searchbar className="w-full" />
      <MyProgress />
      <Statistics />
    </div>
  );
}
