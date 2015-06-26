# Storefront Theme

Tema default para novas lojas VTEX.

## Pré-requisitos

- node ([Linux](https://gist.github.com/isaacs/579814), [Mac and Windows](https://nodejs.org/download/))
- [git](http://git-scm.com/)

## Primeiros passos

### 1 - Instalando

Clone esse repositório e instale suas dependências:

```
git clone git@github.com:vtex-apps/storefront-theme.git
cd storefront-theme
npm install
```

### 2 - Configurando a sandbox

> A sandbox é usada para testar apps que não estão publicadas. Você irá usar uma sandbox apenas se você é um desenvolvedor de apps VTEX - [Docs](http://vtex.github.io/docs/pt-br/portal/fundacao/sandbox.html)

A sandbox é como uma versão alternativa de uma app que só você vê durante desenvolvimento.

Precisamos indicar para o Storefront que **iremos utilizar** uma nova sandbox. Neste exemplo, usaremos o nome `minhasandbox`, mas você pode escolher o nome que quiser.

Faremos isso definindo um **cookie especial no seu browser**, com o nome `vtex_sandbox` e o valor `vtex/minhasandbox=dreamstore-theme`.

Para isso, baixe uma extensão do navegador que possibilite a alteração dos cookies. Recomendamos o [Cookie Inspector](https://chrome.google.com/webstore/detail/cookie-inspector/jgbbilmfbammlbbhmmgaagdkbkepnijn?utm_source=chrome-app-launcher-info-dialog). Para criar um novo cookie, abra o Developer Tools e clique na aba Cookies. Clique com o botão direito do mouse e escolha "Add New Cookie".

Edite esse cookie colocando as seguintes propriedades:

Nome|Valor
---|---
vtex_sandbox|vtex/minhasandbox=storefront-theme

### 3 - Iniciando o ambiente de desenvolvimento

Em um terminal no diretório deste repositório, inicie o servidor de desenvolvimento passando o nome da **sandbox** como primeiro parâmetro.

Isto irá criar um servidor de desenvolvimento local em `sualoja.local.myvtex.com:3000`.

```
npm start minhasandbox
```

Finalmente, acesse a URL de desenvolvimento:

http://sualoja.local.myvtex.com:3000

**Importante:** Substitua `sualoja` pelo account name de sua loja.

## FAQ

### Por que eu preciso acessar `sualoja.local.myvtex.com` ao invés de `localhost`?

O Storefront precisa saber em qual loja você deseja entrar.

Para isso, ele se baseia no nome `sualoja` presente na URL.

O endereço `*.local.myvtex.com` tem uma regra de DNS que aponta para sua máquina (`127.0.0.1`), então o resultado é o mesmo que acessar `localhost`.

### Como funciona o servidor em `localhost:3000`

Todas as requisições passam primeiro pelo servidor de desenvolvimento local (WebpackDevServer).

Desta forma, podemos usar ferramentas avançadas como `react-hot-loader`, que te permitem recarregar os componentes React sem fazer um refresh da página.

Se este servidor não encontrar o arquivo ou rota desejada, ele simplesmente passa o pedido adiante para a VTEX, onde são processados os arquivos de configuração, rotas e templates Liquid.

### Como desativar a minifĩcação de arquivos

Adicione no fim da URL `?bundle=false`, por ex:

> [http://dreamstore.beta.myvtex.com/?bundle=false](http://dreamstore.beta.myvtex.com/?bundle=false)

### Por que não usamos o comando `vtex watch`?

Esse tema utiliza o [webpack-dev-server](http://webpack.github.io/) para processar arquivos Javascript. Por isso, estamos usando o comando `npm start` ao invés de simplesmente usar diretamente o `vtex watch`. Não se preocupe - o toolbelt vtex é chamado por este comando internamente.
