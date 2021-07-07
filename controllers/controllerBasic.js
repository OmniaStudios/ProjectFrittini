var nodemailer = require("nodemailer");
var User = require("../models/User");
const keys = require("../config/keys");
const { isValidObjectId } = require("mongoose");
const client = require("twilio")(keys.accountSid, keys.authToken);

/* Definizione delle funzioni disponibili */
exports.get_home = async(req, res) => {
    /* Impostazione dello stato HTPP success e rendering della pagina home*/
    const message = await req.consumeFlash("info");
    res.status(200).render("index", {
        message: message,
        status: message == "Numero registrato con successo! Controlla il telefono!" ?
            "success" : "danger",
    });
};

exports.get_menu = (req, res) => {
    /* Impostazione dello stato HTPP success e rendering della pagina menu*/
    res.status(200).render("menu");
};

exports.get_menu_family = (req, res) => {
    /* Impostazione dello stato HTPP success e rendering della pagina menufamily*/
    res.status(200).render("menufamily");
};

exports.get_products = (req, res) => {
    /* Impostazione dello stato HTPP success e rendering della pagina products*/
    res.status(200).render("products");
};

exports.get_aboutus = (req, res) => {
    /* Impostazione dello stato HTPP success e rendering della pagina workwithus*/
    res.status(200).render("aboutus");
};

exports.get_work = (req, res) => {
    /* Impostazione dello stato HTPP success e rendering della pagina workwithus*/
    res.status(200).render("workWithUs");
};

exports.new_user = async(req, res) => {
    const newUser = {
        phone: req.body.phone,
        codUtente: makeid(12),
        onBoarded: false,
    };

    let alreadyPresent = await User.exists({ phone: req.body.phone });
    if (!alreadyPresent) {
        User.create(newUser, async(err, data) => {
            if (err) {
                res.status(400).json({
                    status: "fail",
                    message: "User could not be created",
                });
            } else {
                /*MESSAGGIO content> ciao... https://localhost:5000/onBoarding/:id*/
                client.messages
                    .create({
                        body: "Per proseguire con la registrazione al sito ufficiale del picciotto clicca su questo link https://localhost:5000/onBoarding/" + newUser.codUtente,
                        from: keys.phone,
                        to: "+39" + newUser.phone,
                    })
                    .then((message) => console.log(message.sid));

                await req.flash(
                    "info",
                    "Numero registrato con successo! Controlla il telefono!"
                );
                res.redirect("/");
            }
        });
    } else {
        await req.flash("info", "Questo numero di telefono è già registrato!");
        res.redirect("/");
    }

    /*
          _id
          nomeUtente
          numTel
          codUtente
          buoniRiscattati[]
          onBoarded
      */
};

exports.post_work = (req, res) => {
    const [name, surname, mail, content] = [
        req.body.name,
        req.body.surname,
        req.body.mail,
        req.body.content,
    ];

    const transporter = nodemailer.createTransport({
        host: "smtp.libero.it",
        port: 465,
        secure: true, // use SSL
        service: "libero",
        auth: {
            user: "ilpicciottosaluzzo@libero.it",
            pass: keys.mailPassword,
        },
    });

    const mailOptions = {
        from: '"IlPicciottoApplyNoticer" <ilpicciottosaluzzo@libero.it>',
        to: "ilpicciottosaluzzo@libero.it",
        subject: `Hai una nuova richiesta di lavoro da ${name} ${surname}`,
        html: `<p><strong>${name} ${surname}</strong> ti ha inviato una richiesta di lavoro.</p>
                <p>Il testo della sua domanda è:</p>
                <p>${content}</p>
                <p>Se interessato, ricontattalo alla mail <i href= "mailto:${mail}">${mail}</i></p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else {
            console.log("email sent: " + info.response);
            res.redirect("/workwithus");
        }
    });
};

exports.get_onboarding = async(req, res) => {
    let exists = await User.exists({ codUtente: req.params.codUtente, onBoarded: false });
    if (exists) {
        const couponCode = makeid(6);
        await User.updateOne({ codUtente: req.params.codUtente }, { onBoarded: true, coupons: [couponCode], couponHasBeenReedemed: [false] });

        const user = await User.findOne({ codUtente: req.params.codUtente });


        client.messages
            .create({
                body: `IL PICCIOTTO SALUZZO | Ciao, puoi utilizzare il codice sconto ${couponCode} per ottenere gratuitamente un arancino. Grazie per esserti iscritto alla nostra newsletter!`,
                from: keys.phone,
                to: "+39" + user.phone,
            })
            .then((message) => console.log(message.sid));

        res.render("onboarding");
    } else {
        res.redirect("/err/404");
    }
};

function makeid(length) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}