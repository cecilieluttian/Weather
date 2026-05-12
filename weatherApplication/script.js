const byer = {
    trondheim: { lat: 63.43, lon: 10.39 },
    oslo: { lat: 59.91, lon: 10.75 },
    kobenhavn: { lat: 55.68, lon: 12.57 }
};

function visBy(bynavn) {
    const by = byer[bynavn];
    document.getElementById("varsel").innerHTML = "Laster...";

    fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${by.lat}&lon=${by.lon}`, {
        headers: { "User-Agent": "vaerapp-portefolje/1.0 student@example.com" }
    })
        .then(res => res.json())
        .then(data => {
            const tidspunkter = data.properties.timeseries;
            const nå = tidspunkter[0];
            const temp = nå.data.instant.details.air_temperature;

            document.getElementById("varsel").innerHTML = `
            <h2>${bynavn}</h2>
            <p>Temperatur nå: ${temp}°C</p>
        `;
        });
}