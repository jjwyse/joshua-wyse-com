$(document).ready(function(){

   $('li').click(function(){
      $('.content').fadeOut('slow');
      $('li').removeClass('active');
      $(this).addClass('active');
   });


   // load all projects
   $('a#projects').click(function(){
      console.log('Loading projects...');
      $.ajax({
         type:'GET',
         url:'/api/projects',
         success:function(json){
            console.log("Retrieved projects:");
            $('.content').text("");
            $.each(json, function(key, project){
               console.log("Project name: " + project.name);
               $('.content').append(project.name + '<br/>');
            });
            console.log("Finished loading projects");
            $('.content').fadeIn('fast');
         }
      });
   });

   // show resume
   $('a#resume').click(function(){
      console.log('Loading resume...');
      $.ajax({
         type:'GET',
         url:'/api/users/resume',
         success:function(json){
            console.log("Retrieved resume:");
            $('.content').text("");
            $.each(json, function(key, resume){
               $('.content').append(resume.section + '<br/>');
            });
            console.log("Finished loading resume");
            $('.content').fadeIn('fast');
         }
      });
   });

   // load all runs
   $('a#runs').click(function(){
      console.log('Loading runs...');
      $.ajax({
         type:'GET',
         url:'/api/runs',
         success:function(json){
            console.log("Retrieved runs:");
            $('.content').text("");
            $.each(json, function(key, run){
               console.log("Run name: " + run.name);
               $('.content').append('<b>' + run.name + '</b>' + ' - ' + metersToMiles(run.distance) + ' miles <br/>');
            });
            console.log("Finished loading runs");
            // createGoogleMap();
            $('.content').fadeIn('fast');
         }
      });
   });

   // load all contact information
   $('a#contact').click(function(){
      console.log('Loading contact information...');
      $.ajax({
         type:'GET',
         url:'/api/users/contact',
         success:function(json){
            console.log("Retrieved contact information:");
            $('.content').text("");
            $.each(json, function(key, contact){
               $('.content').append('<a class="img-responsive contact-info" target="_blank" href="' + contact.link + '"><img src="/images/' + contact.source + '.png"></a>');
            });
            console.log("Finished loading contact information");
            $('.content').fadeIn('fast');
         }
      });
   });

   function createGoogleMap() {
      $('head').append('<script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>');
      $('head').append('<script>function initialize() { var map_canvas = document.getElementById(\'map_canvas\'); var map_options = { center: new google.maps.LatLng(44.5403, -78.5463), zoom: 8, mapTypeId: google.maps.MapTypeId.ROADMAP } var map = new google.maps.Map(map_canvas, map_options) } google.maps.event.addDomListener(window, \'load\', initialize);</script>');
      $('.content').append('<div id="map_canvas"></div>');
   }

   // converts meters to miles
   function metersToMiles(meters) {
      return Math.round((meters / 1609.344) * 100) / 100;
   }
});
