provider "azurerm" {
  features {}
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}
locals {
  common_tags = {
    Environment = "Production"
    DeployedBy  = "Terraform"
  }
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

resource "azurerm_kubernetes_cluster" "edenmind-k8s" {
  name                      = "${var.prefix}-k8s"
  location                  = azurerm_resource_group.edenmind-rg.location
  resource_group_name       = azurerm_resource_group.edenmind-rg.name
  node_resource_group       = "${var.prefix}-k8s-resources"
  dns_prefix                = "${var.prefix}-k8s-dns"
  private_cluster_enabled   = false
  kubernetes_version        = "1.20.5"
  automatic_channel_upgrade = "patch"

  role_based_access_control {
    enabled = true
  }

  tags = local.common_tags

  default_node_pool {
    name                 = "linux01"
    node_count           = 1
    vm_size              = "Standard_B2ms"
    vnet_subnet_id       = azurerm_subnet.edenmind-snet.id
    orchestrator_version = "1.20.5"
    os_disk_size_gb      = 100

    tags = local.common_tags
  }

  identity {
    type = "SystemAssigned"
  }

  network_profile {
    network_plugin    = "azure"
    network_policy    = "azure"
    load_balancer_sku = "standard"
    load_balancer_profile {
      managed_outbound_ip_count = 1
    }
  }
}

resource "azurerm_mariadb_server" "edenmind-mariadb-server" {
  name                = "${var.prefix}-mariadb-server"
  location            = azurerm_resource_group.edenmind-rg.location
  resource_group_name = azurerm_resource_group.edenmind-rg.name

  administrator_login          = var.mariadb_username
  administrator_login_password = var.mariadb_password

  sku_name   = "B_Gen5_1"
  storage_mb = 5120
  version    = "10.3"

  auto_grow_enabled             = true
  backup_retention_days         = 7
  geo_redundant_backup_enabled  = false
  public_network_access_enabled = true
  ssl_enforcement_enabled       = false

  tags = local.common_tags
}
resource "azurerm_sql_server" "edenmind-sql-server" {
  name                         = "${var.prefix}-sql-server"
  resource_group_name          = azurerm_resource_group.edenmind-rg.name
  location                     = var.location
  version                      = "12.0"
  administrator_login          = var.azuresql_username
  administrator_login_password = var.azuresql_password
  tags                         = local.common_tags
}

resource "azurerm_storage_account" "edenmind-storage-account" {
  name                     = "${var.prefix}storageaccount"
  resource_group_name      = azurerm_resource_group.edenmind-rg.name
  location                 = azurerm_resource_group.edenmind-rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = local.common_tags
}

resource "azurerm_storage_container" "edenmind-storage-container" {
  name                  = "${var.prefix}-storage-container"
  storage_account_name  = azurerm_storage_account.edenmind-storage-account.name
  container_access_type = "private"
}


resource "helm_release" "traefik-release" {
  name = "traefik"

  repository       = "https://helm.traefik.io/traefik"
  chart            = "traefik"
  atomic           = true
  cleanup_on_fail  = true
  create_namespace = true
  namespace        = "traefik"
  reset_values     = true
  set {
    name  = "additionalArguments"
    value = "{--metrics.prometheus=true}"
  }
  set {
    name  = "service.type"
    value = "LoadBalancer"
  }
}
