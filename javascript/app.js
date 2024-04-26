// import '../css/final.css';


const URL = "https://api.github.com/user";
const Emoji = "https://api.github.com/emojis";
const requestOption = {
  method: "GET",
  headers: {
    Authorization: `token ${"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"}`,
  },
  redirect: "follow",
};

async function getProfileData() {
  try {
    const response = await fetch(URL, requestOption);
    const data = await response.json();
    console.log(data);

    const creatDate = data.created_at;
    const end = moment();
    const duration = moment.duration(end.diff(moment(creatDate))).years();

    const flagLocation = await fetch(Emoji);
    const emoji = await flagLocation.json();
    const country = data.location.toLowerCase();

    const flag = document.querySelector(".flag img");
    flag.src = emoji[country];

    const flagSt = document.querySelector(".flag-st");
    flagSt.src = emoji[country];

    const avatarImage = document.querySelector(".profil_avatar img");
    avatarImage.src = data.avatar_url;

    const Name = document.querySelector(".name");
    Name.textContent = data.name;

    const nickName = document.querySelector(".nickName");
    nickName.textContent = data.login;

    const followerData = document.querySelector(".follower");
    followerData.textContent = `followers : ${data.followers}`;

    const followingData = document.querySelector(".following");
    followingData.textContent = `following : ${data.following}`;

    const reposData = document.querySelector(".repos");
    reposData.textContent = `Public Repos : ${data.public_repos}`;

    const twitterIcone = document.querySelector(".icone1");
    twitterIcone.href = data.twitter_username;

    const blogIcone = document.querySelector(".icone2");
    blogIcone.href = data.blog;

    const date = document.querySelector(".date");
    date.textContent = `Member since : ${duration} years`;
  } catch (error) {
    console.error("Error fetching profile name:", error);
  }
}
getProfileData();

async function getReposData() {
  let username = searchInput.value.trim();
  const container = document.querySelector(".container_repos");
  container.innerHTML = "";
  if (!username) {
    username = "Grundrak";
  }
  console.log(username);
  const url = `https://api.github.com/users/${username}/repos?per_page=100`;
  try {
    const response = await fetch(url, requestOption);
    const data = await response.json();
    console.log("Repos data :", data);
    countLanguages(data);
    data.forEach((repo) => {
      let linkRepos = repo.homepage || "No Link for this repository";
      let description =
        repo.description ||
        "About <br/> No description, website, or topics provided.";
      const card = document.createElement("div");
      const avatar = document.querySelector(".avatar-pp");
      avatar.src = repo.owner.avatar_url;
      const nickName = document.querySelector(".profil-info");
      nickName.textContent = repo.owner.login;
      card.innerHTML = `
        <div class="card rounded-xl bg-[#e5ddc5] h-44 w-[90%]">
            <div class="public-container flex  justify-end ">
                <div class="public w-12 h-4 bg-[#F1EEDC] rounded-full text-center font-light text-xs m-2  ">
                    ${repo.visibility}
                </div>
            </div>
            <div class="sc-1 flex gap-3 justify-center items-center">
                          <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="black"
                  stroke-linecap="round"
                  stroke-width="1.5"
                >
                  <path d="M4 19V5a2 2 0 0 1 2-2h13.4a.6.6 0 0 1 .6.6v13.114" />
                  <path stroke-linejoin="round" d="M15 17v5l2.5-1.6L20 22v-5" />
                  <path d="M6 17h14" />
                  <path stroke-linejoin="round" d="M6 17a2 2 0 1 0 0 4h5.5" />
                </g>
              </svg>
                <a href="${repo.html_url}" class="link-1 text-xs underline" target="_blank">${repo.name}</a>
            </div>
            <div class="sc-2 flex gap-3 justify-center items-center mt-3">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 256 256"
          >
            <path
              fill="black"
              d="M240 88.23a54.43 54.43 0 0 1-16 37L189.25 160a54.27 54.27 0 0 1-38.63 16h-.05A54.63 54.63 0 0 1 96 119.84a8 8 0 0 1 16 .45A38.62 38.62 0 0 0 150.58 160a38.39 38.39 0 0 0 27.31-11.31l34.75-34.75a38.63 38.63 0 0 0-54.63-54.63l-11 11A8 8 0 0 1 135.7 59l11-11a54.65 54.65 0 0 1 77.3 0a54.86 54.86 0 0 1 16 40.23m-131 97.43l-11 11A38.41 38.41 0 0 1 70.6 208a38.63 38.63 0 0 1-27.29-65.94L78 107.31a38.63 38.63 0 0 1 66 28.4a8 8 0 0 0 16 .45A54.86 54.86 0 0 0 144 96a54.65 54.65 0 0 0-77.27 0L32 130.75A54.62 54.62 0 0 0 70.56 224a54.28 54.28 0 0 0 38.64-16l11-11a8 8 0 0 0-11.2-11.34"
            />
          </svg>
                <a href="${linkRepos}" class="text-xs underline" target="_blank">${linkRepos}</a>
            </div>
            <div class="description-container">
            <p class="description text-xs flex justify-center p-2">
                ${description}
            </p>
          </div>
          <div class="container-language text-xs flex justify-center mt-5  ">
          <p>${repo.language}</p>
        </div>
        </div>
    `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching repos data:", error);
  }
}

const languageTitles = {
  JavaScript: "JS Master",
  Python: "Python Master",
  C: "C Master",
  Css: "Css Master",
};

function countLanguages(data) {
  const languageCount = {};
  let totalRepos = 0;
  let dominantLanguage = { name: null, count: 0, title: null };

  // Count each language occurrence
  data.forEach((repo) => {
    const { language } = repo;
    if (language) {
      if (languageCount[language]) {
        languageCount[language] += 1;
      } else {
        languageCount[language] = 1;
      }
      totalRepos++;

      if (languageCount[language] > dominantLanguage.count) {
        dominantLanguage.name = language;
        dominantLanguage.count = languageCount[language];
        dominantLanguage.title = languageTitles[language] || "Language Master"; // Default title
      }
    }
  });

  const languagePercentages = {};
  for (const language in languageCount) {
    const count = languageCount[language];
    const percentage = ((count / totalRepos) * 100).toFixed(2);
    languagePercentages[language] = `${percentage}%`;
  }

  console.log("Counts:", languageCount);
  console.log("Percentages:", languagePercentages);
  console.log("Total Repositories with Specified Language:", totalRepos);
  console.log("Dominant Language:", dominantLanguage);

  const master = document.querySelector(".master");
  master.textContent = dominantLanguage.title;

  const repos = document.querySelector(".repos-number");
  repos.textContent = `This user has pushed ${totalRepos} repositories .`;
  const languageElem = document.querySelector(".language");
  const languageStrings = Object.entries(languageCount).map(
    ([key, value]) => `${key}: ${value}`
  );
  console.log(languageStrings);
  const formattedLanguages = languageStrings.join(".<br>");
  languageElem.innerHTML = `In this GitHub profile, there are: <br> ${formattedLanguages}`;

  chartGithub(languageCount, languagePercentages);
}
let radarChart = null;
let donateChart = null;
function chartGithub(languageCount, languagePercentages) {
  const radar = document.getElementById("radar");
  const donate = document.getElementById("donate");
  const labelR = Object.keys(languageCount);
  const labelD = Object.keys(languagePercentages);
  const dataCounts = Object.values(languageCount).map(Number);
  const dataPourcentage = Object.values(languagePercentages).map((p) =>
    parseFloat(p.replace("%", ""))
  );

  if (radarChart) {
    radarChart.destroy();
    radarChart = null;
    console.log("Radar chart destroyed.");
  }

  if (donateChart) {
    doughnutChartInstance.destroy();
    donateChart = null;
    console.log("Doughnut chart destroyed.");
  }
   radarChart = new Chart(radar, {
    type: "radar",
    data: {
      labels: labelR,
      datasets: [
        {
          label: "Language Count",
          data: dataCounts,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
        },
      ],
    },
    options: {
      elements: {
        line: {
          borderWidth: 1,
        },
      },
    },
  });

  const donateChart = new Chart(donate, {
    type: "doughnut",
    data: {
      labels: labelD,
      datasets: [
        {
          label: "Language Percentage",
          data: dataPourcentage,
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)", 
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ],
          borderColor: ["rgba(255, 255, 255, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return (
                tooltipItem.label + ": " + tooltipItem.raw.toFixed(2) + "%"
              );
            },
          },
        },
      },
    },
  });
}
let timeoutId;
function debounce(func, delay) {
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), delay);
  };
}

function searchRepos(event) {
  const searchTerm = event.target.value.trim();
  getReposData(searchTerm);
}

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keyup", debounce(searchRepos, 1000));
getReposData();

document.getElementById("goo-to-stats").addEventListener("click", function () {
  const reposContainer = document.querySelector(".container_repos");
  const statsSection = document.querySelector(".stats_section");

  if (
    statsSection.style.display === "none" ||
    statsSection.style.display === ""
  ) {
    statsSection.style.display = "grid";
    reposContainer.style.display = "none";
  } else {
    statsSection.style.display = "none";
    reposContainer.style.display = "grid";
  }
  if (statsSection.style.display === "block") {
    statsSection.scrollIntoView({ behavior: "smooth" });
  }
});

document.getElementById("back-to-top").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
