# Plan Realizacji — Audioprzewodnik po Bazylice Świętego Piotra

## Przegląd projektu

**Projekt:** Statyczny audioprzewodnik PWA w języku polskim  
**Hosting:** GitHub Pages  
**Technologia:** HTML5 + CSS3 + Vanilla JavaScript (brak frameworków)  
**Kluczowa cecha:** Pełna funkcjonalność offline po pierwszym załadowaniu  
**Repozytorium:** `martin1564364/stpeterbasilicaguide`  

---

## Architektura techniczna

```
┌─────────────────────────────────────────────────────┐
│                   GitHub Pages                       │
│                  (HTTPS, statyczny)                  │
└──────────────────────┬──────────────────────────────┘
                       │ pierwsze załadowanie
┌──────────────────────▼──────────────────────────────┐
│              Przeglądarka użytkownika                │
│  ┌────────────────┐    ┌────────────────────────┐   │
│  │  Service Worker│    │     Cache Storage       │   │
│  │  (offline proxy)◄───► HTML/CSS/JS/IMG/Audio  │   │
│  └───────┬────────┘    └────────────────────────┘   │
│          │ serwuje z cache                           │
│  ┌───────▼────────┐                                  │
│  │   index.html   │                                  │
│  │   + app.js     │                                  │
│  │   + style.css  │                                  │
│  └───────┬────────┘                                  │
│          │ ładuje dane                               │
│  ┌───────▼────────┐                                  │
│  │   stops.json   │ (tytuły, teksty, ścieżki plików) │
│  └────────────────┘                                  │
└─────────────────────────────────────────────────────┘
```

### Kluczowe decyzje architektoniczne

| Decyzja | Wybór | Uzasadnienie |
|---|---|---|
| Framework JS | Vanilla JS | Brak zewnętrznych zależności, mniejszy rozmiar, prosta konserwacja |
| CSS | Czysty CSS (BEM) | Brak frameworków, działa offline, pełna kontrola |
| Dane przystanków | `stops.json` | Oddziela treść od kodu, łatwa aktualizacja |
| Offline | Service Worker + Cache API | Standard PWA, obsługiwany przez wszystkie nowoczesne przeglądarki |
| Audio | HTML5 `<audio>` | Natywna obsługa iOS Safari bez dodatkowych bibliotek |
| Obrazy | WebP + JPG fallback | Mniejszy rozmiar plików, dobra kompatybilność |
| Wdrożenie | GitHub Pages (gałąź `gh-pages`) | Darmowy hosting HTTPS dla repozytoriów publicznych |

---

## Fazy realizacji

### Faza 1 — Fundament projektu (Tydzień 1)

**Cel:** Działający szkielet aplikacji z nawigacją i obsługą offline.

#### Zadania:

**1.1 Inicjalizacja repozytorium i konfiguracja GitHub Pages**
- Konfiguracja gałęzi `gh-pages` lub folderu `/docs` w ustawieniach repozytorium
- Dodanie `.gitignore` (wyklucz pliki tymczasowe, `node_modules` jeśli potrzebne)
- Weryfikacja dostępności strony pod publicznym URL

**1.2 Struktura plików projektu**
- Utworzenie hierarchii folderów: `css/`, `js/`, `data/`, `images/`, `audio/`, `icons/`
- Placeholdery dla obrazów (szare prostokąty SVG z nazwami miejsc)
- Placeholdery dla plików audio (pliki MP3 ciszy ~2 min)

**1.3 `data/stops.json` — dane treściowe**
- Definicja schematu JSON dla każdego przystanku:
  ```json
  {
    "id": 1,
    "slug": "pieta",
    "title": "Pieta Michała Anioła",
    "description": "...",
    "image": "images/01-pieta.webp",
    "imageFallback": "images/01-pieta.jpg",
    "audio": "audio/01-pieta.mp3",
    "duration": "2:05"
  }
  ```
- Wypełnienie wstępnymi tekstami dla wszystkich 13 przystanków (treść placeholder lub docelowa)

**1.4 `index.html` — struktura semantyczna**
- Ekran startowy / splash screen z tytułem i przyciskiem „Rozpocznij zwiedzanie"
- Widok przystanku: obraz, tytuł, tekst, odtwarzacz audio, nawigacja
- Menu boczne / lista wszystkich przystanków
- Wskaźnik postępu
- Semantyczny HTML5 (`<main>`, `<nav>`, `<article>`, `<figure>`, `<audio>`)
- Meta tagi dla PWA i mobile (`viewport`, `theme-color`, `apple-mobile-web-app-*`)

**1.5 `css/style.css` — design mobilny**
- Zmienna kolorystyczna (paleta nawiązująca do złota i marmuru bazyliki)
- Layout mobile-first (375 px bazowe)
- Media queries dla tabletów (768 px) i desktopów (1024 px)
- Typografia: systemowe fonty (San Francisco na iOS, Roboto na Android)
- Animacje przejść między przystankami (slide lub fade)
- Własny odtwarzacz audio (stylizowany `<audio>`)
- Stany: aktywny przystanek, odtwarzanie, ładowanie

**1.6 `js/app.js` — logika aplikacji**
- Ładowanie `stops.json` i renderowanie UI
- Stan aplikacji: aktualny przystanek, status odtwarzania
- Nawigacja: funkcje `goToStop(id)`, `nextStop()`, `prevStop()`
- Kontroler audio: play/pause, seekbar, licznik czasu
- Obsługa `<picture>` z WebP/JPG fallback
- Graceful degradation dla przeglądarek bez Service Worker

**1.7 `service-worker.js` — obsługa offline**
- Strategia: Cache First z Network Fallback
- Cache name z wersją (np. `sppg-v1`)
- Lista zasobów do precache (wszystkie HTML, CSS, JS, JSON, obrazy, audio)
- Event handlers: `install`, `activate`, `fetch`
- Aktualizacja cache przy nowej wersji (stara wersja usuwana)

**1.8 `manifest.json` — konfiguracja PWA**
```json
{
  "name": "Bazylika Świętego Piotra — Audioprzewodnik",
  "short_name": "Bazylika Piotra",
  "lang": "pl",
  "start_url": "./",
  "display": "standalone",
  "background_color": "#1a0a00",
  "theme_color": "#8B6914",
  "icons": [...]
}
```

**Efekt końcowy Fazy 1:** Działająca aplikacja z placeholderami, nawigacja między przystankami, odtwarzacz audio, cache offline — gotowa do testowania.

---

### Faza 2 — Treści polskie (Tydzień 2)

**Cel:** Wypełnienie aplikacji docelowymi treściami w języku polskim.

#### Zadania:

**2.1 Teksty opisowe (13 przystanków)**

Każdy tekst: ok. 400 słów, styl przewodnika, w języku polskim.

| # | Przystanek | Kluczowe wątki do opisania |
|---|---|---|
| 1 | Pieta Michała Anioła | Historia (1499), technika marmurowa, wiek artysty (24 lata), symbolika, ochrona szybą od 1972 |
| 2 | Kaplica Najświętszego Sakramentu | Dostęp tylko dla modlących się, witraż Berniniego, Adoracja Najświętszego Sakramentu |
| 3 | Konfesja / Grób Świętego Piotra | Historia wykopalisk 1939–1950, Tropaion, znaczenie dla chrześcijaństwa, zejście do krypt |
| 4 | Baldachim Berniniego | Wysokość 29 m, brąz z Panteonu, kolumny spiralne, historia budowy (1623–1634) |
| 5 | Ołtarz Papieski | Jedyne miejsce, z którego papież celebruje Mszę Świętą zwróconą do wiernych, Klemens VIII |
| 6 | Groty Watykańskie | Grobowce papieży, Jana Pawła II, historia, zwiedzanie |
| 7 | Tron Świętego Piotra (Cathedra Petri) | Bernini 1666, złota gloria, drewniane krzesło Karola Łysego, symbolika władzy papieskiej |
| 8 | Kopuła | Michał Anioł i Giacomo della Porta, wysokość 136,57 m, mozaiki, widok z tarasu |
| 9 | Ołtarz Świętego Grzegorza Wielkiego | Grzegorz I Wielki, rola w historii Kościoła, ikona Mater Misericordiae |
| 10 | Ołtarz Prezentacji Najświętszej Maryi Panny | Mozaika wg Ciro Ferri, historia liturgiczna |
| 11 | Chrzcielnica | Porfirowy sarkofag Ottona II, historia chrztu, chrzcielnica Berniniego |
| 12 | Atrium i Drzwi | Portyk Berniniego, 5 drzwi (Drzwi Święte, Drzwi Śmierci Manzù), historia i symbolika |
| 13 | Barka Świętego Piotra (Navicella) | Mozaika Giotta (ok. 1300), symbolika łodzi Kościoła, rekonstrukcje |

**2.2 Skrypty nagrań audio**
- Adaptacja tekstów opisowych do formy mówionej (łatwiejszy język, krótsze zdania)
- Czas: 250–270 słów po polsku = ok. 2 minuty lektora
- Format pliku: `audio/script/01-pieta-skrypt.txt`

**2.3 Przygotowanie obrazów**
- Zebranie 13 zdjęć (domena publiczna / CC0 / Wikimedia Commons)
- Optymalizacja: konwersja do WebP, resize do maks. 1200×900 px
- Tworzenie fallbacków JPG
- Nazewnictwo zgodne ze schematem: `01-pieta.webp`, `01-pieta.jpg`

**Źródła obrazów (przykładowe, do weryfikacji licencji):**
- Wikimedia Commons (większość dzieł w bazylice jest w domenie publicznej)
- Web Gallery of Art
- Vatikanische Museen — materiały prasowe

**2.4 Nagrania audio**
- Opcja A (docelowa): Nagranie przez lektora/użytkownika projektu
- Opcja B (development): Synteza mowy (Text-to-Speech) — np. Microsoft Azure TTS, Google TTS — w języku polskim, głos `pl-PL-MarekNeural` lub podobny
- Konwersja do MP3 128 kbps
- Weryfikacja czasu trwania: 1:45–2:15 min

**Efekt końcowy Fazy 2:** Aplikacja z pełnymi treściami polskimi, zdjęciami, audio (TTS lub docelowe nagrania).

---

### Faza 3 — Testowanie i optymalizacja (Tydzień 3)

**Cel:** Weryfikacja działania offline, wydajności i dostępności.

#### Zadania:

**3.1 Testy funkcjonalne**
- [ ] Nawigacja między wszystkimi 13 przystankami
- [ ] Odtwarzanie audio na iOS Safari (iPhone SE, iPhone 14)
- [ ] Odtwarzanie audio na Chrome Android
- [ ] Działanie offline (tryb samolotowy po pierwszym załadowaniu)
- [ ] Instalacja PWA na ekranie głównym iOS i Android
- [ ] Obsługa klawiatury (nawigacja Tab, Enter)

**3.2 Testy wydajności**
- Lighthouse audit: cel 90+ we wszystkich kategoriach (Performance, Accessibility, PWA)
- Weryfikacja rozmiaru cache: < 30 MB łącznie
- Czas do interaktywności (TTI): < 3 s na 3G

**3.3 Testy dostępności**
- Kontrast tekstu: WCAG 2.1 AA (4.5:1 dla tekstu normalnego)
- Atrybuty ARIA na elementach audio i nawigacji
- Testowanie z VoiceOver (iOS) i TalkBack (Android)

**3.4 Optymalizacja obrazów**
- Weryfikacja rozmiarów plików WebP
- Lazy loading dla obrazów poza ekranem
- Atrybut `loading="lazy"` na obrazach poniżej fold

**3.5 Poprawki po testach**

**Efekt końcowy Fazy 3:** Przetestowana, zoptymalizowana aplikacja gotowa do wdrożenia.

---

### Faza 4 — Wdrożenie na GitHub Pages (Tydzień 3–4)

**Cel:** Publiczne udostępnienie aplikacji.

#### Zadania:

**4.1 Konfiguracja GitHub Pages**
- Włączenie GitHub Pages w ustawieniach repozytorium
- Wybór gałęzi: `main` (folder główny) lub dedykowana gałąź `gh-pages`
- Weryfikacja dostępności pod URL: `https://martin1564364.github.io/stpeterbasilicaguide/`

**4.2 Weryfikacja Service Workera na produkcji**
- Service Worker wymaga HTTPS — GitHub Pages zapewnia to automatycznie
- Test: załaduj stronę → tryb samolotowy → odśwież → aplikacja działa

**4.3 Weryfikacja zasobów**
- Wszystkie ścieżki relatywne (nie absolutne) — krytyczne dla GitHub Pages z subadressen
- `start_url` w `manifest.json` dostosowany do ścieżki repozytorium
- Sprawdzenie nagłówków MIME type dla plików audio (GitHub Pages: `audio/mpeg`)

**4.4 Dokumentacja końcowa**
- Aktualizacja `README.md` z instrukcją użytkowania i linkiem do aplikacji
- Informacja o źródłach zdjęć i licencjach

**Efekt końcowy Fazy 4:** Aplikacja dostępna publicznie pod stałym URL HTTPS.

---

## Harmonogram

| Tydzień | Faza | Kluczowe efekty |
|---|---|---|
| 1 | Faza 1 — Fundament | Działająca aplikacja z placeholderami |
| 2 | Faza 2 — Treści | Pełne treści polskie, obrazy, audio |
| 3 | Faza 3 — Testowanie | Zweryfikowana aplikacja, poprawki |
| 3–4 | Faza 4 — Wdrożenie | Publiczny URL na GitHub Pages |

---

## Ryzyka i mitygacja

| Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja |
|---|---|---|---|
| Prawa autorskie do zdjęć | Średnie | Wysokie | Używać wyłącznie Wikimedia Commons CC0 / domena publiczna |
| Brak nagrań audio od lektora | Wysokie | Średnie | Użyć TTS jako MVP, zastąpić nagraniami po premierze |
| Autoplay zablokowany przez iOS | Wysokie | Niskie | Wymagać interakcji użytkownika przed pierwszym odtworzeniem |
| Duży rozmiar plików audio | Niskie | Średnie | MP3 128 kbps, mono zamiast stereo jeśli konieczne |
| Service Worker nie działa na starszych iOS | Niskie | Średnie | Testować na iOS 15+, graceful degradation bez SW |

---

## Paleta kolorystyczna i design

Inspirowana złotem, marmurem i atmosferą Bazyliki Świętego Piotra:

| Element | Kolor | Hex |
|---|---|---|
| Tło główne | Ciemna czerń/granat | `#0d0d0d` |
| Tło kart | Ciepły ciemny brąz | `#1a1008` |
| Akcent złoty (główny) | Złoto bazyliki | `#C9A84C` |
| Akcent złoty (jasny) | Jaśniejsze złoto | `#E8C97A` |
| Tekst główny | Biały złamany | `#F5F0E8` |
| Tekst drugorzędny | Szary ciepły | `#A89880` |
| Przyciski aktywne | Złoto | `#C9A84C` |
| Tło odtwarzacza | Bardzo ciemny brąz | `#0f0804` |

**Typografia:**
- Nagłówki: systemowy serif (Georgia, Times New Roman) — nawiązanie do klasyki
- Treść: systemowy sans-serif (system-ui, -apple-system) — czytelność na mobile

---

## Struktura plików (docelowa)

```
/
├── index.html
├── manifest.json
├── service-worker.js
├── .gitignore
├── README.md
├── PLAN.md
├── REQUIREMENTS.md
├── css/
│   └── style.css
├── js/
│   └── app.js
├── data/
│   └── stops.json
├── images/
│   ├── 01-pieta.webp
│   ├── 01-pieta.jpg
│   ├── 02-kaplica-sakramentu.webp
│   ├── 02-kaplica-sakramentu.jpg
│   ├── 03-grob-sw-piotra.webp
│   ├── 03-grob-sw-piotra.jpg
│   ├── 04-baldachim.webp
│   ├── 04-baldachim.jpg
│   ├── 05-oltarz-papieski.webp
│   ├── 05-oltarz-papieski.jpg
│   ├── 06-groty-watykanskie.webp
│   ├── 06-groty-watykanskie.jpg
│   ├── 07-tron-sw-piotra.webp
│   ├── 07-tron-sw-piotra.jpg
│   ├── 08-kopula.webp
│   ├── 08-kopula.jpg
│   ├── 09-oltarz-grzegorza.webp
│   ├── 09-oltarz-grzegorza.jpg
│   ├── 10-oltarz-prezentacji.webp
│   ├── 10-oltarz-prezentacji.jpg
│   ├── 11-chrzcielnica.webp
│   ├── 11-chrzcielnica.jpg
│   ├── 12-atrium-drzwi.webp
│   ├── 12-atrium-drzwi.jpg
│   ├── 13-navicella.webp
│   └── 13-navicella.jpg
├── audio/
│   ├── 01-pieta.mp3
│   ├── 02-kaplica-sakramentu.mp3
│   ├── 03-grob-sw-piotra.mp3
│   ├── 04-baldachim.mp3
│   ├── 05-oltarz-papieski.mp3
│   ├── 06-groty-watykanskie.mp3
│   ├── 07-tron-sw-piotra.mp3
│   ├── 08-kopula.mp3
│   ├── 09-oltarz-grzegorza.mp3
│   ├── 10-oltarz-prezentacji.mp3
│   ├── 11-chrzcielnica.mp3
│   ├── 12-atrium-drzwi.mp3
│   └── 13-navicella.mp3
└── icons/
    ├── icon-192.png
    └── icon-512.png
```
