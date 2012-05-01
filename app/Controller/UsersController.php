<?php
/* Config */
define('CONSUMER_KEY', 'jup3G70mnpBDBDlLjHUBdQ');
define('CONSUMER_SECRET', 'lH5I1hyqfHAY6AhlmVrAkcG9nTZhnkLkEveLKlZ2wAA');
define('OAUTH_CALLBACK', 'oob');

class UsersController extends AppController {
	
	public function login() {
		
	}
	
	public function authenticate() {
		App::import('Vendor', 'twitteroauth/twitteroauth');
		/* Build TwitterOAuth object with client credentials. */
		$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
		/* Get temporary credentials. */
		$request_token = $connection->getRequestToken(OAUTH_CALLBACK);
		/* Save temporary credentials to session. */
		$token = $request_token['oauth_token'];
		SessionComponent::write('oauth_token', $token);
		SessionComponent::write('oauth_token_secret', $request_token['oauth_token_secret']);
		
		/* If last connection failed don't display authorization link. */
		switch ($connection->http_code) {
			case 200:
				/* Build authorize URL and redirect user to Twitter. */
				$url = $connection->getAuthorizeURL($token);
 				$this->response->header('Location',  $url);
				break;
			default:
				/* Show notification if something went wrong. */
				$this->Session->setFlash('Could not connect to Twitter. Refresh the page or try again later.');
		}
	}
}