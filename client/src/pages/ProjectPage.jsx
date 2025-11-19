import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [projectMembers, setProjectMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/projects/${projectId}`, { withCredentials: true })
      .then((response) => {
        setProject(response.data.project);
        setProjectMembers(response.data.project.members);
        setLoading(false);
      })
      .catch(err => {
        console.log("Error fetching project details", err);
        setError("Failed to load project details");
        setLoading(false);
      });
  }, [projectId]);

  const hardcodedTasks = [
    { id: 1, title: "Design new header", status: "In Progress", assignee: "Sayantan" },
    { id: 2, title: "Implement mobile layout", status: "Todo", assignee: "Aisha" },
    { id: 3, title: "Integrate analytics", status: "Done", assignee: "Liam" },
  ];

  const hardcodedCommits = [
    { id: "c1", message: "Fix header alignment", author: "Sayantan", date: "2025-10-01" },
    { id: "c2", message: "Add mobile utils", author: "Aisha", date: "2025-10-03" },
  ];

  const hardcodedPRs = [
    { id: "p1", title: "Mobile layout improvements", author: "Aisha", status: "Open" },
    { id: "p2", title: "Analytics integration", author: "Liam", status: "Merged" },
  ];

  if (loading) {
    return (
      <div className="h-screen flex-1 p-8 flex items-center justify-center">
        <p className="text-xl">Loading project details...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="h-screen flex-1 p-8">
        <button 
          onClick={() => navigate('/projects')}
          className="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center gap-2"
        >
          <i className="ri-arrow-left-line"></i>
          Back to Projects
        </button>
        <p className="text-xl text-red-500">{error || "Project not found"}</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex-1 p-8 overflow-y-auto">
      <button
        onClick={() => navigate('/projects')}
        className="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center gap-2"
      >
        <i className="ri-arrow-left-line"></i>
        Back to Projects
      </button>

      {/* Top: Project details (left) and Team Members (right) */}
      <div className="w-full flex gap-6 mb-6">
        <div className="flex-1 bg-white rounded-lg shadow-md p-6 ring ring-zinc-300/50">
          <h1 className="text-3xl font-bold mb-4">{project.name}</h1>

          {project.description && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{project.description}</p>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <div className="space-y-2">
              {project.details?.projectUrl && (
                <div>
                  <span className="font-medium">Project URL: </span>
                  <a href={project.details.projectUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{project.details.projectUrl}</a>
                </div>
              )}
              {project.details?.cloneUrl && (
                <div className="flex items-center gap-2">
                  <div>
                    <span className="font-medium">Clone URL: </span>
                    <a href={project.details.cloneUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{project.details.cloneUrl}</a>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(project.details.cloneUrl);
                      // Optional: Add a toast notification here
                    }}
                    className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded border border-gray-300 transition-colors"
                    title="Copy to clipboard"
                  >
                    Copy
                  </button>
                </div>
              )}
              {project.details?.language && (
                <div>
                  <span className="font-medium">Language: </span>
                  <span className="text-gray-700">{project.details.language}</span>
                </div>
              )}
              {project.status && (
                <div>
                  <span className="font-medium">Status: </span>
                  <span className="text-gray-700 capitalize">{project.status}</span>
                </div>
              )}
              {project.details?.openIssues !== undefined && (
                <div>
                  <span className="font-medium">Open Issues: </span>
                  <span className="text-gray-700">{project.details.openIssues}</span>
                </div>
              )}
              {project.details?.forks !== undefined && (
                <div>
                  <span className="font-medium">Forks: </span>
                  <span className="text-gray-700">{project.details.forks}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 space-y-1">
            {project.created_at && (
              <div className="text-sm text-gray-500">
                Created: {new Date(project.created_at).toLocaleDateString()}
              </div>
            )}
            {project.pushed_at && (
              <div className="text-sm text-gray-500">
                Last Push: {new Date(project.pushed_at).toLocaleDateString()}
              </div>
            )}
            {project.updated_at && (
              <div className="text-sm text-gray-500">
                Last Updated: {new Date(project.updated_at).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        <div className="w-96 bg-white rounded-lg shadow-md p-6 ring ring-zinc-300/50">
          <h2 className="text-xl font-semibold mb-4">Team Members</h2>
          <ul className="space-y-3">
            {projectMembers.map((m, idx) => (
              <li key={idx} className="flex items-center gap-3">
                {m.profile.avatar_url ? (
                  <img
                    src={m.profile.avatar_url}
                    alt={m.profile.name}
                    className="w-10 h-10 rounded-full object-cover bg-gray-300"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    {m.profile.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                )}
                <div>
                  <div className="font-medium">{m.profile.name}</div>
                  <div className="text-sm text-gray-500">{m.email}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom: Tasks (left) and Commits/PRs (right) */}
      <div className="w-full flex gap-6">
        <div className="flex-1 bg-white rounded-lg shadow-md p-6 ring ring-zinc-300/50">
          <h2 className="text-2xl font-semibold mb-4">Project Tasks</h2>
          <ul className="space-y-4">
            {hardcodedTasks.map(task => (
              <li key={task.id} className="p-4 border rounded-lg flex justify-between items-center">
                <div>
                  <div className="font-medium">{task.title}</div>
                  <div className="text-sm text-gray-500">Assignee: {task.assignee}</div>
                </div>
                <div className="text-sm px-3 py-1 rounded-full" style={{background: task.status === 'Done' ? '#d1fae5' : task.status === 'In Progress' ? '#fef3c7' : '#f3f4f6'}}>
                  {task.status}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-96 bg-white rounded-lg shadow-md p-6 ring ring-zinc-300/50">
          <h2 className="text-2xl font-semibold mb-4">Commits & PRs</h2>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Recent Commits</h3>
            <ul className="space-y-3">
              {hardcodedCommits.map(c => (
                <li key={c.id} className="text-sm">
                  <div className="font-medium">{c.message}</div>
                  <div className="text-gray-500">{c.author} • {c.date}</div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Pull Requests</h3>
            <ul className="space-y-3">
              {hardcodedPRs.map(p => (
                <li key={p.id} className="p-3 border rounded-lg">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-sm text-gray-500">{p.author} • {p.status}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
