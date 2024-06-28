function UpcomingAssignments({ assignment },key) {
  return (
    <div className="flex justify-between items-center h-24 p-2 rounded-lg hover:bg-gray-200 duration-200">
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
    </div>
  );
}

export default function Upcoming() {
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
        {upcomingAssignments.map(( assignment) => (
          <UpcomingAssignments assignment={assignment} key={assignment.id} />
        ))}
      </div>
    </div>
  );
}
