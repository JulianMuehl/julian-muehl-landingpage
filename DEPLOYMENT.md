# Deployment-Anleitung (für Einsteiger)

Diese Anleitung führt dich Schritt für Schritt von der fertigen Website auf
deinem Computer bis zur Veröffentlichung unter deiner eigenen Domain.

Carrd wird komplett ersetzt. IONOS bleibt ausschließlich für **Domain**
und **E-Mail** zuständig — gehostet wird die Website selbst bei GitHub
Pages oder Vercel (beide kostenlos für dieses Projekt).

---

## Schritt 1 — Website lokal testen

1. Öffne ein Terminal im Projektordner (`julian-muehl-landingpage`).
2. Starte einen einfachen lokalen Server:
   ```bash
   python3 -m http.server 8000
   ```
3. Öffne im Browser: `http://localhost:8000`
4. Prüfe:
   - Werden Name, Untertitel, alle 6 Buttons und die Social-Icons angezeigt?
   - Öffnen die Buttons die richtigen Seiten in einem neuen Tab?
   - Sieht die Seite auf einem schmalen Browserfenster (Handy-Simulation)
     genauso gut aus wie auf einem breiten?
5. Mit `Strg + C` (Windows/Linux) bzw. `Ctrl + C` (Mac) im Terminal beenden.

---

## Schritt 2 — GitHub-Repository anlegen

1. Kostenloses Konto auf [github.com](https://github.com) erstellen (falls
   noch nicht vorhanden).
2. Oben rechts auf **„+“ → „New repository“** klicken.
3. Name vergeben, z. B. `julian-muehl-landingpage`.
4. Sichtbarkeit: **Public** (nötig für kostenloses GitHub Pages) oder
   **Private**, falls du stattdessen Vercel nutzt.
5. **„Create repository“** klicken — noch keine Dateien hochladen.

---

## Schritt 3 — Dateien hochladen

**Option A — im Browser (einfachster Weg für Einsteiger):**

1. Im neu erstellten Repository auf **„uploading an existing file“** klicken.
2. Alle Dateien und Ordner aus `julian-muehl-landingpage/` per Drag & Drop
   hochladen.
3. Unten eine kurze Commit-Nachricht eintragen, z. B. „Erste Version der
   Landingpage“, und **„Commit changes“** klicken.

**Option B — per Terminal (für später, wenn du dich sicherer fühlst):**

```bash
cd julian-muehl-landingpage
git init
git add .
git commit -m "Erste Version der Landingpage"
git branch -M main
git remote add origin https://github.com/DEIN-BENUTZERNAME/julian-muehl-landingpage.git
git push -u origin main
```

---

## Schritt 4 — Veröffentlichen

### Variante A: GitHub Pages (einfachste, kostenlose Lösung)

1. Im Repository auf **„Settings“ → „Pages“**.
2. Unter **„Build and deployment“**: Branch `main`, Ordner `/ (root)` auswählen.
3. Speichern. Nach ein bis zwei Minuten ist die Seite erreichbar unter:
   `https://DEIN-BENUTZERNAME.github.io/julian-muehl-landingpage/`

### Variante B: Vercel (etwas komfortabler, eigene Domain schneller verbunden)

1. Konto auf [vercel.com](https://vercel.com) erstellen (Anmeldung direkt
   mit GitHub möglich).
2. **„Add New… → Project“** → dein GitHub-Repository auswählen.
3. Vercel erkennt automatisch, dass es sich um eine statische Website
   handelt (kein Framework nötig) → **„Deploy“** klicken.
4. Nach kurzer Zeit ist die Seite unter einer `*.vercel.app`-Adresse live.

---

## Schritt 5 — Domain mit IONOS verbinden

Deine Domain bleibt bei IONOS registriert. Du änderst dort nur, **wohin**
sie zeigt (DNS-Einträge) — das E-Mail-Postfach bei IONOS bleibt unberührt.

**Bei GitHub Pages:**

1. Im GitHub-Repository unter **„Settings“ → „Pages“** deine Domain
   (z. B. `julianmuehl.de`) im Feld **„Custom domain“** eintragen.
2. Bei IONOS im Domaincenter unter **DNS-Einstellungen** folgende Einträge
   anlegen (GitHub zeigt dir die exakten IP-Adressen in der eigenen
   [Dokumentation](https://docs.github.com/pages) an, aktuell):
   - 4× `A`-Record für `@` auf die GitHub-Pages-IP-Adressen
   - `CNAME`-Record für `www` auf `DEIN-BENUTZERNAME.github.io`
3. Warten, bis die DNS-Änderung aktiv ist (kann bis zu 24 Stunden dauern,
   meist aber deutlich schneller).

**Bei Vercel:**

1. Im Vercel-Projekt unter **„Settings“ → „Domains“** deine Domain eintragen.
2. Vercel zeigt dir die exakten DNS-Einträge an, die du bei IONOS im
   Domaincenter unter **DNS-Einstellungen** hinterlegen musst
   (in der Regel ein `A`- bzw. `CNAME`-Record).

---

## Schritt 6 — HTTPS aktivieren

Sowohl GitHub Pages als auch Vercel aktivieren HTTPS (das Schloss-Symbol
im Browser) für deine eigene Domain **automatisch**, sobald die
DNS-Einträge korrekt gesetzt sind. Du musst hier nichts weiter tun —
nur kurz warten (meist wenige Minuten bis Stunden).

---

## Schritt 7 — Abschließend prüfen

Gehe die folgende Liste einmal komplett durch:

- [ ] Domain funktioniert: `https://julianmuehl.de` lädt die Seite
- [ ] `www`-Variante funktioniert: `https://www.julianmuehl.de` lädt ebenfalls
- [ ] Schloss-Symbol (HTTPS) wird im Browser angezeigt
- [ ] Alle 6 Buttons öffnen die korrekten Seiten in einem neuen Tab
- [ ] Instagram-, Xing- und LinkedIn-Link funktionieren
- [ ] TikTok-Icon ist sichtbar, aber erkennbar „inaktiv“ (bis Link nachgetragen wird)
- [ ] Mobilansicht (Smartphone, quer & hochkant) sieht sauber aus
- [ ] Desktopansicht (breiter Bildschirm) sieht sauber aus
- [ ] Kein horizontales Scrollen auf irgendeinem Gerät
- [ ] Footer-Logo wird korrekt angezeigt

Sobald diese Liste vollständig abgehakt ist, ist die Website
produktionsreif live.
