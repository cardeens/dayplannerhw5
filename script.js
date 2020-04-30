
var now = moment()
var divValue
var divContent

$(".description").click(divClicked);

$(".saveBtn").click(saveClicked);


$(document).ready(function () {
    $(".saveBtn").attr('disabled', 'disabled')
    $.each($(".description"), function () {
        var timeValue = $(this).attr('value');
        console.log(timeValue);
        var prevAppts = localStorage.getItem(timeValue);
        console.log(prevAppts);
        $(this).attr("contenteditable", "true");
        $(this).append(prevAppts);
        $(this).prev().removeAttr("contenteditable");
    })
});

function displayDate() {
    var eDisplayMoment = document.getElementById('currentDay');
    eDisplayMoment.innerHTML = now.format('dddd, MMMM D, YYYY');
}


function divClicked() {
    $(this).attr("contenteditable", "true");
    $(this).next().removeAttr("disabled");
    divValue = $(this).attr('value');
    $(this).keyup(function () {
        divContent = $(this).text();
        localStorage.setItem(divValue, divContent);
    });
};


function saveClicked() {
    divContent = $(this).prev().text();
    $(this).prev().removeAttr("contenteditable");
    localStorage.setItem(divValue, divContent);
};


function refresh() {
    $.each($(".description"), function () {
        var hour = now.format("H");
        var timeValue = $(this).attr('value');
        if (parseInt(timeValue) < parseInt(hour)) {
            $(this).addClass('past');
        }
        else if (timeValue === hour) {
            $(this).addClass('present');
        }
        else if (parseInt(timeValue) > parseInt(hour)) {
            $(this).addClass('future');
        };
    });
    setTimeout(refresh, 60000);
};

refresh();
displayDate();


