function InstallPackage() {
    
    foreach ($package in $packages) {
        Write-Host "Installing $package"
        dotnet add package $package
    }
}

$packages = @(
    'AutoMapper'
    'AutoMapper.Extensions.Microsoft.DependencyInjection'
    'FluentValidation.AspNetCore'
    'Flurl.Http'
    'MediatR'
    'Microsoft.AspNetCore.Authentication.JwtBearer'
    'Microsoft.EntityFrameworkCore.SqlServer'
    'Microsoft.VisualStudio.Web.CodeGeneration.Design'
    'Sendgrid'
    'Serilog'
    'Swashbuckle.AspNetCore'
    'System.IdentityModel.Tokens.Jwt'
    'Microsoft.EntityFrameworkCore.Design'
)

InstallPackage