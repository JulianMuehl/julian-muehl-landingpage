# Deployment-Dokumentation

Diese Datei beschreibt den **tatsächlichen, aktuell live geschalteten**
Aufbau der Website — nicht mehr nur eine generische Anleitung, sondern
den echten Stand nach der Veröffentlichung.

---

## Aktueller Live-Aufbau

| Baustein | Anbieter | Details |
|---|---|---|
| Quellcode & Versionierung | GitHub | `https://github.com/JulianMuehl/julian-muehl-landingpage` (öffentlich) |
| Hosting & Auslieferung | Vercel | Projekt `julian-muehl-landingpage`, automatisches Deployment bei jedem Push auf `main` |
| Domain-Registrierung & DNS | IONOS | `julianmuehl.de` — DNS wird bei IONOS selbst verwaltet (Nameserver `ui-dns.de/biz/com/org`) |
| E-Mail | IONOS | unverändert, MX/SPF/DMARC laufen weiterhin über IONOS |
| Haupt-URL (Production) | — | `https://julianmuehl.de` |
| Weiterleitung | Vercel | `https://www.julianmuehl.de` → 308 Permanent Redirect → `https://julianmuehl.de` |
| Vorherige Lösung | Carrd | Domain-Verknüpfung entfernt, Carrd-Seite bleibt unter `*.carrd.co` bestehen (nicht gelöscht) |

**Lokal auf diesem Mac verwaltet mit GitHub Desktop** (nicht die
Kommandozeile) — Änderungen committen und pushen läuft über die
Desktop-App, siehe unten.

---

## Aktuell gesetzte DNS-Einträge bei IONOS

| Typ | Name | Wert |
|---|---|---|
| A | `@` | `216.198.79.1` |
| CNAME | `www` | `beae11a7ff692427.vercel-dns-017.com.` |

Diese Werte sind **projektspezifisch von Vercel vorgegeben** (nicht
generisch) — falls sie sich durch eine Vercel-Änderung jemals ändern
sollten, zeigt Vercel das unter *Project → Settings → Domains* an.

**Unverändert, niemals anfassen:** MX (`mx00.ionos.de`, `mx01.ionos.de`),
SPF-TXT (`v=spf1 include:_spf-eu.ionos.com ~all`), `_dmarc`-Eintrag,
alle DKIM-Einträge.

---

## Wie du künftige Änderungen veröffentlichst

1. Datei(en) im Projektordner `julian-muehl-landingpage` bearbeiten
   (z. B. `index.html`, `styles.css`).
2. Änderungen lokal testen (siehe unten „Lokal testen").
3. **GitHub Desktop** öffnen → dort erscheinen die geänderten Dateien
   automatisch im Tab **„Changes"**.
4. Unten eine kurze **Commit-Nachricht** eintragen (z. B. „Neuen Button
   ergänzt") → **„Commit to main"**.
5. Oben auf **„Push origin"** klicken.
6. Fertig — Vercel erkennt den neuen Commit automatisch und veröffentlicht
   die aktualisierte Seite innerhalb von ca. 30–60 Sekunden, ganz ohne
   weiteres Zutun.

Du kannst den Fortschritt live im Vercel-Dashboard unter
**„Deployments"** verfolgen.

---

## Lokal testen (vor jedem Push empfohlen)

1. Terminal im Projektordner öffnen.
2. `python3 -m http.server 8000`
3. Im Browser `http://localhost:8000` öffnen und prüfen.
4. Mit `Strg + C` beenden.

---

## Der ursprüngliche Einrichtungsprozess (zur Erinnerung)

Diese Schritte wurden bereits einmalig durchgeführt und müssen nicht
wiederholt werden — nur relevant, falls das Projekt jemals komplett neu
aufgesetzt werden müsste:

1. **Git-Repository lokal erstellt** (`git init`, `.gitignore`, erster Commit)
2. **GitHub Desktop installiert**, bei GitHub angemeldet, lokales Repo
   hinzugefügt und über „Publish repository" auf GitHub veröffentlicht
   (öffentliches Repo `julian-muehl-landingpage`)
3. **Vercel-Konto** über „Continue with GitHub" erstellt, Projekt aus dem
   GitHub-Repo importiert (kein Framework, kein Build-Command, Root-Verzeichnis)
   → automatisches Test-Deployment auf `julian-muehl-landingpage.vercel.app`
4. Nach Prüfung: **Domains `julianmuehl.de` und `www.julianmuehl.de` in
   Vercel hinzugefügt**, `julianmuehl.de` als Production-Domain, `www` als
   308-Redirect darauf eingestellt
5. **DNS bei IONOS umgestellt** (A-Record und CNAME wie oben, Carrd-Wert
   ersetzt) — Mail-Einträge dabei unangetastet gelassen
6. **HTTPS** wurde von Vercel automatisch aktiviert (Let's-Encrypt-Zertifikat)
7. **Carrd-Domain-Verknüpfung entfernt** (Carrd-Seite selbst blieb erhalten)

---

## Troubleshooting

- **Seite lädt nicht / DNS-Fehler:** Prüfe im Vercel-Dashboard unter
  „Domains", ob beide Einträge „Valid Configuration" zeigen. Falls nicht,
  stimmen die DNS-Werte bei IONOS nicht mehr mit den oben genannten überein.
- **Änderungen erscheinen nicht live:** Prüfe im Vercel-Dashboard unter
  „Deployments", ob der neueste Commit erfolgreich gebaut wurde (grüner
  Haken). Ein rotes Kreuz bedeutet einen Fehler im zuletzt gepushten Code.
- **E-Mail funktioniert plötzlich nicht:** Sofort MX/SPF/DMARC bei IONOS
  mit den oben dokumentierten Werten vergleichen — diese dürfen durch
  keine Domain-Änderung berührt werden.
