const successResponse = function (res, msg) {
  const data = {
    status: true,
    message: msg,
  };

  return res.status(200).json(data);
};

const successCreated = function (res, msg, data) {
  const resData = {
    status: true,
    message: msg,
    data,
  };

  return res.status(201).json(resData);
};

const successResponseWithData = function (res, msg, data) {
  const resData = {
    status: true,
    message: msg,
    data,
  };

  return res.status(200).json(resData);
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Error500:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         status:
 *           type: string
 *           description: The News title
 *         message:
 *           type: string
 *       example:
 *         status: "false"
 *         message: "Internal Server Error"
 */

const errorResponse = function (res, msg) {
  const data = {
    status: false,
    message: msg,
  };

  return res.status(500).json(data);
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Error404:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         status:
 *           type: string
 *           description: Not find
 *         message:
 *           type: string
 *       example:
 *         status: "false"
 *         message: "Not found response"
 */
const notFoundResponse = function (res, msg) {
  const data = {
    status: false,
    message: msg,
  };

  return res.status(404).json(data);
};

/**
 * @swagger
 * components:
 *   schemas:
 *     Error400:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         status:
 *           type: string
 *           description: Server error
 *         message:
 *           type: string
 *       example:
 *         status: "false"
 *         message: "Error parameters"
 */
const validationErrorWithData = function (res, msg, data) {
  const resData = {
    status: false,
    message: msg,
    data,
  };

  return res.status(400).json(resData);
};

module.exports = {
  successResponse,
  successResponseWithData,
  successCreated,
  errorResponse,
  validationErrorWithData,
  notFoundResponse,
};
