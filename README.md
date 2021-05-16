# JsonServerFront

WebApp desenvolvida para o desafio de FrontEnd - SocialBank, cujo onjetivo é desenvolver uma aplicação que permita criar, listar, editar e deletar um usuário (CRUD) utilizando JSON Server, possibiltando a paginação e filtrar essa listagem.

## Resumo Técnico
Esta aplicação foi desenvolvida em Angular 11, utiliza navegação por rotas e guard para permissão baseada em roles. Para estilização foi usado Angular material para criação do layout, e bootstrap para agilizar o alinhamento de componentes. E para nao ser refém de bootstrap, foi usado flexbox também (poderia ser usado no projeto inteiro, porem devido ao pouco tempo que eu tinha desenvolver este projeto, houve o auxilio de libs css).
Para nao mostrar de cara um portal de cadastro, foi feito uma tela de login, segue abaixo as instruçoes para uso.


## Instruções para uso

- Primeiramente, deve-se rodar o JSON-Server, executando o comando "json-server --watch db.json" no diretorio raíz do projeto. Após isso, deve-se prosseguir com o login.

-Alternativa Login 1 (super-user/admin)
login: ricksanchez
senha: rick123

-Alternativa Login 2 (normal-user)
login: mortysmith
password: morty123


- Para fazer o login, deve-se usar uma das alternativas acima. Devido a limitaçoes do JSON Server, a aplicação simula no próprio front um serviço de autenticação, nele consta um objeto chamado "adminTable", (hard coded mesmo) que contem os atributos: {login, password, name, role, token}, usados para comparação com os dados fornecidos no formulário de login. Após logar com sucesso, todos esses atributos, exceto "password", serão salvos no sessionStorage do navegador.

- Feito o login, entraremos na aplicação em si, no qual será visto um menu lateral com os itens: "Home","Usuários",  e "Logout", no qual os 2 primeiros são referentes a uma tela da aplicação, e o ultimo apenas um botão de logout. 

- A ideia para a tela home seria fazer um dashboard com graficos, para ilustrar os dados cadastrados na nossa aplicação, porém devido a limitaçoes de nossa API, foi colocado apenas uma mensagem de boas vindas ao administrador do sistema

- A tela "Usuarios" é onde toda a magia acontece.



## Observações
- Devido a limitação de tempo que eu tinha, aplicação não foi desenvolvida utilizando o conceito de "Mobile First", porém ela está responsiva e consegue-se usar pelo celular (durante o desenvolvimento foi usado o emulador mobile do chrome, com as configuraçoes de iPhone X - 375px por 812px)
