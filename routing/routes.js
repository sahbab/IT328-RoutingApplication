
import { productsCollection } from '../collections/collections.js';

Router.route('/', function () {
  this.render('productList');
});

Router.route('/viewProduct/:_id', function () {
    this.render('viewProduct', {
  data: function(){
    return productsCollection.findOne({'_id' : this.params._id});
  }
  
    });
});

Router.route('/addProduct', function () {
  this.render('addProduct');
});

Router.route('/editProduct/:_id', function () {
   this.render('editProduct', {
  data: function(){
    return productsCollection.findOne({'_id' : this.params._id});
  }
     });
});

Router.route('/deleteProduct/:_id', function () {
  Meteor.call('productDelete' , this.params._id, function(error, result){
    Router.go('/');
  });
  
  
});
Router.route('/login', function () {
  this.render('login');
});
//use a hook to prevent unauthorized access to templated with data
Router.onBeforeAction( function() {
    if (Meteor.user() && !Meteor.loggingIn) { //return undefined if no user is logged in
        this.redirect('/login');
    }else{
        this.next(); //tell the router to continue
    }
}, {
    except: ['login']
    
});