<?php
function mime_header_encode($str, $data_charset = '', $send_charset = '') {
	if($data_charset != $send_charset) {
	$str = iconv($data_charset, $send_charset, $str);
	}
	return '=?' . $send_charset . '?B?' . base64_encode($str) . '?=';
} 


function send_mime_mail($name_from, $email_from, $name_to, $email_to, $data_charset, $send_charset, $subject, $body){ 
	$to = mime_header_encode($name_to, $data_charset, $send_charset).' <' . $email_to . '>';
	$subject = mime_header_encode($subject, $data_charset, $send_charset);
	$from =  mime_header_encode($name_from, $data_charset, $send_charset).' <' . $email_from . '>';
	if($data_charset != $send_charset) {
		$body = iconv($data_charset, $send_charset, $body);
	}
	$headers = "From: $from\r\n";
	$headers .= "Content-type: text/html; charset=$send_charset\r\n";
	//echo $body;
	return mail($to, $subject, $body, $headers); 
}

if(!empty($_POST)){
	$arUsers = array(
		array(
			"NAME"=>"andrey.dubovskiy", // name to
			"EMAIL"=>"maxkovalburn@gmail.com" //email to
		)
	);
    $message = '';
	$message .= "<b>Ім'я:</b> " . $_POST['name'];
	$message .= "<br><b>E-mail:</b> " . $_POST['email'];
	$message .= "<br><b>Питання:</b> " . $_POST['question'];

	foreach ($arUsers as $Item){
		if ($r = send_mime_mail("eduhelp.com.ua", "info@eduhelp.com.ua", $Item['NAME'], $Item['EMAIL'], 'utf-8', 'utf-8', "Питання на сайті", $message)) {
			echo "true";
		} else {
			echo "error";
		}
	}
}
?>
