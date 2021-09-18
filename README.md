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
terraform-cloud <command> <sucommand> [arguments]
```
  OR
```shell
tfc <command> <sucommand> [arguments]
```
### Available Commands and Subcommands:
 - `workspace`
   - `get` - Prints the provided workspace as output
 
      Example:
      ```shell
      $ tfc workspace get orgnization/workspace
      ```
    - `list` - List all workspaces in Organization.

      Note: In case of missing organization name, Throws an error and outputs all available organizations in the account.
 
      Example:
      ```shell
      $ tfc workspace list

      Error: Organization Missing
      Please pass organization from list below:
      - OrgA
      - OrgB


        Terraform Cloud - Devops Scripts

        Github: https://github.com/phenixcoder/devops-scripts

        Usage:
          terraform-cloud <resource> <action> [arguments]
        OR
          tfc <resource> <action> [arguments]

      ```
      OR
      ```shell
      $ tfc workspace list orgnization
      ```
 - `output`
    - `get` - Get the first output from latest state and prints as output
    - `list` - Lista all output in the state.
 - `state`
   - `get` - Get the latest state and prints as output