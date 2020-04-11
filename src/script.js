const app = {
  init: function () {
    // let incommingData = '{firstName: "Branden", lastName: "Kim"}';
    this.fetchSummary();
    // render function
  },
  data: null,
  fetchSummary: function (incommingData) {
    if (incommingData) {
      this.data = JSON.parse(incommingData);
    } else {
      window
        .fetch("https://api.covid19api.com/summary")
        .then((res) => res.json())
        .then((json) => {
          this.data = json;
        })
        .then(() => {
          this.renderSummary();
          this.renderDetails();
        });
    }
  },
  renderSummary: function () {
    const TotalConfirmed = document
      .querySelector("#TotalConfirmed")
      .querySelector(".divValue");
    const TotalDeaths = document
      .querySelector("#TotalDeaths")
      .querySelector(".divValue");
    const TotalRecovered = document
      .querySelector("#TotalRecovered")
      .querySelector(".divValue");
    TotalConfirmed.textContent = this.data.Global.TotalConfirmed;
    TotalDeaths.textContent = this.data.Global.TotalDeaths;
    TotalRecovered.textContent = this.data.Global.TotalRecovered;
  },
  renderDetails: function () {
    const { Countries } = this.data;
    for (let i = Countries.length - 1; i > 0; i--) {
      const div = document.querySelector("#detail");
      const countryDetail = document.createElement("span");
      const totalConfirmedDetail = document.createElement("span");
      const totalDeathsDetail = document.createElement("span");
      const totalRecoveredDetail = document.createElement("span");
      countryDetail.textContent = Countries[i].Country;
      totalConfirmedDetail.textContent = Countries[i].TotalConfirmed;
      totalDeathsDetail.textContent = Countries[i].TotalDeaths;
      totalRecoveredDetail.textContent = Countries[i].TotalRecovered;
      div.append(
        countryDetail,
        totalConfirmedDetail,
        totalDeathsDetail,
        totalRecoveredDetail
      );
    }
  },
};
app.init();
