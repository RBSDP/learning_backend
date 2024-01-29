This is backend project repo

<!-- the fillowing is the notes for Autentication took form Piyush Garg channel  -->

Authentication

# Authentication is of two types
1)stateful authentication - Which maintains state or data on server side 
2)stateless authetication - which have no state

## Stateful Authetication : 
Lets understand Statefull autentication with a story. lets consider you went to a hotel and you need to give your car to parking boy to park your car, the parking box takes your car and he gives you a ticket with some unique number on it and he maintains a dairy in which it is written your car number corresponding to your unique id. so when you come back and give your ticket,  he will check your unique in the dairy and bring the car correspoiding to that unique id. Here the dairy is called as state.

lets take a practical example: A client sends a request to the server with username and pasword and the server check wheather the username and password are correct and if they are correct then the server creates a uid(unique id) and it stores that unique id and also sends it to client. so whenhever a clint wants to access any information he needs to send the uid with that request. so consider clint loged into his acccount and he wants information of users, so he sends a request to server with uid and the server checks the uid and checks with the uid present in the state and it sends the users data to clint if uid is correct. uid also known as session uid.

we can send this uid in different ways 
1)cookies - if we are working on browsers we send it as cookies
2)headers - if we are working on mobile apps we will send uid in headers

3)response

