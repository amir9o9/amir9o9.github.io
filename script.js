//used to find current year , month and day
const date = new Date();

document.getElementById('inputForm').addEventListener('submit', function(event) {

    // جلوگیری از ارسال فرم
    event.preventDefault();

    // دریافت مقادیر ورودی
    let day = parseInt(document.getElementById('day').value);
    let month = parseInt(document.getElementById('month').value);
    let year = parseInt(document.getElementById('year').value);

    
    // نمایش مقادیر در div
    const dayout=document.getElementById("dayOut");
    dayout.innerHTML=dayCalculator(day);  

    const monthout=document.getElementById("monthOut");
    monthout.innerHTML=monthCalculator(month);  

    const yearout=document.getElementById("yearOut");
    yearout.innerHTML= yearCalculator(year); 
})

//Calculate year age
function yearCalculator(year){

    let currnetYear = date.getFullYear();
    let birthMonth=parseInt(month.value);
    let currnetMonth=date.getMonth();
    let result;

    if(year > currnetYear){
        document.getElementById("yearError").style.display="block";
        document.getElementById("year").style.border="solid 1px red";
        document.getElementById("yearLb").style.color="red";
        return "--";
    }

    else {
        document.getElementById("yearError").style.display="none";
        document.getElementById("year").style.border="solid 1px hsl(0, 1%, 44%)";
        document.getElementById("yearLb").style.color=" hsl(0, 1%, 44%)";        

        //if birth month be less than currnet month ,year must be minus 1 and 12 must added to birth month
        if(currnetMonth+1 < birthMonth){
            result = (currnetYear-year-1);    
        }

        else{
            result = currnetYear-year;
        }
        return result;
    }
}


//Calculate month of age
function monthCalculator(month){

    //In JavaScript months starts 0 and end in 11(so we +1)
    let currnetMonth = date.getMonth()+1;
    let currnetDay = date.getDate();
    let birthDay = parseInt(day.value);
    let result;

    //If current day be less than birthday , month minus by 1 (and 30/31 added to currnet Day)
    if(currnetDay < birthDay){
        currnetMonth--; 
    }

    //Invalid year error
    if(month<1 || month>12){
        document.getElementById("monthError").style.display="block";
        document.getElementById("month").style.border="1px solid red";
        document.getElementById("monthLb").style.color="red";
        return"--";
    }

    //If currnet Month be less than birth month 12 must added to currnet month , then minus by birth month (and year minus by 1)
    else if(month > currnetMonth){
        currnetMonth += 12;
        document.getElementById("monthError").style.display="none";
        document.getElementById("month").style.border="solid 1px hsl(0, 1%, 44%)";
        document.getElementById("monthLb").style.color=" hsl(0, 1%, 44%)";
        result = currnetMonth-month;
        
        return result;
    }

    else {
        document.getElementById("monthError").style.display="none";
        document.getElementById("month").style.border="solid 1px hsl(0, 1%, 44%)";
        document.getElementById("monthLb").style.color=" hsl(0, 1%, 44%)";

        result = currnetMonth-month;
        return result;
    }
}


//Calculate day of age
function dayCalculator(day){

    let birthMonth = parseInt(month.value);
    let currnetDay = date.getDate();
    let addedDay =0 ; 
    let result = 0;

    //If currnet Day be less than birth day this block assignment the added day
    if(currnetDay < day){

        //Months of year have 30 days (to add currnet Day if day be greater)
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
        document.getElementById("dayError").style.display="block";
        document.getElementById("day").style.border="1px solid red";
        document.getElementById("dayLb").style.color="red";
        return"--";
    }

    //This months have 30 days (if input be 31 its invalid)
    else if((birthMonth == 4 || birthMonth == 6 || birthMonth == 9 ||birthMonth == 11)   &&  day == 31){
        document.getElementById("dayError").style.display="block";
        document.getElementById("day").style.border="1px solid red";
        document.getElementById("dayLb").style.color="red";
        return"--";
    }

    else {
        document.getElementById("dayError").style.display="none";
        document.getElementById("day").style.border="solid 1px hsl(0, 1%, 44%)";
        document.getElementById("dayLb").style.color=" hsl(0, 1%, 44%)";

        result = (currnetDay + addedDay) - day;
        return result;
    }               
}
