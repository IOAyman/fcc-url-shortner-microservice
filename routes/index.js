const router = require('express').Router()
const crypto = require('crypto')
const ShortUrl = require('../models/url')


// this regex is not fully correct
// pattern =>   protocol://(FQDN | IPv4)(port)?whateverAfterThis
const isURL = /^(http(s)?|ftp):\/\/([a-z0-9\-_]{2,}\.[a-z]{2,4}|([0-9]{1,3}\.){3}[0-9]{1,3})(:[0-9]+)?.*/i
const ERROR_MSG = 'Invalid URL!'


router.get('/:id', (req, res, next) => {
  const { id:_id } = req.params

  ShortUrl
  .findOne({ _id })
  .then( url => {
    if ( url )
      return res.redirect(url.original_url)
    // url not found
    next(ERROR_MSG)
  })
  .catch( error => next(ERROR_MSG))
})


router.get('/new/:url', (req, res, next) => {
  const { url:original_url } = req.params

  // invalid url
  if (!isURL.test(original_url))
    return next(ERROR_MSG)

  const url = new ShortUrl({ original_url })
  let short_url = `${req.headers.host}/${url._id}`
  url.short_url = short_url

  url.save()
     .then( savedUrl => {
       const { original_url, short_url } = savedUrl
       res.json({ original_url, short_url })
     })
     .catch( error => next(ERROR_MSG))
})

// Woops!
router.use((error, req, res, next) => res.json({ error }))


module.exports = router
