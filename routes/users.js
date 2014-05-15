exports.contact = function(db) {
   return function (req, res) {
      var contactInformation = db.get('contact');
      if (contactInformation == null) {
      }
   }
};
