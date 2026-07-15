# Julian Mühl — Link-in-Bio Landingpage

Eine schlanke, premium wirkende Ein-Seiten-Website (HTML/CSS/JS, ohne
Frameworks) als hochwertiger Ersatz für Linktree/Carrd.

**🔴 Live unter:** `https://julianmuehl.de`
**Quellcode:** `https://github.com/JulianMuehl/julian-muehl-landingpage`
**Hosting:** Vercel (deployt automatisch bei jedem Push auf `main`)

Wie du Änderungen veröffentlichst, künftige Deployments funktionieren und
wie der komplette Hosting-Aufbau aussieht, steht in `DEPLOYMENT.md`.

Diese Anleitung ist bewusst für Einsteiger geschrieben. Du brauchst keine
Programmierkenntnisse, um die wichtigsten Dinge (Texte, Farben, Links,
Bilder) selbst zu ändern.

---

## 1. Welche Datei macht was?

| Datei / Ordner            | Zweck                                                                 | Musst du sie bearbeiten? |
|----------------------------|------------------------------------------------------------------------|---------------------------|
| `index.html`               | Der Inhalt der Seite: Name, Buttons, Texte, Links, Bilder             | Ja, bei Text-/Link-Änderungen |
| `styles.css`                | Das komplette Design: Farben, Schriftarten, Abstände, Animationen     | Ja, bei Design-Änderungen |
| `script.js`                 | Steuert nur die sanfte Einblend-Animation beim Laden                  | Selten |
| `manifest.webmanifest`      | Damit die Seite z. B. auf dem Homescreen wie eine App aussieht        | Selten |
| `robots.txt`                | Sagt Suchmaschinen, dass sie die Seite crawlen dürfen                 | Nein |
| `sitemap.xml`               | Hilft Google, die Seite zu finden                                      | Nur bei Domain-Änderung |
| `assets/images/`            | Allgemeine Bilder (aktuell: Platzhalter für Open-Graph-Bild)           | Ja, siehe `TODO-ASSETS.md` |
| `assets/icons/`              | Favicon, App-Icons, Social-Media-Icons (SVG)                          | Selten |
| `assets/logos/`              | Fidano-Logo-Varianten (Footer)                                        | Nein, außer neue Version |
| `assets/fonts/`              | Platz für die lizenzierten Schriftdateien (aktuell leer)              | Optional, siehe unten |
| `README.md`                  | Diese Anleitung                                                       | — |
| `DEPLOYMENT.md`               | Schritt-für-Schritt-Anleitung zum Veröffentlichen                     | — |
| `CHANGELOG.md`                | Protokoll aller Änderungen an der Website                             | Bei jeder Änderung ergänzen |
| `TODO-ASSETS.md`              | Liste aller fehlenden Inhalte, die du noch nachliefern musst          | Bis alles erledigt ist |

---

## 2. Texte ändern

Öffne `index.html` in einem Texteditor (z. B. [Visual Studio Code](https://code.visualstudio.com),
kostenlos). Der sichtbare Text steht direkt zwischen den spitzen Klammern.

> **Sonderfall Name & Untertitel:** „JULIAN MÜHL“ und „Immobilienunternehmer
> & Investor“ sind **keine normalen Text-Elemente**, sondern als
> Vektorgrafik (SVG-Pfade aus Baskerville) eingebettet — dadurch sehen sie
> auf jedem Gerät exakt gleich aus, unabhängig davon, ob „Baskerville“
> dort installiert ist. Der unsichtbare `<span class="sr-only">…</span>`
> direkt davor ist der "echte" Text für Suchmaschinen und Screenreader —
> **den kannst du normal bearbeiten**. Die sichtbare Grafik selbst
> (`assets/images/brand-title.svg` / `brand-subtitle.svg`) ändert sich
> dadurch aber NICHT automatisch mit. Willst du den Namen wirklich
> ändern, sag in einem neuen Chat kurz Bescheid — die Grafik muss dann
> neu aus der Schrift erzeugt werden. Alle anderen Texte (Buttons,
> Social-Media etc.) sind ganz normaler Text und lassen sich direkt
> zwischen `>` und `<` ersetzen.

```html
<a
  class="link-button"
  …
>
  <span class="link-button__title">Website</span>
</a>
```

> Sonderzeichen wie `&` müssen als `&amp;` geschrieben werden — das ist
> in HTML so üblich (sonst können Browser den Code falsch interpretieren).

---

## 3. Links ändern

Jeder Button ist ein `<a>`-Element mit einem `href`-Attribut. Beispiel:

```html
<a
  class="link-button"
  data-animate="button"
  href="https://api.leadconnectorhq.com/widget/booking/woeKV0aGhDuKVOrI6vjz"
  target="_blank"
  rel="noopener noreferrer"
>
  <span class="link-button__eyebrow">Kennenlerngespräch</span>
  <span class="link-button__title">Vermögensaufbau mit Immobilien</span>
</a>
```

Um den Link zu ändern, ersetze nur die Adresse im `href="…"`.
Lass `target="_blank"` und `rel="noopener noreferrer"` unbedingt stehen —
das öffnet den Link sicher in einem neuen Tab.

### Neuen Button hinzufügen

Kopiere einen kompletten `<li>…</li>`-Block innerhalb von `<ul class="link-list">`
und passe Text und Link an. Die `data-animate="button"`-Markierung nicht
entfernen, sonst funktioniert die Einblend-Animation für diesen Button nicht.

Wenn dein Button nur eine Zeile Text braucht (wie „Website“), lass das
`<span class="link-button__eyebrow">…</span>` einfach weg.

---

## 4. Social-Media-Links ergänzen oder ändern

Die Icons stehen im Abschnitt `<ul class="social-list">`. Um z. B. den
TikTok-Link nachzutragen (aktuell ausgegraut, da die URL noch fehlt):

1. Suche in `index.html` nach `data-pending-link="tiktok"`.
2. Ersetze `href="#"` durch deinen echten TikTok-Link.
3. Entferne die Attribute `aria-disabled="true"` und `data-pending-link="tiktok"`.
4. Füge `target="_blank" rel="noopener noreferrer"` hinzu (wie bei den
   anderen Icons).

Um ein komplett neues Icon zu ergänzen, kopiere einen bestehenden
`<li>…</li>`-Block, tausche den Link, das `aria-label` und das SVG-Icon aus.

---

## 5. Farben ändern

Alle Farben stehen zentral am Anfang von `styles.css`, im Abschnitt
`:root { … }`. Beispiel:

```css
--color-bg-top: #E3BC90;      /* Hintergrundverlauf oben */
--color-bg-bottom: #936245;   /* Hintergrundverlauf unten */
--color-button: #111A32;      /* Button-Farbe */
--color-button-text: #FFFFFF; /* Button-Schrift */
--color-text: #111111;        /* Fließtext */
```

Einen Hex-Code ändern (z. B. `#111A32` → `#0A1228`) genügt — die neue
Farbe wird automatisch überall übernommen, wo diese Variable verwendet wird.

---

## 6. Schriftarten ändern

Ebenfalls in `styles.css`, im Abschnitt `:root`:

```css
--font-title: Baskerville, Georgia, serif;
--font-button: 'Brother 1816', Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

**Wichtig:** Titel („JULIAN MÜHL“) und Untertitel verwenden bewusst
dieselbe Schriftfamilie (`--font-title` bzw. `--font-subtitle`, die auf
`--font-title` verweist) — das ist Absicht, damit beide Elemente
erkennbar zusammengehören. Nur die Buttons nutzen eine separate Schrift
(`--font-button`). „Brother 1816“ ist eine kostenpflichtige Schrift und
liegt diesem Projekt nicht bei; die Seite springt hier automatisch auf
eine hochwertige System-Ersatzschrift.

Sobald du die lizenzierte Schriftdatei für die Buttons (`.woff2`)
besitzt:

1. Lege die Datei in `assets/fonts/` ab.
2. Öffne `styles.css` und suche den Abschnitt **„OPTIONALE WEBFONTS“**.
3. Entferne die Kommentarzeichen `/*` und `*/` um die `@font-face`-Regel.
4. Trage den korrekten Dateinamen ein.

Die Website funktioniert bis dahin einwandfrei — nur die Buttons nutzen
dann noch die Ersatzschrift statt „Brother 1816“.

---

## 7. Bilder austauschen

- **Open-Graph-Bild** (Vorschaubild beim Teilen auf WhatsApp/LinkedIn):
  `assets/images/og-image-placeholder.png` (1200 × 630 px). Ersetze diese
  Datei durch ein fertiges Design und aktualisiere bei Bedarf den Dateinamen
  in `index.html` (`<meta property="og:image" …>`).
- **Footer-Logo:** liegt in `assets/logos/`. Standardmäßig wird die
  vollständig schwarze Version `fidano-logo-schwarz-claim.png` verwendet.
  Andere Varianten (u. a. vollständig weiß) liegen ebenfalls im Ordner,
  falls du wechseln möchtest.
- **Favicon:** `assets/icons/favicon-16.png`, `favicon-32.png`,
  `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` — alle aus dem
  farbigen Fidano-Bildzeichen erzeugt.

---

## 8. Lokal testen

Am einfachsten: Doppelklick auf `index.html` — sie öffnet sich direkt im
Browser. Für ein realistischeres Ergebnis (inkl. Manifest) empfiehlt sich
ein kleiner lokaler Server, siehe `DEPLOYMENT.md`, Abschnitt 1.

---

## 9. Später leicht ergänzbar

Die Struktur ist bewusst so aufgebaut, dass folgende Dinge **ohne**
Umbau der bestehenden Seite ergänzt werden können:

- Google Analytics / Microsoft Clarity / Meta Pixel / LinkedIn Insight Tag
  → jeweils ein `<script>`-Snippet kurz vor `</head>` in `index.html` einfügen.
- Kontaktformular, Newsletter, Blog, Immobilienangebote, Downloads,
  Login-Bereich → als neue Unterseiten (eigene `.html`-Dateien) neben
  `index.html` anlegen und in der Navigation verlinken.
- Mehrsprachigkeit → weitere Sprachversionen z. B. unter `/en/index.html`.
- CRM-Anbindung / Kalenderbuchung → die Buttons verlinken bereits auf
  externe Buchungs-Tools; ein Wechsel des Anbieters bedeutet nur einen
  neuen Link im jeweiligen `href`.

Bei Fragen: Diese Datei (`README.md`) zuerst konsultieren, danach
`DEPLOYMENT.md` für alles rund ums Veröffentlichen.
