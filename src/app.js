/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var vibe = require('ui/vibe');
//var Vector2 = require('vector2');

var timerStarted = false;
var timerType = "";
var onBreak = true;
var secondOption = function(){
  if(timerStarted){
    //if the timer is in use, show the pause button
    return "Pause";
  }else{
    //if not, show the start button
    return "Quick Start";
  }
};

// Make a list of menu items
var mainMenu = [
  {
    title: "Timers",
    subtitle: "Select a method"
  },
  {
    title: secondOption(),
    subtitle: "Start with last options"
  },
  {
    title: "About",
    subtitle: "Learn about us"
  }
];

var timersMenu = [
  {
    title: 'Pomodoro'
  },{
    title: 'Custom'
  },{
    title: '90m Windows'
  }
];

// Create the Menu, supplying the list of fruits
var mainMenu = new UI.Menu({
  sections: [{
    title: 'Pomert',
    items: mainMenu
  }]
});

// Show the Menu
mainMenu.show();


// Add a click listener for select button click
mainMenu.on('select', function(event) {
  //if the one clicked is the timer
  if(event.itemIndex === 0){
    var timerCard = new UI.Menu({
      sections: [{
        title: "Break Methods",
        items: timersMenu
      }]
    }); 
    
    //Show the Timer card
    timerCard.show();
    
    timerCard.on('select', function(event) {
      //if the one clicked is Pomodoro
      if(event.itemIndex === 0 ){
        //if the timer hasn't started, then start it
        if(timerStarted === false){
          timerStarted = true;
          onBreak = false;
          timerType = "pomodoro";
          //breaks every 100 minutes (for 15 minutes)
          pomodoro();
          //calling breakTime function which should continue for 15 minutes
        
        }
      }  
    });                               
  }else if(event.itemIndex === 2){
    var aboutCard = new UI.Card({
      title:"About",
      body: "This application was designed to..."
    });
    aboutCard.show();
    
  }  
});

function pomodoro(){
  worktime();
  //while(timerStarted){
    setTimeout(breaktime(),1500000);
    setTimeout(worktime(),300000);
  //}
}

function breaktime(){
  //vibrate
  vibe.vibrate();
  Pebble.showSimpleNotificationOnPebble("Break!", "Break time!");

}

function worktime(){
  //vibrate
  vibe.vibrate();
  Pebble.showSimpleNotificationOnPebble("Work!", "Get to Work!");

}
