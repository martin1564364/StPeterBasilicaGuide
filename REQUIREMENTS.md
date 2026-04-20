# Wymagania — Audioprzewodnik po Bazylice Świętego Piotra w Rzymie

## 1. Cel projektu

Statyczna strona internetowa pełniąca funkcję audioprzewodnika po Bazylice Świętego Piotra w Rzymie. Aplikacja działa w pełni offline po pierwszym załadowaniu, co jest kluczowe ze względu na ograniczony dostęp do internetu wewnątrz bazyliki.

---

## 2. Użytkownicy docelowi

- Polskojęzyczni turyści i pielgrzymi odwiedzający Bazylikę Świętego Piotra
- Użytkownicy smartfonów (iOS i Android) — interfejs mobilny jako priorytet
- Osoby z ograniczonym dostępem do internetu w miejscu użytkowania

---

## 3. Wymagania funkcjonalne

### 3.1 Miejsca (przystanki audioprzewodnika)

Aplikacja zawiera **14 przystanków** w następującej kolejności:

| # | Przystanek (PL) | Przystanek (EN) |
|---|---|---|
| 1 | Pieta Michała Anioła | Michelangelo's Pietà |
| 2 | Kaplica Najświętszego Sakramentu | Chapel of the Blessed Sacrament |
| 3 | Konfesja / Grób Świętego Piotra | Confessio / Tomb of Saint Peter |
| 4 | Baldachim Berniniego | Bernini's Baldachin |
| 5 | Ołtarz Papieski | Papal Altar |
| 6 | Groty Watykańskie | Vatican Grottoes |
| 7 | Tron Świętego Piotra (Cathedra Petri) | Chair of Saint Peter |
| 8 | Kopuła | The Dome |
| 9 | Ołtarz Świętego Grzegorza Wielkiego | Altar of Saint Gregory the Great |
| 10 | Ołtarz Prezentacji Najświętszej Maryi Panny | Altar of the Presentation of Mary |
| 11 | Chrzcielnica | Baptismal Font |
| 12 | Atrium i Drzwi Święte | Atrium and the Holy Doors |
| 13 | Barka Świętego Piotra (Navicella) | Bark of Saint Peter (Navicella) |

> **Uwaga:** Przystanek 3 (Konfesja) i Przystanek 4 (Baldachim) są ściśle ze sobą powiązane przestrzennie — Konfesja znajduje się bezpośrednio pod Baldachimem. Treści opisują je oddzielnie. Przystanek 5 (Ołtarz Papieski) to ołtarz stojący nad Konfesją.

### 3.2 Zawartość każdego przystanku

Każdy przystanek musi zawierać:
- **Obraz** — jedno zdjęcie lub ilustracja danego miejsca (format WebP z fallbackiem JPG)
- **Tytuł** — nazwa miejsca w języku polskim
- **Tekst opisowy** — opis w języku polskim (ok. 300–500 słów), napisany stylem przewodnika
- **Nagranie audio** — nagranie lektora w języku polskim, czas trwania ok. 2 minut (format MP3, kodowanie 128 kbps)

### 3.3 Nawigacja

- Przyciski „Poprzedni" i „Następny" do poruszania się między przystankami
- Wskaźnik postępu (np. „3 / 13")
- Lista wszystkich przystanków (menu/spis treści) umożliwiająca przeskoczenie do wybranego miejsca
- Automatyczne przewijanie do góry przy zmianie przystanku

### 3.4 Odtwarzacz audio

- Przycisk Play / Pauza
- Pasek postępu odtwarzania z możliwością przewijania
- Wyświetlanie czasu (aktualny / całkowity)
- Zatrzymanie odtwarzania przy przejściu do innego przystanku
- Autoplay opcjonalny (zależny od zgody przeglądarki)

---

## 4. Wymagania niefunkcjonalne

### 4.1 Działanie offline (priorytet krytyczny)

- Aplikacja musi działać w pełni offline po pierwszym załadowaniu strony
- Implementacja jako **PWA (Progressive Web App)** z Service Workerem
- Wszystkie zasoby (HTML, CSS, JS, obrazy, pliki audio) muszą być buforowane (Cache API)
- Strategia cache: **Cache First** — zasoby serwowane z cache, sieć jako fallback przy aktualizacji
- Plik `manifest.json` umożliwiający instalację aplikacji na ekranie głównym telefonu

### 4.2 Wydajność

- Strona powinna załadować się w < 3 sekundy przy połączeniu 3G
- Obrazy zoptymalizowane: max 200 KB na zdjęcie (format WebP)
- Pliki audio: MP3 128 kbps (~2 MB na nagranie)
- Łączny rozmiar aplikacji (bez audio): < 5 MB
- Łączny rozmiar aplikacji (z audio): < 30 MB

### 4.3 Responsywność i dostępność

- Projekt **mobile-first** — zoptymalizowany pod ekrany 375 px–430 px
- Obsługa tabletów (768 px+) i desktopów (1024 px+)
- Minimalny rozmiar elementów dotyku: 44×44 px (wytyczne Apple/Google)
- Kontrast tekstu: minimum AA wg WCAG 2.1
- Atrybuty `aria-label` na elementach interaktywnych
- Obsługa czytników ekranu dla podstawowych funkcji

### 4.4 Kompatybilność przeglądarek

- Safari iOS 15+ (priorytet — większość turystów używa iPhone'ów)
- Chrome Android 90+
- Chrome/Firefox/Edge na desktopie (ostatnie 2 wersje)
- Bez zależności od zewnętrznych bibliotek — czysty HTML/CSS/JS

### 4.5 Język

- Cały interfejs użytkownika w języku **polskim**
- Wszystkie opisy i nagrania w języku **polskim**
- Kodowanie znaków: UTF-8 (obsługa polskich liter: ą, ć, ę, ł, ń, ó, ś, ź, ż)

---

## 5. Wymagania dotyczące treści

### 5.1 Teksty opisowe

- Napisane w stylu przewodnika — przystępny, ale merytoryczny ton
- Każdy opis: 300–500 słów
- Zawierają: historię miejsca, znaczenie religijne/artystyczne, ciekawostki
- Gotowe do użycia jako skrypt nagrania audio

### 5.2 Nagrania audio

- Lektor: płeć dowolna, wyraźna dykcja, spokojne tempo
- Czas: 2 minuty ± 15 sekund (ok. 250–280 słów w języku polskim)
- Format: MP3, 128 kbps, mono lub stereo
- Nazewnictwo plików: `01-pieta.mp3`, `02-kaplica-sakramentu.mp3`, itd.
- Placeholder: plik ciszy lub nagranie zastępcze podczas developmentu

### 5.3 Obrazy

- Jedno zdjęcie na przystanek
- Rozdzielczość: min. 800×600 px, maks. 1600×1200 px
- Format: WebP (główny) + JPG (fallback)
- Nazewnictwo: `01-pieta.webp`, `02-kaplica-sakramentu.webp`, itd.
- Placeholder: szary prostokąt z nazwą miejsca podczas developmentu
- Zdjęcia muszą być wolne od praw autorskich (CC0, domena publiczna lub własne)

---

## 6. Wymagania techniczne — wdrożenie

### 6.1 Hosting

- **GitHub Pages** — statyczny hosting, gałąź `gh-pages` lub folder `/docs`
- Domena: `https://<username>.github.io/<reponame>/`
- HTTPS wymagane (GitHub Pages zapewnia automatycznie)
- Brak backendu, brak bazy danych

### 6.2 Struktura repozytorium

```
/
├── index.html              # Główna strona aplikacji
├── manifest.json           # PWA manifest
├── service-worker.js       # Service Worker (obsługa offline)
├── css/
│   └── style.css           # Wszystkie style
├── js/
│   └── app.js              # Logika aplikacji
├── data/
│   └── stops.json          # Dane przystanków (tytuły, teksty)
├── images/
│   ├── 01-pieta.webp
│   ├── 01-pieta.jpg        # Fallback
│   └── ... (po 2 pliki na przystanek)
├── audio/
│   ├── 01-pieta.mp3
│   └── ... (1 plik na przystanek)
├── icons/
│   ├── icon-192.png        # PWA ikona
│   └── icon-512.png        # PWA ikona
├── PLAN.md
└── REQUIREMENTS.md
```

### 6.3 Brak zewnętrznych zależności

- Brak CDN (jQuery, Bootstrap, Font Awesome itp.)
- Brak zewnętrznych czcionek (Google Fonts itp.)
- Brak zewnętrznych wywołań API
- Wszystkie zasoby lokalne — gwarantuje działanie offline

---

## 7. Nieobjęte zakresem (Out of Scope)

- Wersje językowe inne niż polska
- Mapa interaktywna bazyliki
- Zakup biletów lub rezerwacje
- Komentarze/oceny użytkowników
- Śledzenie lokalizacji GPS
- Backend / baza danych
- Wersja natywna aplikacji (iOS/Android)

---

## 8. Kryteria akceptacji

| # | Kryterium | Priorytet |
|---|---|---|
| 1 | Wszystkie 13 przystanków wyświetla obraz, tekst i odtwarzacz audio | Krytyczny |
| 2 | Aplikacja działa offline po pierwszym załadowaniu (Service Worker aktywny) | Krytyczny |
| 3 | Interfejs poprawnie wyświetla się na iPhone SE (375 px) i iPhone 14 Pro (430 px) | Krytyczny |
| 4 | Audio odtwarza się i można je pauzować na iOS Safari i Chrome Android | Krytyczny |
| 5 | Nawigacja między przystankami działa bez błędów JS | Krytyczny |
| 6 | GitHub Pages deployment działa pod publicznym URL | Krytyczny |
| 7 | Aplikację można zainstalować na ekranie głównym (PWA install prompt) | Wysoki |
| 8 | Kontrast tekstu spełnia WCAG 2.1 AA | Wysoki |
| 9 | Całkowity rozmiar zasobów (bez audio) < 5 MB | Średni |
