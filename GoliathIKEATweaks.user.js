// ==UserScript==
// @name         Goliath IKEA Tweaks
// @version      0.1
// @description  Additions / changes to Goliath
// @author       _Rikardo_
// @icon         https://i.imgur.com/mS8hx5D.png
// @match        https://goliath.hypixel.net/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @grant        GM_xmlhttpRequest
// @connect      api.mojang.com
// @connect      sessionserver.mojang.com
// ==/UserScript==
var url = window.location.href;
var cookie = document.cookie;
var timestamp = "1 Jan 2030 12:00:00 UTC";
var offset = -4; // TIME COMPARED WITH GMT
var backgroundColor = "";


// FAVICON
$("<link rel='icon' type='image/png' href='https://i.imgur.com/mS8hx5D.png'>").insertAfter("title:first");

//  THEME RELATED
if(cookie.includes("themeBackgroundColor="))
{
    var backgroundColorStart = cookie.indexOf("themeBackgroundColor=");
    backgroundColor = cookie.substring(backgroundColorStart+21,backgroundColorStart+27);
    $("body").css("background-color","#"+backgroundColor);
    $("html").css("background-color","#"+backgroundColor);
    $("<style type='text/css'>body,html{background-color:#"+backgroundColor+"!important;}</style>").insertAfter("body:first");
}
if(cookie.includes("themeTextColor="))
{
    var textColorStart = cookie.indexOf("themeTextColor=");
    var textColor = cookie.substring(textColorStart+15,textColorStart+21);
    $("<style type='text/css'>.uk-navbar-nav>li>a{color:#"+textColor+";}</style>").insertAfter("body:first");
}
if(cookie.includes("themeBodyTextColor="))
{
    var textBodyColorStart = cookie.indexOf("themeBodyTextColor=");
    var bodyTextColor = cookie.substring(textBodyColorStart+19,textBodyColorStart+25);
    $("body").css("color","#"+bodyTextColor+"!important");
    $("<style type='text/css'>body,h1,h2,h3,h4,h5,h6{color:#"+bodyTextColor+"!important;}</style>").insertAfter("body:first");
    if(backgroundColor.length > 0)
    {
        $("<style type='text/css'>.showAll:hover,.sendTheme:hover,.resetTheme:hover,.sendTextTheme:hover,.sendBackgroundTheme:hover,.sendBodyTextTheme:hover{background-color:#"+bodyTextColor+";color:#"+backgroundColor+";}.showAll,.sendTheme,.resetTheme,.sendTextTheme,.sendBackgroundTheme,.sendBodyTextTheme{border:1px solid #"+bodyTextColor+"!important;}</style>").insertAfter("body:first");
    }
    else
    {
        $("<style type='text/css'>.showAll:hover,.sendTheme:hover,.resetTheme:hover,.sendTextTheme:hover,.sendBackgroundTheme:hover,.sendBodyTextTheme:hover{background-color:#3B3738;color:#000;}.showAll,.sendTheme,.resetTheme,.sendTextTheme,.sendBackgroundTheme,.sendBodyTextTheme{border:1px solid #"+bodyTextColor+"!important;</style>").insertAfter("body:first");
    }
}
else
{
    $("<style type='text/css'>.showAll:hover,.sendTheme:hover,.resetTheme:hover,.sendTextTheme:hover,.sendBackgroundTheme:hover,.sendBodyTextTheme:hover{background-color:#fff;color:#000;}</style>").insertAfter("body:first");
}
// CLOCK
var clientDate = new Date();
var serverDate = new Date(clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000) + (3600000*offset));
var hours = serverDate.getHours();
var minutes = serverDate.getMinutes();
var ampm = hours >= 12 ? 'pm' : 'am';
hours = hours % 12;
hours = hours ? hours : 12;
minutes = minutes < 10 ? '0'+minutes : minutes;
$("<span class='clock' style='text-align: right; display: inline-block; padding-left: 15px'>"+hours + ':' + minutes + ' ' + ampm+"</span>").insertAfter(".text:first");
setInterval(function()
{
    var clientDate = new Date();
    var serverDate = new Date(clientDate.getTime() + (clientDate.getTimezoneOffset() * 60000) + (3600000*-4));
    var hours = serverDate.getHours();
    var minutes = serverDate.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    $('.clock').remove();
    $("<span class='clock' style='text-align: right; display: inline-block; padding-left: 15px'>"+hours + ':' + minutes + ' ' + ampm+"</span>").insertAfter(".text:first");
}, 1000);

// STAFF CHAT
if(url.includes("https://goliath.hypixel.net/staffchat"))
{
    $(".uk-width-4-10").css("width","35%");
    $(".uk-width-6-10").css("width","65%");
    $("#inputArea").css("width","100%");
    $("#message").css("width","100%");
    $("#staffListing").css("padding-left","0");
    $("#chat").css("margin-right","0");
}

// USERINFO
if(url.includes("https://goliath.hypixel.net/userinfo?"))
{
    if(document.documentElement.innerHTML.includes("Oops! Server Error"))
    {
        if(cookie.includes("goliathError=")===false)
        {
            url += "+";
            var nowError = new Date();
            var timeError = nowError.getTime();
            timeError += 10 * 1000;
            nowError.setTime(timeError);
            document.cookie = "goliathError=true;expires="+nowError+";path=/";
            window.location.href = url;
        }
        else
        {
            document.cookie = "goliathError=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=";
        }
    }
    else
    {
        document.cookie = "goliathError=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=";
    }
    if(document.documentElement.innerHTML.includes("${player}"))
    {
        $('#content').contents().filter(function () {
            return this.nodeType === 3;
        }).remove();
        var searchedPlayer = url.substring(url.indexOf("=")+1,url.length);
        while(searchedPlayer.includes("+")){searchedPlayer = searchedPlayer.replace("+","");}
        while(searchedPlayer.includes("-")){searchedPlayer = searchedPlayer.replace("-","");}
        $("<p class='couldntFindUser'>Sorry couldn't find \""+searchedPlayer+"\"!</p>").insertAfter("#autocompleteChoices:first");
        if(searchedPlayer.length > 16)
        {
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'https://sessionserver.mojang.com/session/minecraft/profile/'+searchedPlayer,
                headers: {
                    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                    'Accept': 'application/atom+xml,application/xml,text/xml',
                },
                onload: function(responseDetails) {
                    var mojangResponse = responseDetails.responseText;
                    if(mojangResponse !== undefined && mojangResponse.includes("\"name\""))
                    {
                        $("<p class='neverJoined' style='margin-bottom:5px;'class='foundUUIDUser'>Seems like that player never joined Hypixel...</p><img class='UUIDnotJoined' src='http://i.imgur.com/f9zRr2U.gif'>").insertAfter(".couldntFindUser:first");
                    }
                }
            });
        }
        else
        {
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'https://api.mojang.com/users/profiles/minecraft/'+searchedPlayer,
                headers: {
                    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                    'Accept': 'application/atom+xml,application/xml,text/xml',
                },
                onload: function(responseDetails) {
                    var mojangResponse = responseDetails.responseText;
                    if(mojangResponse !== undefined && mojangResponse.includes("\"name\""))
                    {
                        var mojangAnswer = mojangResponse.substring(mojangResponse.indexOf("\"id\"")+6);
                        var mojangUUID = mojangAnswer.substring(0,mojangAnswer.indexOf("\""));
                        $("<p class='foundMojangUser'>Found a player using that name: <a href='https://goliath.hypixel.net/userinfo?uuid="+mojangUUID+"'>"+mojangUUID+"</a>.</p>").insertAfter(".couldntFindUser:first");
                    }
                }
            });
        }
    }
    else
    {
        $('#cape').remove();
        var username = /([A-Za-z0-9_]{1,16})$/.exec($("#columnx > font:first-of-type").text())[1];
        $("<img id='optifineCape' style='margin: 20px;' width='40%' src=" + "http://s.optifine.net/capes/" + username + ".png" + " onerror=this.style.display='none'>").insertAfter("img");
    }
}
if(url.includes("https://goliath.hypixel.net/userinfo"))
{
    var names = [];
    var maxInLine = 8; // Users shown
    socket.on("autocompleteResponse", function(data) {
        data = JSON.parse(data);
        names = data;
        html = "<br />Online players: ";
        $("#autocompleteChoices").css("display","flex");
        $("#autocompleteChoices").css("flex-direction","row");
        $("#autocompleteChoices").css("flex-wrap","wrap");
        $("#autocompleteChoices").css("align-items","flex-end");
        for (var index = 0; index < (data.length > maxInLine ? maxInLine : data.length); index++) {
            if (index === 0)
            {
                html += "<a style='margin: 0 7px 0 7px;' href='/userinfo?player=" + names[index] + "'>" + names[index] + "</a>";
            }
            else
            {
                html += "<a style='margin-right: 7px;' href='/userinfo?player=" + names[index] + "'>" + names[index] + "</a>";
            }
        }
        $('.showAll').remove();
        if (data.length > maxInLine) {
            html += " and " + (data.length - maxInLine) + " more.";
            $("<div class='showAll' style='height: 20px;display:flex;flex-direction:colum;justify-content:center;align-items:center;cursor:pointer;margin: 10px 0 0 0;border: 1px solid white;font-size:90%;border-radius:4px;width: 80px;'>Show all</div>").insertAfter("#autocompleteChoices");
            document.getElementsByClassName('showAll')[0].addEventListener('click', displayNames, false);
        } else if (data.length === 0) {
            html += "<span class='gray' style='margin: 0 7px 0 7px;'>None.</span>";
        }

        $("#autocompleteChoices").html(html);
    });
}
function displayNames()
{
    var htmlText = "<br />Online players: ";
    $('.showAll').remove();
    for (var index = 0; index < names.length; index++)
    {
        if (index === 0)
        {
            htmlText += "<a style='margin: 0 7px 0 7px;' href='/userinfo?player=" + names[index] + "'>" + names[index] + "</a>";
        }
        else
        {
            htmlText += "<a style='margin-right: 7px;' href='/userinfo?player=" + names[index] + "'>" + names[index] + "</a>";
        }
    }
    $("#autocompleteChoices").html(htmlText);
}

//    THEME
if(url.includes("https://goliath.hypixel.net/profile"))
{
    $('.color-option').remove();
    $("#colorSelector").html("<div class='color-option' style='background:#E74C3C;' onclick='document.cookie = \"backgroundColor=E74C3C; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#F2784B;' onclick='document.cookie = \"backgroundColor=F2784B; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#E9E581;' onclick='document.cookie = \"backgroundColor=E9E581; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#FDE3A7;' onclick='document.cookie = \"backgroundColor=FDE3A7; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#ECECEC;' onclick='document.cookie = \"backgroundColor=ECECEC; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#87D37C;' onclick='document.cookie = \"backgroundColor=87D37C; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#81CFE0;' onclick='document.cookie = \"backgroundColor=81CFE0; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#19B5FE;' onclick='document.cookie = \"backgroundColor=19B5FE; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#BE90D4;' onclick='document.cookie = \"backgroundColor=BE90D4; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#000000;' onclick='document.cookie = \"backgroundColor=000000; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div>");
    $("<p style='margin: 10px 0 2.5px 0;'>Choose your own theme color: (HEX)</p> <input class='themeColor' style='margin: 2.5px 0 10px 0;' type='text' maxlength='6'><div class='themeButtons' style='display:flex;flex-direction:row;margin-bottom:30px;'><div class='sendTheme' style='height: 25px;display:flex;flex-direction:colum;justify-content:center;align-items:center;cursor:pointer;margin: 2.5px 0 0 0;border: 1px solid white;font-size:90%;border-radius:4px;width: 110px;'>Select theme</div><div class='resetTheme' style='height: 25px;display:flex;flex-direction:colum;justify-content:center;align-items:center;cursor:pointer;margin: 2.5px 0 0 8px;border: 1px solid white;font-size:90%;border-radius:4px;width: 110px;' onclick='document.cookie = \"backgroundColor=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'>Reset theme</div></div><h3 class='textColorTitle'>NAVIGATION TEXT COLOR</h3>").insertAfter("#colorSelector:first");
    $("<div class='textSelector' id='colorSelector'> <div class='color-option' style='background:#E74C3C;' onclick='document.cookie = \"themeTextColor=E74C3C; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#F2784B;' onclick='document.cookie = \"themeTextColor=F2784B; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#E9E581;' onclick='document.cookie = \"themeTextColor=E9E581; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#FDE3A7;' onclick='document.cookie = \"themeTextColor=FDE3A7; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#ECECEC;' onclick='document.cookie = \"themeTextColor=ECECEC; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#87D37C;' onclick='document.cookie = \"themeTextColor=87D37C; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#81CFE0;' onclick='document.cookie = \"themeTextColor=81CFE0; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#19B5FE;' onclick='document.cookie = \"themeTextColor=19B5FE; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#BE90D4;' onclick='document.cookie = \"themeTextColor=BE90D4; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#000000;' onclick='document.cookie = \"themeTextColor=000000; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div></div>").insertAfter(".textColorTitle");
    $("<p style='margin: 10px 0 2.5px 0;'>Choose your own text color: (HEX)</p> <input class='textColor' style='margin: 2.5px 0 10px 0;' type='text' maxlength='6'><div class='themeButtons' id='themeButtonText' style='display:flex;flex-direction:row;margin-bottom:30px;'><div class='sendTextTheme' style='height: 25px;display:flex;flex-direction:colum;justify-content:center;align-items:center;cursor:pointer;margin: 2.5px 0 0 0;border: 1px solid white;font-size:90%;border-radius:4px;width: 130px;'>Select text theme</div><div class='resetTheme' style='height: 25px;display:flex;flex-direction:colum;justify-content:center;align-items:center;cursor:pointer;margin: 2.5px 0 0 8px;border: 1px solid white;font-size:90%;border-radius:4px;width: 130px;' onclick='document.cookie = \"themeTextColor=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'>Reset text theme</div></div>").insertAfter(".textSelector");
    $("<h3>BACKGROUND COLOR</h3><div class='backgroundSelector' id='colorSelector'> <div class='color-option' style='background:#E74C3C;' onclick='document.cookie = \"themeBackgroundColor=E74C3C; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#F2784B;' onclick='document.cookie = \"themeBackgroundColor=F2784B; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#E9E581;' onclick='document.cookie = \"themeBackgroundColor=E9E581; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#FDE3A7;' onclick='document.cookie = \"themeBackgroundColor=FDE3A7; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#ECECEC;' onclick='document.cookie = \"themeBackgroundColor=ECECEC; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#87D37C;' onclick='document.cookie = \"themeBackgroundColor=87D37C; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#81CFE0;' onclick='document.cookie = \"themeBackgroundColor=81CFE0; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#19B5FE;' onclick='document.cookie = \"themeBackgroundColor=19B5FE; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#BE90D4;' onclick='document.cookie = \"themeBackgroundColor=BE90D4; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#000000;' onclick='document.cookie = \"themeBackgroundColor=000000; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div></div><p style='margin: 10px 0 2.5px 0;'>Choose your own background color: (HEX)</p> <input class='backgroundColor' style='margin: 2.5px 0 10px 0;' type='text' maxlength='6'><div class='themeButtons' id='backgroundColor' style='display:flex;flex-direction:row;margin-bottom:30px;'><div class='sendBackgroundTheme' style='height: 25px;display:flex;flex-direction:colum;justify-content:center;align-items:center;cursor:pointer;margin: 2.5px 0 0 0;border: 1px solid white;font-size:90%;border-radius:4px;width: 180px;'>Select background theme</div><div class='resetTheme' style='height: 25px;display:flex;flex-direction:colum;justify-content:center;align-items:center;cursor:pointer;margin: 2.5px 0 0 8px;border: 1px solid white;font-size:90%;border-radius:4px;width: 180px;' onclick='document.cookie = \"themeBackgroundColor=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'>Reset background theme</div></div>").insertAfter("#themeButtonText");
    $("<h3>TEXT COLOR</h3><div class='bodyTextSelector' id='colorSelector'> <div class='color-option' style='background:#E74C3C;' onclick='document.cookie = \"themeBodyTextColor=E74C3C; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#F2784B;' onclick='document.cookie = \"themeBodyTextColor=F2784B; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#E9E581;' onclick='document.cookie = \"themeBodyTextColor=E9E581; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#FDE3A7;' onclick='document.cookie = \"themeBodyTextColor=FDE3A7; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#ECECEC;' onclick='document.cookie = \"themeBodyTextColor=ECECEC; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#87D37C;' onclick='document.cookie = \"themeBodyTextColor=87D37C; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#81CFE0;' onclick='document.cookie = \"themeBodyTextColor=81CFE0; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#19B5FE;' onclick='document.cookie = \"themeBodyTextColor=19B5FE; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#BE90D4;' onclick='document.cookie = \"themeBodyTextColor=BE90D4; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div><div class='color-option' style='background:#000000;' onclick='document.cookie = \"themeBodyTextColor=000000; expires="+timestamp+";path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'><div class='display'></div></div></div>").insertAfter("#backgroundColor");
    $("<p style='margin: 10px 0 2.5px 0;'>Choose your own text color: (HEX)</p> <input class='bodyTextColor' style='margin: 2.5px 0 10px 0;' type='text' maxlength='6'><div class='themeButtons' id='themeButtonText' style='display:flex;flex-direction:row;'><div class='sendBodyTextTheme' style='height: 25px;display:flex;flex-direction:colum;justify-content:center;align-items:center;cursor:pointer;margin: 2.5px 0 0 0;border: 1px solid white;font-size:90%;border-radius:4px;width: 130px;'>Select text theme</div><div class='resetTheme' style='height: 25px;display:flex;flex-direction:colum;justify-content:center;align-items:center;cursor:pointer;margin: 2.5px 0 0 8px;border: 1px solid white;font-size:90%;border-radius:4px;width: 130px;' onclick='document.cookie = \"themeBodyTextColor=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'>Reset text theme</div></div>").insertAfter(".bodyTextSelector");
    document.getElementsByClassName('sendTheme')[0].addEventListener('click', changeThemeColor, false);
    document.getElementsByClassName('sendTextTheme')[0].addEventListener('click', changeTextThemeColor, false);
    document.getElementsByClassName('sendBackgroundTheme')[0].addEventListener('click', changeBackgroundThemeColor, false);
    document.getElementsByClassName('sendBodyTextTheme')[0].addEventListener('click', changeBodyTextThemeColor, false);
}
function changeThemeColor()
{
    var themeColor = document.getElementsByClassName("themeColor")[0].value;
    var themeColorOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test("#"+themeColor);
    if(themeColorOk)
    {
        document.cookie = "backgroundColor="+themeColor+";expires="+timestamp+";path=/";
        window.location.href = "https://goliath.hypixel.net/profile";
    }
    else
    {
        alert("You inputted an invalid color (#"+themeColor+")");
    }
}
function changeTextThemeColor()
{
    var textColor = document.getElementsByClassName("textColor")[0].value;
    var textColorOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test("#"+textColor);
    if(textColorOk)
    {
        document.cookie = "themeTextColor="+textColor+";expires="+timestamp+";path=/";
        window.location.href = "https://goliath.hypixel.net/profile";
    }
    else
    {
        alert("You inputted an invalid color (#"+textColor+")");
    }
}
function changeBackgroundThemeColor()
{
    var backgroundColor = document.getElementsByClassName("backgroundColor")[0].value;
    var backgroundColorOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test("#"+backgroundColor);
    if(backgroundColorOk)
    {
        document.cookie = "themeBackgroundColor="+backgroundColor+";expires="+timestamp+";path=/";
        window.location.href = "https://goliath.hypixel.net/profile";
    }
    else
    {
        alert("You inputted an invalid color (#"+backgroundColor+")");
    }
}
function changeBodyTextThemeColor()
{
    var bodyTextColor = document.getElementsByClassName("bodyTextColor")[0].value;
    var bodyTextColorOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test("#"+bodyTextColor);
    if(bodyTextColorOk)
    {
        document.cookie = "themeBodyTextColor="+bodyTextColor+";expires="+timestamp+";path=/";
        window.location.href = "https://goliath.hypixel.net/profile";
    }
    else
    {
        alert("You inputted an invalid color (#"+bodyTextColor+")");
    }
}
//  PROFILE
if(cookie.includes("minecraftUUID="))
{
    var nameAndUUID = cookie.substring(cookie.indexOf("minecraftUUID=")+14,cookie.indexOf("¤$¤")).split(",");
    $("<div class='profileNew' style='height:60px;line-height:60px;font-sixe:15px;padding:0 10px;' onclick='window.location.href=\"\profile\"'><img class='headImage' src=\"\" style='margin-right:15px;'>"+nameAndUUID[0]+"</div>").insertAfter(".uk-icon-user:first");
    $('.uk-icon-user:first').remove();
    var parentElement = document.querySelectorAll("a[href='/profile']");
    $(parentElement).contents().filter(function () {
        return this.nodeType === 3;
    }).remove();
    dataImage = localStorage.getItem('headImage');
    bannerImg = document.getElementsByClassName('headImage')[0];
    bannerImg.src = dataImage;
}
//   NAME
if(url.includes("https://goliath.hypixel.net/home"))
{
    var mcNameUncut = document.getElementsByClassName("uk-width-1-3")[0].innerHTML;
    var mcName = mcNameUncut.substring(mcNameUncut.indexOf("Welcome, ")+9,mcNameUncut.indexOf("!"));
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'https://api.mojang.com/users/profiles/minecraft/'+mcName,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(responseDetails) {
            var mojangResponse = responseDetails.responseText;
            if(mojangResponse !== undefined && mojangResponse.includes("\"name\""))
            {
                var mojangAnswer = mojangResponse.substring(mojangResponse.indexOf("\"id\"")+6);
                var mojangUUID = mojangAnswer.substring(0,mojangAnswer.indexOf("\""));

                var imageRequest = new XMLHttpRequest();
                imageRequest.onload = function() {
                    var reader = new FileReader();
                    reader.onloadend = function() {
                        localStorage.setItem("headImage", reader.result);
                    };
                    reader.readAsDataURL(imageRequest.response);
                };
                imageRequest.open('GET', 'https://crafatar.com/avatars/'+mojangUUID+'?size=25');
                imageRequest.responseType = 'blob';
                imageRequest.send();
                document.cookie = "minecraftUUID="+mcName+","+mojangUUID+"¤$¤"+";expires="+timestamp+";path=/";
            }
        }
    });

}

// MISC

var version = 0.1;
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (request.readyState == XMLHttpRequest.DONE) {
        var updatedScriptVersion = request.responseText;
        if(version < updatedScriptVersion)
        {
            console.log("Update script");
            window.location.href = "https://github.com/Rikeardo/Goliath-IKEA-Tweaks/raw/master/GoliathIKEATweaks.user.js";
        }
    }
};
request.open('GET', 'https://raw.githubusercontent.com/Rikeardo/Goliath-IKEA-Tweaks/master/GoliathTweaksVersion.json', true);
request.send(null);
