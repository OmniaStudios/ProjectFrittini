/* Definizione delle funzioni disponibili */
exports.get_home = (req, res) => {
    /* Impostazione dello stato HTPP success e rendering della pagina home*/
    res.status(200).render('index');
}

exports.get_menu = (req, res) => {
    /* Impostazione dello stato HTPP success e rendering della pagina menu*/
    res.status(200).render('menu');
}

exports.get_menu_family = (req, res) => {
    /* Impostazione dello stato HTPP success e rendering della pagina menu*/
    res.status(200).render('menufamily');
}

exports.get_products = (req, res) => {
    /* Impostazione dello stato HTPP success e rendering della pagina menu*/
    res.status(200).render('products');
}