# Plan Realizacji — Audioprzewodnik po Bazylice Świętego Piotra

## Przegląd projektu

**Projekt:** Statyczny audioprzewodnik PWA w języku polskim  
**Hosting:** GitHub Pages (`https://martin1564364.github.io/StPeterBasilicaGuide/`)  
**Technologia:** HTML5 + CSS3 + Vanilla JavaScript (brak frameworków)  
**Kluczowa cecha:** Pełna funkcjonalność offline po pierwszym załadowaniu  
**Repozytorium:** `martin1564364/StPeterBasilicaGuide`  

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
| Framework JS | Vanilla JS | Brak zewnętrznych zależności, mniejszy rozmiar |
| CSS | Czysty CSS (custom properties) | Brak frameworków, działa offline |
| Dane przystanków | `data/stops.json` | Oddziela treść od kodu, łatwa aktualizacja |
| Offline | Service Worker + Cache API (Cache First) | Standard PWA |
| Audio | HTML5 `<audio>` z własnym playerem | Natywna obsługa iOS Safari |
| Obrazy | WebP + JPG fallback (CC0 Wikimedia Commons) | Wolne od praw autorskich, zoptymalizowane |
| Wdrożenie | GitHub Pages | Darmowy hosting HTTPS |

---

## 12 Przystanków (kolejność zwiedzania)

| # | Tytuł PL | Slug | Obraz | Audio |
|---|---|---|---|---|
| 1 | Pieta Michała Anioła | `pieta` | `01-pieta` | `01-pieta.mp3` |
| 2 | Kaplica Najświętszego Sakramentu | `kaplica-sakramentu` | `02-kaplica-sakramentu` | `02-kaplica-sakramentu.mp3` |
| 3 | Grobowiec św. Piotra – baldachim | `baldachim` | `03-baldachim` | `03-baldachim.mp3` |
| 4 | Grobowiec św. Piotra – ołtarz | `oltarz-papieski` | `04-oltarz-papieski` | `04-oltarz-papieski.mp3` |
| 5 | Groty Watykańskie | `groty-watykanskie` | `05-groty-watykanskie` | `05-groty-watykanskie.mp3` |
| 6 | Tron św. Piotra (Cathedra Petri) | `cathedra-petri` | `06-cathedra-petri` | `06-cathedra-petri.mp3` |
| 7 | Kopuła | `kopula` | `07-kopula` | `07-kopula.mp3` |
| 8 | Ołtarz Grzegorza Wielkiego | `oltarz-grzegorza` | `08-oltarz-grzegorza` | `08-oltarz-grzegorza.mp3` |
| 9 | Ołtarz Ofiarowania Maryi | `oltarz-ofiarowania` | `09-oltarz-ofiarowania` | `09-oltarz-ofiarowania.mp3` |
| 10 | Chrzcielnica | `chrzcielnica` | `10-chrzcielnica` | `10-chrzcielnica.mp3` |
| 11 | Atrium i drzwi | `atrium-drzwi` | `11-atrium-drzwi` | `11-atrium-drzwi.mp3` |
| 12 | Łódź św. Piotra (Navicella) | `navicella` | `12-navicella` | `12-navicella.mp3` |

---

## Struktura plików

```
/
├── index.html              # Główna strona (splash + widok przystanku)
├── manifest.json           # PWA manifest
├── service-worker.js       # Cache First offline support
├── .gitignore
├── css/
│   └── style.css           # Motyw złoto/marmur, mobile-first
├── js/
│   └── app.js              # Logika: nawigacja, odtwarzacz, offline
├── data/
│   └── stops.json          # 12 przystanków: tytuły, opisy, ścieżki
├── images/
│   ├── 01-pieta.webp       # CC0 / domena publiczna (Wikimedia Commons)
│   ├── 01-pieta.jpg        # Fallback JPG
│   └── ...                 # (po 2 pliki × 12 przystanków)
├── audio/
│   ├── 01-pieta.mp3        # Placeholder 10s ciszy → zastąpić nagraniem
│   └── ...                 # (12 plików MP3)
├── icons/
│   ├── icon-192.png        # PWA ikona
│   └── icon-512.png        # PWA ikona
├── PLAN.md
└── REQUIREMENTS.md
```

---

## Paleta kolorystyczna i design

Inspirowana złotem, marmurem i atmosferą Bazyliki Świętego Piotra:

| Element | Kolor | Hex |
|---|---|---|
| Tło główne | Ciemna czerń | `#0d0d0d` |
| Tło kart | Ciepły ciemny brąz | `#1a1008` |
| Akcent złoty (główny) | Złoto bazyliki | `#C9A84C` |
| Akcent złoty (jasny) | Jaśniejsze złoto | `#E8C97A` |
| Tekst główny | Biały złamany | `#F5F0E8` |
| Tekst drugorzędny | Szary ciepły | `#A89880` |

**Typografia:**
- Nagłówki: Georgia, serif (nawiązanie do klasyki)
- Treść: system-ui, sans-serif (czytelność na mobile)

---

## Workflow treści — kolejne kroki

### Krok 1: Opisy przystanków
Użytkownik dostarcza polskie opisy (300–500 słów każdy).  
Aktualizacja: `data/stops.json` → pole `description` dla każdego przystanku.

### Krok 2: Nagrania audio (~2 minuty)
Nagrania zastępują pliki placeholder w `audio/`.  
Format: MP3, 128 kbps, mono lub stereo.  
Nomenklatury: `01-pieta.mp3`, `02-kaplica-sakramentu.mp3`, itd.

---

## Wdrożenie na GitHub Pages

1. W ustawieniach repozytorium włączyć GitHub Pages → Branch: `main`, folder: `/ (root)`
2. URL strony: `https://martin1564364.github.io/StPeterBasilicaGuide/`
3. Service Worker wymaga HTTPS — GitHub Pages zapewnia to automatycznie

---

## Ryzyka i mitygacja

| Ryzyko | Mitygacja |
|---|---|
| Autoplay zablokowany przez iOS | Wymagana interakcja użytkownika (przycisk Play) |
| Duży rozmiar plików audio | MP3 128 kbps, mono zamiast stereo jeśli konieczne |
| Service Worker nie działa na starszych iOS | Graceful degradation bez SW, testować iOS 15+ |
| Prawa autorskie do zdjęć | Wyłącznie Wikimedia Commons CC0 / domena publiczna |
