/**
 * Зображення з WebP + fallback на оригінальний формат.
 * src вказує на оригінал (.jpg/.png); .webp-версія підставляється автоматично.
 * Класи/атрибути проходять на <img>, тож наявні CSS-селектори (.x img) працюють.
 * У global.css: `picture { display: contents }` — обгортка не впливає на лейаут.
 */
export default function Picture({ src, alt = '', className, loading = 'lazy', ...rest }) {
  const webp = src.replace(/\.(jpe?g|png)$/i, '.webp')
  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img src={src} alt={alt} className={className} loading={loading} {...rest} />
    </picture>
  )
}
