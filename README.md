# Çayxana — İdarəetmə Paneli

Çayxana/kafe idarəetmə paneli. Stollar üzrə sifariş qəbulu, ödəniş izlənməsi, xərclər və gün/həftə/ay/ümumi hesabatlar. Sahib və administrator eyni hüquqla, eyni ortaq PIN ilə, fərqli cihazlardan real-vaxt sinxron işləyir.

## Texniki qeydlər

- Saf HTML/CSS/JS (framework yoxdur, build addımı yoxdur) + **Firebase Realtime Database** (layihə: `cayxana`, region: europe-west1).
- Giriş: tək ortaq PIN (defolt: `2026`, kodda SHA-256 hash şəklində saxlanılır — dəyişmək üçün `index.html`-də `PIN_HASH` sabitini yeni PIN-in SHA-256 hash-i ilə əvəz et). PIN yoxlaması Firebase Authentication deyil, sadəcə koddaxili yoxlamadır.
- Data bütün cihazlar arasında real-vaxtda sinxrondur (Firebase `onValue` listener) — bir cihazda edilən dəyişiklik digərində dərhal görünür.
- İlkin data: 10 stol, 1 məhsul (Çay — 4 ₼). Panelin özündən yeni stol və məhsul əlavə etmək mümkündür.
- Deploy: Vercel (statik sayt, build addımı yoxdur) — canlı domen: cayxana-az.vercel.app

## Firebase RTDB sxemi

```
/tables:   { "t_1": { no: 1 }, ... }
/products: { "p_cay": { name: "Çay", price: 4 }, ... }
/orders:   { "t_1": { items:[{productId,name,price,qty}], startedAt } }   — yalnız dolu masalar üçün
/sales:    { "<push-key>": { tableKey, tableNo, items, total, paidAt } }
/expenses: { "<push-key>": { name, amount, date } }
```

## Təhlükəsizlik qaydası (Rules)

PIN girişi Firebase Authentication istifadə etmədiyi üçün RTDB Rules-da `auth != null` şərti işləməz. Sadə açıq qayda tətbiq olunur (bax: repo sahibinə göndərilən qeyd) — qorunma tam olaraq client-side PIN ekranına əsaslanır.
