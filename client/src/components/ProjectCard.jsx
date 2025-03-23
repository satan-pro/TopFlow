export default function ProjectCard({ project }) {
  return (
    <div className="flex justify-between items-center p-4 my-4 bg-white rounded-lg shadow-md hover:shadow-lg duration-200"
    onClick={()=>{window.open(project.details.projectUrl)}}>
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
