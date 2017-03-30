// ==UserScript==
// @name         Goliath IKEA Tweaks
// @version      0.2
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
var backgroundColor = "3B3738";
var textColor = "444";
var bodyTextColor = "FFF";
var navColor = "87D37C";

// FAVICON
$("<link rel='icon' href='data:image/png;base64,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'>").insertAfter("title:first");

//  THEME RELATED
if(cookie.includes("themeBackgroundColor="))
{
    var backgroundColorStart = cookie.indexOf("themeBackgroundColor=");
    backgroundColor = cookie.substring(backgroundColorStart+21,backgroundColorStart+27);
    if(backgroundColor.includes(";"))
    {
        backgroundColor = backgroundColor.substring(0,backgroundColor.indexOf(";"));
    }
    $("body").css("background-color","#"+backgroundColor);
    $("html").css("background-color","#"+backgroundColor);
    $("<style type='text/css'>body,html{background-color:#"+backgroundColor+"!important;}</style>").insertAfter("body:first");
}
if(cookie.includes("themeTextColor="))
{
    var textColorStart = cookie.indexOf("themeTextColor=");
    textColor = cookie.substring(textColorStart+15,textColorStart+21);
    if(textColor.includes(";"))
    {
        textColor = textColor.substring(0,textColor.indexOf(";"));
    }
    $("<style type='text/css'>.uk-navbar-nav>li>a{color:#"+textColor+";}</style>").insertAfter("body:first");
}
if(cookie.includes("themeBodyTextColor="))
{
    var textBodyColorStart = cookie.indexOf("themeBodyTextColor=");
    bodyTextColor = cookie.substring(textBodyColorStart+19,textBodyColorStart+25);
    if(bodyTextColor.includes(";"))
    {
        bodyTextColor = bodyTextColor.substring(0,bodyTextColor.indexOf(";"));
    }
    $("body").css("color","#"+bodyTextColor+"!important");
    $("<style type='text/css'>body,h1,h2,h3,h4,h5,h6{color:#"+bodyTextColor+"!important;}</style>").insertAfter("body:first");
    if(backgroundColor.length > 0)
    {
        $("<style type='text/css'>.showAll:hover,.sendTheme:hover,.resetTheme:hover,.sendTextTheme:hover,.sendBackgroundTheme:hover,.sendBodyTextTheme:hover,.copyTheme:hover,.selectTheme:hover{background-color:#"+bodyTextColor+";color:#"+backgroundColor+";}.selectTheme,.showAll,.copyTheme,.sendTheme,.resetTheme,.sendTextTheme,.sendBackgroundTheme,.sendBodyTextTheme{border:1px solid #"+bodyTextColor+"!important;}</style>").insertAfter("body:first");
    }
    else
    {
        $("<style type='text/css'>.showAll:hover,.sendTheme:hover,.resetTheme:hover,.sendTextTheme:hover,.sendBackgroundTheme:hover,.sendBodyTextTheme:hover,.copyTheme:hover,.selectTheme:hover{background-color:#3B3738;color:#000;}.selectTheme,.showAll,.copyTheme,.sendTheme,.resetTheme,.sendTextTheme,.sendBackgroundTheme,.sendBodyTextTheme{border:1px solid #"+bodyTextColor+"!important;</style>").insertAfter("body:first");
    }
}
else
{
    $("<style type='text/css'>.showAll:hover,.sendTheme:hover,.resetTheme:hover,.sendTextTheme:hover,.sendBackgroundTheme:hover,.sendBodyTextTheme:hover,.copyTheme:hover,.selectTheme:hover{background-color:#fff;color:#000;}</style>").insertAfter("body:first");
}
if(cookie.includes("backgroundColor="))
{
    var navColorStart = cookie.indexOf("backgroundColor=");
    navColor = cookie.substring(navColorStart+16,navColorStart+22);
    if(navColor.includes(";"))
    {
        navColor = navColor.substring(0,navColor.indexOf(";"));
    }
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
    $("<p style='margin: 10px 0 2.5px 0;'>Choose your own text color: (HEX)</p> <input class='bodyTextColor' style='margin: 2.5px 0 10px 0;' type='text' maxlength='6'><div class='themeButtons' id='textColorButtons' style='display:flex;flex-direction:row;margin-bottom:30px;'><div class='sendBodyTextTheme' style='height: 25px;display:flex;flex-direction:colum;justify-content:center;align-items:center;cursor:pointer;margin: 2.5px 0 0 0;border: 1px solid white;font-size:90%;border-radius:4px;width: 130px;'>Select text theme</div><div class='resetTheme' style='height: 25px;display:flex;flex-direction:colum;justify-content:center;align-items:center;cursor:pointer;margin: 2.5px 0 0 8px;border: 1px solid white;font-size:90%;border-radius:4px;width: 130px;' onclick='document.cookie = \"themeBodyTextColor=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=\"; window.location.href = \"https://goliath.hypixel.net/profile\"'>Reset text theme</div></div>").insertAfter(".bodyTextSelector");
    $("<h3>SHARE YOUR THEME</h3><p class='currentThemeText'>Currect theme:</p><div class='bodyTextSelector' id='colorSelector'><div class='color-option' style='background:#"+navColor+";cursor:default;'></div><div class='color-option' style='background:#"+textColor+";cursor:default;'></div><div class='color-option' style='background:#"+backgroundColor+";cursor:default;'></div><div class='color-option' style='background:#"+bodyTextColor+";cursor:default;'></div></div><input class='enterTheme' style='margin: 10px 0 10px 0;' type='text' maxlength='27'><div class='themeButtons' id='textColorButtons' style='display:flex;flex-direction:row;margin-bottom:30px;'><div class='selectTheme' style='height: 25px;display:flex;flex-direction:colum;justify-content:center;align-items:center;cursor:pointer;margin: 2.5px 0 0 0;border: 1px solid white;font-size:90%;border-radius:4px;width: 110px;'>Select theme</div><div class='copyTheme' style='height: 25px;display:flex;flex-direction:colum;justify-content:center;align-items:center;cursor:pointer;margin: 2.5px 0 0 8px;border: 1px solid white;font-size:90%;border-radius:4px;width: 130px;'>Copy your theme</div></div>").insertAfter("#textColorButtons");     document.getElementsByClassName('sendBackgroundTheme')[0].addEventListener('click', changeBackgroundThemeColor, false);
    document.getElementsByClassName('sendTheme')[0].addEventListener('click', changeThemeColor, false);
    document.getElementsByClassName('sendTextTheme')[0].addEventListener('click', changeTextThemeColor, false);
    document.getElementsByClassName('sendBodyTextTheme')[0].addEventListener('click', changeBodyTextThemeColor, false);
    document.getElementsByClassName('sendBackgroundTheme')[0].addEventListener('click', changeBackgroundThemeColor, false);
    document.getElementsByClassName('selectTheme')[0].addEventListener('click', selectThemeFromInput, false);
    document.getElementsByClassName('copyTheme')[0].addEventListener('click', copyCurrentTheme, false);
}
function selectThemeFromInput()
{
    var inputColors = document.getElementsByClassName("enterTheme")[0].value;
    inputColors = inputColors.split(",");
    var allOk = true;
    var i = 0;
    if(inputColors.length === 4)
    {
        while (i+1 < inputColors.length)
        {
            var themeColorOk  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test("#"+inputColors[i]);
            if(themeColorOk === false)
            {
                allOk = false;
            }
            i+=1;
        }
        if(allOk)
        {
            document.cookie = "backgroundColor="+inputColors[0]+";expires="+timestamp+";path=/";
            document.cookie = "themeTextColor="+inputColors[1]+";expires="+timestamp+";path=/";
            document.cookie = "themeBackgroundColor="+inputColors[2]+";expires="+timestamp+";path=/";
            document.cookie = "themeBodyTextColor="+inputColors[3]+";expires="+timestamp+";path=/";
            window.location.href = "https://goliath.hypixel.net/profile";
        }
    }
    else
    {
        alert("Invalid input.");
    }
}
function copyCurrentTheme()
{
    window.prompt("Copy to clipboard: Ctrl+C, Enter", navColor+","+textColor+","+backgroundColor+","+bodyTextColor);
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


$("<style type='text/css'>.uk-table-striped tbody tr:nth-of-type(odd){background-color:rgba(255,255,255,0.1)!important;}</style>").insertAfter("body:first");

var version = 0.2;
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
