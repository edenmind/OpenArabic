variable "prefix" {
  description = "A prefix used for all resources in this example"
  type        = string
  default     = "edenmind"
}
variable "location" {
  description = "A prefix used for all locations"
  type        = string
  default     = "North Europe"
}

variable "mariadb_username" {
  description = "MariaDB Database administrator username"
  type        = string
  sensitive   = true
}

variable "mariadb_password" {
  description = "MariaDB Database administrator password"
  type        = string
  sensitive   = true
}

variable "azuresql_username" {
  description = "Azure SQL Database administrator username"
  type        = string
  sensitive   = true
}

variable "azuresql_password" {
  description = "Azure SQL Database administrator password"
  type        = string
  sensitive   = true
}


