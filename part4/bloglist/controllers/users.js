const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const usersRouter = require('express').Router()
const User = require('../models/user')





usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', {
      title:1,
      author:1,
      url:1
    })
  response.json(users)
})


usersRouter.post('/', async (request,response) => {
  const {username, name, password} = request.body


  if(!password || password.length < 3){
    return response.status(400).send({error: "password cannot be of length less than 3"})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password,saltRounds)

  const user = new User({
    username,
    passwordHash,
    name
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter