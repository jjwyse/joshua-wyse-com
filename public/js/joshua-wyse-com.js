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
               $('.content').append(createProject(project.html_url, project.name, project.description, project.language));
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

   function createProject(html_url, name, description, language) {
      return '<div class="panel panel-default">' +
         '<div class="panel-heading">' +
            '<a target="_blank" href="' + html_url + '">' +
               '<img src="/images/github_small.png">' +
            '</a>' +
            '<b>' + name + '</b>' + ' - <small><i>' + description + '</i></small>' +
         '</div>' +
         '<ul class="list-group">' +
            '<li class="list-group-item"><b>language: </b>' + language + '</li>' +
         '</ul>' +
      '</div>';
   }
});
