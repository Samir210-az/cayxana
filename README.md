# Çayxana — İdarəetmə Paneli

Tək-adminli çayxana/kafe idarəetmə paneli. Stollar üzrə sifariş qəbulu, ödəniş izlənməsi və gün/həftə/ay hesabatları.

## Texniki qeydlər

- Saf HTML/CSS/JS (framework yoxdur), bütün data brauzerin `localStorage`-ində saxlanılır — server/backend tələb olunmur.
- **Tək cihaz üçün nəzərdə tutulub.** localStorage brauzerə/cihaza bağlıdır: başqa telefon/kompüterdən açsan ayrı data görünər, cihaz/brauzer keşi silinsə data itər. Əgər gələcəkdə bir neçə cihazdan paralel giriş və ya data itkisinə qarşı qorunma lazım olsa, backend (Firebase RTDB) əlavə edilə bilər — hazırkı MVP bunu tələb etməyib.
- Giriş: tək admin PIN-i ilə (defolt: `2026`, kодда SHA-256 hash şəklində saxlanılır — dəyişmək üçün `index.html`-də `PIN_HASH` sabitini yeni PIN-in SHA-256 hash-i ilə əvəz et).
- İlkin data: 10 stol, 1 məhsul (Çay — 4 ₼). Admin panelin özündən yeni stol və məhsul əlavə etmək mümkündür.
- Deploy: Vercel (statik sayt, build addımı yoxdur, kök qovluqda `index.html` kifayətdir).

## Data strukturu (localStorage, açar: `cayxana_v1`)

```
{
  tables:  [{ id, no }],
  products:[{ id, name, price }],
  orders:  { [tableId]: { items:[{productId,name,price,qty}], startedAt } },
  sales:   [{ id, tableId, tableNo, items, total, paidAt }]
}
```
