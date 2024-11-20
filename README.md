Snippet Manager for organizing and categorizing code snippets.

The app is deployed on Vercel and can be visited: https://snippet-manager-pink.vercel.app/
The git repo:https://github.com/StariGeri/snippet-manager

# Running the app

After cloning the repo, there is a few things to do. The app uses 3rd party solution for authentication and for the database.

1. run `npm install`

2) Create a .env file and get the necessary variables (there is a template at the bottom of this .md file)
   - Sign up on https://clerk.com/ and create a new project. Copy the env variables.
   - Sign up on https://vercel.com/ and create a new project, then create a Vercel Postgres database (storage tab). Copy the environment variables.
3) Generate the database tables with `npm generate` and then migrate the changes with `npm migrate`.
4) (Optional) Drizzle provides a GUI for watching the database. You can run drizzle studio with `npx tsx scripts/seed.ts`
5) Run the app with `npm run dev`.
6) 🎉 Aaaand that is it! The app is running on http://localhost:3000

# .env template

Note that all of these values can be copied from both of the dashboards when creating these variables.

POSTGRES_DATABASE=XX
POSTGRES_HOST=XX
POSTGRES_PASSWORD=XX
POSTGRES_PRISMA_URL=XX
POSTGRES_URL=XX
POSTGRES_URL_NON_POOLING=XX
POSTGRES_URL_NO_SSL=XX
POSTGRES_USER=XX

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=XX
CLERK_SECRET_KEY=XX

// These are correct variables, there is no need to change them.
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
