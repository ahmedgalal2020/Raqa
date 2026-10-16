<?php
$socials = [
    'Instagram' => [RAQA_INSTAGRAM, '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor"/>'],
    'TikTok' => [RAQA_TIKTOK, '<path d="M14 3v12a4 4 0 1 1-4-4v3a1 1 0 1 0 1 1V3h3c0 3 2 5 5 5v3c-2 0-4-1-5-2"/>'],
    'Facebook' => [RAQA_FACEBOOK, '<path d="M14 21v-8h3l.5-4H14V7c0-1 .5-2 2-2h2V2h-3c-3 0-5 2-5 5v2H7v4h3v8"/>'],
    'Snapchat' => [RAQA_SNAPCHAT, '<path d="M7 10V7a5 5 0 0 1 10 0v3l2-1 1 2-3 2c0 2 2 4 4 4l-1 2-3 1-2-1-3 2-3-2-2 1-3-1-1-2c2 0 4-2 4-4l-3-2 1-2Z"/>'],
    'X' => [RAQA_X, '<path d="M4 3h4l12 18h-4L4 3Zm16 0L4 21"/>'],
];
?>
<div class="social-links" aria-label="حسابات رِقّة">
<?php foreach ($socials as $label => [$url, $path]): ?>
<?php if (social_url($url)): ?><a class="social-icon" href="<?= e($url) ?>" target="_blank" rel="noopener noreferrer" aria-label="<?= e($label) ?>" title="<?= e($label) ?>">
<?php else: ?><button type="button" class="social-icon social-unavailable" aria-label="<?= e($label) ?> — رابط الحساب غير متاح حاليًا" title="<?= e($label) ?> — رابط الحساب غير متاح حاليًا">
<?php endif; ?><svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><?= $path ?></svg>
<?php if (social_url($url)): ?></a><?php else: ?></button><?php endif; ?>
<?php endforeach; ?>
</div>
