import pymysql
import pyodbc
import requests
import getmac
import os
import platform

cls = 'clear' if platform.system() == 'Linux' else 'cls'


URL = "https://api.pipefy.com/graphql"
headers = {

    "accept": "application/json",
    "content-type": "application/json",
    "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJ1c2VyIjp7ImlkIjozMDIwNzc1MzAsImVtYWlsIjoibWFyaWEubmV2ZXNAc3B0ZWNoLnNjaG9vbCIsImFwcGxpY2F0aW9uIjozMDAyMTQwNzN9fQ.y2SAHLixTf8FwwoXb7lXvPAIWXmw7rYwqlbFuDMqpaRk3iiq81x04i9BeX-dHWzE6jNS-21VG_SH_oBBqoOSpg"
}

modo = 'dev'
# modo = 'prod'

if modo == 'dev':
    conexao = pymysql.connect(
        host="localhost", user="sptrackClient", password="urubu100", database="SPTrack")
elif modo == 'prod':
    try:
        conexao = pyodbc.connect('DRIVER={ODBC Driver 18 for SQL Server};SERVER='+"sptrack.database.windows.net" +
                                 ';DATABASE='+"SPTrack"+';ENCRYPT=yes;UID='+"sptrackClient"+';PWD=' + "Sprint2SPTrack")
    except:
        conexao = pymysql.connect(
            host="localhost", user="sptrackClient", password="urubu100", database="SPTrack")
        modo = 'dev'
cursor = conexao.cursor()

try:
    cursor.execute(
        f"SELECT enderecoMac, idEquipamento FROM equipamento WHERE enderecoMac = '{getmac.get_mac_address()}'")
    dados = cursor.fetchone()

    enderecoMac = dados[0]
    idEquipamento = dados[1]
except:
    os.system(cls)
    print("Máquina não registrada, entre em contato com o suporte")
        

def abrirChamadoCPUTriagem():
    payload = {
        "query": "mutation { createCard(input: { pipe_id: 302793571, title: \"Uso de CPU acima da média\",fields_attributes:[ {field_id: \"qual_o_assunto_do_seu_pedido\", field_value: \"O computador está esquentando pouco\"}]}) {card {title}}}"}
    response = requests.post(URL, json=payload, headers=headers)
    x = response.text
    
    if modo == 'dev':
        query = f"INSERT INTO chamado VALUES (NULL, 'Uso de CPU muito alto', 1, NOW(), {idEquipamento})"
        cursor.execute(query)
        conexao.commit()
    elif modo == 'prod':
        cursor.execute(
            f"INSERT INTO chamado VALUES ('Uso de CPU muito alto', 1, GETDATE(), {idEquipamento})")
        conexao.commit()

def abrirChamadoRAMTriagem():
    payload = {
        "query": "mutation { createCard(input: { pipe_id: 302793571, title: \"Uso de RAM acima da média\",fields_attributes:[ {field_id: \"qual_o_assunto_do_seu_pedido\", field_value: \"O computador está travando\"}]}) {card {title}}}"}
    response = requests.post(URL, json=payload, headers=headers)
    x = response.text
    if modo == 'dev':
        query = f"INSERT INTO chamado VALUES (NULL, 'Uso de CPU muito alto', 1, NOW(), {idEquipamento})"
        cursor.execute(query)
        conexao.commit()
    elif modo == 'prod':
        cursor.execute(
            f"INSERT INTO chamado VALUES ('Uso de RAM muito alto', 2, GETDATE(), {idEquipamento})")
        conexao.commit()


