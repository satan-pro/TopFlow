function SmallCard({ bgColor }) {
  return (
    <div
      className={`inline-block ${bgColor} w-48 h-48 rounded-xl duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-gray-500`}
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
}

export default function MyProgress() {
  return (
    <div>
      <h1 className="text-2xl font-semibold my-8">My Progress</h1>
      <div className="flex border-box bg-indigo-950 w-full p-4 h-64 rounded-lg text-white">
        <div className="w-1/2">
          <h1 className="text-xl">Hi John!</h1>
          <p className="text-5xl mb-8 mt-8">
            {/* You have completed{" "}
              {getData.completed && getData.completed.length > 0
                ? getData.completed[1].tasks
                : 0}{" "}
              tasks this week */}
          </p>
          <a
            className="bg-white rounded-2xl px-4 text-indigo-950 p-1 hover:border-2 duration-400"
            href="/"
          >
            See All <i className="ri-arrow-right-up-line"></i>
          </a>
        </div>
        <div className="w-2/3 bg-indigo-950 m-4 flex gap-x-2 overflow-x-hidden overflow-y-hidden whitespace-nowrap h-fit">
          <SmallCardView />
          {/* <div className="relative border-box h-full flex justify-between items-center m-2 gap-x-2">
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
            </div> */}
        </div>
      </div>
    </div>
  );
}
