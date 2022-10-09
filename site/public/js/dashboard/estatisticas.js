dadosInstituicao = {};
datasetsDadosInstituicao = [];
dadosCPU = []
dadosRAM = []
dadosDK = []
mediaCPU = 0;
mediaRAM = 0;
qtd = 0;
qtdMaquinasManutencao = 0;
dadosCPU4 = [];
dadosRAM4 = [];
dadosDK4 = [];

function plotKPIs(){
    usoMedioCPU_span.innerHTML = mediaCPU + '%';
    progCPU.setAttribute("style", `width: ${mediaCPU}%`);

    usoMedioRAM_span.innerHTML = mediaRAM + '%';
    progRAM.setAttribute("style", `width: ${mediaRAM}%`);

    qtd_span.innerHTML = qtd;
    span_disponibilidade.innerHTML = (100 - ((qtdMaquinasManutencao * 100) / qtd)).toFixed(0) + "%";
    span_subtotal.innerHTML = `(${qtdMaquinasManutencao}/${qtd})`
}

function plot1(){
    grafico = document.getElementById("grafico1")
    
    for(i = 0; i < dadosRAM.length; i++){
        dadosRAM[i] = (dadosRAM[i] * 100) / 8;
    }

    for(i = 0; i < dadosDK.length; i++){
        dadosDK[i] = (dadosDK[i] * 100) / 100000;
    }

    xValues = [];
    for(i = 0; i < dadosDK.length; i++){
        xValues[i] = i+1;
    }

    chart1 = new Chart(grafico, {
        type: "line",
        data: {
        labels: xValues,
        datasets: [{ 
                data: dadosCPU,
                borderColor: "red",
                fill: false,
                yAxisID: 'A',
                label: 'CPU (%)'
            }, { 
                data: dadosRAM,
                borderColor: "green",
                fill: false,
                yAxisID: 'B',
                label: 'Memória RAM (GB)'
            }, { 
                data: dadosDK,
                borderColor: "blue",
                fill: false,
                yAxisID: 'C',
                label: 'Disco Rígido (GB)'
            }]
        },
    
        options: {
            legend: {display: true},
            scales: {
                yAxes: [{
                    id: 'A',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        max: 100,
                        min: 0
                    }
                }, {
                    id: 'B',
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        max: 100,
                        min: 0,
                        display: false
                    }
                },{
                    id: 'C',
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        max: 100,
                        min: 0,
                        display: false
                    }
                }],
                xAxes: [{
                    ticks: {
                        maxTicksLimit: 5,
                        maxRotation: 0,
                        minRotation: 0
                        // autoSkip: true
                    }
                }]
            },
            animation: 0,
            title: {
                display: false
                // text: "Desempenho da máquina (Últimos 100 registros)"
            }
        }
    });
}

function plot2(){
    grafico2 = document.getElementById("grafico2")

    percent = (qtdMaquinasManutencao * 100 / qtd).toFixed(0);
    chart2 = new Chart(grafico2, {
        type: "doughnut",
        data: {
            labels: [
                'Disponível',
                'Em manutenção'
            ],
            datasets: [{ 
                data: [100-percent, percent],
                label: 'Disponibilidade',
                backgroundColor: [
                    'rgb(3, 172, 19)',
                    'rgb(210, 20, 04)'
                ],
                hoverOffset: 4
            }],
            animation: 0,
            title: {
                display: false
            }
        }
    });
}

function plot3(){
    grafico3 = document.getElementById("grafico3")

    chart3 = new Chart(grafico3, {
        type: "bar",
        data: {
            labels: [
                'Muito Bom',
                'Bom',
                'Regular',
                'Atenção'
            ],
            datasets: [{
                data: [3, 4, 2, 0],
                backgroundColor: [
                  'rgba(3, 172, 19, 0.3)',
                  'rgba(255, 205, 86, 0.3)',
                  'rgba(255, 159, 64, 0.3)',
                  'rgba(255, 99, 132, 0.3)'
                ],
                borderColor: [
                    'rgb(3, 172, 19)',
                    'rgb(255, 205, 86)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 99, 132)'
                ],
                borderWidth: 1
            }],
            options: {
                plugins:{
                    legend: {
                        display: false
                    }
                },
                scales: {
                    yAxes: [{
                        display: true,
                        ticks: {
                            min: 0,
                            max: 100,
                            stepSize: 20
                        }
                    }]
                }
            }
        }
    });
}

function plot4(){
    grafico = document.getElementById("grafico4")
    grafico.remove();

    x = document.createElement("canvas");
    x.setAttribute("style", "width:100%;max-width:900px;");
    x.setAttribute("id", "grafico4");
    grafico4pai.appendChild(x)
    grafico = document.getElementById("grafico4")
    
    for(i = 0; i < dadosRAM4.length; i++){
        dadosRAM4[i] = (dadosRAM4[i] * 100) / 8;
    }

    for(i = 0; i < dadosDK4.length; i++){
        dadosDK4[i] = (dadosDK4[i] * 100) / 100000;
    }

    xValues = [];
    for(i = 0; i < dadosDK4.length; i++){
        xValues[i] = i+1;
    }

    chart1 = new Chart(grafico, {
        type: "line",
        data: {
        labels: xValues,
        datasets: [{ 
                data: dadosCPU4,
                borderColor: "red",
                fill: false,
                yAxisID: 'A',
                label: 'CPU (%)'
            }, { 
                data: dadosRAM4,
                borderColor: "green",
                fill: false,
                yAxisID: 'B',
                label: 'Memória RAM (GB)'
            }, { 
                data: dadosDK4,
                borderColor: "blue",
                fill: false,
                yAxisID: 'C',
                label: 'Disco Rígido (GB)'
            }]
        },
    
        options: {
            legend: {display: true},
            scales: {
                yAxes: [{
                    id: 'A',
                    type: 'linear',
                    position: 'left',
                    ticks: {
                        max: 100,
                        min: 0
                    }
                }, {
                    id: 'B',
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        max: 100,
                        min: 0,
                        display: false
                    }
                },{
                    id: 'C',
                    type: 'linear',
                    position: 'right',
                    ticks: {
                        max: 100,
                        min: 0,
                        display: false
                    }
                }],
                xAxes: [{
                    ticks: {
                        maxTicksLimit: 5,
                        maxRotation: 0,
                        minRotation: 0
                        // autoSkip: true
                    }
                }]
            },
            animation: 0,
            title: {
                display: false
                // text: "Desempenho da máquina (Últimos 100 registros)"
            }
        }
    });    
}

function getDadosInstituicao(){
    fetch("/medidas/getMedidasInstituicao", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao
        })
    }).then(function (resposta) {     
        if (resposta.ok) {
            resposta.json().then(json => {
                for(i = 0; i < json.length; i++){
                    if(json[i]['tipo'] == "Processador"){
                        dadosCPU.push(json[i]['valor']);
                    }else if(json[i]['tipo'] == "Memória RAM"){
                        dadosRAM.push(json[i]['valor']);
                    }else if(json[i]['tipo'] == "Disco Rígido"){
                        dadosDK.push(json[i]['valor']);
                    }else{
                        console.log(json[i]['tipo'])
                    }
                }
            });
        } else {
            console.log("Houve um erro ao tentar se comunicar!");
        
            resposta.text().then(texto => {
                console.log(texto)
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })   
}

function getMediasInstituicao(){
    fetch("/medidas/getMediasInstituicao", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao
        })
    }).then(function (resposta) {     
        if (resposta.ok) {
            resposta.json().then(json => {
                mediaCPU = json[0].mediaCPU.toFixed(2);
                mediaRAM = ((json[0].mediaRAM * 100) / 8).toFixed(2);
            });

        } else {
            console.log("Houve um erro ao tentar se comunicar!");
        
            resposta.text().then(texto => {
                console.log(texto)
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })   
}

function getMaquinasMonitoradas(){
    fetch("/medidas/getMaquinasMonitoradas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao
        })
    }).then(function (resposta) {     
        if (resposta.ok) {
            resposta.json().then(json => {
                qtd = json[0].qtd;
            });

        } else {
            console.log("Houve um erro ao tentar se comunicar!");
        
            resposta.text().then(texto => {
                console.log(texto)
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })   
}

function getDisponibilidade(){
    fetch("/medidas/getDisponibilidade", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao
        })
    }).then(function (resposta) {     
        if (resposta.ok) {
            resposta.json().then(json => {
                qtdMaquinasManutencao = json[0].qtdManutencao;
            });

        } else {
            console.log("Houve um erro ao tentar se comunicar!");
        
            resposta.text().then(texto => {
                console.log(texto)
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })   
}

function setDadosG4(idEquipamento){
    fetch("/medidas/setDadosG4", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idEquipamentoServer: idEquipamento
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                dadosCPU4 = [];
                dadosRAM4 = [];
                dadosDK4 = [];

                for(i = 0; i < json.length; i++){
                    if(json[i]['tipo'] == "Processador"){
                        dadosCPU4.push(json[i]['valor']);
                    }else if(json[i]['tipo'] == "Memória RAM"){
                        dadosRAM4.push(json[i]['valor']);
                    }else if(json[i]['tipo'] == "Disco Rígido"){
                        dadosDK4.push(json[i]['valor']);
                    }else{
                        console.log(json[i]['tipo'])
                    }   
                }

                plot4();
            });
        } else {
            console.log("Houve um erro ao tentar se comunicar!");
        
            resposta.text().then(texto => {
                console.log(texto)
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
}

function getMaquinasInstituicao(){
    fetch("/medidas/getMaquinasInstituicao", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                idEquipamento1 = json[0].idEquipamento;

                for(i = 0; i < json.length; i++){
                    x = document.createElement("option");
                    x.setAttribute("value", json[i].idEquipamento);
                    x.innerHTML = `${json[i].numeroPatrimonio} (${json[i].sala}) - ${json[i].modelo}`;
                    selectMaquinas.appendChild(x);
                }
                
                setDadosG4(idEquipamento1);
            });
        } else {
            console.log("Houve um erro ao tentar se comunicar!");
        
            resposta.text().then(texto => {
                console.log(texto)
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
}

function changeEquipamento(){
    alert("Mudou");
}

getDadosInstituicao();
getMediasInstituicao();
getMaquinasMonitoradas();
getDisponibilidade();
getMaquinasInstituicao();

setTimeout(function() {
    setTimeout(function() {
        plot2()
        setTimeout(function() {
            setTimeout(function() {
                plotKPIs()
            },100)
            Chart.defaults.global.legend.display = false;
            plot3()
        },100)
    },100)
    plot1()
}, 2000);