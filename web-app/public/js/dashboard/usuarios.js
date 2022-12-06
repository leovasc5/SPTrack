span_usuario.innerHTML = JSON.parse(sessionStorage.usuario).nome;

function cadastrar() {
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
       
        body: JSON.stringify({
            idInstituicaoServer: JSON.parse(sessionStorage.usuario).fkInstituicao,
            fkGestorServer: JSON.parse(sessionStorage.usuario).fkGestor,
            nomeServer: nome.value,
            emailServer: email.value, 
            senhaServer: senha.value,
            tipoUsuarioServer: tipoUsuario.value,
            nivelAcessoServer: nivelAcesso.value,
            // fkGestorServer: fkGestor,
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(json => { 
               
                Swal.fire(
                    'Sucesso!',
                    'O funcionário foi cadastrado!',
                    'success'
                )                
                setInterval(() => {
                    //window.location.reload()
                }, 1250); 
            });
        } else {
         Swal.fire(
             'Erro!',
             'Não foi possivel cadastrar!',
             'error'
         )              
            setInterval(() => {
                //window.location.reload();
            }, 1250); 
            resposta.text().then(texto => {
                console.log(texto)
            });
        }
    }).catch(function (erro) {
        console.log(erro);
    })
}