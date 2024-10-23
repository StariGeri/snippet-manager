# Snippet manager

## Stack

- Next.js App router
- npm
- Typescript
- Tailwind CSS
- ShadCn/ui
- Clerk authentication
- Neon DB (Serverless PostgreSQL)
- Vercel (deployhoz)
- Drizzle (ORM)

## Specifikáció

A felhasználó snippeteket gyűjthet, azokat csoportosíthatja és azokban kereshet. Az app használatához regisztrálni kell és az alkalmazásba belépni.

A snippetekről a következőket tároljuk:
- ID
- Cím
- technológia (Text, Bash, C, JSX stb..)
- Tagek (azaz kategóriák)
- kód
- szülő mappa (lehet null, nem muszáj, hogy legyen mappába sorolva)
- Author (felhasználó)

A snippeteket a tagek és technológiák alapján csoportosíthatjuk. A cím alapján szabadszavasan kereshetünk. 

A főoldalon a snippetek megtekinthetőek és betöltenek Infinite Scrollal, itt lehet szűrni / keresni azokat.

A Sidebar-on meg lehet tekinteni a mappa struktúrát és kattintásra a snippetek innen is megnyithatóak.

Az elérés útjától függetlenül (főoldal vagy sidebar) egy snippet oldalra megyünk, ahol az a snippet megtekinthető / törölhető és módosítható.

## Code highlight
https://www.youtube.com/watch?v=c92sIJ9p9fA&ab_channel=VladyslavDihtiarenko
