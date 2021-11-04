const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the News
 *         title:
 *           type: string
 *           description: The News title
 *         img:
 *           type: string
 *           description: The url image
 *         description:
 *           type: string
 *           description: The description news
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date update news
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date create News
 *       example:
 *         _id: "61814bede3e38b40ffd2e9db"
 *         title: "test56 news"
 *         img: "http://img.com/img.jpg"
 *         description: "IMG – формат для монтирования образов оптических и жестких дисков. Сегодня доступно больше 10 популярных программ, которые работают с IMG , но утилиты для монтирования ограничены. Открыть для использования и просмотра файлов может эмулятор виртуальных дисков или архиватор. В этой статье читайте, чем открыть IMG файл на компьютере."
 *         createdAt: "2021-11-02T16:20:45.890Z"
 *         updatedAt: "2021-11-02T14:33:34.744Z"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     NewsInput:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: The News title
 *         img:
 *           type: string
 *           description: The url image
 *         description:
 *           type: string
 *           description: The description news
 *       example:
 *         title: "test56 news"
 *         img: "http://img.com/img.jpg"
 *         description: "IMG – формат для монтирования образов оптических и жестких дисков. Сегодня доступно больше 10 популярных программ, которые работают с IMG , но утилиты для монтирования ограничены. Открыть для использования и просмотра файлов может эмулятор виртуальных дисков или архиватор. В этой статье читайте, чем открыть IMG файл на компьютере."
 */


const NewsSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String},
  img: { type: String },
},
{
  timestamps: true
});

const News = mongoose.model('news', NewsSchema);

module.exports = News;
