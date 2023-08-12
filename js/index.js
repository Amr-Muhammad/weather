let locationInput = document.getElementById("locationInput")
let weatherArr = []
let monthNames = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

(async function () {
    let req = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=cairo&days=7`)
    let weather = await req.json()
    display(weather);
})();


navigator.geolocation.getCurrentPosition(showPosition)


async function showPosition(position) {
    let req = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${position.coords.latitude},${position.coords.longitude}&days=7`)
    let weather = await req.json()
    display(weather);

};


locationInput.addEventListener("keydown", () => {
    (async function () {
        let req = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${locationInput.value}&days=7`)
        let weather = await req.json()
        display(weather)

    })();

})


function display(weather) {

    let myDate = new Date(weather.location.localtime.slice(0, 10))
    let monthCounter = myDate.getMonth()

    let dayCounter = myDate.getDay()
    let currentDay = dayNames[dayCounter]
    let nextDay = dayNames[dayCounter + 1]
    let nextnextDay = dayNames[dayCounter + 2]

    if (dayCounter == 6) {
        nextDay = dayNames[0]
        nextnextDay = dayNames[1]
    }

    else if (dayCounter == 5) {
        nextnextDay = dayNames[0]
    }

    let cartona = ""

    cartona += `<div class="col-md-4">

<div class="cardHead p-2 px-3 d-flex mainGray">
    <p class="m-0 p-0">${currentDay}</p>
    <p class="ms-auto p-0 m-0">${weather.location.localtime.slice(8, 10)} ${monthNames[monthCounter]}</p>
</div>

<div class="cardBody p-3 px-4 mainColorLighter">
    <p class="fs-5 mainGray">${weather.location.name}</p>
    <p class="fa-5x fw-bold">${weather.current.temp_c}°C</p>
    <p><img src="https:${weather.current.condition.icon}" alt=""></p>
    <span class="text-primary">${weather.current.condition.text}</span>
</div>

<div class="cardTail mainColorLighter mainGray p-2 px-3 pb-4 ">
    <img src="images/3.png" class="me-1" alt=""><span class="me-3">20%</span>
    <img src="images/2.png" class="me-1" alt=""><span class="me-3">18km/h</span>
    <img src="images/1.png" class="me-1" alt=""><span class="me-3">East</span>
</div>

</div>


<div class="col-md-4">
<div class="h-100 middleDiv">
    <div class="cardHead p-2 d-flex mainGray">
        <p class="m-auto p-0 m-0">${nextDay}</p>
    </div>

    <div class="cardBody text-center p-3 py-5">
        <p><img src="https:${weather.forecast.forecastday[1].day.condition.icon}" alt=""></p>
        <p class="fs-5 fw-bold">${weather.forecast.forecastday[1].day.maxtemp_c}°C</p>
        <p class="fs-6 mainGray fw-bold">${weather.forecast.forecastday[1].day.mintemp_c}°C</p>
        <span class="text-primary">${weather.forecast.forecastday[1].day.condition.text}</span>
    </div>

</div>
</div>


<div class="col-md-4">
<div class="h-100 mainColorLighter ">

    <div class="cardHead text-center p-2 d-flex mainGray ">
        <p class="m-auto p-0">${nextnextDay}</p>
    </div>

    <div class="cardBody text-center p-3 mainColorLighter py-5">
    <p><img src="https:${weather.forecast.forecastday[2].day.condition.icon}" alt=""></p>
    <p class="fs-5 fw-bold">${weather.forecast.forecastday[2].day.maxtemp_c}°C</p>
    <p class="fs-6 mainGray fw-bold">${weather.forecast.forecastday[2].day.mintemp_c}°C</p>
    <span class="text-primary">${weather.forecast.forecastday[2].day.condition.text}</span>
    </div>

</div>
</div>`

    document.getElementById("body").innerHTML = cartona

}

