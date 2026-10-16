<?php
declare(strict_types=1);
if(PHP_SAPI !== 'cli') { http_response_code(404); exit; }
require __DIR__.'/../includes/functions.php';
if(!social_url(RAQA_SITE_URL)) { fwrite(STDERR,"Set RAQA_SITE_URL to the real HTTPS site URL first.\n"); exit(1); }
$xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n" . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
foreach(['index.php','products.php','gallery.php','about.php','contact.php'] as $page) $xml .= '<url><loc>'.e(rtrim(RAQA_SITE_URL,'/').'/'.$page).'</loc></url>';
$xml .= '</urlset>';
file_put_contents(__DIR__.'/../sitemap.xml',$xml);
file_put_contents(__DIR__.'/../robots.txt',"User-agent: *\nAllow: /\nDisallow: /includes/\nDisallow: /data/\nDisallow: /scripts/\nSitemap: ".rtrim(RAQA_SITE_URL,'/')."/sitemap.xml\n");
echo "Sitemap and robots.txt updated.\n";
