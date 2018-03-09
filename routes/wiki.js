const express = require('express')
const router = express.Router();
const { Page, User } = require('../models')
const addPage = require('../views/addPage');
const wikiPage = require('../views/wikipage')


router.get('/', (req, res, next) => {
    res.redirect('/');
});

router.post('/', async (req, res, next) => {
     // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;
  const name = req.body.name;
  const email = req.body.email;

  let user = await User.findOne({where: {name: name}});

  if (!user) {
    user = new User({
      name: name,
      email: email
    });
  }

  try {
    await user.save();
  } catch (error) { next(error)}

  const page = new Page({
    title: title,
    content: content,
    status: status,
    authorId: user.id
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
});

router.get('/add', (req, res, next) => {
    res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    res.send(wikiPage(page));
  } catch (error) { next(error) }
});

module.exports = router;