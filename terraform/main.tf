provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "edenmind-rg" {
  name     = "${var.prefix}-rg"
  location = var.location
}

resource "azurerm_virtual_network" "edenmind-vnet" {
  name                = "${var.prefix}-vnet"
  location            = azurerm_resource_group.edenmind-rg.location
  resource_group_name = azurerm_resource_group.edenmind-rg.name
  address_space       = ["192.168.0.0/16"]
}

resource "azurerm_subnet" "edenmind-snet" {
  name                 = "${var.prefix}-subnet"
  resource_group_name  = azurerm_resource_group.edenmind-rg.name
  address_prefixes     = ["192.168.1.0/24"]
  virtual_network_name = azurerm_virtual_network.edenmind-vnet.name
}

resource "azurerm_kubernetes_cluster" "edenmind-aks" {
  automatic_channel_upgrade = "rapid"
  name                      = "${var.prefix}-aks"
  location                  = azurerm_resource_group.edenmind-rg.location
  resource_group_name       = azurerm_resource_group.edenmind-rg.name
  node_resource_group       = "${var.prefix}-aks-nodes"
  dns_prefix                = "dns-${var.prefix}"
  private_cluster_enabled   = false
  kubernetes_version        = "1.20.5"

  default_node_pool {
    name                 = "linux-01"
    node_count           = 1
    vm_size              = "Standard_B2ms"
    vnet_subnet_id       = azurerm_subnet.edenmind-snet.id
    orchestrator_version = "1.20.5"
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin    = "azure"
    network_policy    = "azure"
    load_balancer_sku = "basic"
  }
}

resource "azurerm_mariadb_server" "edenmind-mariadb" {
  name                = "${var.prefix}-mariadb-server"
  location            = azurerm_resource_group.edenmind-rg.location
  resource_group_name = azurerm_resource_group.edenmind-rg.name

  administrator_login          = var.mariadb_username
  administrator_login_password = var.mariadb_password

  sku_name   = "B_Gen5_1"
  storage_mb = 5120
  version    = "10.2"

  auto_grow_enabled             = true
  backup_retention_days         = 7
  geo_redundant_backup_enabled  = false
  public_network_access_enabled = false
  ssl_enforcement_enabled       = true
}

resource "azurerm_mariadb_database" "islamse" {
  name                = "islamse"
  resource_group_name = azurerm_resource_group.edenmind-rg.name
  server_name         = azurerm_mariadb_server.edenmind-mariadb.name
  charset             = "utf8"
  collation           = "utf8_general_ci"
}

resource "azurerm_sql_server" "edenmind-sql-server" {
  name                         = "${var.prefix}-sql-server"
  resource_group_name          = azurerm_resource_group.edenmind-rg.name
  location                     = var.location
  version                      = "12.0"
  administrator_login          = var.azuresql_username
  administrator_login_password = var.azuresql_password
}

resource "azurerm_sql_database" "openarabic" {
  name                = "openarabic"
  resource_group_name = azurerm_resource_group.edenmind-rg.name
  location            = var.location
  server_name         = azurerm_sql_server.edenmind-sql-server.name
  edition             = "Basic"
}
