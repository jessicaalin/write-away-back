const express = require("express");

const Doc = require("../models/doc-model");

const router = express.Router();

router.get("/dashboard", (req, res, next) => {
  if (req.user === undefined) {
    res.status(400).json({ error: "Not logged in." });
    console.log('Not logged in.');
    return;
  }

  Doc
    .find({ $or:
      [
        {title: "Read Me"},
        {author: req.user._id}
      ]
    })
    .sort({updatedAt: -1})
    .exec()
    .then((docResults) => {
      res.status(200).json(docResults);
    })
    .catch((err) => {
      console.log("GET /doc ERROR!");
      console.log(err);
      res.status(500).json({error: "Doc list database error."});
    });

});


router.get("/doc/:id", (req, res, next) => {
  if (req.user === undefined) {
    res.status(400).json({ error: "Not logged in." });
    return;
  }
  Doc.findById(req.params.id)
    .then((docFromDb) => {
      if (docFromDb === null ) {
        res.status(400).json({ error: "Doc not found." });
      }
      else {
        res.status(200).json(docFromDb);
      }
    })
    .catch((err) => {
      console.log("GET /doc/:id ERROR!");
      console.log(err);
      res.status(500).json({ error: "Doc details database error." });
    });
});

router.patch("/doc/new/", (req, res, next) => {
  const theDoc = new Doc ({
    title: req.body.title,
    author: req.user._id
  });

  theDoc.save()
  .then(() => {
    res.status(200).json(theDoc);
  })
  .catch((err) => {
    console.log("POST /docs ERROR");
    console.log(err);
    if (err.errors) {
      res.status(400).json(err.errors);
    }
    else {
      res.status(500).json({error: "Doc save database error."});
    }
  });
});

router.patch("/doc/edit/title/:id", (req, res, next) => {
  Doc.findById(req.params.id)
    .then((docFromDb) => {
      if (docFromDb === null ) {
        res.status(400).json({ error: "Doc not found." });
        return;
      }
      console.log(req.body);
      if (req.body.title ) {
        docFromDb.set({
          title: req.body.title
        });
      }
      if (req.body.text) {
        docFromDb.set({
          text: req.body.text
        });
      }
      return docFromDb.save();
    })
    .then((docFromDb) => {
      res.status(200).json(docFromDb);
    })
    .catch((err) => {
      console.log("PUT /doc/:id ERROR!");
      console.log(err);
      if (err.errors) {
        res.status(400).json(err.errors);
      }
      else {
        res.status(500).json({ error: "Doc update database error." });
      }
    });
});


router.patch("/doc/edit/text/:id", (req, res, next) => {
  Doc.findById(req.params.id)
    .then((docFromDb) => {
      if (docFromDb === null ) {
        res.status(400).json({ error: "Doc not found." });
        return;
      }
      console.log(req.body);
      if (req.body.title ) {
        docFromDb.set({
          title: req.body.title
        });
      }
      if (req.body.text) {
        docFromDb.set({
          text: req.body.text
        });
      }
      return docFromDb.save();
    })
    .then((docFromDb) => {
      res.status(200).json(docFromDb);
    })
    .catch((err) => {
      console.log("PUT /doc/:id ERROR!");
      console.log(err);
      if (err.errors) {
        res.status(400).json(err.errors);
      }
      else {
        res.status(500).json({ error: "Doc update database error." });
      }
    });
});

router.delete("/doc/:id", (req, res, next) => {
  if (req.user === undefined) {
    res.status(400).json({ error: "Not logged in." });
    return;
  }
  Doc.findByIdAndRemove(req.params.id)
    .then((docFromDb) => {
      if (docFromDb === null) {
        res.status(400).json({ error: "Doc not found." });
      }
      else {
        res.status(200).json(docFromDb);
      }
    })
    .catch((docFromDb) => {
      console.log("DELETE /doc/:id ERROR!");
      console.log(err);
      res.status(500).json({ error: "Doc delete database error!" });
    });
});

module.exports = router;
