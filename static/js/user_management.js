function do_userLogin(obj){
    g_user_id = $("#id_user_name").val();
    let user_pwd = $("#id_user_password").val();
    $.ajax({
        url: '/ajax/user_login/',
        type: 'POST',
        data: {
          'user_name': g_user_id,
          'user_password' : user_pwd,
        },
        dataType: 'json',
        beforeSend:function()
        {
            return true;
        },

    success: function (data) {
        if (data.user_permitted == 1) {
            var d = new Date();
            d.setTime(d.getTime() + (g_exdays*24*60*60*1000));

            let cname = "username=";
            let cvalue = g_user_id;
            let expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

            $("#id_title_username").html("<span class='glyphicon glyphicon-user'></span> " + g_user_id);
            $("#id_tip").html("<span style='color:blue'>Login success.</span>");

            $("#id_title_username").attr("style", "cursor:default");
            let logoutNode = document.getElementById("id_logout");
            if (logoutNode == null) {
                logoutNode = document.createElement("a");
                logoutNode.setAttribute("id", "id_logout");
                logoutNode.innerHTML = "<span class='glyphicon glyphicon-log-out'></span> logout";
                logoutNode.setAttribute("href", "#id_import");
                logoutNode.onclick=function(){
                    do_logout(this);
                };

                let parentNode = document.getElementById("id_title_func");
                parentNode.appendChild(logoutNode);
            }
            else{
                logoutNode.removeAttribute("hidden");
            }

        }else{
            g_user_id = "";
            g_current_vb_id = -1;
            $("#id_title_username").html("<span class='glyphicon glyphicon-log-in'></span> login");
            $("#id_tip").html("<span style='color:red'>Wrong user name or password.</span>");
        }

        refreshVBList("");
     }
  });
}

function do_logout(obj)
{
    $("#id_tip").html("<span style='color:blue'>" + g_user_id + " was logout.</span>");
    g_user_id = "";
    g_all_vb_list.length = 0;
    initialVBMenuItem("");
    let logoutNode = document.getElementById("id_logout");
    logoutNode.setAttribute("hidden", true);

    $("#id_title_username").html("<span class='glyphicon glyphicon-log-in'></span> login");
    $("#id_title_username").attr("style", "cursor:pointer");

}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function do_createUser(obj){

    window.location.replace("/user?ip=" + g_my_ip_addr);
}


function createUser () {
    $.getJSON('//freegeoip.net/json/?callback=?', function(data) {
        g_my_ip_addr = data['ip'];
    });

    if (!$('#username').val()) {
        $("#id_tip").html("<span style='color:red'>User name must be input</span>");
        return false;
    }
    if (!$('#password').val()) {
        $("#id_tip").html("<span style='color:red'>User password must be input</span>");
        return false;
    }
    if ($('#password').val() != $('#passwordAgain').val()) {
        $("#id_tip").html("<span style='color:red'>User password was not same, please confirm your twice input</span>");
        return false;
    }
    $.ajax({
        url: '/ajax/create_newUser/',
        type: 'POST',
        data: {
            'user_name': $('#username').val(),
            'user_password': $('#password').val(),
            'user_email': $('#email').val(),
            'update_ip': g_my_ip_addr,
        },
        success: function (data, textStatus) {
            console.log(data);
            if (data == 1) {
                $("#id_tip").html("<span style='color:red'>New user was created. </span>");

            } else if (data == -1) {
                $("#id_tip").html("<span style='color:red'>Create failed. </span>");
            }
            window.location.href = '/dictionary';
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });

}

function saveUserReviseAction(reviseID, reviseResult, entryID, vbID, userName)
{
    $.ajax({
        url: '/ajax/save_userAction/',
        type: 'POST',
        data: {
            'user_name': userName,
            'revise_id': reviseID,
            'revise_result': reviseResult,
            'entry_id': entryID,
            'vb_id':vbID,
        },
        success: function (data, textStatus) {
            console.log(data);
            //if (data.save_result == 1) {
            //    $("#id_tip").html("<span style='color:red'>New user action was recorded. </span>");

            //} else if (data.save_result == -1) {
            //    $("#id_tip").html("<span style='color:red'>User action can't be recorded </span>");
            //}
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });

}

function getUserReviseActionHistory(nodeID, userName)
{
    $.ajax({
        url: '/ajax/get_userAction/',
        type: 'POST',
        data: {
            'user_name': userName,
        },
        success: function (data, textStatus) {
            console.log(data);

            var tableNode;
            tableNode=document.createElement("table");//获得对象
            tableNode.setAttribute("class", ".revise_table");


            data.user_data.sort(function (a, b) {
              if (a.start_time.toLowerCase() < b.start_time.toLowerCase()) {
                return 1;
              }
              if (a.start_time.toLowerCase() > b.start_time.toLowerCase()) {
                return -1;
              }
              return 0;
            });

            for (let i = 0 ; i< data.user_data.length; i ++) {
                var trNode=tableNode.insertRow();
                var tdNode=trNode.insertCell(); // start time
                tdNode.innerHTML = data.user_data[i]["start_time"];

                var tdNode=trNode.insertCell(); // end time
                tdNode.innerHTML = data.user_data[i]["end_time"];

                var tdNode=trNode.insertCell(); // vb name
                tdNode.innerHTML = data.user_data[i]["vb_name"];

                var tdNode=trNode.insertCell(); // result
                var resultInfoStr = "mistake/total: ";
                resultInfoStr = resultInfoStr.concat(String(data.user_data[i]["mistake_count"]));
                resultInfoStr = resultInfoStr.concat("/");
                resultInfoStr = resultInfoStr.concat(String(data.user_data[i]["total_count"]));
                tdNode.innerHTML = resultInfoStr;
            }

            document.getElementById(nodeID).appendChild(tableNode);
            //$("#id_tip").html("<span style='color:green'> get record " + data + " </span>");
            //if (data.save_result == 1) {
            //    $("#id_tip").html("<span style='color:red'>New user action was recorded. </span>");

            //} else if (data.save_result == -1) {
            //    $("#id_tip").html("<span style='color:red'>User action can't be recorded </span>");
            //}
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

