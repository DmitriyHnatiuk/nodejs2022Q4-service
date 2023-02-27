# Home Library Service

## Prerequisites

- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

- Docker - [Download & Install Docker](https://www.docker.com/)

## Installing NPM modules

```
npm install
```

## Running the application

rename file `.env.example` to `.env`

```
npm run docker:up
```

npm script for vulnerabilities scanning (free solution)

```
npm run docker:vulnerabilities
```

After starting the app on port (4000 as default or changing it on `.env` file to `PORT=5000` ) you can open http://localhost:4000

## Running the application

```
npm run docker:down
```

## Testing

After the application runs open a new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

**Details:**
`Auth`

<details>
<summary><h4>Auth fields</h4></summary>
<pre>
  {
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
  }
</pre>
</details>
<details>
<summary><h4>/auth</h4></summary>

- `POST /auth/signup` - create a user

  ```javascript
  {
    login: string; // unique
    password: string;
  }
  ```

  - Server answer with `status code` **201** corresponding message if dto is valid
  - Server answer with `status code` **400** if request `body` does not contain **required** fields

- `POST /auth/login` - send login and password to get Access token and Refresh token (optionally)

  - Server answer with `status code` **200** and tokens if dto is valid
  - Server answer with `status code` **400** if fields is invalid (no login or password, or they are not a strings)
  - Server answer with `status code` **400** if authentication failed (no user with such login, password doesn't match actual one, etc.)

- `POST /auth/refresh` - send refresh token in body as { refreshToken } to get new pair of Access token and Refresh token

  - Server answer with `status code` **200** and tokens if dto is valid
  - Server answer with `status code` **400** if dto is invalid (no refreshToken in body)
  - Server answer with `status code` **400** if authentication failed (Refresh token is invalid or expired)
  </details>

  ```
  The Access token should be added in HTTP Authorization header to all requests that requires authentication. Proxy all the requests (except auth/signup, auth/login, /doc, /)
  ```

  ### Access token.

  HTTP authentication must follow Bearer scheme:

```
Authorization: Bearer <jwt_token>

```

`Users`

<details>
<summary><h4>Users fields</h4></summary>
<pre>
  {
    id: string; // uuid v4
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
  }
</pre>
</details>
<details>
<summary><h4>/user</h4></summary>

The user's password does not exist from the server response.

- `GET /user` - get all users
  - Server answer with `status code` **200** and all users records
- `GET /user/:id` - get single user by id

  - Server answer with `status code` **200** and record with `id === userId` if it exists
  - Server answer with `status code` **400** if `userId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if a record with `id === userId` doesn't exist
  - Server answer with `status code` **401** bad token or missing

- `POST /user` - create a user

  ```javascript
  {
    login: string;
    password: string;
  }
  ```

- Server answer with `status code` **201** and newly created record if the request is valid
- Server answer with `status code` **400** if request `body` does not contain **required** fields
- Server answer with `status code` **401** bad token or missing

- `PUT /user/:id` - update the user's password

  ```javascript
  {
    oldPassword: string; // previous password
    newPassword: string; // new password
  }
  ```

  - Server answer with` status code` **200** and updated record if request is valid
  - Server answer with` status code` **400** if `userId` is invalid (not `uuid`)
  - Server answer with` status code` **404** if a record with `id === userId` doesn't exist
  - Server answer with` status code` **403** if `oldPassword` is wrong
  - Server answer with `status code` **401** bad token or missing

- `DELETE /user/:id` - delete the user

  - Server answer with `status code` **204** if the record is found and deleted
  - Server answer with `status code` **400** if `userId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if record with `id === userId` doesn't exist
  - Server answer with `status code` **401** bad token or missing
  </details>

`Tracks`

<details>
<summary><h4>Tracks fields</h4></summary>
<pre>
  {
    id: string; // uuid v4
    name: string;
    artistId: string | null; // refers to Artist
    albumId: string | null; // refers to Album
    duration: number; // integer number
  }
</pre>
</details>

<details>
<summary><h4>/track</h4></summary>

- `GET /track` - get all tracks

  - Server answer with `status code` **200** and all tracks records
  - Server answer with `status code` **401** bad token or missing

- `GET /track/:id` - get a single track by id

  - Serveshould answer with `status code` **200** and record with `id === trackId` if it exists
  - Server answer with `status code` **400** if `trackId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if record with `id === trackId` doesn't exist
  - Server answer with `status code` **401** bad token or missing

- `POST /track` - create a new track

  ```javascript
  {
    name: string;
    artistId: string;
    albumId: string;
    duration: number;
  }
  ```

  - Server answer with `status code` **201** and newly created record if the request is valid
  - Server answer with `status code` **400** if request `body` does not contain **required** fields
  - Server answer with `status code` **401** bad token or missing

- `PUT /track/:id` - update track info

  ```javascript
  optional fields{
    name: string;
    artistId: string;
    albumId: string;
    duration: number;
  }
  ```

  - Server answer with` status code` **200** and updated record if the request is valid
  - Server answer with` status code` **400** if `trackId` is invalid (not `uuid`)
  - Server answer with` status code` **404** if a record with `id === trackId` doesn't exist
  - Server answer with `status code` **401** bad token or missing

- `DELETE /track/:id` - delete track

  - Server answer with `status code` **204** if the record is found and deleted
  - Server answer with `status code` **400** if `trackId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if a record with `id === trackId` doesn't exist
  - Server answer with `status code` **401** bad token or missing
  </details>

`Artists`

<details>
<summary><h4>Artists fields</h4></summary>
<pre>
{
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}
</pre>
</details>

<details>
<summary><h4>/artist</h4></summary>

- `GET /artist` - get all artists

  - Server answer with `status code` **200** and all artist's records
  - Server answer with `status code` **401** bad token or missing

- `GET /artist/:id` - get a single artist by id

  - Server answer with `status code` **200** and record with `id === artistId` if it exists
  - Server answer with `status code` **400** if `artistId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if a record with `id === artistId` doesn't exist
  - Server answer with `status code` **401** bad token or missing

- `POST /artist` - create a new artist

```javascript
{
  name: string;
  grammy: boolean;
}
```

- Server answer with `status code` **201** and newly created record if the request is valid
- Server answer with `status code` **400** if request `body` does not contain **required** fields
- Server answer with `status code` **401** bad token or missing

- `PUT /artist/:id` - update artist info

```javascript
{
  name: string;
  grammy: boolean;
}
```

- Server answer with` status code` **200** and updated record if the request is valid
- Server answer with` status code` **400** if `artist` is invalid (not `uuid`)
- Server answer with` status code` **404** if a record with `id === artistId` doesn't exist
- Server answer with `status code` **401** bad token or missing

- `DELETE /artist/:id` - delete an album

  - Server answer with `status code` **204** if the record is found and deleted
  - Server answer with `status code` **400** if `artistId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if a record with `id === artistId` doesn't exist
  - Server answer with `status code` **401** bad token or missing

  </details>

`Albums`

<details>
<summary><h4>Albums fields</h4></summary>
<pre>
{
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
</pre>
</details>

<details>
<summary><h4>/albums</h4></summary>

- `GET /album` - get all albums

  - Server answer with `status code` **200** and all albums records
  - Server answer with `status code` **401** bad token or missing

- `GET /album/:id` - get a single album by id

  - Server answer with `status code` **200** and record with `id === albumId` if it exists
  - Server answer with `status code` **400** if `albumId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if a record with `id === albumId` doesn't exist
  - Server answer with `status code` **401** bad token or missing

- `POST /album` - Create a new album

```javascript
{
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
```

- Server answer with `status code` **201** and newly created record if the request is valid
- Server answer with `status code` **400** if request `body` does not contain **required** fields
- Server answer with `status code` **401** bad token or missing

- `PUT /album/:id` - update album info

```javascript
{
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
```

- Server answer with` status code` **200** and updated record if the request is valid
- Server answer with` status code` **400** if `albumId` is invalid (not `uuid`)
- Server answer with` status code` **404** if a record with `id === albumId` doesn't exist
- Server answer with `status code` **401** bad token or missing

- `DELETE /album/:id` - delete an album

  - Server answer with `status code` **204** if the record is found and deleted
  - Server answer with `status code` **400** if `albumId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if a record with `id === albumId` doesn't exist
  - Server answer with `status code` **401** bad token or missing
  </details>

`Favorites`

<details>
<summary><h4>Favorites fields</h4></summary>
<pre>
{
  artists: string[]; // favorite artists
  albums: string[]; // favorite albums
  tracks: string[]; // favorite tracks
}
</pre>
</details>

<details>
<summary><h4>/favs</h4></summary>
A non-existing entity can't be added to `Favorites`.

- `GET /favs` - get all favorites

  - Server answered with `status code` **200** and all favorite records (**not their ids**), split by entity type:
  - Server answer with `status code` **401** bad token or missing

  ```javascript
  {
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
  }
  ```

- `POST /favs/track/:id` - add the track to the favorites

  - Server answer with `status code` **201** if track with `id === trackId` exists
  - Server answer with `status code` **400** if `trackId` is invalid (not `uuid`)
  - Server answer with `status code` **422** if track with `id === trackId` doesn't exist
  - Server answer with `status code` **401** bad token or missing

- `DELETE /favs/track/:id` - delete the track from favorites

  - Server answer with `status code` **204** if the track was in favorites and now its deleted id is found and deleted
  - Server answer with `status code` **400** if `trackId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if the corresponding track is not favorite
  - Server answer with `status code` **401** bad token or missing

- `POST /favs/album/:id` - add the album to the favorites

  - Server answer with `status code` **201** if album with `id === albumId` exists
  - Server answer with `status code` **400** if `albumId` is invalid (not `uuid`)
  - Server answer with `status code` **422** if an album with `id === albumId` doesn't exist
  - Server answer with `status code` **401** bad token or missing

- `DELETE /favs/album/:id` - delete the album from favorites

  - Server answer with `status code` **204** if the album was in favorites and now its deleted id is found and deleted
  - Server answer with `status code` **400** if `albumId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if the corresponding album is not favorite
  - Server answer with `status code` **401** bad token or missing

- `POST /favs/artist/:id` - add artist to the favorites

  - Server answer with `status code` **201** if artist with `id === artistId` exists
  - Server answer with `status code` **400** if `artistId` is invalid (not `uuid`)
  - Server answer with `status code` **422** if an artist with `id === artistId` doesn't exist
  - Server answer with `status code` **401** bad token or missing

- `DELETE /favs/artist/:id` - delete artist from favorites
  - Server answer with `status code` **204** if the artist was in favorites and now its deleted id is found and deleted
  - Server answer with `status code` **400** if `artistId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if the corresponding artist is not favorite
  - Server answer with `status code` **401** bad token or missing

When you delete `Artist`, `Album` or `Track`, its `id` is deleted from favorites (it was there) and references to it in other entities are equal `null`. For example: `Artist` is deleted => this `artistId` in corresponding `Albums`'s and `Track`'s equal `null` + this artist's `id` is deleted from favorites, same logic for `Album` and `Track`.

</details>
````
