const config = {
    _base_url: "http://localhost:5000/",
    base_url: (url) => {
        return config._base_url + url;
    }
}
module.exports = config