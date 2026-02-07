export default function AttendanceCalendar({
  data,
  year,
  month,
  onPrev,
  onNext,
}) {
  const monthLabel = new Date(year, month).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={onPrev} className="px-3 py-1 border rounded">
          ←
        </button>
        <h3 className="font-semibold">{monthLabel}</h3>
        <button onClick={onNext} className="px-3 py-1 border rounded">
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {data.map((d) => {
          const isWeekend = d.weekDay === 0 || d.weekDay === 6;

          let bg = "bg-gray-100";
          if (isWeekend) bg = "bg-gray-200";
          else if (d.status === "present") bg = "bg-green-100 text-green-700";
          else if (d.status === "absent") bg = "bg-red-100 text-red-700";

          return (
            <div
              key={d.date}
              className={`h-12 flex items-center justify-center rounded-lg text-sm ${bg}`}
            >
              {d.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
