import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import "./App.css";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import RepoCard from "./components/RepoCard";

//https://api.github.com/users/sreeharitk/repos  api url for getting public repos of user
//https://api.github.com/users/sreeharitk api for getting user information

function App() {
  const [user, setUser] = useState({
    name: "",
    imgUrl: "",
    login: "",
    bio: "",
    followers: "",
    following: "",
    location: "",
    url: "",
    repc: "",
  });
  const [repos, setRepos] = useState({ repos: [] });
  const [searched, setS] = useState(false);
  const [page, setPage] = useState(1);
  const [err, setErr] = useState("");

  function prevRepo() {
    let name = document.getElementById("name").value;
    setPage(page - 1);

    // document.getElementById("prev").disabled = true;
    // document.getElementById("prev").style.color =
    //   "rgb(75 85 99 / var(--tw-text-opacity))";

    axios

      .get(`https://api.github.com/users/${name}/repos?page=${page - 1}`)
      .then((response) => {
        console.log(page);
        document.getElementById("next").style.color =
          "rgb(37 99 235 / var(--tw-text-opacity))";
        document.getElementById("next").disabled = false;

        if (page - 2 == 0) {
          document.getElementById("prev").disabled = true;
          document.getElementById("prev").style.color =
            "rgb(75 85 99 / var(--tw-text-opacity))";
        }
        setRepos({ repos: response.data });
      });
  }

  function nextRepo() {
    let name = document.getElementById("name").value;

    axios
      .get(`https://api.github.com/users/${name}/repos?page=${page + 1}`)
      .then((response) => {
        setPage(page + 1);
        console.log(page);
        // if (response.data.length == 0) {
        //   document.getElementById("next").disabled = true;
        //   document.getElementById("next").style.color =
        //     "rgb(75 85 99 / var(--tw-text-opacity))";

        //   return;
        // }

        document.getElementById("prev").style.color =
          "rgb(37 99 235 / var(--tw-text-opacity))";
        document.getElementById("prev").disabled = false;

        setRepos({ repos: response.data });
      })
      .catch((e) => {
        console.log(e);
      });

    axios
      .get(`https://api.github.com/users/${name}/repos?page=${page + 2}`)
      .then((response) => {
        if (response.data.length == 0) {
          document.getElementById("next").disabled = true;
          document.getElementById("next").style.color =
            "rgb(75 85 99 / var(--tw-text-opacity))";
        }
      });
  }

  function search() {
    setPage(1);
    let name = document.getElementById("name").value;
    if (name == "") {
      setErr("Enter a valid user name");
      return;
    }

    axios
      .get(`https://api.github.com/users/${name}`)
      .then((response) => {
        setErr("");
        setS(true);
        setUser({
          name: response.data.name,
          imgUrl: response.data.avatar_url,
          login: response.data.login,
          bio: response.data.bio,
          followers: response.data.followers,
          following: response.data.following,
          location: response.data.location,
          url: response.data.html_url,
          repc: response.data.public_repos,
        });
      })
      .catch((e) => {
        setErr("Enter a valid user name");
        console.log(e);
        setS(false);
      });

    axios
      .get(`https://api.github.com/users/${name}/repos`)
      .then((response) => {
        document.getElementById("prev").disabled = true;
        document.getElementById("prev").style.color =
          "rgb(75 85 99 / var(--tw-text-opacity))";
        if (response.data.length != 30) {
          document.getElementById("next").disabled = true;
          document.getElementById("next").style.color =
            "rgb(75 85 99 / var(--tw-text-opacity))";
        } else {
          document.getElementById("next").style.color =
            "rgb(37 99 235 / var(--tw-text-opacity))";
          document.getElementById("next").disabled = false;
        }
        setRepos({ repos: response.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <div className="flex flex-col ">
        <div className="flex flex-col items-center justify-center gap-2 h-[120px] bg-black">
          <div className="flex gap-2 items-center w-[25%] justify-center bg-black ipbox">
            <input
              id="name"
              className="p-1 pl-3 rounded-md bg-[#0d1117] w-[25%] lg:w-full text-white border border-white"
              type="text"
              name="name"
              placeholder="Enter a user name..."
              autoComplete="off"
            />

            <IoIosSearch
              className="text-white text-3xl cursor-pointer  rounded-md hover:text-black hover:bg-white"
              onClick={() => search()}
            />
          </div>
          <p className="text-white text-xs bg-black">{err}</p>
        </div>
        {searched ? (
          <div className="flex flex-col lg:flex-row gap-2 bg-[#0d1117]   px-32 py-12 items-start justify-center repos">
            <div className="lg:w-[30%] w-[100%] gap-4  h-full flex flex-col items-center p-4  ">
              <img className="rounded-full h-[50%]" src={user.imgUrl} />
              <div className="w-full h-full flex flex-col">
                <p
                  className="text-white text-xl font-semibold text-left "
                  id="propic"
                >
                  {user.name}
                </p>
                <a target="_blank" rel="noreferrer" href={user.url}>
                  <p className="text-gray-600">{user.login}</p>
                </a>
                <p className="text-white mt-4">{user.bio}</p>
                <p className="text-gray-600 mt-4 font-semibold">
                  <span className="text-white font-bold">{user.followers}</span>{" "}
                  Followers{" "}
                  <span className="text-white font-bold">{user.following}</span>{" "}
                  Following
                </p>
                {user.location ? (
                  <p className="text-white flex items-center mt-4 gap-2">
                    <IoLocationOutline />
                    {user.location}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="lg:w-[70%] w-full     p-4  ">
              <p className="text-white font-semibold mb-2 text-xl ">
                Public repos {user.repc}
              </p>
              <div className="grid grid-cols-2 gap-2 h-full repo">
                {repos.repos.map((ele, idx) => {
                  return (
                    <RepoCard
                      key={idx}
                      name={ele.name}
                      language={ele.language}
                      update={ele.pushed_at}
                      url={ele.html_url}
                    />
                  );
                })}
              </div>

              <div className="flex justify-evenly mt-3 ">
                <button
                  id="prev"
                  onClick={prevRepo}
                  className="text-gray-600 text-sm p-2 rounded-md "
                >
                  &lt; Previous
                </button>
                <button
                  id="next"
                  onClick={nextRepo}
                  className="text-blue-600 text-sm p-2 rounded-md"
                >
                  Next &gt;
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center h-screen bg-[#0d1117] text-xl text-white font-semibold  px-32 py-12 ">
            <img src="giticon.png" className="rounded-full h-32" />
            <p>Search for user</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
