/* Gobals  */
var gMenuItem;          // Maintain menu's data
var menuFirst = true;     // switch 'active' class on first menu item

$(function () {
  // Load menu from json file
  $.get("json/menu.json", function (datas, status) {
    gMenuItem = datas.menuItems; // Store menu for future use
    console.log(datas.menuItems);
    //$(menu).append("<div id='navbarContent' class='collapse navbar-collapse'></div>");
    datas.menuItems.forEach(function (menuItem) {
      // Add first levels menuitems
      setItem("#menu", menuItem);
    }); // foreach
  });
  // Load main page  
  $("#content").load("content/main.html");
  // Load footer
  $("#footer").load("content/footer.html");

  setTimeout(function(){
    // Multi Level dropdowns - add from Bootstrap 4 default
    // This must be launch after DOM is ready (wait 100ms)
    $("ul.dropdown-menu [data-toggle='dropdown']").on("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      $(this).siblings().toggleClass("show");

      if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
      }
      $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function (e) {
        $('.dropdown-submenu .show').removeClass("show");
      });

    });
  },100);
  
});

/****************
* menu creation *
*****************/
/**
 *  setItem(menu, item)
 * 
 * fill menu <nav> with firstlevel items
 *
 * @param  menu   string    class of current menu
 * @param  item   object    item to add on menu
 * @return void
 */
function setItem(menu, item) {

  if (item.type != "menu") {
    // simple <li> line
    // <li class="nav-item"><a href="#" class="nav-link" onclick="doMenu();return false;">About</a></li>
    li = "<li class='nav-item'><a href='#' class='nav-link' ";
    li += "onclick='doMenu(\"" + item.name + "\");return false;'>" + item.label + "</a></li>";
    $(menu).append(li);
  }
  else {
    // <li> line plus <ul> sub-menu
    li = "<li class='nav-item dropdown'>";
    li += "<a id='menu-" + item.name + "' href='#' data-toggle='dropdown'";
    li += " aria-haspopup='true' aria-expanded='false' class='nav-link ";
    li += "dropdown-toggle'>" + item.label + "</a>";
    li += "<ul aria-labelledby='menu-" + item.name + "' id='m-" + item.name + "' ";
    li += "class='dropdown-menu border-0 shadow'></ul></li>";
    $(menu).append(li);
    // Time to call sub-menu items 
    item.menuItems.forEach(function (menuItem) {
      setSubMenuItems("#m-" + item.name, menuItem);
    });   
  }
}

/*
* setSubMenuItems(menu,item)
*
* re-entrant function, allows to fill sub-menus
*
* @param menu string    menu id name
* @param item object    menuItem object
* @return void
*/
function setSubMenuItems(menu, item) {
  if (item.type != "menu") {
    // simple <li> line
    // <li> <a class="dropdown-item" href="#" onclick="doMenu();return false;">About</a></li>
    li =  "<li><a class='dropdown-item' href='#' ";
    li += "onclick='doMenu(\"" + item.name + "\");return false;'>" + item.label + "</a></li>";
    $(menu).append(li);
  }
  else {
    li =  "<li class='dropdown-submenu'>";
    li += "<a id='menu-"+item.name+"' href='#' role='button' ";
    li += "data-toggle='dropdown' aria-haspopup='true' ";
    li += "aria-expanded='false' class='dropdown-item dropdown-toggle'>";
    li += item.label+"</a><ul aria-labelledby='menu-"+item.name+"' ";
    li += "class='dropdown-menu border-0 shadow' id='m-"+item.name+"'></ul>";
    $(menu).append(li);
    // Time to call sub-menu items 
    item.menuItems.forEach(function (menuItem) {
      setSubMenuItems("#m-" + item.name, menuItem);
    });   
  }
}

function doMenu(id) {
  $("#content").text("Chargement : " + id);
  $("#content").load("content/" + id + ".html");
}