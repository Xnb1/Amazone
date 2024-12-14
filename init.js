const mongoose = require("mongoose");

const Product = require("./models/product.js");

Product.insertMany(
    [
        {
          "title": "Wireless Earbuds",
          "image": "/myassets/earbuds.jpg",
          "price": 49.99,
          "rating": 4.5,
          "quantity": 10
        },
        {
          "title": "Smartphone",
          "image": "/myassets/mobile.jpg",
          "price": 699.99,
          "rating": 4.8,
          "quantity": 10
        },
        {
          "title": "Gaming Mouse",
          "image": "/myassets/mouse.jpg",
          "price": 39.99,
          "rating": 4.2,
          "quantity": 10
        },
        {
          "title": "Mechanical Keyboard",
          "image": "/myassets/keyboard.png",
          "price": 89.99,
          "rating": 4.7,
          "quantity": 10
        },
        {
          "title": "Laptop Stand",
          "image": "/myassets/stand.png",
          "price": 29.99,
          "rating": 0,
          "quantity": 10
        },
        {
          "title": "Portable Charger",
          "image": "/myassets/charger.png",
          "price": 24.99,
          "rating": 4.0,
          "quantity": 10
        },
        {
          "title": "Noise-Canceling Headphones",
           "image": "/myassets/headfones.png",
          "price": 129.99,
          "rating": 4.6,
          "quantity": 10
        },
        {
          "title": "Smartwatch",
            "image": "/myassets/watch.png",
          "price": 199.99,
          "rating": 4.3,
          "quantity": 10
        },
        {
          "title": "4K Monitor",
            "image": "/myassets/monitor.png",
          "price": 329.99,
          "rating": 4.9,
          "quantity": 10
        },
        {
          "title": "Bluetooth Speaker",
            "image": "/myassets/speaker.png",
          "price": 59.99,
          "rating": 4.4,
          "quantity": 10
        }
      ]
      

);