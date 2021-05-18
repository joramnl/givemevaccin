# GiveMeVaccin

Bekijkt om de minuut de prullenbakvaccin website om te kijken of:
 * Er nieuwe locaties zijn
 * Er locaties verdwenen zijn
 * Er mogelijk vaccins beschikbaar zijn.

Stuurt hiervoor een pushnotificatie naar een apparaat. Dit werkt met Pushsafer.

## Installatie
 1. `npm install`
 2. Open `.env.example` en plaats je eigen pushsafer api key.
 3. Hernoem `.env.example` naar `.env`
 4. Start de applicatie en laat deze draaien. (bijv met pm2)

## Versies

| Versie | Beschrijving |
| --- | --- |
| 1.0   | Heeft een paar dagen gewerkt, totdat de site werdt geupdate en de kaart nu een afbeelding is |
| 2.0   | Bekijkt de kleuren van de kaart, als deze veranderen dan zal er wel een locatie zijn met beschikbare vaccins |