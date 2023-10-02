# react-simple-book-catalog-server

- http://localhost:9000

You now have a full REST API. Test with POSTMAN or any other REST Client ):::

Retrieve all (GET):

```bash
GET http://localhost:9000/books
```

Retrieve one (GET):

```bash
GET http://localhost:9000/books/1
```

Post a todo (POST):

```bash
POST http://localhost:9000/books text="Learn Redux" completed=false color="red"
```

Update todo (PUT):

```bash
PUT http://localhost:9000/books/3 name="Learn Redux" completed=true color="green"
```

Delete todo (DELETE):

```bash
DELETE http://localhost:9000/books/1
```