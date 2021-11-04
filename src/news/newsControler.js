const express = require('express');
const Joi = require('joi');
const apiResponse = require('../helpers/apiResponse');
const responseMessege = require('../constants/responseMessege');
const newsService = require('./newsService');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: News
 *   description: The New API
 */

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Returns list News
 *     tags: [News]
 *     responses:
 *       200:
 *         description: A list of news.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: "boolean"
 *                   example: true
 *                 message:
 *                   type: "string"
 *                   example: "list all"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/News'
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Error500'
 */

router.get('/news', (req, res) => {

  newsService.getNewses()
    .then((newsData) => {
      console.log(responseMessege.success.list);

      return apiResponse.successResponseWithData(res, responseMessege.success.list, newsData);
    })
    .catch((err) => {
      console.log('Eror');
      console.log(err);

      return apiResponse.errorResponse(res, responseMessege.err.e500);
    });
});


/**
 * @swagger
 * /api/news/{id}:
 *   get:
 *     summary: Get the new by id
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The news id
 *     responses:
 *       200:
 *         description: A list of one news.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: "boolean"
 *                   example: true
 *                 message:
 *                   type: "string"
 *                   example: "get:id"
 *                 data:
 *                     $ref: '#/components/schemas/News'
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Error500'
 *       404:
 *         description: Not find
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Error404'
 */
router.get('/news/:id', (req, res) => {
  const idNews = req.params.id;

  newsService.getNews(idNews)
    .then((newsData) => {
      if (!newsData) {
        return apiResponse.notFoundResponse(res, responseMessege.err.e404);
      }

      return apiResponse.successResponseWithData(res, responseMessege.success.getId, newsData);
    })
    .catch((err) => {
      console.error(err);

      return apiResponse.errorResponse(res, responseMessege.err.e500);
    });
});

/**
 * @swagger
 * /api/news:
 *   post:
 *     summary: Create a new news
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewsInput'
 *     responses:
 *       201:
 *         description: The news was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: "boolean"
 *                   example: true
 *                 message:
 *                   type: "string"
 *                   example: "post"
 *                 data:
 *                     $ref: '#/components/schemas/News'
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Error500'
 *       400:
 *         description: Error
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Error400'
 */

router.post('/news', (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(300).required(),
    description: Joi.string(),
    img: Joi.string()
  });
  const valid = schema.validate(req.body);

  if (valid.error) {
    return apiResponse.validationErrorWithData(res, responseMessege.err.e400, req.body);
  }
  newsService.addNews(req.body)
    .then((newsData) => {
      console.log(`POST DATA:${newsData}`);

      return apiResponse.successCreated(res, responseMessege.success.post, newsData);
    })
    .catch((err) => {
      console.log(`rejectSave:${err}`);

      return apiResponse.errorResponse(res, responseMessege.err.e500);
    });
});

/**
 * @swagger
 * /api/news/{id}:
 *  put:
 *    summary: Update the News by the id
 *    tags: [News]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The news id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/NewsInput'
 *    responses:
 *      200:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: "boolean"
 *                   example: true
 *                 message:
 *                   type: "string"
 *                   example: "put"
 *                 data:
 *                     $ref: '#/components/schemas/News'
 *      404:
 *        description: Not find
 *        content:
 *           application/json:
 *             $ref: '#/components/schemas/Error404'
 *      400:
 *        description: Not find
 *        content:
 *           application/json:
 *             $ref: '#/components/schemas/Error400'
 *      500:
 *        description: Error
 *        content:
 *           application/json:
 *             $ref: '#/components/schemas/Error500'
 */

router.put('/news/:id', (req, res) => {
  const idNews = req.params.id;
  const schema = Joi.object({
    title: Joi.string().min(3).max(300).required(),
    description: Joi.string(),
    img: Joi.string()
  });
  const valid = schema.validate(req.body);

  if (valid.error) {
    console.error(valid.error);

    return apiResponse.validationErrorWithData(res, responseMessege.err.e400, req.body);
  }

  newsService.editNews(idNews, req.body)
    .then((newsData) => {
      if (!newsData) {
        return apiResponse.notFoundResponse(res, responseMessege.err.e404);
      }
      console.log('PUT DATA:');
      console.log(newsData);

      return apiResponse.successResponseWithData(res, responseMessege.success.put, newsData);
    })
    .catch((err) => {
      console.error(err);

      return apiResponse.errorResponse(res, responseMessege.err.e500);
    });
});

/**
 * @swagger
 * /api/news/{id}:
 *   delete:
 *     summary: Remove the news by id
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The news id
 *
 *     responses:
 *       200:
 *         description: The news was successfully delete
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: "boolean"
 *                   example: true
 *                 message:
 *                   type: "string"
 *                   example: "delete"
 *                 data:
 *                     $ref: '#/components/schemas/News'
 *       404:
 *         description: Not find
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Error404'
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/Error500'
 *
 */

router.delete('/news/:id', (req, res) => {
  const idNews = req.params.id;

  newsService.deleteNews(idNews)
    .then((newsData) => {
      console.log('DELETE DATA:');
      console.error(newsData);

      if (newsData.deletedCount === 0) {
        return apiResponse.notFoundResponse(res, responseMessege.err.e404);
      }

      return apiResponse.successResponseWithData(res, responseMessege.success.delete, newsData);
    })
    .catch((err) => {
      console.error(err);

      return apiResponse.errorResponse(res, responseMessege.err.e500);
    });
});

module.exports = router;
