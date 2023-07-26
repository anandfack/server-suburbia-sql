const response = (statusCode, data, message, res) => {
    res.json(statusCode, [
        {
            payload: {
                status: statusCode,
                data,
                message,
            },
            metadata: {
                prev: "",
                next: "",
                current: ""
            }
        }
    ])
}

module.exports = response