const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [Product]
  })
  .then(tags => res.json(tags))
  .catch(err => res.status(404).json(err));
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product,
    through: ProductTag
  }]
  })
  .then(tag => {
    if (!tag) {
      res.status(404).json({ message: "There is no tag with this id."});
      return;
    };
    res.json(tag);
  })
  .catch(err => res.status(404).json(err));
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then(newTag => res.json(newTag))
  .catch(err => res.status(400).json(err));
  // create a new tag
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((err) => res.status(400).json(err));
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deletedTag => {
    if(!deletedTag) {
      res.status(400).json({ message: "No existing tag with this ID!" });
      return;
    };
    res.json(deletedTag);
  })
  .catch(err => res.status(500).json(err));
  // delete on tag by its `id` value
});

module.exports = router;
