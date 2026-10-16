<?php
$gallery = [];
foreach ([2,1,6,3,4,5,7] as $number) $gallery[] = ['image'=>'assets/images/gallery/event-'.$number.'.png','alt'=>'تصوّر لتنسيق ركن رِقّة داخل قاعة مناسبات.','width'=>in_array($number,[1,3,5])?1122:1672,'height'=>in_array($number,[1,3,5])?1402:941];
