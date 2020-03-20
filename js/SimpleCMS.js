/* fgfg */
var gMenuItem;
var menuFirst=true;

$(function(){
    // Load menu
    $.get("json/menu.json", function(datas, status){
        gMenuItem = datas.menuItems;
        datas.menuItems.forEach(function(menuItem){
            getItem("#menu",menuItem);
        }); // foreach
    });
    // Multi Level dropdowns
    $("ul.dropdown-menu [data-toggle='dropdown']").on("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
    
        $(this).siblings().toggleClass("show");
    
    
        if (!$(this).next().hasClass('show')) {
          $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
          $('.dropdown-submenu .show').removeClass("show");
        });
    
      });
    // Load main page  
    $("#content").load("content/main.html"); 
});

function getItem(menu,item)
{
    if( item.type == "menu")
      sClass="nav-item dropdown";
    else
      sClass="nav-item"
    if( menuFirst)
    {
      sClass += " active";
      menuFirst=false;
    }
    li = "<li class='"+sClass+"'>";
    if( item.type != "menu")
    {
        li += "<a class='nav-link' href='#' onClick=\"doMenu('";
        li += item.name + "');return false\">"+item.label+"</a></li>";    
    }
    else
    {
        li +=  "<a class='nav-link dropdown-toggle' href='#' id='";
        li += "menu-"+item.name+"' data-toggle='dropdown'>";
        li += item.label + "</a>";
        li += "<div class='dropdown-menu' aria-labelledby='menu-"+item.name+"'></div>";
    }
    $(menu).append(li);
    if( item.type == "menu")
    {
        // <a class="dropdown-item" href="#">Action</a>
    //     $(menu).append("<ul id='menu-"+item.name+ "'></ul>");
        // item.menuItems.forEach(function(menuItem){
            
    //         getItem('#menu-'+item.name, menuItem);
        // }); // foreach
    // }
}

function doMenu(id)
{
    $("#content").text("Chargement : "+id);
    $("#content").load("content/"+id+".html");
}