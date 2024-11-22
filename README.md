# Proje Dokümantasyonu

Bu proje, OWASP Top 10 güvenlik tehditlerine karşı koruma sağlamak ve güvenli bir web uygulaması geliştirmek amacıyla tasarlanmıştır. Proje kapsamında, API güvenliği, güvenli kimlik doğrulama, veri koruma ve güvenlik yapılandırmaları gibi konular ele alınmıştır.

## İçindekiler

1. Proje Hakkında
2. Kullanılan Teknolojiler
3. OWASP Top 10 Güvenlik Önlemleri
4. Güvenlik En İyi Uygulamaları
5. API Güvenliği
6. Geliştirme Süreci ve Araçlar
7. Kurulum ve Çalıştırma

---

## Proje Hakkında

Bu proje, modern API teknolojileri (GraphQL, tRPC, gRPC) kullanılarak oluşturulmuş, güvenli ve ölçeklenebilir bir web uygulamasıdır. Proje, OWASP Top 10 güvenlik tehditlerine karşı alınan önlemleri içerir ve güvenli kodlama standartlarına uygun bir yapıya sahiptir.

---

## Kullanılan Teknolojiler

- **React**: Kullanıcı arayüzü geliştirme.
- **Node.js ve Express**: Backend geliştirme.
- **GraphQL / tRPC / gRPC**: API iletişimi.
- **JWT ve OAuth 2.0**: Güvenli kimlik doğrulama.
- **Helmet**: HTTP başlıklarını güvenli hale getirme.
- **Bcrypt**: Şifreleme işlemleri.
- **PostgreSQL**: Veri tabanı yönetimi.

---

## OWASP Top 10 Güvenlik Önlemleri

Proje, OWASP Top 10 2021 ilkelerine uygun olarak geliştirilmiştir:

1. **Broken Access Control**: Yetkisiz erişimlerin önüne geçmek için JWT tabanlı kimlik doğrulama ve rol yönetimi uygulandı.
2. **Cryptographic Failures**: Hassas veriler şifrelenerek saklandı ve HTTPS kullanımı önerildi.
3. **Injection**: SQL Injection ve benzeri saldırılara karşı API giriş verileri temizlendi ve güvenli sorgu yapıları kullanıldı.
4. **Insecure Design**: Güvenlik tasarım ilkelerine uyuldu.
5. **Security Misconfiguration**: `Helmet` ve güvenlik başlıkları ile varsayılan ayarlar iyileştirildi.
6. **Vulnerable and Outdated Components**: Güncel bağımlılıklar kullanıldı ve güvenlik açıkları düzenli olarak tarandı.
7. **Identification and Authentication Failures**: Güçlü şifreleme algoritmaları ve token doğrulama mekanizmaları kullanıldı.
8. **Software and Data Integrity Failures**: Güvenli bağımlılık yönetimi sağlandı.
9. **Security Logging and Monitoring Failures**: API çağrıları için loglama yapıldı.
10. **Server-Side Request Forgery (SSRF)**: Dış kaynaklı talepler sınırlandırıldı ve doğrulandı.

---

## Güvenlik En İyi Uygulamaları

Projenin güvenliğini artırmak için aşağıdaki en iyi uygulamalar gerçekleştirilmiştir:

1. **Content Security Policy (CSP)**:
   - Tarayıcıların yalnızca belirli kaynaklardan içerik yüklemesini sağlamak için kullanıldı.

   ```javascript
   app.use(helmet.contentSecurityPolicy({
     directives: {
       defaultSrc: ["'self'"],
       scriptSrc: ["'self'", "example.com"],
       styleSrc: ["'self'", "cdn.example.com"],
     },
   }));
2. **HTTPS Kullanımı:**:
   - Tarayıcıların yalnızca belirli kaynaklardan içerik yüklemesini sağlamak için kullanıldı.
3. **Veri Doğrulama:**:
   - Kullanıcıdan gelen tüm giriş verileri sanitize edilerek işlendi.
  
4. **XSS Koruması:**:
   - React'in dangerouslySetInnerHTML gibi özelliklerinden kaçınıldı ve sanitize işlemleri yapıldı.
  
5. **CSRF Koruması:**:
   - CSRF saldırılarına karşı csrf-token mekanizmaları kullanıldı..

5. **Güncel Bağımlılıklar:**:
   - npm audit ve benzeri araçlar kullanılarak güncel bağımlılık yönetimi sağlandı.
  


## API Güvenliği

- Kimlik Doğrulama: JWT ve OAuth 2.0 ile API erişimlerini güvence altına aldık.
- Yetkilendirme: Rol tabanlı erişim kontrolü (RBAC) uygulandı.
- Rate Limiting: API kötüye kullanımını önlemek için istek oranı sınırlamaları uygulandı.
- Veri Doğrulama: API'ye gelen tüm veriler doğrulandı ve temizlendi.


## Geliştirme Süreci ve Araçlar

- Kod Düzeni: Proje modüler bir yapıya sahiptir.
- Kod Denetimi: ESLint ve Prettier kullanılarak kod standartları sağlandı.
- Testler
- 
### Kurulum ve Çalıştırma
Gerekli bağımlılıkları yükleyin:
* npm
  ```sh
  npm install
  ```
* npm
  ```sh
  npm start
  ```

- <!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

