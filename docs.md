# Drizzle

Drizzle has 2 ways of applying changes to the database:

- ```npm generate``` (npx drizzle-kit generate) and then
- ```npm migrate``` (npx drizzle-kit migrate)

OR

- ```npm push``` (npx drizzle-kit push)

Generate / migrate is recommended for projects that needs migration files.

Push is recommended for quickly iterating through changes or for projects that doesn't require migration files.

To apply changes to the DB through a script, simply change the content of the scripts/seed.ts file and run the following command:
```npx tsx scripts/seed.ts```