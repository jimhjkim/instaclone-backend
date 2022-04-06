# Instagram Clone

Instagram clone backend.

## Tech stack

- Node.js
- Typescript
- Prisma
- Apollo GraphQL

## Features

### User:

- [x] Create Account
- [x] See Profile
- [x] Login
- [x] Edit Profile
- [x] Follow User
- [x] Unfollow User
- [x] Change Avatar (Image Upload)
- [x] See Followers w/ Pagination
- [x] See Following w/ Pagination
- [x] Computed Fields
- [x] Search Users

### Photos:

- [x] Upload Photo (Parse #)
- [x] See Photo
- [x] See Hashtag
- [x] Search Photos
- [x] Edit Photo
- [ ] Like/Unlike Photo
- [ ] See Photo Likes
- [ ] See Feed
- [ ] See Photo Comments
- [ ] Delete Photo

### Comments

- [ ] Comment on Photo
- [ ] Delete Comment
- [ ] Edit Comment

### Refactor

- [ ] Mutation Responses

### Extras

- [ ] S3 Image Upload

### DMs

- [ ] See Rooms
- [ ] Send Message (Create Room)
- [ ] See Room
- [ ] Computed Fields
- [ ] See (Read) Message
- [ ] Realtime Messages

## Getting Started

### Database Setup

Install postgres

```bash
brew install postgresql
postgres -V
psql postgres
```

Create project user:

```sql
CREATE ROLE instaclone_user WITH LOGIN PASSWORD 'postgres';
ALTER ROLE instaclone_user CREATEDB;
\du
```

Create project database

```sql
CREATE DATABASE instaclone OWNER instaclone_user;
\l
\q
```

### Environment Variables

```bash
cp .env-example .env
```

Populate the `DATABASE_URL` with the information from above.

Populate the `SECRET_KEY` by using a site such as `https://randomkeygen.com/`. This is the key used to sign the JSON Web Token (jwt).

## Running the App

Install packages

```bash
npm install --include=dev
```

Populate your local DB with the schema. Remember to run this command every time you change the schema.

```bash
npm run migrate
```

Run server

```bash
npm run dev
```

Run Prisma Studio (to peek at your database)

```bash
npm run studio
```
