const app = {
  // 일부러 순서대로 실행이 되게 하여, 중간에 하나라도 에러가 터지면 실행이 되지 않게 만들자.
  init: function () {
    // let incommingData = '{firstName: "Branden", lastName: "Kim"}';
    this.fetchSummary();
    // render function
  },
  data: null,
  search: function (e) {
    e.preventDefault();
    let countryName = document.querySelector("#searchInput").value; // value 가 아닌 다른 것을 지정
    this.clearDetails();
    this.renderDetails(
      this.data.Countries.filter(function (value) {
        return value.Slug.includes(countryName); // 다른 값을 지정
      })
    );
  },
  fetchSummary: function (incommingData) {
    if (incommingData) {
      this.data = JSON.parse(incommingData);
    } else {
      window
        .fetch("https://api.covid19api.com/summary") // 여기서 날아오는 JSON 자체가 문제일 것.
        .then((res) => res.json())
        .then((json) => {
          this.data = json;
          return json;
        })
        .then((json) => {
          this.renderSummary(json.Global);
          this.renderDetails(json.Countries);
          document.querySelector("#searchForm").onsubmit = this.search.bind(
            this
          ); // bind를 하지 않은 상태로 시작
        });
    }
  },
  renderSummary: function (data) {
    const TotalConfirmed = document
      .querySelector("#TotalConfirmed")
      .querySelector(".divValue");
    const TotalDeaths = document
      .querySelector("#TotalDeaths")
      .querySelector(".divValue");
    const TotalRecovered = document
      .querySelector("#TotalRecovered")
      .querySelector(".divValue");
    TotalConfirmed.textContent = data.TotalConfirmed.toLocaleString();
    TotalDeaths.textContent = data.TotalDeaths.toLocaleString();
    TotalRecovered.textContent = data.TotalRecovered.toLocaleString();
  },
  renderDetails: function (Countries) {
    // const { Countries } = this.data;
    for (let i = 0; i < Countries.length; i++) {
      const detailDiv = document.querySelector("#detail");
      const containerDiv = document.createElement("div");
      const countryDetail = document.createElement("span");
      const totalConfirmedDetail = document.createElement("span");
      const totalDeathsDetail = document.createElement("span");
      const totalRecoveredDetail = document.createElement("span");
      countryDetail.textContent = Countries[i].Country;
      totalConfirmedDetail.textContent = Countries[i].TotalConfirmed;
      totalDeathsDetail.textContent = Countries[i].TotalDeaths;
      totalRecoveredDetail.textContent = Countries[i].TotalRecovered;
      containerDiv.append(
        countryDetail,
        totalConfirmedDetail,
        totalDeathsDetail,
        totalRecoveredDetail
      );
      detailDiv.appendChild(containerDiv);
    }
  },
  clearDetails: function () {
    document.querySelector("#detail").innerHTML = "";
  },
};
app.init();
