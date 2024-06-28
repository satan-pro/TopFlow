function Assignment({ assignment }, key) {
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
    <Assignment
      className="hover:bg-white"
      assignment={assignment}
      key={assignment.id}
    />
  ));
}

export default function MyAssignment() {
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
