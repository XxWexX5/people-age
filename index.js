const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

const checkQueryParams = (req, res, next) => {
  if (!req.query.age) {
    return res.redirect(`/`)
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('age')
})

app.get('/major', checkQueryParams, (req, res) => {
  return res.render('major', { age: req.query.age })
})

app.get('/minor', checkQueryParams, (req, res) => {
  return res.render('minor', { age: req.query.age })
})

app.post('/check', (req, res) => {
  if (req.body.age >= 18) {
    return res.redirect(`/major?age=${req.body.age}`)
  }

  return res.redirect(`/minor?age=${req.body.age}`)
})

app.listen(3000)
