# Dispatch System

Dispatch Syetem (previously AGV Distribution System)

This is UI project for Distpatch System

## Versions

See [Versioning](https://github.com/restuadipradana/AGVDistributionSystem-SPA/blob/master/VERSION.md)

## Installation

### Clone repo

``` bash
# clone the repo
$ git clone https://github.com/restuadipradana/AGVDistributionSystem-SPA.git

# go into app's directory
$ cd AGVDistributionSystem-SPA

# install app's dependencies
$ npm install
```

### Deploy to IIS

- Install Url Rewrite at IIS
- Run `$ ng build --prod` to publish
- Copy all file inside 'dist' folder to iis project folder
- Add web.config inside folder on iis project folder like below
``` bash
<configuration>
<system.webServer>
  <rewrite>
    <rules>
      <rule name="Angular Routes" stopProcessing="true">
        <match url=".*" />
        <conditions logicalGrouping="MatchAll">
          <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
          <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
        </conditions>
        <!-- <action type="Rewrite" url="/your_project/" /> -->
        <action type="Rewrite" url="/" />
      </rule>
    </rules>
  </rewrite>
</system.webServer>
</configuration>
```
[Refrence](https://www.c-sharpcorner.com/article/deply-of-a-angular-application-on-iis/), [Refrence](https://por-porkaew15.medium.com/deploy-angular-project-with-iis-server-a5a08c823a12)



## Copyright and license

copyright 2017-2020 creativeLabs Łukasz Holeczek. Code released under [the MIT license](https://github.com/coreui/coreui-free-angular-admin-template/blob/master/LICENSE).
There is only one limitation you can't re-distribute the CoreUI as stock. You can’t do this if you modify the CoreUI. In past we faced some problems with persons who tried to sell CoreUI based templates.

## Support CoreUI Development

CoreUI is an MIT licensed open source project and completely free to use. However, the amount of effort needed to maintain and develop new features for the project is not sustainable without proper financial backing. You can support development by donating on [PayPal](https://www.paypal.me/holeczek), buying [CoreUI Pro Version](https://coreui.io/pro) or buying one of our [premium admin templates](https://genesisui.com/?support=1).

As of now I am exploring the possibility of working on CoreUI fulltime - if you are a business that is building core products using CoreUI, I am also open to conversations regarding custom sponsorship / consulting arrangements. Get in touch on [Twitter](https://twitter.com/lukaszholeczek).
