const month_arr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const format_time_readable = (time) => {
  const dt = new Date(time);

  //format time
  let hr = String(dt.getHours() % 12 || 12).padStart(2, "0");
  let m = String(dt.getMinutes()).padStart(2, "0");
  let ampm =
    Number(parseInt(dt.getHours())) > 11 && Number(parseInt(dt.getHours())) < 24
      ? "pm"
      : "am";
  const res = `${hr}:${m}${ampm}`;

  return res;
};

export const format_date_readable = (date) => {
  const dt = new Date(date);

  //format date
  let d = dt.getDate();
  let mth = month_arr[dt.getMonth()];
  let y = dt.getFullYear();

  const res = `${d} ${mth} ${y}`;

  return res;
};

export const format_date_time_readable = (datetime) => {
  const time = format_time_readable(datetime);
  const date = format_date_readable(datetime);

  //return formated date time
  return `${date}, ${time}`;
};

export const return_future_year_for_date_picker = (num = 0) => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();

  const c = new Date(year + num, month, day);
  return c;
};

export const format_chat_thread_date_readable = (date) => {
  const dt = new Date(date);

  //format date
  let d = String(dt.getDate()).padStart(2, "0");
  let mth = String(dt.getMonth() + 1).padStart(2, "0");
  let y = dt.getFullYear();

  const res = `${d}/${mth}/${y}`;

  return res;
};

export const get_current_greeting = () => {
  const dt = new Date();
  const hr = dt.getHours();
  const morning = 1;
  const noon = 12;
  const evening = 17;

  let greeting;

  if (morning < hr && hr < noon) {
    return "Good morning";
  }

  if (noon < hr && hr < evening) {
    return "Good afternoon";
  }

  if (hr > evening) {
    return "Good morning";
  }

  return "Good day";
};
