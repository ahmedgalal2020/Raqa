<?php
require_once __DIR__ . '/functions.php';
$current = basename($_SERVER['SCRIPT_NAME']);
$navigation = ['index.php'=>'الرئيسية','products.php'=>'منتجاتنا','gallery.php'=>'معرض الصور','about.php'=>'من نحن','contact.php'=>'تواصل معنا'];
$title = $title ?? 'رِقّة | ضيافة تليق بلحظاتكم في تبوك';
$description = $description ?? 'أركان قهوة وضيافة متنقلة بتصاميم أنيقة للأفراح والمناسبات الخاصة في تبوك. اكتشفوا عالم رِقّة.';
?><!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#FFFAF7"><title><?= e($title) ?></title><meta name="description" content="<?= e($description) ?>"><meta property="og:title" content="<?= e($title) ?>"><meta property="og:description" content="<?= e($description) ?>"><meta property="og:type" content="website"><meta property="og:locale" content="ar_SA">
<?php if (social_url(RAQA_SITE_URL)): ?><link rel="canonical" href="<?= e(rtrim(RAQA_SITE_URL,'/').'/'.$current) ?>"><meta property="og:url" content="<?= e(rtrim(RAQA_SITE_URL,'/').'/'.$current) ?>"><meta property="og:image" content="<?= e(rtrim(RAQA_SITE_URL,'/').'/assets/images/gallery/event-2.webp') ?>"><?php endif; ?>
<link rel="icon" type="image/png" href="assets/images/branding/raqa-logo.png?v=<?= filemtime(__DIR__.'/../assets/images/branding/raqa-logo.png') ?>">
<link rel="apple-touch-icon" href="assets/images/branding/raqa-logo.png?v=<?= filemtime(__DIR__.'/../assets/images/branding/raqa-logo.png') ?>">
<link rel="stylesheet" href="assets/css/style.css?v=<?= filemtime(__DIR__.'/../assets/css/style.css') ?>"><script src="assets/js/main.js?v=<?= filemtime(__DIR__.'/../assets/js/main.js') ?>" defer></script></head><body>
<a class="skip-link" href="#main">انتقل إلى المحتوى</a>
<header class="site-header"><a class="brand" href="index.php" aria-label="رِقّة — الرئيسية"><img src="assets/images/branding/raqa-logo.png" width="1765" height="2000" alt="رِقّة RAQA"></a><button class="menu-toggle" aria-expanded="false" aria-controls="navigation" aria-label="فتح القائمة"><span></span><span></span></button><nav id="navigation" aria-label="التنقل الرئيسي"><?php foreach ($navigation as $url=>$label): ?><a href="<?= e($url) ?>" <?= $current===$url?'aria-current="page"':'' ?>><?= e($label) ?></a><?php endforeach; ?></nav><div class="header-booking"><?php booking(); ?></div></header>
<main id="main">
