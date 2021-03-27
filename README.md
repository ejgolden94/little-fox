# Little Fox Cups and Cones 

## Problem
My sister has an ice cream business called Little Fox Cups and cones. She needs a website for customers to go to:
- find out information about the buisiness such as hours and location
- see all of the available flavors
- place online orders for pickup. 
---
## User Stories
### As a customer of the site I would like to be able to:
- find out more about Little Fox such as hours and location
- view all of the icecream flavors and add them to a cart
- view my cart and add or delete items
- place an order for pickup 
- cancel my orders
- write a review 

### As an Admin of the site I would like to be able to:
- add new flavors and have them display on the menu 
- have the ability to mark flavors as out of stock so that no one can add them to their order
- edit flavors' descriptions and prices if there are any changes
- view my current orders (and mark them as completed?)
- delete icecream flavors that are not in season
---
## Technologies 
This is a basic CRUD App using:
- `Javascript`
- `HTML`
- `CSS`
- `Express`
- `EJS`
- `Mongo DB`
- `Mongoose`
- `bcrypt`
- `Multer`
---
## Routes
### General 
- `get /` - main page of the site, carousel of images giving the vibe of the shop plus location, and hours
- `get /menu` - a pdf of the menu
### Flavors 
- `get /flavors/seed` - seed the data base with flavors
- `get /flavors` - see all of the icecream flavors  
- `get /flavors/:id` - see the details of one specific icecream flavor
- `get /flavors/new` - fill out a form to create a new icecream flavor 
- `post /flavors` - add new icecream flavor, redirect to main flavors page
- `get /flavors/:id/edit` - fill out a form to change the details of a specific icecream flavor
- `put /flavors/:id/` - submit the edited details of a specific icecream flavor
- `delete /flavors/:id` - delete a specific icecream flavor 

### Cart 
- `post /orders/:username/:id/add` - adds a specific flavor to a customers cart 
- `put /orders/:username/:id/:itemId/:action` - edit an item in your cart
- `get /orders/:username` - see all of the items in your cart (and the quantity?)
- `delete /cart/:username/:id` - remove an item from your cart 
- `post /order/:id/placeOrder` - submit your order for pickup 

### Orders
- `get /orders/:username` - see all of your past and current orders 
- `put /orders/:id/edit` - edit your order
- `get /orders/active` - admin view of all orders that need to be filled and when
---
## Models
### icecream
```
{
    flavor: {type: String, unique: true, required: true},
    description: String,
    price: {type: Number, required: true, min: 0}, 
    available: {type: Boolean, default: true},
    glutenFree: {type: Boolean, default: false},
    plantBased: {type: Boolean, default: false},
    allergens: Array,  
    img: {data: Buffer, contentType: String}  
}
```
### users
```
{
    username: {type: String, unique: true, required: true},
    isAdmin: {type: Boolean, default: false},
    password: {type: String, required: true}
}
```
### orders 
```
{
    orderItems: [{
        product: String,
        quantity: Number,
        price: Number
    }], 
    orderName: String,
    user: {type: String, required: true},
    orderStatus: String,
    pickUpTime: String,
    pickUpDate: Date,
    orderTotal: Number
}
```
---
## Wireframe

![All Flavors](./littlefox_index.png)
![One Flavors](./littlefox_show.png)

---
## Future Features
- Add more feedback to user actions -- like when you 'Add to Cart' a flag would show up to say you did that successfully and a badge with your total order items would appear on the cart
- a user control panel where an admin can remove/edit users and update their admin status
- adding product thumbnails to the cart
- be able to search in the flavors index and also the orders indexes
- display more info on the show page - such as the allergens, gluten free, and whether or not there's a plant based option
- capability to add special instructions when placing an order
- the ability to ask for help -- either via an email template or a chat 
- the ability to place bulk orders
- the ability to join the "super secret club for icecream lovers only" and sign up for the newsletter
- Add a payment plugin like Stripe so users can pay ahead of time


## Known Bugs
- quantity field should have a min of 0
- pick up date and time should not be outside of open hours and should not be earlier than now (or really 30 mins from now)
- if a flavor record is updated, its should update everyones cart (thinking about availability and price)
