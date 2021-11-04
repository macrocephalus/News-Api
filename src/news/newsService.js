const News = require('./newsModel');

function logNews(news) {
  console.log('----------');
  console.log(`id: ${news._id}`);
  console.log(`title: ${news.title}`);
}

async function saveNews (newsData) {
  const itemNews = new News(newsData);

  try {
    const result = await itemNews.save();
    console.log(result);

    return Promise.resolve(result);
  } catch (err) {
    console.log(err.message);

    return Promise.reject(err);
  }
}

async function addNews (objNews) {
  const news = {
    title: objNews.title,
    description: objNews.description,
    img: objNews.img
  };

  return saveNews(news)
    .then((taskData) => {
      console.log('Add');
      logNews(taskData);

      return taskData;
    })
    .catch((err) => {
      console.log(`rejectSave:${err}`);

      return Promise.reject(err);
    });
}

async function getNewses() {
  try {
    const news = await News.find();
    console.log('Get News');

    return Promise.resolve(news);
  } catch (err) {
    console.log(err.message);

    return Promise.reject(err);
  }
}

async function getNews(idNews) {
  try {
    const news = await News.findById(idNews);

    if (!news) {
      return Promise.resolve(null);
    }
    console.log('Get Task');
    console.log(news);

    return Promise.resolve(news);
  } catch (err) {
    console.log(err.message);

    return Promise.reject(err);
  }
}

async function editNews(idNews, dataNews) {
  try {
    const news = await News.findByIdAndUpdate(
      { _id: idNews },
      {
        $set: {
          title: dataNews.title,
          description: dataNews.description,
          img: dataNews.img
        },
      },
      { new: true },
    );
    console.log(news);

    return Promise.resolve(news);
  } catch (err) {
    console.log(err.message);

    return Promise.reject(err);
  }
}

async function deleteNews(idNews) {
  try {
    const result = await News.deleteOne({ _id: idNews });

    console.log('Delete');
    console.log(result);

    return Promise.resolve(result);
  } catch (err) {
    console.log(err.message);

    return Promise.reject(err);
  }
}

module.exports = {
  addNews,
  getNewses,
  getNews,
  editNews,
  deleteNews
};
