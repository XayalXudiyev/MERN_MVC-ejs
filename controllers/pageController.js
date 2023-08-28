const getIndexPage = (req, res) => {
    res.render('index', {
        link: "index"
    })
}

const getAboutPage = (req, res) => {
    res.render('about', {
        link: "about"
    })
}

const getPhotosPage = (req, res) => {
    res.render('photos', {
        link: "index"
    })
}


const getRegisterPage = (req, res) => {
    res.render('register', {
        link: "register"
    })
}

export { getAboutPage, getIndexPage, getPhotosPage, getRegisterPage }



