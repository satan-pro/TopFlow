import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/projects/${project._id}`);
  };

  return (
    <div className="flex justify-between items-center p-4 my-4 bg-white rounded-lg shadow-md hover:shadow-lg duration-200 cursor-pointer"
    onClick={handleClick}>
      <div className="flex items-center gap-x-4">
        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
        <div>
          <h2 className="font-semibold">{project.name}</h2>
          <p>{project.description}</p>
        </div>
      </div>
      <button>
        <i className="ri-arrow-drop-right-line"></i>
      </button>
    </div>
  );
}
