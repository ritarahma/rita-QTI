$(function () {
  var operation = "C"; 
  var selected_index = -1; 
  var tblUser = localStorage.getItem("tblUser"); 
  tblUser = JSON.parse(tblUser); 
  if (tblUser === null) 
      tblUser = [];

  function Create() {
   
    var user = JSON.stringify({
      username: $("#un").val(),
      password: $("#pwd").val(),
      fullname: $("#fn").val(),
      city: $("#city").val(),
      status: $("#stat").val()
    }); 
   
    tblUser.push(user);
    
    localStorage.setItem("tblUser", JSON.stringify(tblUser));
    alert("data berhasil disimpan"); 
    return true;
  }

  function Edit() {
    
    tblUser[selected_index] = JSON.stringify({
        username: $("#un").val(),
        password: $("#pwd").val(),
        fullname: $("#fn").val(),
        city: $("#city").val(),
        status: $("#stat").val()
    });
    
    localStorage.setItem("tblUser", JSON.stringify(tblUser)); 
    alert("data berhasil diubah"); 
    return true;
  }

  function Delete() {
    
    tblUser.splice(selected_index, 1); 
    
    localStorage.setItem("tblUser", JSON.stringify(tblUser)); 
    alert("data berhasil dihapus"); 
  }

  function List() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +                
            "<th>username</th>" +
            "<th>password</th>" +
            "<th>fullname</th>" +
            "<th>city</th>" +
            "<th>status</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            ); 
    for (var i in tblUser) {
        var per = JSON.parse(tblUser[i]);
        $("#tblList tbody").append("<tr>" +                    
                "<td>" + per.username + "</td>" +
                "<td>" + per.password + "</td>" +
                "<td>" + per.fullname + "</td>" +
                "<td>" + per.city + "</td>" + 
                "<td>" + per.status + "</td>" + 
                "<td><img src='edit.png' alt='Edit" + i + "' class='btnEdit'/>&nbsp &nbsp<img src='delete.png' alt='Delete" + i + "' class='btnDelete'/></td>" +
                "</tr>"
                );
    } 
  }

  $("#frmuser").bind("submit", function () {
    if (operation === "C")
        return Create();
    else
        return Edit();
  });
  
  List();

  $(".btnEdit").bind("click", function () {
    operation = "E"; 
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
    var per = JSON.parse(tblUser[selected_index]); 
    $("#un").val(per.username);
    $("#pwd").val(per.password);
    $("#fn").val(per.fullname);
    $("#city").val(per.city);
    $("#stat").val(per.status);
    $("#un").attr("readonly", "readonly");
    $("#pwd").focus();
  });

  $(".btnDelete").bind("click", function () {
  
    selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
    Delete(); 
    List();
  });
  
  
    
});
