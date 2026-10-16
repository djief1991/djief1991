/* =====================================================
   MOTE MAYA COMPANY
   JavaScript du site web
===================================================== */


/* =====================================================
   1. ATTENDRE LE CHARGEMENT DU DOCUMENT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Bienvenue chez Mote Maya Company !");


    /* =====================================================
       2. METTRE À JOUR AUTOMATIQUEMENT L'ANNÉE
    ===================================================== */

    const annee = document.getElementById("annee");

    if (annee) {
        annee.textContent = new Date().getFullYear();
    }


    /* =====================================================
       3. NAVIGATION FLUIDE
    ===================================================== */

    const liensNavigation = document.querySelectorAll(
        '.menu a[href^="#"], .logo[href^="#"]'
    );

    liensNavigation.forEach(function (lien) {

        lien.addEventListener("click", function (event) {

            const cible = lien.getAttribute("href");

            const section = document.querySelector(cible);

            if (section) {

                event.preventDefault();

                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                history.replaceState(null, "", cible);

            }

        });

    });


    /* =====================================================
       4. ANIMATION DES SECTIONS AU DÉFILEMENT
    ===================================================== */

    const elementsAnimer = document.querySelectorAll(
        ".apropos-grid, " +
        ".section-heading, " +
        ".service-card, " +
        ".portfolio-item, " +
        ".avantage, " +
        ".contact-grid"
    );


    // Créer les styles nécessaires aux animations.

    const styleAnimation = document.createElement("style");

    styleAnimation.textContent = `

        .animation-apparition {
            opacity: 0;
            transform: translateY(25px);
            transition:
                opacity 0.7s ease,
                transform 0.7s ease;
        }

        .animation-apparition.visible {
            opacity: 1;
            transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
            .animation-apparition {
                opacity: 1;
                transform: none;
                transition: none;
            }
        }

    `;

    document.head.appendChild(styleAnimation);


    // Vérifier si le navigateur prend en charge
    // IntersectionObserver.

    if ("IntersectionObserver" in window) {

        const observateur = new IntersectionObserver(
            function (entrees, observer) {

                entrees.forEach(function (entree) {

                    if (entree.isIntersecting) {

                        entree.target.classList.add("visible");

                        observer.unobserve(entree.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        elementsAnimer.forEach(function (element) {

            element.classList.add("animation-apparition");

            observateur.observe(element);

        });

    }


    /* =====================================================
       5. EFFETS INTERACTIFS SUR LES CARTES
    ===================================================== */

    const cartesServices = document.querySelectorAll(
        ".service-card"
    );

    cartesServices.forEach(function (carte) {

        carte.addEventListener("mouseenter", function () {

            carte.style.borderColor = "#d4af37";

        });


        carte.addEventListener("mouseleave", function () {

            carte.style.borderColor = "";

        });

    });


    /* =====================================================
       6. EFFETS SUR LES IMAGES DU PORTFOLIO
    ===================================================== */

    const imagesPortfolio = document.querySelectorAll(
        ".portfolio-item img"
    );

    imagesPortfolio.forEach(function (image) {

        image.addEventListener("click", function () {

            console.log(
                "Photographie sélectionnée : " +
                image.alt
            );

        });

    });


    /* =====================================================
       7. FORMULAIRE DE CONTACT
    ===================================================== */

    const formulaire = document.getElementById("contactForm");


    if (formulaire) {

        formulaire.addEventListener(
            "submit",
            function (event) {

                // Empêcher l'envoi classique du formulaire.
                event.preventDefault();


                // Récupérer les champs du formulaire.

                const nom = document
                    .getElementById("nom")
                    .value
                    .trim();

                const email = document
                    .getElementById("email")
                    .value
                    .trim();

                const service = document
                    .getElementById("service")
                    .value;

                const message = document
                    .getElementById("message")
                    .value
                    .trim();


                /* Vérifier les informations saisies. */

                if (
                    nom === "" ||
                    email === "" ||
                    service === "" ||
                    message === ""
                ) {

                    alert(
                        "Veuillez remplir tous les champs du formulaire."
                    );

                    return;

                }


                /* Vérifier le format de l'adresse e-mail. */

                const modeleEmail =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!modeleEmail.test(email)) {

                    alert(
                        "Veuillez saisir une adresse e-mail valide."
                    );

                    return;

                }


                /* Préparer le message. */

                const destinataire =
                    "kispmcolor@gmail.COM";


                const sujet = encodeURIComponent(
                    "Demande de devis - " + service
                );


                const corps = encodeURIComponent(

                    "Bonjour Mote Maya Company,\n\n" +

                    "Je souhaite obtenir des informations " +
                    "sur vos services.\n\n" +

                    "Nom : " + nom + "\n" +

                    "Adresse e-mail : " + email + "\n" +

                    "Service demandé : " + service + "\n\n" +

                    "Mon message :\n" + message + "\n\n" +

                    "Cordialement,\n" + nom

                );


                /* Vérifier que l'adresse a été configurée. */

                if (
                    destinataire ===
                    "VOTRE-EMAIL@EXEMPLE.COM"
                ) {

                    alert(
                        "Le formulaire fonctionne, mais tu dois " +
                        "remplacer VOTRE-EMAIL@EXEMPLE.COM " +
                        "par l'adresse e-mail de Mote Maya Company."
                    );

                    return;

                }


                /* Ouvrir l'application de messagerie. */

                const lienEmail =
                    "mailto:" + destinataire +
                    "?subject=" + sujet +
                    "&body=" + corps;


                window.location.href = lienEmail;

            }
        );

    }


    /* =====================================================
       8. MESSAGE DE CONFIRMATION DANS LA CONSOLE
    ===================================================== */

    console.log(
        "Le JavaScript de Mote Maya Company est chargé."
    );

});