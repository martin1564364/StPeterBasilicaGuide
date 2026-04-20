# Bazylika Świętego Piotra — Audioprzewodnik

Polski audioprzewodnik PWA po Bazylice Świętego Piotra w Rzymie. Działa w pełni offline po pierwszym załadowaniu.

**Demo:** https://martin1564364.github.io/StPeterBasilicaGuide/

---

## Uruchomienie lokalne

```bash
python3 -m http.server 8080
# otwórz http://localhost:8080
```

> Serwer HTTP jest wymagany (Service Worker nie działa z file://)

---

## Wdrożenie na GitHub Pages

1. Repozytorium → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` → folder: `/ (root)` → **Save**
4. Strona dostępna pod: `https://martin1564364.github.io/StPeterBasilicaGuide/`

---

## Dodawanie treści

### 1. Opisy przystanków (tekst)

Edytuj `data/stops.json` — pole `description` dla każdego przystanku.  
Cel: 300–500 słów po polsku, styl przewodnika.

### 2. Nagrania audio (~2 minuty)

Zastąp pliki w `audio/` własnymi nagraniami MP3:

| Plik | Przystanek |
|---|---|
| `audio/01-pieta.mp3` | Pieta Michała Anioła |
| `audio/02-kaplica-sakramentu.mp3` | Kaplica Najświętszego Sakramentu |
| `audio/03-baldachim.mp3` | Baldachim Berniniego |
| `audio/04-oltarz-papieski.mp3` | Ołtarz Papieski / Konfesja |
| `audio/05-groty-watykanskie.mp3` | Groty Watykańskie |
| `audio/06-cathedra-petri.mp3` | Tron św. Piotra (Cathedra Petri) |
| `audio/07-kopula.mp3` | Kopuła |
| `audio/08-oltarz-grzegorza.mp3` | Ołtarz Grzegorza Wielkiego |
| `audio/09-oltarz-ofiarowania.mp3` | Ołtarz Ofiarowania Maryi |
| `audio/10-chrzcielnica.mp3` | Chrzcielnica |
| `audio/11-atrium-drzwi.mp3` | Atrium i drzwi |
| `audio/12-navicella.mp3` | Łódź św. Piotra (Navicella) |

Format: MP3, 128 kbps, mono lub stereo, ~2 minuty każde.

### 3. Fotografie (CC0 / domena publiczna)

Obecnie `images/` zawiera labelled SVG placeholders. Zastąp je fotografiami CC0:

Pobierz pliki z Wikimedia Commons i zapisz jako `images/NN-slug.jpg` + `.webp`.  
Następnie zaktualizuj `data/stops.json` — pola `image` i `imageFallback`.

#### Gotowe linki CC0 (Wikimedia Commons)

| # | Plik docelowy | Źródło Wikimedia Commons |
|---|---|---|
| 1 | `01-pieta.jpg` | https://upload.wikimedia.org/wikipedia/commons/1/1f/Michelangelo%27s_Pieta_5450_cropncleaned_edit.jpg |
| 2 | `02-kaplica-sakramentu.jpg` | https://upload.wikimedia.org/wikipedia/commons/4/4f/The_Chapel_of_the_Most_Blessed_Sacrament.jpg |
| 3 | `03-baldachim.jpg` | https://upload.wikimedia.org/wikipedia/commons/5/55/San_pietro%2C_baldacchino.JPG |
| 4 | `04-oltarz-papieski.jpg` | https://upload.wikimedia.org/wikipedia/commons/1/14/Vaticano_-_Basilica_di_San_Pietro_%2842057665124%29.jpg |
| 5 | `05-groty-watykanskie.jpg` | https://upload.wikimedia.org/wikipedia/commons/4/49/Grottoes_VA.JPG |
| 6 | `06-cathedra-petri.jpg` | https://upload.wikimedia.org/wikipedia/commons/7/73/Rom%2C_Vatikan%2C_Petersdom%2C_Cathedra_Petri_%28Bernini%29_3.JPG |
| 7 | `07-kopula.jpg` | https://upload.wikimedia.org/wikipedia/commons/c/c1/Dome_of_Saint_Peter%27s_Basilica_%28Interior%29.jpg |
| 8 | `08-oltarz-grzegorza.jpg` | https://upload.wikimedia.org/wikipedia/commons/9/9e/Dome_of_the_Clementine_Chapel_in_Saint_Peter_%27s_Basilica.jpg |
| 9 | `09-oltarz-ofiarowania.jpg` | https://upload.wikimedia.org/wikipedia/commons/8/8d/Rome_basilica_st_peter_004.JPG |
| 10 | `10-chrzcielnica.jpg` | https://upload.wikimedia.org/wikipedia/commons/0/04/Baptismal_fonts_Saint_Peter%27s_Basilica_Vatican_City_2.jpg |
| 11 | `11-atrium-drzwi.jpg` | https://upload.wikimedia.org/wikipedia/commons/8/8f/San_pietro%2C_porta_del_filarete_01.JPG |
| 12 | `12-navicella.jpg` | https://upload.wikimedia.org/wikipedia/commons/a/a0/La_Navicella_di_San_Pietro_pittura_a_mosaico_del_Giotto.jpg |

**Uwaga:** Fotografie z Wikimedia są na licencji CC-BY-SA (należy podać autora). Rzeźby i dzieła sztuki (Michał Anioł, Bernini) są w domenie publicznej.

Po pobraniu zaktualizuj `data/stops.json`:
```json
"image": "images/01-pieta.webp",
"imageFallback": "images/01-pieta.jpg"
```
I zaktualizuj listę `PRECACHE_ASSETS` w `service-worker.js`.

---

## Struktura projektu

```
/
├── index.html              # Główna strona (splash + widok przystanku)
├── manifest.json           # PWA manifest
├── service-worker.js       # Obsługa offline (Cache First)
├── css/style.css           # Motyw złoto/marmur, mobile-first
├── js/app.js               # Logika aplikacji
├── data/stops.json         # Dane 12 przystanków
├── images/                 # Fotografie (lub SVG placeholdery)
├── audio/                  # Nagrania MP3
├── icons/                  # Ikony PWA (192px, 512px)
├── PLAN.md                 # Plan realizacji
└── REQUIREMENTS.md         # Wymagania projektu
```

---

## Licencje

- Kod aplikacji: MIT
- Treści tekstowe: właściciel projektu
- Ikony / SVG: właściciel projektu
- Fotografie: CC-BY-SA (Wikimedia Commons, zgodnie z tabelą powyżej)
