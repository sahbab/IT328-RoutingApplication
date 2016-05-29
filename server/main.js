import { Meteor } from 'meteor/meteor';
import { productsCollection } from '../collections/collections.js';


Meteor.startup(() => {Meteor.call('addDummyData'); 
});

Meteor.methods({
	productInsert: function(product) {
		//return the id of the new record 
		return productsCollection.insert(product);  
}, 
	productDelete: function(_id) {
		productsCollection.remove({"_id": _id}); 
},
	productUpdate: function(updatedProduct){
		
		productsCollection.update({"_id": updatedProduct._id}, {"$set": { 
		name: updatedProduct.name, 
		price: updatedProduct.price,
	description: updatedProduct.description }}); 
},
	addDummyData: function(){
		productsCollection.remove({}); 
		productsCollection.insert( 
		{ 
		name: 'Clean Bright Soap', 
		price: 1.99, 
		description: 'Another work day requires clean bright soap!'
		
		} 

	); 

		productsCollection.insert( 
		{
		name: 'Live and Die Another Day Bluray', 
		price: 19.99, 
		description: 'Bond is in over his head... Lorem ipsum dolor sit amet, consectetur adipiscing elit. '
		
		} 
	); 
		productsCollection.insert( 
		{
		name: 'Omnisound Earphones', 
		price: 15.99, 
		description: 'Every sound is in 3D!!! Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
		}
	);
	 
	productsCollection.insert( 
		{
		name: 'Neon Surfboard', 
		price: 199.99, 
		description: 'The waves have never looked so good! Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
		} 
	
	); productsCollection.insert( 
		{
		name: 'Black Gel Pen 6ct', 
		price: 3.99, 
		description: 'This is a good pen buy it!'
		} 
	
	);

	}
	});
		
	Meteor.publish('allProducts', function(){
		return productsCollection.find();
	});

		
		
		
