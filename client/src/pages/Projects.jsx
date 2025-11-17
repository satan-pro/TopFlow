import { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import ProjectCard from "../components/ProjectCard";
import axios from 'axios';

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/projects`, { withCredentials: true })
      .then((response) => {
        setProjects(response.data.projects); // Directly set the fetched data
      })
      .catch(err => {
        console.log("Error fetching projects from Projects.jsx", err);
      });
  }, []); // Only runs on component mount


  return (
    <div className="h-screen flex-1 p-8">
      <h1 className="text-2xl font-bold m-2">Your Projects</h1>
      <Searchbar />
      <div className="p-4">
        {projects.map((project) => (<ProjectCard key={project._id} project={project} />))}
      </div>
    </div>
  );
}
