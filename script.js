//used to find current year , month and day
const date = new Date();
    document.getElementById("theme_check").addEventListener('change',function(){
    document.querySelector('body').classList.toggle('body-dark-theme');
    document.querySelector('.wraper').classList.toggle('wraper-dark-theme');
    document.querySelector('#day').classList.toggle('input-dark-theme');
    document.querySelector('#month').classList.toggle('input-dark-theme');
    document.querySelector('#year').classList.toggle('input-dark-theme');
    document.querySelector('#about_us').classList.toggle('about-us-dark-theme');
    
    if(document.querySelector('body').classList.contains('body-dark-theme')){
        document.querySelector('#sun_icon').style.display="none";
        document.querySelector('#moon_icon').style.display="block"; 
    }else{
        document.querySelector('#moon_icon').style.display="none";
        document.querySelector('#sun_icon').style.display="block";
    }   
})

function showError(elementId, labelId) {
    document.getElementById(elementId).style.border = "1px solid red";
    document.getElementById(labelId).style.color = "red";
    document.getElementById(`${elementId}Error`).style.display = "block";
}

function hideError(elementId, labelId) {
    document.getElementById(elementId).style.border = "solid 1px hsl(0, 1%, 44%)";
    document.getElementById(labelId).style.color = "hsl(0, 1%, 44%)";
    document.getElementById(`${elementId}Error`).style.display = "none";
}

document.addEventListener('change', function(event){ 
    if(event.target.id === 'close-checkbox' ||  event.target.id === 'about_us' ){
        document.getElementById("about_us").style.display ="none";
        document.querySelector(".about_us_btn_lb").style.display ="block";
        document.querySelector(".wraper").classList.toggle("wraper-blur");
        document.querySelector(".wraper").style.pointerEvents="auto";
    }
})

document.getElementById('about_us_btn').addEventListener('change', function(){
    document.getElementById("about_us").style.display ="block";
    document.querySelector(".about_us_btn_lb").style.display ="none";
    document.querySelector(".wraper").classList.toggle("wraper-blur");
    document.querySelector(".wraper").style.pointerEvents="none";
})

document.getElementById('inputForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let day = parseInt(document.getElementById('day').value);
    let month = parseInt(document.getElementById('month').value);
    let year = parseInt(document.getElementById('year').value);

    const dayout=document.getElementById("dayOut");
    dayout.innerHTML=dayCalculator(day);  

    const monthout=document.getElementById("monthOut");
    monthout.innerHTML=monthCalculator(month);  

    const yearout=document.getElementById("yearOut");
    yearout.innerHTML= yearCalculator(year); 
})

//Calculate year age
function yearCalculator(year){

    let currentYear = date.getFullYear();
    let birthMonth=parseInt(month.value);
    let currentMonth=date.getMonth();
    let result;

    if(year > currentYear){
        showError("year", "yearLb")
        return "--";
    }
    else {     
        hideError("year", "yearLb")
        //if birth month be less than current month ,year must be minus 1 and 12 must added to birth month
        if(currentMonth+1 < birthMonth){
            result = (currentYear-year-1);    
        }else{
            result = currentYear-year;
        }
        return result;
    }
}

//Calculate month of age
function monthCalculator(month){

    //In JavaScript months starts 0 and end in 11(so we +1)
    let currentMonth = date.getMonth()+1;
    let currentDay = date.getDate();
    let birthDay = parseInt(day.value);
    let result;

    //If current day be less than birthday , month minus by 1 (and 30/31 added to current Day)
    if(currentDay < birthDay){
        currentMonth--; 
    }

    //Invalid year error
    if(month<1 || month>12){
        showError("month","monthLb");
        return"--";
    }

    //If current Month be less than birth month 12 must added to current month , then minus by birth month (and year minus by 1)
    else if(month > currentMonth){
        currentMonth += 12;
        hideError("month","monthLb")
        result = currentMonth-month;
        return result;
    }

    else {
        hideError("month","monthLb");
        result = currentMonth-month;
        return result;
    }
}

//Calculate day of age
function dayCalculator(day){
    let birthMonth = parseInt(month.value);
    let currentDay = date.getDate();
    let addedDay =0 ; 
    let result = 0;

    //If current Day be less than birth day this block assignment the added day
    if(currentDay < day){

        //Months of year have 30 days (to add current Day if day be greater)
        if( birthMonth == 4 || birthMonth == 6 || birthMonth == 9 ||birthMonth == 11){
            addedDay = 30;
        }

        //Other months of year have 31 days
            else if( birthMonth == 1 || birthMonth == 3 || birthMonth == 5 || birthMonth == 7 || birthMonth == 8 ||birthMonth == 10 || birthMonth==12){  
            addedDay = 31;
        }

        //February month have 28 or 29 day(leap years)
        else if(birthMonth == 2 ){
            addedDay= year % 4 == 0 ? 29 : 28;
        } 
    }

    //Invalid date error
    if(day<1 || day>31){
        showError("day", "dayLb")
        return"--";
    }

    //This months have 30 days (if input be 31 its invalid)
    else if((birthMonth == 4 || birthMonth == 6 || birthMonth == 9 || birthMonth == 11)   &&  day == 31){
        showError("day", "dayLb");
        return"--";
    }

    else {
        hideError("day", "dayLb");
        result = (currentDay + addedDay) - day;
        return result;
    }               
}
