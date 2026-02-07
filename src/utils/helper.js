export const delay = (ms)=> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getDateRangeString = (startDate, endDate) => {
  try{
  const options = { month: 'short', day: 'numeric' };
  const start = new Date(startDate).toLocaleDateString('default', options);
  const end = new Date(endDate).toLocaleDateString('default', options);
  if (start === end) {
    return start;
  }
  return `${start} ${endDate ? `- ${end}` : ''}`;
}catch(e){
  return "N/A";
}
}


// export const getMonthDay = (date)=> {
// return `${date.getMonth() + 1}-${date.getDate()}`;
// }



export const generateMonthDays = (year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month, i + 1);
    const iso = date.toISOString().split("T")[0];

    return {
      date: iso,
      day: i + 1,
      weekDay: date.getDay(), // 0 = Sun
      status: null, // present | absent | null
    };
  });
};


export const mergeAttendance = (monthDays, attendanceData) => {
  const map = Object.fromEntries(
    attendanceData.map((d) => [d.date, d.status])
  );

  return monthDays.map((d) => ({
    ...d,
    status: map[d.date] || null,
  }));
};
