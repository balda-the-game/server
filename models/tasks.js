module.exports = app => {
  return {
    findAll: (params, callback) => {
      return callback([
        {title: "task 1"},
        {title: "task 2"},
        {title: "task 3"},
        {title: "task 4"},
      ]);
    }
  }
};