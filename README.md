- Faça o git clone deste repositório
- Entre na pasta dominios-back e copie o arquivo .env.example para .env
- Rode o comando

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
