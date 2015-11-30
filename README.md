Frontend Components (web components)
===================

Para usar o Frontend Components, vamos usar como um submodule dentro dos projetos. Para utilizá-lo em seu projeto, basta adicionar: 
```
git submodule add git@github.com:quintoandar/frontend-components.git seu_path_no_repositorio/qa-components
```

Também é possível usar o *Bower* para baixar QA Components.

Caso não tenha o bower instalado execute o comando:
```
$ npm install -g bower
```

Vá até o diretório do seu projeto e digite:
#### Informe dados do projeto
```
$ bower init
```

#### Baixe os components:
```
$ bower install --save "qa-components"=git://github.com/quintoandar/frontend-polymer
```
