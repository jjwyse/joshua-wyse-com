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
