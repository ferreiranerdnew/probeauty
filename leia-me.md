## Comandos VSCODE
ctrl+shift+P : Abre a caixa de comando

###### inicio Alimentado pasta WS do projeto criação de Back end
# No terminal
1) Abrir o terminal e navegar ate a pasta WS com cd src ; cd ws
     1.a) rodar comando npm init

2) criar uma arquivo chamado índex.js na pasta WS

Pode ser utilizado o npm ou yarn, para utilizar o yarn, é preciso o instalar. No cmd ou terminal rodar o comando npm install --global yarn.  Par a verificar a versão instalada rodar o comando yarn --version
yarn add express morgan
Ops sempre na pasta ws no terminal

3) Criar pasta Src , sub pastas models; routes; services

4) instalar o nodemon de form aglobal abrir o terminal e rodar o comando npm install -g nodemon

### ** Apos configurações testar o ws na porta 8000
1) Abrir o terminal e navegar ate a pasta WS com cd src ; cd ws
ir ate a peans ws pelo terminal executar o comando yarn start
OB deve estar na parta WS

#### iniciar aquivo de configuração do banco de dados 
na pasta WS criar uma arquivo chamado database.js
utilizar o banco MongoDB

MongoDB Community Server
https://www.mongodb.com/try/download/community

pode ser utilizado em nuvem tambem 
pesquisar no google port mongodb atlas

https://cloud.mongodb.com/v2/680fd84f7cf5ae6bba90d3ee#/overview?automateSecurity=true

ferreiranerdphf@gmail.com

senha correta do banco 
ferreiranerdphf
wqPL7sxHH3M0G6i1

precisa criar um novo projeto apos criação criar um Cluster
 ClusterDEV
 ferreiranerdphf
 xbjK6BT16fd6QubP

dentro da pasta ws executar o comando yarn add mongoose

fazer o curso de javascript do zero 
https://www.youtube.com/watch?v=srcN3W73SgE&list=PL_Axpn7FrXHRgMwxB3EJiR6p0Ug2GcbIq

https://www.youtube.com/watch?v=04QoJx7r_XQ&list=PL_Axpn7FrXHR3nZiQPHFClLu6VByhWkzG&index=2
 video parou em 2:04:47

video configuração de banco inicia apos o minuto 1:00:02 e finaliza em 1:06:22
gerenciar o banco mongoDB via grafico , fazer download do mongodb compass e free

do minuto 1:10 esta sendo falado sobre as rotas (routes)

para testar as routes é preciso ter uam aplicativo chamado insomnia
Download Insomnia

existe alguns modulos e precisa ser instalados como por exemplo o cors para instalar so rodar no terminal a informação abaixo

yarn add cors

para salvar arquivos na AWS é preciso executar os fontes abaixo
rodar na pasta WS
atrelado ao arquivo.js do modal
yarn add connect-busboy busboy-body-parser aws-sdk

https://us-east-2.console.aws.amazon.com/console/home?region=us-east-2#
login AWS => operandoopcoes1@gmail.com
Senha     => Zocca171416*
pegar a chave na AWS inicia no tempo 1:45:26 do segudno video 
criar usuario IAM, este usaurio tem a possibilidade de acessar via API os recursos da AWS

precisa ir em S3 e Criar bucket

o busboy precisa ser instalado  
yarn add busboy

tudo que é Busboy e AWS foi para gravar os arquivos de imagens

2:22:49