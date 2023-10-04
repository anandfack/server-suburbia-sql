const response = (statusCode, data, message, status, res) => {
  res.json(statusCode, [
    {
      payload: {
        status: status,
        data,
        message,
      },
    },
  ]);
};

module.exports = response;
