<?php
/**
 * REST Api server
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// if( !file_exists ( "src/Config/Config.json" ))
// {
//     die("ERROR: No configuration file !");
// }

$sPath = parse_url($_SERVER['REQUEST_URI'],PHP_URL_PATH);
$aUri = explode('/', $sPath);

$requestMethod = $_SERVER["REQUEST_METHOD"];

$sAction = $aUri[2];
$oReturn = [];
// Control endpoints

if( ($sAction != "Login") && (!isset($_COOKIE["user"])) ) 
{
    json_encode(array("Errno" => -2, "ErrMsg" => "Access denied !"));
    exit();
} 

switch( $sAction )
{
    case "Login":
      $oReturn = [
        "Errno" => -3,
        "ErrMsg" => "Invalid credentials"
      ];
      if (tryConnect($_POST['login'],$_POST['password']) == 0)
      {
        $oReturn = [
          "Errno" => 0
        ];
      }
      break;

    default:
      $ErrMsg = "ERROR: ".$aUri[2]. " Not found !";
      $oReturn = [
        "file" => "Index.php",
        "URL: " => $_SERVER['REQUEST_URI'],
        "METHOD: " => $_SERVER["REQUEST_METHOD"],
        "Errno" => -1,
        "ErrMsg" => $ErrMsg
      ];
    break;
}
echo json_encode($oReturn);

function tryConnect($user, $pass)
{
    // TODO Change for plugin ...
    if( $user=="snoel" && $pass=="test")
    {
        setcookie("user","snoel",time()+3600,"/");
        return 0;
    }
    return -1;
}



