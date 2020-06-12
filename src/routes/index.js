const router = require('express').Router()
const { Chans } = require('../models/')

router.get('/', async (req, res) => {
  const data = await Chans.list()
    .catch(err => {
      res.status(500).send(err)
    })

  if (!data) {
    res.sendStatus(204)
  } else {
    const bannedChans = data.map(c => c.name).sort()
    res.send(bannedChans.join(', '))
  }
})

router.get('/chan/:name', async (req, res) => {
  const data = await Chans.read(req.params.name.replace(/_/g, '#'))
    .catch(err => {
      res.status(500).send(err)
    })

  if (!data) {
    res.send('not banned')
  } else {
    res.send('banned')
  }
})

router.post('/chan/:name', async (req, res) => {
  await Chans.create(req.params.name.replace(/_/g, '#'))
    .catch(err => {
      res.status(500).send(err)
    })

  res.send('banned')
})

router.delete('/chan/:name', async (req, res) => {
  await Chans.delete(req.params.name.replace(/_/g, '#'))
    .catch(err => {
      res.status(500).send(err)
    })
  res.send('unbanned')
})

module.exports = router
