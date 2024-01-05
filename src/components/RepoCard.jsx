//86400000 ms in a day

// eslint-disable-next-line react/prop-types
const RepoCard = ({ name, language, update, url }) => {
  let timeString = "";
  // let strDate = update;
  // strDate = strDate.substring(0, 10);
  const date1 = new Date(update);
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffTime + " milliseconds" + "for " + name);
  console.log(diffDays + " days" + "for " + name);
  // console.log(date1 + " " + name);
  const month = date1.toLocaleString("default", { month: "short" });
  const year = date1.toLocaleString("default", { year: "numeric" });
  const day = date1.toLocaleString("default", { day: "numeric" });

  if (diffTime < 86400000) {
    if (diffTime < 3600000) {
      let min = Math.ceil(diffTime / 60000);
      timeString = "updated " + min + " minutes ago";
    } else {
      let h = Math.floor(diffTime / 3600000);

      timeString = "updated " + h + " hours ago";
    }
  } else {
    let days = Math.ceil(diffTime / 86400000);
    if (days < 30) {
      if (days == 1) {
        timeString = "updated " + days + " day ago";
      } else {
        timeString = "updated " + days + " days ago";
      }
    } else {
      timeString = "updates on " + month + " " + day + " , " + year;
    }
  }

  return (
    <div className="flex flex-col justify-between p-2 gap-6  border border-gray-600 rounded-md w-full h-full">
      <div className="flex justify-between ">
        <a href={url} target="_blank" rel="noreferrer">
          <p className="font-bold text-blue-600">{name}</p>
        </a>
        <p className="border font-bold text-gray-400 border-gray-600 h-[23px] rounded-2xl px-2 py-1 text-[10px]">
          Public
        </p>
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400">{language}</p>
        <p className="text-[10px] text-gray-400">{timeString}</p>
      </div>
    </div>
  );
};

export default RepoCard;
