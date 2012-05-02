<h2>Registreer u</h2>
<p>
Om gebruik te maken van failti.me dient u uzelf kenbaar te maken door je aan te melden via Twitter.
</p>
<p>
Zo kunnen we u op de hoogte brengen zodra we een medereiziger gevonden hebben en u met hem/haar in contact brengen.
</p>
<?php
echo $this->Html->image("twitter-login-darker", array(
	    "alt" => "Sign in with Twitter",
	    'url' => array('controller' => 'users', 'action' => 'authenticate')
	));
?>