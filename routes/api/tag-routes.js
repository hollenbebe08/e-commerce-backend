const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
router.get('/', (req, res) => {
  Tag.findAll({
    attributes: [
      'id'
    ],
    // be sure to include its associated Product data
    include: [
      {
        model: ProductTag,
        attributes: ['id', 'product_id']
      }
    ]
  })
  .then(dbTagData => {
    if(dbTagData){
      res.status(404).json({message: 'No tag was found with that id!'});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// find a single tag by its `id`
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id'
    ],
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'product_id']
      }
    ]
  })
  .then(dbTagData => {
    if(!dbTagData){
      res.status(404).json({message: 'There is no tag with that id!'});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbTagData => {
    if(!dbTagData){
      res.status(404).json({message: 'No tag found with this id!'});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.param.id
    }
  })
  .then(dbTagData => {
    if(!dbTagData){
      res.status(404).json({message: 'No tag found with that id!'});
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
