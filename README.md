Este projeto está utilizando Laravel 12, PHP 8.4, e Next.js 15.3 com Javascript.
Para rodar é necessário ter Docker e Docker-compose instalado em sua máquina.

Siga as instruções:

- Faça o git clone deste repositório
- Entre na pasta dominios-back e copie o arquivo .env.example para .env
- Retorne a pasta raíz e rode o comando:

```
docker-compose up --build
```

- Após a instalação de tudo, rode:

```
docker exec -it dominios-back bash
php artisan key:generate
php artisan migrate
php artisan db:seed
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache
```

Acesse via o link: http://localhost:3000

## Referente a decisões no projeto

Neste projeto utilizei a arquitetura MVC padrão do Laravel com o adicional de uma camada de Services. A controller é responsável pelas requisições e respostas Http, enquanto os Services ficam responsáveis por toda a lógica do código.
Não utilizei uma camada de Repositories, pois é uma arquitetura que não vejo muito sentido em utilizar, e mais atrapalha a manutenção do código do que ajuda. Apenas faz sentido se caso um projeto utilize diversos bancos de dados, ou que teria uma previsão de possível troca de ORM futura. O próprio Eloquent já faz todo o serviço que um Repository faria, e de forma bem satisfatória. Claro, existem projetos que essa arquitetura pode ser muito bem aproveitada, mas não creio que seja o caso aqui.

Referente ao docker, optei por não utilizar o Sail, e criar Dockerfiles e docker-compose do zero, para que rode o Laravel em um container, MySQL em outro, Nginx, e Next.js em outro. Utilizando Sail dificultaria bastante na hora de realizar costumizações grandes como foi feita aqui.

Quanto ao front com Next.js, este foi meu primeiro contato com a stack, visto que minha stack principal de front-end é a Vue.js, então o que está neste projeto é fruto dos poucos dias de estudo de documentação, vídeos e muitas dúvidas tiradas com ferramentas como ChatGPT. 
