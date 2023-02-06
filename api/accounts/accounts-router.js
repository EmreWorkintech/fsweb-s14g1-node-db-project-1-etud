const router = require('express').Router()

const md = require('./accounts-middleware')

const Account = require('./accounts-model')

router.get('/', (req, res, next) => {
  try {
    throw new Error ("Error Message")
  }
  catch (err) {
    next(err)
  }
})

router.get('/:id', md.checkAccountId , (req, res, next) => {
  try {
    res.json({
      message: "/GET"
    })
  }
  catch (err) {
    next(err)
  }
})

router.post('/', md.checkAccountPayload, md.checkAccountNameUnique , (req, res, next) => {
  try {
    res.json({
      message: "/POST"
    })
  }
  catch (err) {
    next(err)
  }
})

router.put('/:id', md.checkAccountId , md.checkAccountPayload , (req, res, next) => {
  try {
    res.json({
      message: "/PUT"
    })
  }
  catch (err) {
    next(err)
  }
});

router.delete('/:id', md.checkAccountId , (req, res, next) => {
  try {
    res.json({
      message: "/DELETE"
    })
  }
  catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { 
  res.status(err.status || 500).json({
    message: err.message
  }) 
})

module.exports = router;