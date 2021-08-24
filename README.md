# Devops Scripts
Collection of scripts to ease out some tasks duriing devops pipelines.

## Instalation

```shell
npm i devops-scripts
```
Or Install globally
> Recomended way is to install this module globally in your dev or ci/cd environment.
```shell
npm i -g devops-scripts
```

---
## `terraform-cloud` / `tfc`
Terraform cloud scripts
### Environment Variables
 - `TFC_TOKEN` : Terraform cloud Access Token
 - `TFC_WORKSPACE` : Terraform cloud worksapce id. e.g. `ws-xxxxxxxxxx`

### Usage:

```shell
terraform-cloud <action> <resource> [arguments]
```
  OR
```shell
tfc <action> <resource> [arguments]
```
### Available Allowed Resources:
 - `output`
 - `state`
  
### Available Allowed Actions:
 - `get`
 - `set`

---