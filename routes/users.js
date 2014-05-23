exports.contact = function(db) {
   return function (request, response) {
      var contactInformation = db.get('contact');
      contactInformation.find({}, {}, function (e, contacts) {
         if (contact == null) {
            res.render('500', {"title": "Oh shit...", "reason": "no contact information found in the database"});
         }
         res.send(contacts);
      });
   }
};

exports.resume = function(db) {
   return function (request, response) {
      var resumeInformation = db.get('resume');
      resumeInformation.find({}, {}, function (e, resume) {
         if (resume == null) {
            res.render('500', {"title": "Oh shit...", "reason": "no resume information found in the database"});
         }
         res.send(resume);
      });
   }
};
