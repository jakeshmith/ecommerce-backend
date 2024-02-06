const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [Product]
  })
  .then(categories => res.json(categories))
  .catch(err => res.status(404).json(err));
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {Product}
  })
  .then(category => {
    if (!category) {
      res.status(404).json({message: "There is no category with this id."});
      return;
    };
    res.json(category);
  })
  .catch(err => res.status(404).json(err));
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then(newCategory => res.json(newCategory))
  .catch(err => res.status(400).json(err));
  // create a new category
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((updatedCategory) => {
    res.json(updatedCategory);
  })
  .catch((err) => res.status(400).json(err));
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deletedCategory => {
    if(!deletedCategory) {
      res.status(400).json({ message: "No existing category with this ID!" });
      return;
    };
    res.json(deletedCategory);
  })
  .catch(err => res.status(500).json(err));
  // delete a category by its `id` value
});

module.exports = router;
