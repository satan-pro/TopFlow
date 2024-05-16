import { useState, useEffect } from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import {
  CircularProgress,
  CircularProgressLabel,
  Progress,
} from "@chakra-ui/react";
import { Calendar } from "react-calendar";
import axios from "axios";
import graph_img from "../assets/graph.png";

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

/* function SmallCard({ bgColor }) {
  return (
    <div
      className={`${bgColor} inline-block w-48 h-48 rounded-xl `}
    ></div>
  );
} */

/* function SmallCardView() {
function SmallCard({ bgColor }) {
  return (
    <div
      className={`${bgColor} inline-block w-48 h-48 rounded-xl duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-gray-500 `}
    ></div>
  );
}

function SmallCardView() {
  return (
    <div className="relative border-box h-full flex justify-between items-center m-2 gap-x-2 ">
      <SmallCard bgColor="bg-lime-300" />
      <SmallCard bgColor="bg-red-300" />
      <SmallCard bgColor="bg-sky-300" />
    </div>
  );
} */

function ProgressCard(props) {
  return (
    <div
      className={`${props.cardColor} flex flex-col p-6 justify-end inline-block bg-red-400 w-48 h-44 rounded-xl gap-3 duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-gray-500`}
    >
      <h1 className="text-2xl text-black font-bold">{props.heading}</h1>
      <div className="flex flex-row text-sm justify-start gap-1">
        <p className="inline-block text-black font-semibold">
          {props.tasks} tasks |{" "}
        </p>
        <p className="inline-block text-black font-semibold">
          {Math.floor(props.percentComplete)} %
        </p>
      </div>
      <Progress value={props.percentComplete} size="xs" colorScheme="purple" />
    </div>
  );
}

/*function MyProgress() {
  const [getData, setGetData] = useState([{}]);

  useEffect(() => {
    axios.get("http://localhost:5000/dashboard").then((response) => {
      setGetData(response.data.userData);
       console.log(response.data.userData);
    });
  }, []);

  console.log(getData);

  const cardColors = ["bg-yellow-300", "bg-red-300", "bg-sky-300"];
}*/

function MyProgress() {
  const [getData, setGetData] = useState([{}]);

  useEffect(() => {
    axios.get("http://localhost:5000/dashboard").then((response) => {
      setGetData(response.data.userData);
      /*  console.log(response.data.userData); */
    });
  }, []);

  console.log(getData);

  const cardColors = ["bg-yellow-300", "bg-red-300", "bg-sky-300"];
  return (
    <div>
      <h1 className="text-2xl font-semibold my-8">My Progress</h1>
      <div className="flex border-box bg-indigo-950 w-full p-4 h-64 rounded-lg text-white">
        <div className="w-1/2">
          <h1 className="text-xl">Hi John!</h1>
          <p className="text-5xl mb-8 mt-8">
            You have completed{" "}
            {getData.completed && getData.completed.length > 0
              ? getData.completed[1].tasks
              : 0}{" "}
            tasks this week
          </p>
          <a
            className="bg-white rounded-2xl px-4 text-indigo-950 p-1 hover:border-2 duration-400"
            href="/"
          >
            See All <i class="ri-arrow-right-up-line"></i>
          </a>
        </div>
        <div className="w-1/2 bg-indigo-950 m-4 flex gap-x-2 overflow-x-hidden overflow-y-hidden whitespace-nowrap">
          {/* <div className="inline-block bg-lime-400 w-48 rounded-xl"></div>
          <div className="inline-block bg-red-400 w-48 rounded-xl"></div>
          <div className="inline-block bg-yellow-400 w-48 rounded-xl"></div> */}
          <div className="relative border-box h-full flex justify-between items-center m-2 gap-x-2">
            {getData.completed && getData.completed.length > 0
              ? getData.completed.map((user, index) => {
                  return (
                    <ProgressCard
                      key={index}
                      heading={user.title}
                      tasks={user.tasks}
                      percentComplete={(user.completedTasks / user.tasks) * 100}
                      cardColor={cardColors[index]}
                    />
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function Statistics() {
  return (
    <div>
      <h1 className="text-2xl font-semibold my-8">Statistics</h1>
      <div className="flex gap-x-4">
        <div className=" flex-col justify-center items-center space-y-2 w-36 h-36 rounded-lg py-4 bg-white text-center">
          <p className="text-6xl font-semibold ">2</p>
          <p className="text-md">Projects completed</p>
        </div>
        <div className="w-36 h-36 rounded-lg py-4 bg-white flex-col text-center">
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
          <p className="text-md">Project progress</p>
        </div>
        <div className="w-96 h-36 bg-white flex justify-between p-4 rounded-lg">
          <div className=" flex-col justify-center items-center space-y-2 w-36 h-24 py-4 bg-white text-center">
            <p className="text-4xl font-semibold ">8</p>
            <p className="text-md">Hours spent this week</p>
          </div>
          <img className="w-48 h-24 pt-4" src={graph_img} alt="graph" />
        </div>
      </div>
    </div>
  );
}

function Assignment({ assignment }) {
  return (
    <div className="flex justify-between items-center h-24 p-4 rounded-lg hover:bg-white duration-200">
      <div className="flex items-center gap-x-4">
        <div className={`w-16 h-16 ${assignment.color} rounded-lg`}></div>
        <div>
          <h2 className="font-bold">{assignment.heading}</h2>
          <p>{assignment.body}</p>
        </div>
      </div>
      <span>{assignment.date}</span>
      <button>
        <i className="ri-more-fill"></i>
      </button>
    </div>
  );
}

function AssignmentList() {
  const initialAssignmentList = [
    {
      heading: "Color Theory",
      body: "UX Design Fundamentals",
      date: "9 Feb 2024",
      color: "bg-pink-300",
      id: 1,
    },
    {
      heading: "Second Design Concept",
      body: "UX/UI",
      date: "13 Mar 2024",
      color: "bg-sky-300",
      id: 2,
    },
    {
      heading: "Filtering and Sorting",
      body: "Design Composition",
      date: "2 Mar 2024",
      color: "bg-purple-300",
      id: 3,
    },
  ];
  return initialAssignmentList.map((assignment) => (
    <Assignment className="hover:bg-white" assignment={assignment} />
  ));
}

function MyAssignment() {
  return (
    <div className="flex-col">
      <div className="flex justify-between  ">
        <h1 className="text-2xl font-semibold my-8">My Assignments</h1>
        <button>
          View All<i className="ri-arrow-drop-right-line"></i>
        </button>
      </div>
      <AssignmentList />
    </div>
  );
}
function MyCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <h1 className="text-2xl font-semibold my-8">Calendar</h1>
      <Calendar
        className="bg-white rounded-lg p-8 font-semibold"
        onChange={setDate}
        value={date}
      />
    </div>
  );
}

function UpcomingAssignments({ assignment }) {
  return (
    <button className="flex justify-between items-center h-24 p-2 rounded-lg hover:bg-gray-200 duration-200">
      <div className="flex items-center gap-x-4 rounded-lg">
        <div className={`w-12 h-12 ${assignment.color} rounded-lg`}></div>
        <div>
          <h2 className="font-semibold">{assignment.heading}</h2>
          <p>{assignment.body}</p>
        </div>
        <span>{assignment.date}</span>
      </div>
      <button>
        <i className="ri-arrow-drop-right-line"></i>
      </button>
    </button>
  );
}

function Upcoming() {
  const upcomingAssignments = [
    {
      heading: "Color Theory",
      body: "UX Design Fundamentals",
      date: "9 Feb 2024",
      color: "bg-orange-200",
      id: 1,
    },
    {
      heading: "Second Design Concept",
      body: "UX/UI",
      date: "13 Mar 2024",
      color: "bg-lime-300",
      id: 2,
    },
    {
      heading: "Filtering and Sorting",
      body: "Design Composition",
      date: "2 Mar 2024",
      color: "bg-purple-300",
      id: 3,
    },
  ];
  return (
    <div className=" flex-col">
      <h1 className="text-2xl font-semibold my-8">Upcoming</h1>
      <div className="bg-white rounded-lg p-4 h-fit">
        {upcomingAssignments.map((assignment) => (
          <UpcomingAssignments assignment={assignment} />
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
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
