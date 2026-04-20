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

Aplikacja zawiera **12 przystanków** w następującej kolejności:

| # | Przystanek (PL) | Przystanek (EN) | Uwagi |
|---|---|---|---|
| 1 | Pieta Michała Anioła | Michelangelo's Pietà | przy wejściu po prawej stronie |
| 2 | Kaplica Najświętszego Sakramentu | Chapel of the Blessed Sacrament | prawa nawa, wstęp tylko dla modlących się |
| 3 | Grobowiec św. Piotra – baldachim | Tomb of St. Peter – Baldachin | Baldachim Berniniego nad głównym ołtarzem |
| 4 | Grobowiec św. Piotra – ołtarz | Tomb of St. Peter – Altar | Ołtarz Papieski / Konfesja (grób pod ołtarzem) |
| 5 | Groty Watykańskie | Vatican Grottoes | groby papieży, zejście pod bazylikę |
| 6 | Tron św. Piotra (Cathedra Petri) | Chair of Saint Peter | Gloria Berniniego w absydzie |
| 7 | Kopuła | The Dome | Michał Anioł, widok na Rzym |
| 8 | Ołtarz Grzegorza Wielkiego | Altar of Gregory the Great | lewa nawa boczna |
| 9 | Ołtarz Ofiarowania Maryi | Altar of the Presentation of Mary | lewa nawa |
| 10 | Chrzcielnica | Baptismal Font | przy wejściu po lewej stronie |
| 11 | Atrium i drzwi | The Atrium and the Doors | przedsionek, Porta Santa, Drzwi Filarete |
| 12 | Łódź św. Piotra (Navicella) | The Barque of St. Peter | mozaika Giotta (kopia) w atrium |

### 3.2 Zawartość każdego przystanku

Każdy przystanek musi zawierać:
- **Obraz** — zdjęcie lub ilustracja danego miejsca (format WebP z fallbackiem JPG), źródło: domena publiczna / CC0
- **Tytuł** — nazwa miejsca w języku polskim
- **Tekst opisowy** — opis w języku polskim (ok. 300–500 słów), styl przewodnika
- **Nagranie audio** — lektor w języku polskim, czas trwania ok. 2 minut (format MP3, 128 kbps)

### 3.3 Nawigacja

- Przyciski „Poprzedni" i „Następny" do poruszania się między przystankami
- Wskaźnik postępu (np. „3 / 12")
- Lista wszystkich przystanków (szuflada boczna) umożliwiająca przeskok do wybranego miejsca
- Automatyczne przewijanie do góry przy zmianie przystanku

### 3.4 Odtwarzacz audio

- Przycisk Play / Pauza
- Pasek postępu odtwarzania z możliwością przewijania
- Wyświetlanie czasu (aktualny / całkowity)
- Zatrzymanie odtwarzania przy przejściu do innego przystanku
- Obsługa autoplay zgodna z polityką przeglądarek (wymagana interakcja użytkownika)

---

## 4. Wymagania niefunkcjonalne

### 4.1 Działanie offline (priorytet krytyczny)

- Aplikacja musi działać w pełni offline po pierwszym załadowaniu strony
- Implementacja jako **PWA (Progressive Web App)** z Service Workerem
- Wszystkie zasoby (HTML, CSS, JS, obrazy, pliki audio) buforowane przez Cache API
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

### 4.4 Kompatybilność przeglądarek

- Safari iOS 15+ (priorytet)
- Chrome Android 90+
- Chrome/Firefox/Edge na desktopie (ostatnie 2 wersje)
- Bez zależności od zewnętrznych bibliotek — czysty HTML/CSS/JS

### 4.5 Język

- Cały interfejs użytkownika w języku **polskim**
- Wszystkie opisy i nagrania w języku **polskim**
- Kodowanie znaków: UTF-8

---

## 5. Wymagania dotyczące treści

### 5.1 Teksty opisowe

- Napisane w stylu przewodnika — przystępny, merytoryczny ton
- Każdy opis: 300–500 słów
- Zawierają: historię miejsca, znaczenie religijne/artystyczne, ciekawostki
- Docelowo służą jako skrypt nagrania audio

### 5.2 Nagrania audio

- Lektor: wyraźna dykcja, spokojne tempo
- Czas: 2 minuty ± 15 sekund (~250–280 słów po polsku)
- Format: MP3, 128 kbps, mono lub stereo
- Nazewnictwo plików: `01-pieta.mp3`, `02-kaplica-sakramentu.mp3`, itd.
- Placeholder: plik ciszy podczas developmentu

### 5.3 Obrazy

- Jedno zdjęcie na przystanek
- Rozdzielczość: min. 800×600 px
- Format: WebP (główny) + JPG (fallback)
- Nazewnictwo: `01-pieta.webp`, `02-kaplica-sakramentu.webp`, itd.
- Źródło: domena publiczna / CC0 (Wikimedia Commons)

---

## 6. Wymagania techniczne — wdrożenie

### 6.1 Hosting

- **GitHub Pages** — statyczny hosting HTTPS
- Domena: `https://martin1564364.github.io/StPeterBasilicaGuide/`
- Brak backendu, brak bazy danych

### 6.2 Struktura repozytorium

```
/
├── index.html
├── manifest.json
├── service-worker.js
├── .gitignore
├── css/
│   └── style.css
├── js/
│   └── app.js
├── data/
│   └── stops.json
├── images/          (12 × WebP + 12 × JPG)
├── audio/           (12 × MP3)
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
├── PLAN.md
└── REQUIREMENTS.md
```

### 6.3 Brak zewnętrznych zależności

- Brak CDN, frameworków JS, zewnętrznych czcionek ani wywołań API
- Wszystkie zasoby lokalne — gwarantuje działanie offline

---

## 7. Nieobjęte zakresem (Out of Scope)

- Wersje językowe inne niż polska
- Mapa interaktywna bazyliki
- Zakup biletów lub rezerwacje
- Komentarze/oceny użytkowników
- Backend / baza danych
- Wersja natywna aplikacji (iOS/Android)

---

## 8. Kryteria akceptacji

| # | Kryterium | Priorytet |
|---|---|---|
| 1 | Wszystkie 12 przystanków wyświetla obraz, tekst i odtwarzacz audio | Krytyczny |
| 2 | Aplikacja działa offline po pierwszym załadowaniu (Service Worker aktywny) | Krytyczny |
| 3 | Interfejs poprawnie wyświetla się na iPhone SE (375 px) i iPhone 14 Pro (430 px) | Krytyczny |
| 4 | Audio odtwarza się i można je pauzować na iOS Safari i Chrome Android | Krytyczny |
| 5 | Nawigacja między przystankami działa bez błędów JS | Krytyczny |
| 6 | GitHub Pages deployment działa pod publicznym URL | Krytyczny |
| 7 | Aplikację można zainstalować na ekranie głównym (PWA install prompt) | Wysoki |
| 8 | Kontrast tekstu spełnia WCAG 2.1 AA | Wysoki |
| 9 | Całkowity rozmiar zasobów (bez audio) < 5 MB | Średni |
