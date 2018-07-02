# Comment Client
This Comment Client written in Angular is the perfect admin interface for the [Comment Server](https://github.com/elyday/comment-server).

## Configuration
To use the admin interface you only have to enter the address of the Comment Server in the file `src/environments/environment.ts`. The further configuration takes place in the Comment Server.

```
export const environment = {
  production: false,
  apiUrl: 'your-server-url-here'
};
```
