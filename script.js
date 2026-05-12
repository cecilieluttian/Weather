const cities = {
    trondheim: { lat: 63.43, lon: 10.39 },
    oslo: { lat: 59.91, lon: 10.75 },
    kobenhavn: { lat: 55.68, lon: 12.57 }
};

function visBy(cityName) {
    const city = cities[cityName];
    document.getElementById("varsel").innerHTML = "Laster...";

    fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${by.lat}&lon=${by.lon}`, {
        headers: { "User-Agent": "vaerapp-portefolje/1.0 student@example.com" }
    })
        .then(res => res.json())
        .then(data => {
            const tidspunkter = data.properties.timeseries;

            // Grupper data per dag
            const dager = {};
            tidspunkter.forEach(t => {
                const dato = t.time.slice(0, 10); // Henter kun "2026-05-12" fra tidsstempel
                if (!dager[dato]) {
                    dager[dato] = [];
                }
                dager[dato].push(t.data.instant.details.air_temperature);
            });

            // Bygg HTML for de 10 første dagene
            const datoer = Object.keys(dager).slice(0, 10);
            let html = `<h2>${bynavn}</h2>`;

            datoer.forEach(dato => {
                const temperaturer = dager[dato];
                const max = Math.max(...temperaturer).toFixed(1);
                const min = Math.min(...temperaturer).toFixed(1);
                html += `<p>${dato} — Min: ${min}°C / Maks: ${max}°C</p>`;
            });

            document.getElementById("varsel").innerHTML = html;
        });
}