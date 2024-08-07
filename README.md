# Inicialização Projeto RESIMETAL

### Inicialização front-end

**Ferramentas Necessárias**

1. [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm#installing-and-updating)
2. [Node.js](https://nodejs.org/) versão 12 utilizando o NVM
3. [Angular CLI](https://angular.io/cli)

**Passos para Instalação**

1. **Instale o NVM:**
   Siga as instruções no [repositório oficial do NVM](https://github.com/nvm-sh/nvm#installing-and-updating).

2. **Utilize o NVM para instalar a versão 12 do Node.js:**

```
nvm install 12
nvm use 12
```

3. **Angular CLI:**
```
npm install -g @angular/cli
```

***


### Inicialização do back-end

**Esteja na pasta FloripaSites**

**obs: Você pode utilizar esses comandos como atalho para chegar a pasta FloripaSites:**

~~~
cd bling-api-python

cd FloripaSites
~~~


### Inicializar WINDOWS

~~~
​Set-ExecutionPolicy RemoteSigned -Scope Process
.\venv\Scripts\activate
python manage.py runserver
~~~

### Inicializar LINUX

~~~
source venv/bin/activate
python manage.py runserver
~~~

### Quando não está instalado nada

1. Instale o Python [aqui](https://www.python.org/downloads).
2. Crie o ambiente virtual: `python -m venv venv`.
3. Execute esse comando se for Windows: `Set-ExecutionPolicy RemoteSigned -Scope Process`.
4. Ative o ambiente virtual:
   - Windows: `.\venv\Scripts\activate`
   - Linux: `source venv/bin/activate`
5. Instale o Django: `pip install django`.
6. Instale o Django CORS Headers: `pip install django-cors-headers`.
7. Instale o Requests: `pip install requests`.
8. Execute o Django: `python manage.py runserver`.
