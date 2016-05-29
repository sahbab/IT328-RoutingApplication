import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { productsCollection } from '../collections/collections.js';

import './main.html';


//import my products
Meteor.subscribe('allProducts');

Template.productList.helpers({
    products: function(){
        return productsCollection.find();
    }
});


Template.addProduct.events({
    'submit #addProductForm': function(event){
        event.preventDefault();
        
        //insert a new record
        Meteor.call('productInsert', {
            name:  $('input[name="name"]').val(),
            price: $('input[name="price"]').val(),
            description: $('textarea[name="description"]').val()
        }, function(error, result){
            Router.go('/viewProduct/' + result);
        });
    }
});


Template.editProduct.events({
    'submit #editProductForm': function(event){
        event.preventDefault();
        var product = this;
        
        //get updated values from our form
        product.name = $('input[name="name"]').val();
        product.price = $('input[name="price"]').val();
        product.description = $('textarea[name="description"]').val();
        
        //insert a new record
        Meteor.call('productUpdate', product, function(error, result){
            Router.go('/viewProduct/' + product._id);
        });
    }
});
