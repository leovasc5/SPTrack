span_usuario.innerHTML = JSON.parse(sessionStorage.usuario).nome;


maquinasTotal = [];

maquinasEmManutencao = [];
idManutencao = [];
maquinasDescricao = [];
manutencaoModelo = [];
patrimonioManutencao = [];

maquinasLivres = [];
maquinasLivresNP = [];
maquinasLivresMO = [];
maquinasLivresSA = [];

maquinasTotalNP = [];
maquinasTotalMO = [];
maquinasTotalSA = [];

// function levarManutencao(){
//     checks = document.getElementsByClassName("changeDisponibilidade");
//     paiForms.innerHTML = "";

//     for(i = 0; i < checks.length; i++){
//         if(checks[i].checked){
//             paiForms.innerHTML += `
//                 <div class="row">
//                       <div class="col-lg-6 mb-4">
//                           <div class="card shadow mb-4"></div>
//                           <div class="card shadow mb-4">
//                               <div class="card-header py-3" style="padding-bottom: 8px;">
//                                   <h6 class="text-primary fw-bold m-0">Cadastrar na Manutenção (Patrimônio ${maquinasLivresNP[i]} - ${maquinasLivresMO[i]})</h6>
//                               </div>
//                               <ul class="list-group list-group-flush">
//                                   <li class="list-group-item">
//                                       <div class="row align-items-center no-gutters">
//                                           <div class="col me-2">
//                                               <h6 class="mb-0"><strong>Descrição do Problema</strong></h6><input type="text" id="descricao${i}" placeholder="Descrição" 
//                                               style="margin-top: 9px;margin-left: 1px;border: none;border-bottom: 1px solid;outline: none; width: 640px">
//                                           </div>
//                                       </div>
//                                   </li>
//                               </ul>
//                           </div><button class="btn btn-primary btn-sm" type="submit" style="background: #008000;margin-left: 3px;" onclick="inserirNaManutencao(${maquinasLivres[i]}, descricao${i}.value)">Confirmar Inserção</button>
//                       </div>
//                   </div>`;
//         }
//     }
// }

// function tirarManutencao(){
//     checks = document.getElementsByClassName("changeManutencao");
//     paiForms.innerHTML = "";

//     for(i = 0; i < checks.length; i++){
//         if(checks[i].checked){
//             paiForms.innerHTML += `
//                 <div class="row">
//                       <div class="col-lg-6 mb-4">
//                           <div class="card shadow mb-4"></div>
//                           <div class="card shadow mb-4">
//                               <div class="card-header py-3" style="padding-bottom: 8px;">
//                                   <h6 class="text-primary fw-bold m-0">Retirar da Manutenção (Patrimônio ${checks[i].value} - ${manutencaoModelo[i]})</h6>
//                               </div>
//                               <ul class="list-group list-group-flush">
//                                   <li class="list-group-item">
//                                       <div class="row align-items-center no-gutters">
//                                           <div class="col me-2">
//                                               <h6 class="mb-0"><strong>Descrição do Problema</strong></h6><input type="text" id="descricao${i}" placeholder="Descrição" 
//                                               style="margin-top: 9px;margin-left: 1px;border: none;border-bottom: 1px solid;outline: none; width: 640px" value="${maquinasDescricao[i]}">
//                                           </div>
//                                       </div>
//                                   </li>
//                               </ul>
//                           </div><button class="btn btn-primary btn-sm" type="submit" style="background: #008000;margin-left: 3px;" onclick="retirarDaManutencao(${checks[i].value}, descricao${i}.value, ${idManutencao[i]})">Confirmar Retirada</button>
//                       </div>
//                   </div>`;
//         }
//     }
// }

function retirarDaManutencao(patrimonio, descricao, idMaquina){
    fetch("/medidas/retirarDaManutencao", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            patrimonioServer: patrimonio,
            descricaoServer: descricao,
            idServer: idMaquina
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Máquina retirada da manutenção!',
                    showConfirmButton: false,
                    timer: 1500
                  })

                  setInterval(() => {
                    window.location.reload()
                  }, 3000);
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

function inserirNaManutencao(idEquipamento, descricao){
    fetch("/medidas/inserirNaManutencao", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idEquipamentoServer: idEquipamento,
            descricaoServer: descricao,
            idUsuarioServer: JSON.parse(sessionStorage.usuario).idUsuario
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => {
                console.log(json);
                
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Máquina inserida na manutenção!',
                    showConfirmButton: false,
                    timer: 1500
                  })

                  setInterval(() => {
                    window.location.reload()
                  }, 3000);
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

function plotKPIs(){
    span_qtdFuncionando.innerHTML = `${maquinasTotal.length - maquinasEmManutencao.length} máquinas`;
    span_qtdManutencao.innerHTML = `${maquinasEmManutencao.length} máquinas`;
}

// Funcao para capturar todas as máquinas
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
                console.log(json);
                for(i = 0; i < json.length; i++){
                    maquinasTotal.push(json[i]['idEquipamento']);
                    maquinasTotalNP.push(json[i]['numeroPatrimonio']);
                    maquinasTotalMO.push(json[i]['modelo']);
                    maquinasTotalSA.push(json[i]['nomeSala']);
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

// Funcao para capturar as máquinas em manutencao
function getMaquinasManutencao(){
    fetch("/medidas/getMaquinasManutencao", {
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
                console.log(json)
                for(i = 0; i < json.length; i++){
                    maquinasEmManutencao.push(json[i]['idEquipamento']);
                    maquinasDescricao.push(json[i]['descricao']);
                    manutencaoModelo.push(json[i]['modelo']);
                    idManutencao.push(json[i]['idManutencao']);
                    patrimonioManutencao.push(json[i]['numeroPatrimonio']);

                    paiMans.innerHTML += ` <li class="list-group-item">
                    <div class="row align-items-center no-gutters">
                        <div class="col me-2" onclick="verifyUnit(false)">
                        <input type="checkbox" id="maquinaM${i}" class="changeManutencao" value="${json[i]['numeroPatrimonio']}" hidden>
                        <label for="maquinaM${i}" class="onmouseoverclass">Máquina ${json[i]['numeroPatrimonio']} - ${json[i]['modelo']} (${json[i]['nomeSala']})</label><br>
                        </div></li></div>`;
                }
                plotKPIs();
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

function plotMaquinasDisponiveis(){
    for(i = 0; i < maquinasTotal.length; i++){
        if(maquinasEmManutencao.indexOf(maquinasTotal[i]) === -1){
            paiDisps.innerHTML += ` <li class="list-group-item">
            <div class="row align-items-center no-gutters">
                <div class="col me-2" onclick="verifyUnit(true)">
                <input type="checkbox" id="maquinaD${i}" class="changeDisponibilidade" value="${maquinasTotal[i]}" hidden>
                <label for="maquinaD${i}" class="onmouseoverclass">Máquina ${maquinasTotalNP[i]} - ${maquinasTotalMO[i]} (${maquinasTotalSA[i]})</label><br>
            </div></li></div>`;
            maquinasLivres.push(maquinasTotal[i]);
            maquinasLivresNP.push(maquinasTotalNP[i]);
            maquinasLivresMO.push(maquinasTotalMO[i]);
            maquinasLivresSA.push(maquinasTotalSA[i]);
        }
    }
}

function verifyUnit(isDisponivel){
    if(isDisponivel){
        checks = document.getElementsByClassName("changeDisponibilidade");

        for(i = 0; i < checks.length; i++){
            if(checks[i].checked){
                var idEquipamento = maquinasLivres[i];
                btn = checks[i];

                Swal.fire({
                    title: 'Deseja inserir a máquina na manutenção?',
                    input: 'text',
                    inputAttributes: {
                      autocapitalize: 'off',
                      placeholder: 'Descrição do Problema',
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Inserir',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#1cc88a',
                    showLoaderOnConfirm: true,
                }).then((descricao) => {
                    if(descricao.dismiss != 'cancel'){
                        inserirNaManutencao(idEquipamento, descricao.value);
                    }else{
                        btn.checked = false;
                    }
                })
            }
        }
    }else{
        checks = document.getElementsByClassName("changeManutencao");

        for(i = 0; i < checks.length; i++){
            if(checks[i].checked){
                var idMan = idManutencao[i];
                var desc = maquinasDescricao[i];
                var patrimonio = patrimonioManutencao[i];
                btn = checks[i];

                Swal.fire({
                    title: 'Deseja retirar da manutenção?',
                    input: 'text',
                    inputAttributes: {
                      autocapitalize: 'off',
                      placeholder: 'Descrição da resolução',
                    },
                    inputValue: desc,
                    showCancelButton: true,
                    confirmButtonText: 'Disponibilizar',
                    cancelButtonText: 'Cancelar',
                    confirmButtonColor: '#1cc88a',
                    showLoaderOnConfirm: true,
                }).then((descricao) => {
                    if(descricao.dismiss != 'cancel'){
                        retirarDaManutencao(patrimonio, descricao.value, idMan);
                    }else{
                        btn.checked = false;
                    }
                })
            }
        }
    }
}

getMaquinasInstituicao();
setTimeout(function() {
    getMaquinasManutencao();

    setTimeout(function() {
        plotMaquinasDisponiveis();
    }, 1000);
}, 1000)

