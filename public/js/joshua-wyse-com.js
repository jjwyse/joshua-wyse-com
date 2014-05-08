$(document).ready(function(){

   // load all projects
   $('a#projects').click(function(){
      console.log('Loading projects...');
      $.ajax({
         type:'GET',
         url:'/api/projects',
         success:function(json){
            console.log("Retrieved projects:");
            $.each(json, function(key, project){
               console.log("Project name: " + project.name);
               $('.content').append(project.name + '<br/>');
            });
            console.log("Finished loading projects");
         }
      });
   });
});
