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
        link: "photos"
    })
}


const getRegisterPage = (req, res) => {
    res.render('register', {
        link: "register"
    })
}

const getLoginPage = (req, res) => {
    res.render('login', {
        link: "login"
    })
}



export { getAboutPage, getIndexPage, getPhotosPage, getRegisterPage,getLoginPage }



