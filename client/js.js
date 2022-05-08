var quit = false
var messagexd = ""
var nick = "Gqrecki"
var color = "#000000"
var text = ""
var colors = [
[0,8,"#009300"],
[1,8,"#FF0000"],
[2,8,"#7F0000"],
[3,8,"#9C009C"],
[4,8,"#FC7F00"],
[5,8,"#FFFF00"],
[6,8,"#00FF00"],
[7,8,"#009393"],
[8,8,"#00FFFF"],
[9,8,"#FF00FF"],
[10,9,"#7F7F7F"],
[11,9,"#D2D2D2"]]
var lol = Math.floor(Math.random() * (11 - 0 + 1)) + 0;
color = colors[lol][2]
document.getElementById("lol").setAttribute("style", "background-color:"+color+";");
var newnick = window.prompt("Podaj nick mordko", "anon");
nick = newnick.replace(/\s/g, '')

function leci() {
    if(document.getElementById("input").value != ""){
      if(document.getElementById("input").value[0] == "/"){
        if(document.getElementById("input").value.slice(0,7) == "/color "){
          var kekw = document.getElementById("input").value.slice(7,9)
          if(kekw == "0" || kekw == "1" || kekw == "2" || kekw == "3" || kekw == "4" || kekw == "5" || kekw == "6" || kekw == "7" || kekw == "8" || kekw == "9" || kekw == "10" || kekw == "11"){
            for(var x = 0; x < 12; x++){
              if(document.getElementById("input").value.slice(7,9) == colors[x][0] && document.getElementById("input").value.length == colors[x][1]){
                color = colors[x][2]
                document.getElementById("lol").setAttribute("style", "background-color:"+color+";");
              }
            }
          }else{
            alert("Use the correct command or use /help")
          }
        }else if(document.getElementById("input").value == "/help"){
          alert("Commands:\n"+
          "/quit\n"+
          "/nick {your nick}\n"+
          "/color {number}\n"+
          "0 - Green, 1 - Light Red, 2 - Brown, 3 - Purple, 4 - Orange, 5 - Yellow, 6 - Light Green, 7 - Cyan, 8 - Light Cyan, 9 - Pink, 10 - Grey, 11- Light Grey")
        }else if(document.getElementById("input").value == "/quit"){
          text = "*left the chat*"
          $.ajax({
            method: "GET",
            url: "../add.php",
            data: {"nick":nick,"color":color,"text":text}
          })
          //tu ma być wyjście
          quit = true
          document.getElementById("input").onkeyup = null
          // open(location, '_self').close();
        }else if(document.getElementById("input").value.slice(0,6) == "/nick "){
          var long = document.getElementById("input").value.length
          var newnick = document.getElementById("input").value.slice(6,long)
          nick = newnick.replace(/\s/g, '')
        }else{
          alert("Use the correct command or use /help")
        } 
        document.getElementById("input").value = ""
      }else{
        text = document.getElementById("input").value
        document.getElementById("input").value = ""
        $.ajax({
          method: "GET",
          url: "../add.php",
          data: {"nick":nick,"color":color,"text":text}
        })
        }
    }
} 

// var input = document.getElementById("input")
// input.addEventListener("keyup", function(event) {
//   if (event.keyCode === 13) {
//     leci()
//   }
// });

document.getElementById("input").onkeyup = spr
async function spr(event){
  if (event.keyCode === 13) {
    leci()
  }
}
spr().then(
  function(value) { console.log("ENTER") },
  function(error) { console.log("Let's chat!") }
)

function generate(){
  var message = document.createElement("div")
  message.classList.add("message")
  message.innerHTML = '<div class="message1" style="background-color:'+messagexd[0]["color"]+'"><p class="text"><span style="font-weight:bold">['+messagexd[0]["time"]+']</span> <'+'<span class="unmote">@'+messagexd[0]["nick"]+'</span>></p></div>'+'<div class="message2"><p class="text">'+messagexd[0]["text"]+'</p></div>'
  document.getElementsByClassName("overview")[0].appendChild(message)
  $(document).ready(function () {
    var $xd = $('#scrollbar1')
    $xd.tinyscrollbar()
    var xd = $xd.data("plugin_tinyscrollbar");
    xd.update()
    $('.overview:first').css({top: (($('.overview:first').height() - $('.viewport:first').height()) * (-1)) });
    $('.thumb:first').css({top: $('.track:first').height() - $('.thumb:first').height()});
    $('.text').emoticonize({
				delay: 10,
				animate: false,
				exclude: 'pre, code, .no-emoticons'
		})
    $('.unmote').unemoticonize();
  });
}

function alp(){
  $.ajax({
      method: "GET",
      url: "../server.php",
      dataType: "json"
  })
  .done(function( msg ) {
      messagexd = msg
      generate()
  })
  .always(function(){
      if(quit == false){
        alp();
      }
  });
}