<?php
declare(strict_types=1);
require_once __DIR__ . '/../config.php';
function e(string $value): string { return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function whatsapp_url(string $message = 'مرحبًا رِقّة، أرغب بالاستفسار عن حجز ركن ضيافة لمناسبتي في تبوك.'): ?string {
    return preg_match('/^9665[0-9]{8}$/D', RAQA_WHATSAPP) ? 'https://wa.me/' . RAQA_WHATSAPP . '?text=' . rawurlencode($message) : null;
}
function social_url(string $url): bool { return filter_var($url, FILTER_VALIDATE_URL) !== false && parse_url($url, PHP_URL_SCHEME) === 'https'; }
function asset_exists(string $path): bool { return is_file(__DIR__ . '/../' . $path); }
function icon(string $name): string {
    $paths = ['arrow'=>'<path d="M19 12H5m6-6-6 6 6 6"/>', 'play'=>'<path d="m9 5 11 7-11 7Z"/>', 'whatsapp'=>'<path d="M20 11.5a8 8 0 0 1-12 7L3 20l1.5-5A8 8 0 1 1 20 11.5Z"/><path d="M8 7c0 4 2 6 6 7l2-2-3-1-1 1-2-2 1-1-1-2Z"/>'];
    return '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' . ($paths[$name] ?? $paths['arrow']) . '</svg>';
}
function booking(string $label = 'احجز مناسبتك', string $class = 'button', string $message = ''): void {
    $url = $message ? whatsapp_url($message) : whatsapp_url();
    if ($url) echo '<a class="'.e($class).'" href="'.e($url).'" target="_blank" rel="noopener">'.icon('whatsapp').e($label).'</a>';
    else echo '<a class="'.e($class).'" href="contact.php#booking" aria-label="'.e($label).' — التواصل غير متاح حاليًا">'.icon('whatsapp').e($label).'</a>';
}
function picture(string $file, string $alt, int $width = 1200, int $height = 1200, bool $eager = false): void {
    $base = preg_replace('/\.[^.]+$/', '', $file);
    echo '<img src="'.e($base.'.webp').'" srcset="'.e($base.'-640.webp').' 640w, '.e($base.'.webp').' '.$width.'w" sizes="(max-width: 700px) 100vw, 50vw" width="'.$width.'" height="'.$height.'" alt="'.e($alt).'" loading="'.($eager?'eager':'lazy').'" decoding="async">';
}
function conversion(): void { ?>
<section class="conversion section"><span class="eyebrow">للحظات التي تبقى</span><h2>مناسبتك تستحق لمسة رِقّة</h2><p>تواصل معنا لمعرفة تفاصيل الضيافة وتنسيق ركن يناسب مناسبتك.</p><?php booking('تواصل معنا عبر واتساب'); ?></section>
<?php }
