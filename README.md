# Node DB1 Projesi

## Giriş

- İlişkisel Veritabanları
- Temel SQL Sorguları Yazma
- Knex.js kullanarak Temel Sorgular Yazma

## Talimatlar

### Görev 1: Proje Kurulumu ve Teslimi

- Projeyi froklayın, clonelayın ve sıkça pushlayın.

### Görev 2: Minimum Uygulanabilir Ürün

### 2.1 Temel SQL Sorguları Yazma

Chrome'u kullanarak [W3Schools.com'da SQL Try Editor'ı](https://www.w3schools.com/Sql/trysql.asp?filename=trysql_select_all) ziyaret edin ve aşağıdaki sorguları oluşturun. Çalıştıktan sonra, projenin kök dizinindeki `queries.sql` dosyasına kopyalayın.

- Posta kodu 1010 olan tüm müşterileri bulun. 3 kayıt döndürür.
- id'si 11 olan tedarikçinin telefon numarasını bulun. (010) 9984510 olmalıdır.
- Verilen ilk 10 siparişi, sipariş tarihine göre azalan şekilde sıralayın. 1997-02-12 tarihli sipariş en üstte olmalıdır.
- Londra, Madrid veya Brezilya'da yaşayan tüm müşterileri bulun. 18 kayıt döndürür.
- _"The Shire"_ için bir müşteri kaydı ekleyin, ilgili kişi adı _"Bilbo Baggins"_, adres _"Bag End"_ içinde _"1 Hobbit-Hole"_, posta kodu _"111"_ ve ülke _"Orta Dünya"_.
- _Bilbo Baggins_ kaydını, posta kodu _"11122"_ olacak şekilde güncelleyin.

**Sayfadaki 'Veritabanını Geri Yükle' düğmesini tıklayınca veritabanını orijinal verilerle yeniden dolduracak ve yaptığınız tüm değişiklikleri iptal edecektir**.


### 2.2 Accounts Resource için bir RESTful API oluşturun

`budget.db3` veritabanının "accounts" tablosunda bazı kayıtlar sağladık. Aşağıdaki komutu çalıştırarak veritabanını (veritabanını sildikten sonra bile) geri yükleyebilirsiniz:

```js
npm run resetdb
```

#### Accounts Schema

| field  | data type        | metadata                                            |
| ------ | ---------------- | --------------------------------------------------- |
| id     | unsigned integer | primary key, auto-increments, generated by database |
| name   | string           | required, unique                                    |
| budget | numeric          | required                                            |


#### Model Functions'ları Yaz

- Aşağıdaki db erişim fonksiyonlarını Knex kullanarak `api/accounts/accounts-model.js` içine yazın:

  - `getAll`, bir hesap dizisine (veya boş bir diziye) çözümlenir
  - `getById` verilen kimliğe göre bir hesaba çözümlenir
  - `create`, yeni oluşturulan hesaba çözümlenir
  - `updateById`, güncellenen hesaba çözümlenir
  - `deleteById` silinen hesabı çözer

- İşte Knex ile SQLite ile çalışmak için bazı kopyalar :):


```js
db('foo-table') // returns a promise that resolves to an **array** with all records in the table
db('foo-table').where({ role: 'Student', active: true }) // resolves to an **array** of all records that satisfy the where
db('foo-table').where('name', 'Mary') // is an alternative for when there is just one where condition
db('foo-table').where('id', 7).first() // will resolve to the **record** we want (if the id is unique for a table) or undefined
db('foo-table').insert({ bar: 'baz' }) // resolves to an **array** containing the **ids of the records** inserted into the table
db('foo-table').where('id', id).update({ bar: 'new bar' }) // resolves to the **number of records** affected by the update
db('foo-table').where('id', id).delete() // resolves to the **number of records** affected by the delete
```
```js
db('foo-table') // tablodaki tüm kayıtları **array** olarak içeren bir promise döndürür
db('foo-table').where({ role: 'Student', active: true }) // where'i sorgusunu karşılayan tüm kayıtları bir **array** olarak döner
db('foo-table').where('name', 'Mary') // sadece bir tane where koşulu olduğunda bir alternatiftir
db('foo-table').where('id', 7).first() // istediğimiz **record**u (bir tablo için id unique ise) veya undefined döner
db('foo-table').insert({ bar: 'baz' }) // tabloya eklenen **kayıtların id'lerini** içeren bir **array** döner
db('foo-table').where('id', id).update({ bar: 'new bar' }) // güncelleme ile etkilenen **kayıt sayısını** döner
db('foo-table').where('id', id).delete() // silme işleminden etkilenen **kayıt sayısını** döner
```

#### Middleware'ı Yaz

- `api/accounts/accounts-middleware.js` içine aşağıdaki middleware'ları yazın:

  - `checkAccountPayload`, `req.body` geçersizse, 400 durumunu döndürür:

    - Ad veya bütçe tanımlanmamışsa, `{ message: "name and budget are required" }` döndürün
    - _trimmed_name 3'ten kısa veya 100'den uzunsa, `{ message: "name of account must be between 3 and 100" }` döndürün
    - Bütçe bir sayıya dönüştürülemiyorsa, `{ message: "budget of account must be a number" }` döndürün
    - Bütçe negatif bir sayıysa veya bir milyonun üzerindeyse, `{ message: "budget of account is too large or too small" }` döndürün

  - `checkAccountId`, veritabanında `req.params.id` yoksa `{ message: "account not found" }` ile bir durum 404 döndürün

  - _trimmed_ `req.body.name` zaten veritabanında mevcutsa, `checkAccountNameUnique`, `{ message: "that name is taken" }` ile bir durum 400 döndürün


### Accounts API'yi yaz

- Uygun olan yerlerde yukarıdaki ara yazılımları ve model işlevlerini kullanarak `accounts` kaynağı için CRUD yazın:

  - `[GET] /api/accounts`, hesapları içeren bir array (veya -yoksa- boş bir array) döndürür.
  - `[GET] /api/accounts/:id` verilen id'ye göre bir hesap döndürür.
  - `[POST] /api/accounts` oluşturulan hesabı döndürür. db'ye kaydetmeden önce bütçe `name`ndeki baştaki veya sondaki boşluk kesilmelidir.
  - `[PUT] /api/accounts/:id` güncellenen hesabı döndürür. db'ye kaydetmeden önce bütçe `name`ndeki baştaki veya sondaki boşluk kesilmelidir.
  - `[DELETE] /api/accounts/:id` silinen hesabı döndürür.

- Beklendiği gibi çalıştıklarını kontrol etmek için uç noktalarınızı "Insomnia" veya "Postman" gibi bir REST istemcisiyle manuel olarak test edin.
- `npm test`ini çalıştırarak uç noktalarınızı otomatik olarak test edin.


#### Önemli notlar

- Ek dosyalar oluşturabilirsiniz ancak **mevcut dosyaları veya klasörleri taşımayın veya yeniden adlandırmayın**.
- `package.json` dosyanızı, ek kitaplıklar kurmak veya ek komut dosyaları eklemek dışında değiştirmeyin.
- Çözümünüzde en iyi uygulamaları takip etmeniz, temiz ve profesyonel sonuçlar üretmeniz esastır.
- Çalışmanızı gözden geçirmek, iyileştirmek ve değerlendirmek için zamanınızı ayırın.
- Çalışmanızda yazım denetimi ve dilbilgisi denetimi de dahil olmak üzere temel profesyonel yaklaşımları da gerçekleştirin.


### Görev 3: Zorlayıcı Görevler

Aşağıdaki alıştırmalar **araştırma gerektirir**, bunları tamamlamak için gereken kavramlar henüz derslerde işlenmedi.

- Daha fazla sorgu çalıştırın.

  - Müşteriler tablosunda kaç farklı şehrin saklandığını keşfetmek için bir sorgu bulun. Tekrarlar çift sayılmamalıdır. 69 olmalı
  - 20 karakterden uzun adları olan tüm tedarikçileri bulun. 11 kayıt döndürür.
  - `GET /api/accounts` uç noktasına bir `query string` seçeneği ekleyin. `query string`, `limit`, `sortby` ve `sortdir` anahtarlarını içerebilir. Bu anahtarlar sağlanmışsa, veritabanından seçilen "hesapları" sınırlamak ve sıralamak için bu değerleri kullanın. Sıralama ve sınırlama için [knexjs.org](http://knexjs.org/) içindeki belgelere başvurun.


  ```js
  // örnek req.query nesnesi
  {
    limit: 5,
    sortby: 'id',
    sortdir: 'desc'
  }
  ```
