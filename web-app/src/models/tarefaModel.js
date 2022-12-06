var database = require("../database/config");

function insertTarefa(idInstituicao, nomeTarefa, descricao, dtInicio, dtFim, isDomingo, isSegunda, isTerca, isQuarta, isQuinta, isSexta, isSabado, horarioInicioDomingo, horarioFimDomingo, 
    horarioInicioSegunda, horarioFimSegunda, horarioInicioTerca, horarioFimTerca, horarioInicioQuarta, horarioFimQuarta, horarioInicioQuinta, horarioFimQuinta, horarioInicioSexta, 
    horarioFimSexta, horarioInicioSabado, horarioFimSabado) {
    
    if(dtInicio != 'NOW()' && dtFim != 'NULL'){
        if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
            return database.executar(`INSERT INTO tarefa VALUES (
                NULL,
                '${nomeTarefa}',
                '${descricao}',
                '${dtInicio}',
                '${dtFim}',
                ${isDomingo},
                ${isSegunda},
                ${isTerca},
                ${isQuarta},
                ${isQuinta},
                ${isSexta},
                ${isSabado},
                ${horarioInicioDomingo},
                ${horarioFimDomingo},
                ${horarioInicioSegunda},
                ${horarioFimSegunda},
                ${horarioInicioTerca},
                ${horarioFimTerca},
                ${horarioInicioQuarta},
                ${horarioFimQuarta},
                ${horarioInicioQuinta},
                ${horarioFimQuinta},
                ${horarioInicioSexta},
                ${horarioFimSexta},
                ${horarioInicioSabado},
                ${horarioFimSabado},
                ${idInstituicao}
            );`);
        }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
            query = `INSERT INTO tarefa VALUES (
                '${nomeTarefa}',
                '${descricao}',
                '${dtInicio.slice(0, 19).replace('T', ' ') + ':00'}',
                '${dtFim.slice(0, 19).replace('T', ' ') + ':00'}',
                ${isDomingo},
                ${isSegunda},
                ${isTerca},
                ${isQuarta},
                ${isQuinta},
                ${isSexta},
                ${isSabado},
                ${horarioInicioDomingo},
                ${horarioFimDomingo},
                ${horarioInicioSegunda},
                ${horarioFimSegunda},
                ${horarioInicioTerca},
                ${horarioFimTerca},
                ${horarioInicioQuarta},
                ${horarioFimQuarta},
                ${horarioInicioQuinta},
                ${horarioFimQuinta},
                ${horarioInicioSexta},
                ${horarioFimSexta},
                ${horarioInicioSabado},
                ${horarioFimSabado},
                ${idInstituicao}
                );`;
            console.log(query)
            return database.executar(query);
        }
    }else if(dtInicio == 'NOW()' && dtFim != 'NULL'){
        if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
            return database.executar(`INSERT INTO tarefa VALUES (
                NULL,
                '${nomeTarefa}',
                '${descricao}',
                ${dtInicio},
                '${dtFim}',
                ${isDomingo},
                ${isSegunda},
                ${isTerca},
                ${isQuarta},
                ${isQuinta},
                ${isSexta},
                ${isSabado},
                ${horarioInicioDomingo},
                ${horarioFimDomingo},
                ${horarioInicioSegunda},
                ${horarioFimSegunda},
                ${horarioInicioTerca},
                ${horarioFimTerca},
                ${horarioInicioQuarta},
                ${horarioFimQuarta},
                ${horarioInicioQuinta},
                ${horarioFimQuinta},
                ${horarioInicioSexta},
                ${horarioFimSexta},
                ${horarioInicioSabado},
                ${horarioFimSabado},
                ${idInstituicao}
            );`)
        }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
            query = `INSERT INTO tarefa VALUES (
                '${nomeTarefa}',
                '${descricao}',
                GETDATE(),
                '${dtFim.slice(0, 19).replace('T', ' ') + ':00'}',
                ${isDomingo},
                ${isSegunda},
                ${isTerca},
                ${isQuarta},
                ${isQuinta},
                ${isSexta},
                ${isSabado},
                ${horarioInicioDomingo},
                ${horarioFimDomingo},
                ${horarioInicioSegunda},
                ${horarioFimSegunda},
                ${horarioInicioTerca},
                ${horarioFimTerca},
                ${horarioInicioQuarta},
                ${horarioFimQuarta},
                ${horarioInicioQuinta},
                ${horarioFimQuinta},
                ${horarioInicioSexta},
                ${horarioFimSexta},
                ${horarioInicioSabado},
                ${horarioFimSabado},
                ${idInstituicao}
                );`;
            console.log(query)
            return database.executar(query);
        }
    }else if(dtInicio != 'NOW()' && dtFim == 'NULL'){
        if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
            return database.executar(`INSERT INTO tarefa VALUES (
                NULL,
                '${nomeTarefa}',
                '${descricao}',
                '${dtInicio}',
                ${dtFim},
                ${isDomingo},
                ${isSegunda},
                ${isTerca},
                ${isQuarta},
                ${isQuinta},
                ${isSexta},
                ${isSabado},
                ${horarioInicioDomingo},
                ${horarioFimDomingo},
                ${horarioInicioSegunda},
                ${horarioFimSegunda},
                ${horarioInicioTerca},
                ${horarioFimTerca},
                ${horarioInicioQuarta},
                ${horarioFimQuarta},
                ${horarioInicioQuinta},
                ${horarioFimQuinta},
                ${horarioInicioSexta},
                ${horarioFimSexta},
                ${horarioInicioSabado},
                ${horarioFimSabado},
                ${idInstituicao}
            );`)
        }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
            query = `INSERT INTO tarefa VALUES (
                '${nomeTarefa}',
                '${descricao}',
                '${dtInicio.slice(0, 19).replace('T', ' ') + ':00'}',
                NULL,
                ${isDomingo},
                ${isSegunda},
                ${isTerca},
                ${isQuarta},
                ${isQuinta},
                ${isSexta},
                ${isSabado},
                ${horarioInicioDomingo},
                ${horarioFimDomingo},
                ${horarioInicioSegunda},
                ${horarioFimSegunda},
                ${horarioInicioTerca},
                ${horarioFimTerca},
                ${horarioInicioQuarta},
                ${horarioFimQuarta},
                ${horarioInicioQuinta},
                ${horarioFimQuinta},
                ${horarioInicioSexta},
                ${horarioFimSexta},
                ${horarioInicioSabado},
                ${horarioFimSabado},
                ${idInstituicao}
                );`;
            console.log(query)
            return database.executar(query);
        }
    }else if(dtInicio == 'NOW()' && dtFim == 'NULL'){
        if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
            return database.executar(`INSERT INTO tarefa VALUES (
            NULL,
            '${nomeTarefa}',
            '${descricao}',
            ${dtInicio},
            ${dtFim},
            ${isDomingo},
            ${isSegunda},
            ${isTerca},
            ${isQuarta},
            ${isQuinta},
            ${isSexta},
            ${isSabado},
            ${horarioInicioDomingo},
            ${horarioFimDomingo},
            ${horarioInicioSegunda},
            ${horarioFimSegunda},
            ${horarioInicioTerca},
            ${horarioFimTerca},
            ${horarioInicioQuarta},
            ${horarioFimQuarta},
            ${horarioInicioQuinta},
            ${horarioFimQuinta},
            ${horarioInicioSexta},
            ${horarioFimSexta},
            ${horarioInicioSabado},
            ${horarioFimSabado},
            ${idInstituicao}
            );`);
        }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
            return database.executar(`INSERT INTO tarefa VALUES (
            '${nomeTarefa}',
            '${descricao}',
            GETDATE(),
            NULL,
            ${isDomingo},
            ${isSegunda},
            ${isTerca},
            ${isQuarta},
            ${isQuinta},
            ${isSexta},
            ${isSabado},
            ${horarioInicioDomingo},
            ${horarioFimDomingo},
            ${horarioInicioSegunda},
            ${horarioFimSegunda},
            ${horarioInicioTerca},
            ${horarioFimTerca},
            ${horarioInicioQuarta},
            ${horarioFimQuarta},
            ${horarioInicioQuinta},
            ${horarioFimQuinta},
            ${horarioInicioSexta},
            ${horarioFimSexta},
            ${horarioInicioSabado},
            ${horarioFimSabado},
            ${idInstituicao}
            );`);
        }
    }
}

function getLastTarefa(fkInstituicao){
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
        return database.executar(`SELECT idTarefa FROM tarefa WHERE fkInstituicao = ${fkInstituicao} ORDER BY idTarefa DESC LIMIT 1;`);
    }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
        return database.executar(`SELECT TOP 1 idTarefa FROM tarefa WHERE fkInstituicao = ${fkInstituicao} ORDER BY idTarefa DESC;`);
    }
}

function setTarefaXequipamento(idTarefa, idEquipamento){
    return database.executar(`INSERT INTO tarefaXequipamento VALUES (${idTarefa}, ${idEquipamento});`);
}

function getTarefas(fkInstituicao){
    return database.executar(`SELECT * FROM tarefa WHERE fkInstituicao = ${fkInstituicao};`);
}

function getTarefa(idTarefa){
    return database.executar(`SELECT * FROM tarefa WHERE idTarefa = ${idTarefa};`);
}

function getMedidasTarefa(fkInstituicao, idTarefa){
    // Atenção, desenvolvedor: Query provisória, será desenvolvida depois
    return database.executar(`SELECT * FROM tarefa WHERE idTarefa = ${idTarefa};`)
}

function deleteTarefa(idTarefa){
    database.executar(`DELETE FROM medidaTarefa WHERE fkTarefa = ${idTarefa}`);
    database.executar(`DELETE FROM tarefaXequipamento WHERE fkTarefa = ${idTarefa}`);
    return database.executar(`DELETE FROM tarefa WHERE idTarefa = ${idTarefa};`);
}

function getTarefaXequipamento(idTarefa){
    return database.executar(`SELECT * FROM tarefaXequipamento WHERE fkTarefa = ${idTarefa};`);
}

function updateTarefa(idInstituicao, nomeTarefa, descricao, dtInicio, dtFim, isDomingo, isSegunda, isTerca, isQuarta, isQuinta, isSexta, isSabado, horarioInicioDomingo, horarioFimDomingo, 
    horarioInicioSegunda, horarioFimSegunda, horarioInicioTerca, horarioFimTerca, horarioInicioQuarta, horarioFimQuarta, horarioInicioQuinta, horarioFimQuinta, horarioInicioSexta, 
    horarioFimSexta, horarioInicioSabado, horarioFimSabado, idTarefa, maquinas){

    if(dtInicio != 'NOW()' && dtFim != 'NULL'){
        if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
            query = `UPDATE tarefa SET
            nome = '${nomeTarefa}',
            descricao = '${descricao}',
            dataInicio = '${dtInicio}',
            dataFim = '${dtFim}',
            isDomingo = ${isDomingo},
            isSegunda = ${isSegunda},
            isTerca = ${isTerca},
            isQuarta = ${isQuarta},
            isQuinta = ${isQuinta},
            isSexta = ${isSexta},
            isSabado = ${isSabado},
            horarioInicioDomingo = ${horarioInicioDomingo},
            horarioFimDomingo = ${horarioFimDomingo},
            horarioInicioSegunda = ${horarioInicioSegunda},
            horarioFimSegunda = ${horarioFimSegunda},
            horarioInicioTerca = ${horarioInicioTerca},
            horarioFimTerca = ${horarioFimTerca},
            horarioInicioQuarta = ${horarioInicioQuarta},
            horarioFimQuarta = ${horarioFimQuarta},
            horarioInicioQuinta = ${horarioInicioQuinta},
            horarioFimQuinta = ${horarioFimQuinta},
            horarioInicioSexta = ${horarioInicioSexta},
            horarioFimSexta = ${horarioFimSexta},
            horarioInicioSabado = ${horarioInicioSabado},
            horarioFimSabado = ${horarioFimSabado}
            WHERE idTarefa = ${idTarefa};`
            database.executar(query);
            console.log(query)
        }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
            query = `UPDATE tarefa SET
            nome = '${nomeTarefa}',
            descricao = '${descricao}',
            dataInicio = '${dtInicio.slice(0, 19).replace('T', ' ') + ':00'}',
            dataFim = '${dtFim.slice(0, 19).replace('T', ' ') + ':00'}',
            isDomingo = ${isDomingo},
            isSegunda = ${isSegunda},
            isTerca = ${isTerca},
            isQuarta = ${isQuarta},
            isQuinta = ${isQuinta},
            isSexta = ${isSexta},
            isSabado = ${isSabado},
            horarioInicioDomingo = '${horarioInicioDomingo}',
            horarioFimDomingo = '${horarioFimDomingo}',
            horarioInicioSegunda = '${horarioInicioSegunda}',
            horarioFimSegunda = '${horarioFimSegunda}',
            horarioInicioTerca = '${horarioInicioTerca}',
            horarioFimTerca = '${horarioFimTerca}',
            horarioInicioQuarta = '${horarioInicioQuarta}',
            horarioFimQuarta = '${horarioFimQuarta}',
            horarioInicioQuinta = '${horarioInicioQuinta}',
            horarioFimQuinta = '${horarioFimQuinta}',
            horarioInicioSexta = '${horarioInicioSexta}',
            horarioFimSexta = '${horarioFimSexta}',
            horarioInicioSabado = '${horarioInicioSabado}',
            horarioFimSabado = '${horarioFimSabado}'
            WHERE idTarefa = ${idTarefa};`
            database.executar(query);
            console.log(query)
        }
    }else if(dtInicio == 'NOW()' && dtFim != 'NULL'){
            database.executar(`UPDATE tarefa SET
            nome = '${nomeTarefa}',
            descricao = '${descricao}',
            dataInicio = ${dtInicio},
            dataFim = '${dtFim}',
            isDomingo = ${isDomingo},
            isSegunda = ${isSegunda},
            isTerca = ${isTerca},
            isQuarta = ${isQuarta},
            isQuinta = ${isQuinta},
            isSexta = ${isSexta},
            isSabado = ${isSabado},
            horarioInicioDomingo = ${horarioInicioDomingo},
            horarioFimDomingo = ${horarioFimDomingo},
            horarioInicioSegunda = ${horarioInicioSegunda},
            horarioFimSegunda = ${horarioFimSegunda},
            horarioInicioTerca = ${horarioInicioTerca},
            horarioFimTerca = ${horarioFimTerca},
            horarioInicioQuarta = ${horarioInicioQuarta},
            horarioFimQuarta = ${horarioFimQuarta},
            horarioInicioQuinta = ${horarioInicioQuinta},
            horarioFimQuinta = ${horarioFimQuinta},
            horarioInicioSexta = ${horarioInicioSexta},
            horarioFimSexta = ${horarioFimSexta},
            horarioInicioSabado = ${horarioInicioSabado},
            horarioFimSabado = ${horarioFimSabado},
            WHERE idTarefa = ${idTarefa};`);
    }else if(dtInicio != 'NOW()' && dtFim == 'NULL'){
            database.executar(`UPDATE tarefa SET
            nome = '${nomeTarefa}',
            descricao = '${descricao}',
            dataInicio = '${dtInicio}',
            dataFim = ${dtFim},
            isDomingo = ${isDomingo},
            isSegunda = ${isSegunda},
            isTerca = ${isTerca},
            isQuarta = ${isQuarta},
            isQuinta = ${isQuinta},
            isSexta = ${isSexta},
            isSabado = ${isSabado},
            horarioInicioDomingo = ${horarioInicioDomingo},
            horarioFimDomingo = ${horarioFimDomingo},
            horarioInicioSegunda = ${horarioInicioSegunda},
            horarioFimSegunda = ${horarioFimSegunda},
            horarioInicioTerca = ${horarioInicioTerca},
            horarioFimTerca = ${horarioFimTerca},
            horarioInicioQuarta = ${horarioInicioQuarta},
            horarioFimQuarta = ${horarioFimQuarta},
            horarioInicioQuinta = ${horarioInicioQuinta},
            horarioFimQuinta = ${horarioFimQuinta},
            horarioInicioSexta = ${horarioInicioSexta},
            horarioFimSexta = ${horarioFimSexta},
            horarioInicioSabado = ${horarioInicioSabado},
            horarioFimSabado = ${horarioFimSabado}
            WHERE idTarefa = ${idTarefa};`);
    }else if(dtInicio == 'NOW()' && dtFim == 'NULL'){
            database.executar(`UPDATE tarefa SET
            nome = '${nomeTarefa}',
            descricao = '${descricao}',
            dataInicio = ${dtInicio},
            dataFim = ${dtFim},
            isDomingo = ${isDomingo},
            isSegunda = ${isSegunda},
            isTerca = ${isTerca},
            isQuarta = ${isQuarta},
            isQuinta = ${isQuinta},
            isSexta = ${isSexta},
            isSabado = ${isSabado},
            horarioInicioDomingo = ${horarioInicioDomingo},
            horarioFimDomingo = ${horarioFimDomingo},
            horarioInicioSegunda = ${horarioInicioSegunda},
            horarioFimSegunda = ${horarioFimSegunda},
            horarioInicioTerca = ${horarioInicioTerca},
            horarioFimTerca = ${horarioFimTerca},
            horarioInicioQuarta = ${horarioInicioQuarta},
            horarioFimQuarta = ${horarioFimQuarta},
            horarioInicioQuinta = ${horarioInicioQuinta},
            horarioFimQuinta = ${horarioFimQuinta},
            horarioInicioSexta = ${horarioInicioSexta},
            horarioFimSexta = ${horarioFimSexta},
            horarioInicioSabado = ${horarioInicioSabado},
            horarioFimSabado = ${horarioFimSabado}
            WHERE idTarefa = ${idTarefa};`);
    }

    if(maquinas != 'vazio'){
        database.executar(`DELETE FROM tarefaXequipamento WHERE fkTarefa =  ${idTarefa};`);

        for(i = 0; i < maquinas.length; i++){
            database.executar(`INSERT INTO tarefaXequipamento VALUES (${idTarefa}, ${maquinas[i]});`)
        }
    }

    return database.executar(`SELECT * FROM tarefaXequipamento;`);
}

function listarMaquinas(idTarefa){
    return database.executar(`SELECT equipamento.idEquipamento, equipamento.modelo, equipamento.numeroPatrimonio, sala.nome
    FROM tarefaXequipamento JOIN equipamento ON tarefaXequipamento.fkEquipamento = equipamento.idEquipamento 
    JOIN locacao ON equipamento.idEquipamento = locacao.fkEquipamento JOIN sala ON locacao.fkSala = sala.idSala
    WHERE tarefaXequipamento.fkTarefa = ${idTarefa};`)
}

function getMediaRAM(idTarefa){
    return database.executar(`SELECT medidaTarefa.valor, componente.capacidade FROM medidaTarefa JOIN 
    componente ON medidaTarefa.fkComponente = componente.idComponente WHERE fkTarefa = ${idTarefa} AND componente.tipo = 'Memória RAM';`);
}

function getMediaCPU(idTarefa){
    return database.executar(`SELECT medidaTarefa.valor FROM medidaTarefa JOIN 
    componente ON medidaTarefa.fkComponente = componente.idComponente WHERE fkTarefa = ${idTarefa} AND componente.tipo = 'Processador';`);
}

function getDadosMedidas(idTarefa){
    return database.executar(`SELECT medidaTarefa.valor, componente.capacidade, medidaTarefa.dataRegistro, componente.tipo, componente.fkEquipamento FROM medidaTarefa 
        JOIN componente ON medidaTarefa.fkComponente = componente.idComponente WHERE medidaTarefa.fkTarefa = ${idTarefa};`)
}

function getQuantidadeDias(idTarefa){
    if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
        return database.executar(`SELECT COUNT(dataRegistro) FROM medidaTarefa WHERE fkTarefa = ${idTarefa} GROUP BY DATE_FORMAT(dataRegistro, '%Y%m%d');`);
    }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
        return database.executar(`SELECT COUNT(dataRegistro) FROM medidaTarefa WHERE fkTarefa = ${idTarefa} GROUP BY CONVERT(VARCHAR, dataRegistro, 105);`);
    }
}

function getDadosMedidasPersonalizado(idTarefa, tempo, equipamento){
    day = 0

    if(tempo == 0 && equipamento == 0){
        return database.executar(`SELECT medidaTarefa.valor, componente.capacidade, medidaTarefa.dataRegistro, componente.tipo, componente.fkEquipamento FROM medidaTarefa 
        JOIN componente ON medidaTarefa.fkComponente = componente.idComponente WHERE medidaTarefa.fkTarefa = ${idTarefa};`);
    }else if(tempo != 0 && equipamento == 0){
        if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
            return database.executar(`SELECT medidaTarefa.valor, componente.capacidade, medidaTarefa.dataRegistro, componente.tipo, componente.fkEquipamento FROM medidaTarefa 
            JOIN componente ON medidaTarefa.fkComponente = componente.idComponente WHERE medidaTarefa.fkTarefa = ${idTarefa} AND 
            medidaTarefa.dataRegistro <= NOW() AND medidaTarefa.dataRegistro >= NOW() - INTERVAL ${tempo} DAY;`);
        }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
            return database.executar(`SELECT medidaTarefa.valor, componente.capacidade, medidaTarefa.dataRegistro, componente.tipo, componente.fkEquipamento FROM medidaTarefa 
            JOIN componente ON medidaTarefa.fkComponente = componente.idComponente WHERE medidaTarefa.fkTarefa = ${idTarefa} AND 
            medidaTarefa.dataRegistro <= GETDATE() AND medidaTarefa.dataRegistro >= DATEADD(DAY, -${tempo}, GETDATE());`);
        }
    }else if(tempo == 0 && equipamento != 0){
        return database.executar(`SELECT medidaTarefa.valor, componente.capacidade, medidaTarefa.dataRegistro, componente.tipo, componente.fkEquipamento FROM medidaTarefa 
        JOIN componente ON medidaTarefa.fkComponente = componente.idComponente WHERE medidaTarefa.fkTarefa = ${idTarefa} AND fkEquipamento = ${equipamento};`);
    }else{
        if(process.env.AMBIENTE_PROCESSO == 'desenvolvimento'){
            return database.executar(`SELECT medidaTarefa.valor, componente.capacidade, medidaTarefa.dataRegistro, componente.tipo, componente.fkEquipamento FROM medidaTarefa 
            JOIN componente ON medidaTarefa.fkComponente = componente.idComponente WHERE medidaTarefa.fkTarefa = ${idTarefa} AND fkEquipamento = ${equipamento}
            AND medidaTarefa.dataRegistro <= NOW() AND medidaTarefa.dataRegistro >= NOW() - INTERVAL ${tempo} DAY;`)
        }else if(process.env.AMBIENTE_PROCESSO == 'producao'){
            return database.executar(`SELECT medidaTarefa.valor, componente.capacidade, medidaTarefa.dataRegistro, componente.tipo, componente.fkEquipamento FROM medidaTarefa 
            JOIN componente ON medidaTarefa.fkComponente = componente.idComponente WHERE medidaTarefa.fkTarefa = ${idTarefa} AND fkEquipamento = ${equipamento}
            AND medidaTarefa.dataRegistro <= GETDATE() AND medidaTarefa.dataRegistro >= GETDATE() - DATEADD(DAY, -${tempo}, GETDATE());`);
    
        }
    }
}

module.exports = {
    insertTarefa,
    getLastTarefa,
    setTarefaXequipamento,
    getTarefas,
    getTarefa,
    getMedidasTarefa,
    getMedidasTarefa,
    deleteTarefa,
    getTarefaXequipamento,
    updateTarefa,
    listarMaquinas,
    getMediaRAM,
    getMediaCPU,
    getDadosMedidas,
    getQuantidadeDias,
    getDadosMedidasPersonalizado
}