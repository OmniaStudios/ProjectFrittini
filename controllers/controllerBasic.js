/* Definizione delle funzioni disponibili */
exports.get_home = (req, res) => {
    /* Impostazione dello stato HTPP success e rendering della pagina home*/
    res.status(200).render('index');
}