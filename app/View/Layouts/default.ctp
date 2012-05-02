<?php echo $this->Html->docType('html5');?>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<title>Failti.me - Brengt je waar je zijn moet</title>
	<?php echo $this->Html->charset(); ?>
	<?php echo $this->Html->meta(array('name' => 'X-UA-Compatible', 'content' => 'IE=edge,chrome=1')); ?>
	<?php echo $this->Html->meta(array('name' => 'description', 'content' => '')); ?>
	<?php echo $this->Html->meta(array('name' => 'author', 'content' => '')); ?>
	<?php echo $this->Html->meta(array('name' => 'viewport', 'content' => 'width=device-width')); ?>
	<?php echo $this->Html->meta('favicon.ico','/cakephp/favicon.ico', array('type' => 'icon')); ?>
	<?php echo $this->Html->css(array('style', 'ui-lightness/jquery-ui-1.8.17.custom', 'dojo-themes/claro/claro.css')); ?>
	<!--[if lt IE 9]><!--><?php echo $this->Html->script('libs/respond.min'); ?><!--<![endif]-->
	<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
	<?php echo $this->Html->script(array('libs/modernizr-2.5.2.min', 'plugins', 'script')); ?>
	<?php echo $this->Html->script('libs/dojo-release-1.7.1/dojo/dojo', array('data-dojo-config' => 'parseOnLoad: true')); ?>
</head>
<body onload="initialize()" class="claro">
<div id="wrapper">
	<header>
	<div class="inner">
	<h1>Failti.me voor de algemene treinstaking op 15/02</h1>
	</div><!--/.inner-->
	</header>
	<div id="main" role="main">
		<div id="routeplanner">
			<div class="inner">
				<div class="planner">
					<?php echo $this->Session->flash(); ?>
					<?php echo $this->fetch('content'); ?>
				</div><!--/.planner-->
				<div id="map"></div><!--/#map-->
				<div class="clear">&nbsp;</div>
			</div><!--/.inner-->
		</div><!--/#routeplanner-->
	<div class="push"></div>
	</div><!--/#main-->
</div><!--/#wrapper-->
<div class="moreinfo">
	<a href="#" class="helpme">Klik hier om te ontdekken hoe failti.me werkt.</a>
</div>
<footer>
	<div class="inner">
		<div class="contents">
			<h2>Failti.me</h2>
			Lorem Ipsum toestanden.
		</div>
	</div><!--/.inner-->
</footer>
<div class="background"> </div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>
<script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.1.min.js"><\/script>')</script>
</body>
</html>
