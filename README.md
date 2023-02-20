# Home Library Service

## Prerequisites

- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

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

- `POST /user` - create a user

  ```javascript
  {
    login: string;
    password: string;
  }
  ```

  - Server answer with `status code` **201** and newly created record if the request is valid
  - Server answer with `status code` **400** if request `body` does not contain **required** fields

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
- `DELETE /user/:id` - delete the user

  - Server answer with `status code` **204** if the record is found and deleted
  - Server answer with `status code` **400** if `userId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if record with `id === userId` doesn't exist
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
- `GET /track/:id` - get a single track by id
  - Serveshould answer with `status code` **200** and record with `id === trackId` if it exists
  - Server answer with `status code` **400** if `trackId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if record with `id === trackId` doesn't exist
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

- `DELETE /track/:id` - delete track

  - Server answer with `status code` **204** if the record is found and deleted
  - Server answer with `status code` **400** if `trackId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if a record with `id === trackId` doesn't exist
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
- `GET /artist/:id` - get a single artist by id
  - Server answer with `status code` **200** and record with `id === artistId` if it exists
  - Server answer with `status code` **400** if `artistId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if a record with `id === artistId` doesn't exist
- `POST /artist` - create a new artist

```javascript
{
  name: string;
  grammy: boolean;
}
```

- Server answer with `status code` **201** and newly created record if the request is valid
- Server answer with `status code` **400** if request `body` does not contain **required** fields
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
- `DELETE /artist/:id` - delete an album

  - Server answer with `status code` **204** if the record is found and deleted
  - Server answer with `status code` **400** if `artistId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if a record with `id === artistId` doesn't exist
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
- `GET /album/:id` - get a single album by id
  - Server answer with `status code` **200** and record with `id === albumId` if it exists
  - Server answer with `status code` **400** if `albumId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if a record with `id === albumId` doesn't exist
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
- `DELETE /album/:id` - delete an album

  - Server answer with `status code` **204** if the record is found and deleted
  - Server answer with `status code` **400** if `albumId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if a record with `id === albumId` doesn't exist
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
- `DELETE /favs/track/:id` - delete the track from favorites
  - Server answer with `status code` **204** if the track was in favorites and now its deleted id is found and deleted
  - Server answer with `status code` **400** if `trackId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if the corresponding track is not favorite
- `POST /favs/album/:id` - add the album to the favorites
  - Server answer with `status code` **201** if album with `id === albumId` exists
  - Server answer with `status code` **400** if `albumId` is invalid (not `uuid`)
  - Server answer with `status code` **422** if an album with `id === albumId` doesn't exist
- `DELETE /favs/album/:id` - delete the album from favorites
  - Server answer with `status code` **204** if the album was in favorites and now its deleted id is found and deleted
  - Server answer with `status code` **400** if `albumId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if the corresponding album is not favorite
- `POST /favs/artist/:id` - add artist to the favorites
  - Server answer with `status code` **201** if artist with `id === artistId` exists
  - Server answer with `status code` **400** if `artistId` is invalid (not `uuid`)
  - Server answer with `status code` **422** if an artist with `id === artistId` doesn't exist
- `DELETE /favs/artist/:id` - delete artist from favorites
  - Server answer with `status code` **204** if the artist was in favorites and now its deleted id is found and deleted
  - Server answer with `status code` **400** if `artistId` is invalid (not `uuid`)
  - Server answer with `status code` **404** if the corresponding artist is not favorite

When you delete `Artist`, `Album` or `Track`, its `id` is deleted from favorites (it was there) and references to it in other entities are equal `null`. For example: `Artist` is deleted => this `artistId` in corresponding `Albums`'s and `Track`'s equal `null` + this artist's `id` is deleted from favorites, same logic for `Album` and `Track`.

</details>
