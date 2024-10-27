# Snippet manager

## Stack

- Next.js 15 App router
- npm
- Typescript
- Tailwind CSS
- Shadcn/ui
- Clerk authentication
- Neon DB (Serverless PostgreSQL)
- Vercel (Deploy)
- Drizzle (ORM)

## Specifikáció

A felhasználó kód snippeteket gyűjthet, azokat csoportosíthatja és azokban kereshet. Az app használatához regisztrálni kell és az alkalmazásba belépni.

A snippetekről a következőket tároljuk:
- ID
- Cím
- technológia (Text, Bash, C, JSX stb..)
- Tagek (azaz kategóriák)
- kód
- szülő mappa (lehet null, nem muszáj, hogy legyen mappába sorolva)
- Author (felhasználó)

A snippeteket technológia alapján lehet szűrni és szabaszavasan kereshetünk közöttük.

A főoldalon egy dashboardon tekinthetik meg a felhasználók a snippetjeikre vontatkozó statisztikákat (kategóriák szerinti lebontás stb..)

A /snippets oldalon a snippetek Infinite Scroll-al töltődnek be.

A Sidebar-on meg lehet tekinteni a mappa struktúrát és kattintásra a snippetek innen is megnyithatóak.

Az elérés útjától függetlenül (főoldal vagy sidebar) egy snippet oldalra megyünk, ahol az a snippet megtekinthető / törölhető és módosítható.

Mappákat létre lehet hozni, azokat átnevezni és törölni.
