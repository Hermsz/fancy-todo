# Fancy To Do 

**Usage**

```
npm install
npm run dev
live-server --host=localhost
```

Access client via `http://localhost:8080`
Access server via `http://localhost:3000`

1. **List of users routes:** 

| Route                 | HTTP | Header(s) | Body                                                         | RESPONSE Success | RESPONSE Error        | Description                                |
| --------------------- | ---- | --------- | ------------------------------------------------------------ | ---------------- | --------------------- | ------------------------------------------ |
| /users/register       | POST | none      | firstName:String(**required**)<br />lastName:String(**required**)<br/>email:String(**required**)<br/>password:String(**required**) | Register a user  | Internal server error | register as a user                         |
| /users/sign-in        | POST | none      | email:String(**required**)<br />password:String(**required**) | Success Login    | Internal Server Error | Login as a user                            |
| /users/google-sign-in | POST | none      | email:String(**required**)<br />password:String(**required**) | Success Login    | Internal Server Error | Login as a user (**Using Google Account**) |

2. **List of todos routes:** 

| Route               | HTTP   | Header(s) | Body                                                         | RESPONSE Success       | RESPONSE Error        | Description             |
| ------------------- | ------ | --------- | ------------------------------------------------------------ | ---------------------- | --------------------- | ----------------------- |
| /todos              | POST   | Token     | taskName:String(**required**)<br />description:String(**required**)<br/>dueDate:Date(**required**) | Success add new to do  | Internal server error | Create a new to  do     |
| /todos/:id/complete | PATCH  | Token     | none                                                         | Success complete  task | Internal Server Error | Complete  a task        |
| /todos/:id          | DELETE | token     | none                                                         | Success Delete Task    | Internal Server Error | Delete a task from User |

