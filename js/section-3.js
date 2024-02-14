'use strict';

const hakukentta = document.getElementById('hakukentta');
const nappi = document.getElementById('nappi');

// kun nappia painetaan
nappi.addEventListener('click', function () {
    // hae hakukentän teksti (value)
    const hakusana = hakukentta.value;
    console.log(hakusana);

    //workingOn this is the remover of answer section children
    if (document.getElementById('answer').hasChildNodes() === true)
    {function deleteChild() {
        const e = document.getElementById('answer');
        let child = e.lastElementChild;
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
        }
    }
    deleteChild();
    }
    //workingOn ends here

// lähetä pyyntö APIin
    fetch('https://api.tvmaze.com/search/shows?q=' + hakusana)             // Käynnistetään haku. Vakiometodi on GET.

        .then(function(vastaus) {        // Sitten kun haku on valmis,
            return vastaus.json();     // muutetaan ladattu tekstimuotoinen JSON JavaScript-olioksi/taulukoksi

        }).then(function(json){         // Sitten otetaan ladattu data vastaan ja
        console.log(json)
        ShowMeShow(json);

    }).catch(function(error){       // Jos tapahtuu virhe,
        console.log(error);        // kirjoitetaan virhe konsoliin.

    })

//workingOn this creates elements to the HTML page

    function ShowMeShow (sarja) {
        for (let i = 0; i < sarja.length; i++) {
            const genret = document.createElement('figcaption');
            const combine = document.getElementById('answer');
            const sarjanblokki = document.createElement('section');
            const nimi = document.createElement('h2');
            const linkkiTeksti = document.createElement('p');
            const linkki = document.createElement('a');
            const kuvakehys = document.createElement('figure');
            const kuva = document.createElement('img');
            const sarjantiedot = document.createElement('article');
            const summarytitle = '<h3>summary</h3>';
            sarjantiedot.className = 'sarjantiedot';

            sarjanblokki.className = 'sarjanblokki';
            sarjanblokki.id = 'sarjanblokki' + [i];
            combine.appendChild(sarjanblokki);

            sarjanblokki.appendChild(nimi);
            nimi.innerText = [i+1] + '. ' + sarja[i].show.name;

            sarjanblokki.appendChild(kuvakehys);
                if (sarja[i].show.image === null) {kuva.src = 'images/no-image.jpg';}
                    else {kuva.src = sarja[i].show.image.medium;}
                    kuva.alt = 'Sarjan kuva';
            kuvakehys.appendChild(kuva);

            genret.innerHTML = '<b>genre:</b> ' + sarja[i].show.genres;
            kuvakehys.appendChild(genret);

            sarjanblokki.appendChild(sarjantiedot);
            sarjantiedot.innerHTML = summarytitle + sarja[i].show.summary;

            linkkiTeksti.className = 'linkkiTeksti';
            sarjanblokki.appendChild(linkkiTeksti)
            if (sarja[i].show.officialSite === null) {linkkiTeksti.innerHTML = '<b>tvmaze page:</b> ';}
            else {linkkiTeksti.innerHTML = '<b>Homepage:</b> ';}
            if (sarja[i].show.officialSite === null) {linkki.href = sarja[i].show.url;}
            else {linkki.href = sarja[i].show.officialSite;}
            linkkiTeksti.appendChild(linkki);
            if (sarja[i].show.officialSite === null) {linkki.innerText = sarja[i].show.url;}
            else {linkki.innerText = sarja[i].show.officialSite;}

        }
    }
//workingOn ends here


});

