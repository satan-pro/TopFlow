import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import graph_img from "/assets/graph.png";

export default function Statistics() {
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
