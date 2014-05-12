$(document).ready(function(){

   $('li').click(function(){
      $('.content').fadeOut('slow');
      $('li').removeClass('active');
      $(this).toggleClass('active');
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
            $('.content').fadeIn('fast');
         }
      });
   });

   function metersToMiles(meters) {
      return Math.round((meters / 1609.344) * 100) / 100;
   }
});
