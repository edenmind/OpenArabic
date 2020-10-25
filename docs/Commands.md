# ASP.NET Core
## Generare API-project
`dotnet new webapi -o api`

## Add packages
`dotnet add package Microsoft.EntityFrameworkCore.SqlServer`
`dotnet add package Microsoft.EntityFrameworkCore.InMemory`
`dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design`
`dotnet add package Microsoft.EntityFrameworkCore.Design`

## Generate controller
`dotnet aspnet-codegenerator controller -name TextsController -nv -async -api -m Text -dc ApiContext -outDir Controllers`

# Entity Framework Core
## Install dotnet ef
`dotnet tool install --global dotnet-ef --version 5.0.0-rc.1.20451.13`

## Add a new migration
`dotnet ef migrations add InitialCreate`

## Set PS env
`$env:CONNECTION_STRING = 'Server=localhost;Database=openarabic;User Id=sa;Password=Unsecure1!;'`
Get prod password from pod and switch to 127.0.0.1 instead of localhost.

## Apply migration to datbase
`dotnet ef database update`

# SQL
## Pull msqql server
`docker pull mcr.microsoft.com/mssql/server:2019-latest`

## Create SQL database
`CREATE DATABASE openarabic;`

# Docker
## Create docker volume for sql persistent storage
`docker volume create sqldata`

## Start sql with volume
`docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Unsecure1!" -p 1433:1433 -n sql1 -v sqldata:/var/opt/mssql -d mcr.microsoft.com/mssql/server:2019-latest`

## List docker volumes
`docker volume ls` 

## Remove docker volume
`docker volume rm sqldata`

## Create docker volume
`docker volume create sqldata`

# Angular
(Docs)[https://angular.io/cli/generate]
## Generate a component
`ng g component text`

## Generate a service
`ng g service text`

## Generate enum
`ng g enum <name>`

## Generate interface
`ng g interface <name>`

# Dotnet

# Kubernetes
## Forward a port
`kubectl port-forward pod/database-8946d9d74-td28h 1433:1433`
