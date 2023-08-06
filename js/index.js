let req = new XMLHttpRequest()
req.open("get", "https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=07112&days=7")
req.send()
req.addEventListener('readystatechange', () => {
    if(req.readyState == 4){
        JSON.parse(req.response)
    }
})