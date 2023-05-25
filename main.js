const DEBUG = false;
const RESIN_LIMIT = 160;
const POWER_LIMIT = 180;
const RESIN_RECHARGE_INTERVAL = 8;    //minutes; also update html input max="" if changed
const POWER_RECHARGE_INTERVAL = 6;    //minutes; also update html input max="" if changed

//Main
document.querySelector("#resin").focus();
function calculate(resin, start_time, type){    
    if (type=="resin"){
        const time_diff = parseInt(Math.abs(new Date().getTime() - start_time.getTime()) / 1000);
        const minutes_to_refill = (RESIN_LIMIT - resin) * RESIN_RECHARGE_INTERVAL;

        const H_start = parseInt(minutes_to_refill / 60);
        const M_start = parseInt(minutes_to_refill % 60);
        const cur_res = parseInt(time_diff / (60 * RESIN_RECHARGE_INTERVAL) + parseInt(resin));
        const H_cur = parseInt((minutes_to_refill - time_diff / 60) / 60);
        const M_cur = parseInt((minutes_to_refill - time_diff / 60) % 60);
        const S_cur = (cur_res < RESIN_LIMIT ? parseInt((minutes_to_refill * 60 - time_diff) % 60) : 0);

        if(DEBUG)   console.log({minutes_to_refill}, {time_diff});
        if(H_start < 0 || M_start < 0 || H_cur < 0 || M_cur < 0 || cur_res > RESIN_LIMIT)   return;
        document.querySelector("#current_resin").innerHTML = cur_res;
        document.querySelector("#refill_time").innerHTML =  H_cur + "h " + M_cur + "m " + S_cur + "s";
        document.querySelector("#refill_date").innerHTML = moment(start_time).add(H_start, "hours").add(M_start, "minutes").format("LT");
    
        let titles = document.getElementsByClassName("title_top");
        for (let i = 0; i < titles.length; i++) {
            titles[i].style.visibility = "visible";
        }
    }else if (type=="power"){
        const time_diff = parseInt(Math.abs(new Date().getTime() - start_time.getTime()) / 1000);
        const minutes_to_refill = (POWER_LIMIT - resin) * POWER_RECHARGE_INTERVAL;

        const H_start = parseInt(minutes_to_refill / 60);
        const M_start = parseInt(minutes_to_refill % 60);
        const cur_res = parseInt(time_diff / (60 * POWER_RECHARGE_INTERVAL) + parseInt(resin));
        const H_cur = parseInt((minutes_to_refill - time_diff / 60) / 60);
        const M_cur = parseInt((minutes_to_refill - time_diff / 60) % 60);
        const S_cur = (cur_res < POWER_LIMIT ? parseInt((minutes_to_refill * 60 - time_diff) % 60) : 0);

        if(DEBUG)   console.log({minutes_to_refill}, {time_diff});
        if(H_start < 0 || M_start < 0 || H_cur < 0 || M_cur < 0 || cur_res > POWER_LIMIT)   return;
        document.querySelector("#current_power").innerHTML = cur_res;
        document.querySelector("#power_refill_time").innerHTML =  H_cur + "h " + M_cur + "m " + S_cur + "s";
        document.querySelector("#power_refill_date").innerHTML = moment(start_time).add(H_start, "hours").add(M_start, "minutes").format("LT");
    
        let titles = document.getElementsByClassName("title_top_power");
        for (let i = 0; i < titles.length; i++) {
            titles[i].style.visibility = "visible";
        }
    }
    
}

// loop to update resin
var resin_refresh;
function calculateResin(){
    let resin_obj = document.querySelector("#resin");
    const resin = resin_obj.value;
    if(resin < 0 || resin > POWER_LIMIT || resin == "")   return;
    clearInterval(resin_refresh);
    const start_time = new Date();
    calculate(resin, start_time);
    resin_refresh = setInterval(function(){calculate(resin, start_time, "resin")}, 1000);
    resin_obj.value = "";
}

// loop to update power
var power_refresh;
function calculatePower(){
    let power_obj = document.querySelector("#tpower");
    const power = power_obj.value;
    if(power < 0 || power > POWER_LIMIT || power == "")   return;
    clearInterval(power_refresh);
    const start_time = new Date();
    calculate(power, start_time);
    power_refresh = setInterval(function(){calculate(power, start_time, "power")}, 1000);
    power_obj.value = "";
}

//On enter key press 
document.querySelector("#resin").onkeypress=function(e){
    if(e.keyCode==13){
        calculateResin();
    }
}
document.querySelector("#tpower").onkeypress=function(e){
    if(e.keyCode==13){
        calculatePower();
    }
}