const getIndexPage = (req, res) => {
    res.render('index')
}

const getAboutPage = (req, res) => {
    res.render('about')
}

const getPhotosPage = (req, res) => {
    res.render('photos')
}

export {getAboutPage, getIndexPage, getPhotosPage}