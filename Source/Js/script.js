let $ = document

////////////////////////////////////

// variables //////////////////////
const body = $.body
const searchInput = $.querySelector(".search")
const searchIcon = $.querySelector(".search-icon")
const loader = $.querySelector(".loader")
const searchAlert = $.querySelector(".search-alert")
const countryInfo = $.querySelector(".country-info")
const countryName = $.querySelector(".country-name")
const currentDate = $.querySelector(".date")
const tempDisplayer = $.querySelector(".temp")
const clientStatus = $.querySelector(".client-status")
const minMaxTempDisplayer = $.querySelector(".min-max-temp")


// functions //////////////////////
// to get user screen height and set it on body minheight
function liveUserScreenHeight() {
    let userScreenHeight = visualViewport.height + "px"
    body.style.minHeight = userScreenHeight
}

// to focus on search input by pressing Enter btn
function inputFocus(event){
    event.key === "Enter" && searchInput.focus()
}

// to send and API request to get city or country weather info
function sendApiReq(event){
    if(event.key === "Enter"){
        removeAlert()
        showLoader()

        let countryName = searchInput.value

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=cf5d35a9a3bdefdb3532778514612a58`)
            .then(res => {
                removeLoader()

                if(res.status === 200){
                    countryInfo.classList.add("slide-show")

                    removeAlert()
                    return res.json()
                }else{
                    countryInfo.classList.remove("slide-show")
                    showAlert()
                }
            }).then(data => displayInfo(data))
    }
}

// to show the loader
function showLoader(){
    searchIcon.classList.add("hide")
    loader.classList.remove("hide")
}

// to remove the loader
function removeLoader(){
    searchIcon.classList.remove("hide")
    loader.classList.add("hide")
}

// to show search box alert
function showAlert (){
    removeLoader()
    searchAlert.classList.remove("hide")
}

// to remove search box alert
function removeAlert(){
    searchAlert.classList.add("hide")
}

// to display data in Dom
function displayInfo(data){
    let minTemp = tempConvetror(data.main.temp_min)
    let maxTemp = tempConvetror(data.main.temp_max)

    countryName.innerHTML = `${data.name} / ${data.sys.country}`
    currentDate.innerHTML = dateCalculator()
    tempDisplayer.innerHTML = tempConvetror(data.main.temp)
    clientStatus.innerHTML = data.weather[0].main
    minMaxTempDisplayer.innerHTML = `${minTemp} / ${maxTemp}`

    searchInput.value = ""
}

// to calculate current date
function dateCalculator(){
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let now = new Date()
    let day = weekday[now.getDay()]
    let date = now.getDate()
    let month = months[now.getMonth()]
    let year = now.getFullYear()

    let finallResult = `${day} ${date} ${month} ${year}`

    return finallResult
}

// to convert K to °C
function tempConvetror(temp){
    let convertedTemp = (temp - 273).toFixed() + "°C"
    
    return convertedTemp
}

// eventlisteners /////////////////////
window.addEventListener("load" , liveUserScreenHeight)
window.addEventListener("resize" , liveUserScreenHeight)
body.addEventListener("keydown" , () => inputFocus(event))
searchInput.addEventListener("keydown" , () => sendApiReq(event))