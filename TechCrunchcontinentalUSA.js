async function getData() {
    const response = await fetch("TechCrunchcontinentalUSA.csv")
    const data = await response.text()
    let rows = data.split('\n')
    const heads = rows[0]
    rows = rows.slice(1);
    const xs = []
    const ys = []
    rows.forEach(elt => {
        const row = elt.split(',')
        let yearFunded = parseFloat(row[6].split('-')[2]);
        (yearFunded > 19) ? yearFunded += 1900: yearFunded += 2000;
        const currencies = parseFloat(row[7]);
        pushData(yearFunded, currencies)
    })

    function pushData(yearFunded, currencies) {
        const index = xs.indexOf(yearFunded)
        if (index == -1) {
            xs.push(yearFunded);
            ys.push(currencies)
        } else {
            const previousVal = ys[index];
            ys[index] = previousVal + currencies
        }
    }
    return {
        xs,
        ys
    }
}

showChart('myChart')
showChart('myChartin%', true, 'bar')
async function showChart(id, percentage = false, type = 'line') {
    let {
        xs,
        ys
    } = await getData()
    if (percentage) {
        let sum = (ys.reduce((cur, ac) => ac += cur))
        ys = ys.map(cur => Math.floor((cur / sum) * 100))
    }
    var ctx = document.getElementById(id).getContext('2d');
    var myChart = new Chart(ctx, {
        type: type,
        data: {
            labels: xs,
            datasets: [{
                label: 'Fund Currencies in Companies',
                data: ys,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}