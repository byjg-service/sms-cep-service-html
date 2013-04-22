<?php
//----------------------------------------------------------------------
//
// Classe para envio de CEP utilizaçao o WebService ByJG
// 2010-11-21
//
// Joao Gilberto Magalhaes
// http://www.byjg.com.br/
//


$cep = $_REQUEST["cep"];




$result = obterLogradouroAuth($cep, "usuario2", "senha2");
$aux = explode("|", $result);
$logradouro = explode(",", $aux[1]);

for ($i=count($logradouro);$i<5;$i++) $logradouro[] = "";

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo "[ \"{$logradouro[0]}\", \"{$logradouro[1]}\", \"{$logradouro[2]}\", \"{$logradouro[3]}\", \"{$logradouro[4]}\" ]";
die();

/**
 * @param string $ddd
 * @param string $celular
 * @param string $mensagem
 * @param string $username
 * @param string $password
 * @return string
 */
function obterLogradouroAuth($cep, $username, $password)
{	
	$url = "http://www.byjg.com.br/site/webservice.php/ws/cep?httpmethod=obterlogradouroauth";
	$url .=	"&cep=" . urlencode($cep);
	$url .=	"&usuario=" . urlencode($username);
	$url .=	"&senha=" . urlencode($password);

	$result = file_get_contents($url);

	return $result;
}
?>
