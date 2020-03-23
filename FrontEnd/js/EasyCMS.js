/* Gobals  */
var gMenuItem; // Maintain menu's data

/**
 * onReady
 * 
 * When website loads, you get an empty page, this function loads 
 * the menu (based on json), main page and footer.
 * All those pages are generated by the backend
 */
$(function () {
  // Load menu from json file
  $.get("json/menu.json", function (datas, status) {
    gMenuItem = datas.menuItems; // Store menu for future use
    gMenuItem.forEach(function (menuItem) {
      setItem("#menu", menuItem);
    });
  });

  // Load main page  
  $("#content").load("content/main.html");

  // Load footer
  $("#footer").load("content/footer.html");

  // Allow multi-level menu 
  // TODO see a much proper way than timeOut
  setTimeout(function () {
    // Multi Level dropdowns - add from Bootstrap 4 default
    // This must be launch after DOM is ready (wait 250ms)
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
  }, 250);

});

/****************
* menu creation *
*****************/
/**
 *  setItem(menu, item)
 * 
 * fill menu <nav> with firstlevel items
 *
 * @param  {string}  menu       class of current menu
 * @param  {object}  item       item to add on menu
 * @return {void}
 */
function setItem(menu, item) {
  var liClass = item.type === "menu" ? "nav-item dropdown" : "nav-item";
  var menuItem = "<li class='" + liClass + "'>";

  var aClass = "nav-link hover";
  if (item.name === "main") {
    aClass += " active";
  }
  if (item.type === "menu") {
    aClass += " dropdown-toggle"
  }

  menuItem += "<a href='#' id='menu-" + item.name + "' class='" + aClass + "'";

  if (item.type === "menu") {
    var subMenuSpecific = " data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'";
    menuItem += subMenuSpecific;
  } else {
    var linkSpecific = " onclick='loadContent(\"" + item.name + "\");'";
    menuItem += linkSpecific;
  }

  menuItem += ">" + item.label;
  if (item.type === "menu") {
    menuItem += "<span class='material-icons'>keyboard_arrow_down</span>";
  }
  menuItem += "</a>";

  if (item.type === "menu") {
    menuItem += "<div aria-labelledby='menu-" + item.name + "' id='submenu-" + item.name + "' class='dropdown-menu'></div>";
  }
  menuItem += "</li>";

  $(menu).append(menuItem);

  // append sub items
  if (item.type === "menu") {
    $("#submenu-" + item.name).append("<ul></ul>");
    item.menuItems.forEach(function (menuItem) {
      setSubMenuItems("#submenu-" + item.name + " ul", menuItem);
    });
  }
}

/*
* setSubMenuItems(menu,item)
*
* re-entrant function, allows to fill sub-menus
*
* @param  {string}   menu     menu id name
* @param  {object}   item     menuItem object
* @return {void}
*/
function setSubMenuItems(submenu, item) {
  var linkPage = item.name;
  if (item.type === "menu") {
    linkPage = item.menuItems[0].name;
  }
  var subMenuItem = "<li><a class='dropdown-item' href='#'";
  subMenuItem += " onclick='loadContent(\"" + linkPage + "\");'>" + item.label + "</a></li>";
  $(submenu).append(subMenuItem);
}

/**
 * loadContent
 * 
 * this function loads content in content folder in the <div> identified by
 * contend id
 *  
 * @param {text} id   name of file to be loaded
 * @return void
 */
function loadContent(id) {
  $("#content").text("Chargement : " + id);
  $("#content").load("content/" + id + ".html");
  setActiveMenu(id);
}

/**
 * todo: add active parent menu
 * Change the active item of a menu
 * @param {id} id id of new active menu item
 */
function setActiveMenu(id) {
  gMenuItem.forEach(menuItem => {
    if ($("#menu-" + menuItem.name).hasClass("active")) {
      $("#menu-" + menuItem.name).removeClass("active");
    }
  });
  $("#menu-" + id).addClass("active");
}