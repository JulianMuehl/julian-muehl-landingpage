# Changelog

Alle nennenswerten Änderungen an dieser Website werden hier festgehalten.

## [1.4.0] – 2026-07-15

### Veröffentlicht
- Projekt in einem lokalen Git-Repository versioniert und auf GitHub
  veröffentlicht: `github.com/JulianMuehl/julian-muehl-landingpage`
  (öffentlich, über GitHub Desktop).
- Mit Vercel verbunden, automatisches Deployment bei jedem Push auf `main`.
- Domain `julianmuehl.de` (IONOS) auf Vercel umgestellt:
  - A-Record `@` → `216.198.79.1`
  - CNAME `www` → `beae11a7ff692427.vercel-dns-017.com.`
  - `julianmuehl.de` als Production-Domain, `www.julianmuehl.de` als
    308-Redirect darauf
  - HTTPS automatisch über Let's Encrypt aktiviert
  - Mail-Einträge (MX/SPF/DMARC) bei IONOS unverändert geprüft
- Canonical-URL, Open-Graph-URLs und Sitemap von `www.julianmuehl.de` auf
  die Apex-Domain `julianmuehl.de` korrigiert (passend zur neuen
  Production-Domain).
- Carrd-Domain-Verknüpfung entfernt; Carrd-Seite selbst bleibt bestehen.

## [1.3.0] – 2026-07-15

### Geändert (Hervorhebung Name/Untertitel, Icons, Footer-Logo)
- Titel „JULIAN MÜHL" von Baskerville Regular auf Baskerville SemiBold
  umgestellt (mehr visuelle Präsenz), neu aus der Schrift als Vektor
  erzeugt.
- Untertitel „Immobilienunternehmer & Investor" von gedämpftem Grau auf
  volles Schwarz (`--color-text`) umgestellt, plus minimal erhöhte
  Laufweite; war zuvor kaum lesbar gegen den Verlauf.
- Beiden (Titel + Untertitel) einen sehr dezenten `drop-shadow` gegeben
  für zusätzliche Tiefe/Kontrast.
- Social-Icons weiter vergrößert (64px → 76px Touch-Ziel, 28px → 34px
  Glyphen), Abstand zwischen den Icons reduziert (24px → 16px).
- Footer-Logo von der weißen auf die vollständig schwarze Version
  (`fidano-logo-schwarz-claim.png`) umgestellt.

## [1.2.0] – 2026-07-15

### Geändert (Design-Korrektur nach Carrd-Referenzvergleich)
- Titel/Untertitel als Vektor-SVG aus echter Baskerville-Schrift erzeugt
  (nicht mehr Live-Text) — dadurch pixelgenau auf jedem Gerät, unabhängig
  von installierten Systemschriften. Text bleibt für SEO/Screenreader als
  `.sr-only` erhalten.
- Bug behoben: Buttons waren trotz `width: 100%` auf ihren Textinhalt
  geschrumpft (`align-items: center` ließ die `<li>`-Elemente in der
  Flexbox schrumpfen). Fix: `align-items: stretch` + `margin-inline: auto`
  am Button. Jetzt sind alle sechs Buttons exakt gleich breit.
- Button-Maße auf feste, absolute Werte umgestellt (`min-height: 84px`,
  `padding: 24px 32px`), keine abweichenden Werte mehr je Breakpoint.
- Social-Icons vergrößert (60px → 64px Touch-Ziel, 26px → 28px Glyphen).
- Abstände neu austariert: mehr Luft Untertitel→Buttons und
  Buttons→Icons, deutlich weniger Luft Icons→Footer-Logo.
- Fidano-Logo im Footer vergrößert (~75 % der Button-Breite) und auf die
  vollständig weiße Version umgestellt.

## [1.1.0] – 2026-07-15

### Geändert (Design-Korrekturen, keine Inhalts-/Link-Änderungen)
- Titel und Untertitel verwenden jetzt einheitlich Baskerville (Fallback
  Georgia/serif) statt unterschiedlicher Font-Stacks.
- Alle sechs Buttons haben jetzt eine identische Mindesthöhe
  (`--button-min-height`), damit ein- und zweizeilige Texte gleich groß wirken.
- Social-Media-Icons deutlich vergrößert (Touch-Ziel 48px → 60px,
  Icon-Größe 22px → 26px) und Abstände angepasst.
- Xing-Icon durch korrekt orientierte, verifizierte Markenform ersetzt.
- Abstand zwischen Social-Icons und Footer reduziert.
- Footer-Logo vergrößert (responsiv 160–240px) und auf die vollständig
  weiße Logo-Variante umgestellt.

## [1.0.0] – 2026-07-15

### Hinzugefügt
- Erste vollständige Version der Premium-Link-in-Bio-Landingpage.
- Header mit Name und Untertitel.
- Sechs Call-to-Action-Buttons (Kennenlerngespräche, Kooperationspartner,
  Suchprofil, Selbstauskunft, Website).
- Social-Media-Leiste mit Instagram, TikTok (Platzhalter, Link folgt),
  Xing und LinkedIn.
- Footer mit Fidano-Logo.
- Vollständiges CSS-Design-System auf Basis von CSS-Variablen.
- Dezente Lade-Animationen mit Unterstützung für `prefers-reduced-motion`.
- SEO-Grundausstattung: Meta-Tags, Open-Graph, Twitter-Card, JSON-LD,
  `robots.txt`, `sitemap.xml`.
- PWA-Grundausstattung: `manifest.webmanifest`, Favicon-Set.
- Ausführliche Dokumentation (`README.md`, `DEPLOYMENT.md`, `TODO-ASSETS.md`).
