# TODO — Fehlende Assets & offene Punkte

Diese Liste enthält alles, was du noch nachliefern bzw. entscheiden musst,
damit die Website zu 100 % fertig ist. Bis dahin funktioniert die Seite
bereits vollständig — nur mit sinnvollen Platzhaltern.

## Muss noch nachgereicht werden

- [ ] **TikTok-Link.** Aktuell ist das Icon in der Social-Leiste sichtbar,
      aber bewusst ausgegraut und nicht klickbar (`href="#"`,
      `aria-disabled="true"` in `index.html`). Sobald du die URL hast:
      Anleitung in `README.md`, Abschnitt 4.
- [ ] **Finale Domain bestätigen.** Ich habe testweise
      `https://www.julianmuehl.de/` als Platzhalter eingetragen (in
      `index.html` bei `canonical`/Open-Graph, in `robots.txt`,
      `sitemap.xml`). Bitte bestätigen oder die echte Domain nennen —
      dann ersetze ich die Platzhalter überall konsistent.
- [ ] **Echtes Open-Graph-Bild** (Vorschau beim Teilen z. B. via WhatsApp/
      LinkedIn). Aktuell liegt unter `assets/images/og-image-placeholder.png`
      nur ein reiner Farbverlauf (1200 × 630 px) ohne Namen/Foto/Text, wie
      im Prompt gewünscht („nutze zunächst einen Platzhalter“). Für den
      finalen Auftritt empfehle ich ein Bild mit Namen, Position und ggf.
      Portraitfoto.

## Optionale Entscheidung

- [ ] **Favicon-Variante.** Von den mitgeschickten Fidano-Logos habe ich
      das **farbige Bildzeichen** (Verlauf, ohne Schriftzug) als Favicon
      gewählt — es bleibt bei 16×16/32×32 Pixel am besten erkennbar und
      wirkt auf jedem Browser-Hintergrund (hell/dunkel) neutral. Alle
      anderen Logo-Varianten liegen weiterhin in `assets/logos/`, falls du
      eine andere bevorzugst.
- [ ] **Lizenzierte Webfont „Brother 1816“** für die Buttons. Ist
      kostenpflichtig und lag dem Auftrag nicht bei. Die Buttons nutzen
      aktuell eine hochwertige, produktionsreife System-Ersatzschrift.
      Sobald du die `.woff2`-Datei besitzt: Anleitung in `README.md`,
      Abschnitt 6. (Titel und Untertitel sind fest auf Baskerville
      gesetzt und benötigen keine zusätzliche Font-Datei.)

## Nicht Teil des ursprünglichen Auftrags, aber als Empfehlung

- [ ] **Portraitfoto** für ein noch persönlicheres Open-Graph-Bild bzw.
      später für weitere Unterseiten (nicht auf der Landingpage selbst
      vorgesehen, da im Prompt nicht gefordert).
- [ ] **Tracking/Analytics** (Google Analytics, Meta Pixel etc.) — die
      Struktur ist dafür vorbereitet, aber bewusst noch nicht eingebaut,
      um die Seite so schlank wie möglich zu halten, bis du dich für
      konkrete Tools entschieden hast.
