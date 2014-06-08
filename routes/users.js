exports.contact = function(db) {
   return function (request, response) {
      var contactInformation = db.get('contact');
      contactInformation.find({}, {}, function (e, contact) {
         if (contact == null) {
            response.render('500', {"title": "Oops...", "reason": "no contact information found in the database"});
         }
         response.send(contact);
      });
   }
};

exports.resume = function(db) {
   return function (request, response) {
      var resumeInformation = db.get('resume');
      resumeInformation.find({}, {}, function (e, resume) {
         if (resume == null) {
            response.render('500', {"title": "Oops...", "reason": "no resume information found in the database"});
         }
         response.send(resume);
      });
   }
};
