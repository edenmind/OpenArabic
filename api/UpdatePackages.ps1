function InstallPackage() {
    
    foreach ($package in $packages) {
        Write-Host "Installing $package"
        Install-Package $package
    }
}

$packages = @(
    'AutoMapper'
    'Microsoft.AspNetCore.Authentication.JwtBearer'
    'Microsoft.EntityFrameworkCore.SqlServer'
    'Microsoft.VisualStudio.Web.CodeGeneration.Design'
    'Sendgrid'
    'Swashbuckle.AspNetCore'
    'System.IdentityModel.Tokens.Jwt'
)

InstallPackage