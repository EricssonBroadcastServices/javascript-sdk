# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 0.26.0 (2021-04-16)


### Bug Fixes

* add missing enum ([48115e3](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/48115e32ebee519191168d41232038bcad4c5f55))
* add vouchers paymenttype ([b129b31](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b129b31f256d62b1dfd2a4480a356ef4265018ed))
* added mp3 and mp4 as possible formats ([#29](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/29)) ([a3d54da](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a3d54da8b7af49c667c6430c3cfcc2efb118ea4a))
* channelFeatures being a two-dimensional array ([c8dd8df](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c8dd8dfaee7c418d7a8f69cd9a8f5a16530b5624))
* enhanced analytics data in play response ([#40](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/40)) ([d06ec3d](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d06ec3da6c134bd52afbe3cd9644f593373241d5))
* fix deserialization bug caused by previous commit ([65e28a5](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/65e28a54b69758ab528b2b4783f97a8c51a712ff))
* fix invalid casing on nodejs-logger & etcd-client package names ([5487356](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5487356c5efb578c7a0d0f12babe2f47a1b586f4))
* fix system config method ([28f99d9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/28f99d91747dbddfba592f6aabdf030204d4572d))
* get time aligned with server ([#42](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/42)) ([c34a5cb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c34a5cb0e887ecce2bca841f66fcfc6dc9d96288))
* invalid casing for all sdk packages ([84dc2bb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/84dc2bb8d65fc326203abd6fcfb666642a186a43))
* move from deprecated endpoint ([656ce25](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/656ce250f415b041940e2c01e2b5e13a5dbb8802))
* resolve compiler errors ([c86f52c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c86f52c863c6a80a80f347586c4ae9bab03e4fd0))
* sprites property being invalid ([01f1776](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/01f17764e86aa79e90d335acc1b47993797d7ebf))
* time endpoint now top level in exposure ([#44](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/44)) ([ae3522c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ae3522c710c22d1d153e6249ae75ba497e1371ad))
* time miscalculation ([8f84afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/8f84afd43db7888c8e2bd490e6fd500945fb0a13))


### Features

* add analytics percentage to system config model ([6f1bf04](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/6f1bf040813860b4801ef2f93da37c2b4e27e273))
* add get asset from list ([#30](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/30)) ([177ab12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/177ab12cc83b40f43f0bf365bacbee3e82075cc3))
* add getOnNow to content service ([03333dc](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/03333dc32e260c45deb3d02ff89bfb213ce62d68))
* add linked entity ([#28](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/28)) ([72685ed](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/72685ed023a5887d5a8db7fbc51f6f3cc92af79f))
* add missing properties and fix auth headers not being overridable ([bfae001](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bfae001e8014a46f2644d80f7f5d136623a7b7e6))
* add optional query param to logout endpoint ([b679afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b679afd160ca1040f7623001ef89e54b368a06dc))
* add parental ratings ([2def472](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/2def472134e955fbc571679b43d116548a5440d0))
* add payment method types to product offering ([1858ba6](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/1858ba6ea3989bbc4b4aec02266be27039d73811))
* add property `channelFeatures` to asset model ([0cc5f55](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0cc5f55cb7bbb5244cb528fbd866585a5ec7957c))
* add recommendations for asset, next/prev episode ([#24](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/24)) ([bbfd58e](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bbfd58e643378f7a2650193bc01ad732874bb4b0))
* add SystemService, add playAsset call to entitlement service. ([#23](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/23)) ([4965bef](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/4965bef1461e6d172b230dea12a5dd32791f9394))
* added exposure time service ([#41](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/41)) ([204f76d](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/204f76df2f304879f64112450007193935af2fac))
* enable optional enrichement of asset title ([3ca9b88](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/3ca9b8828005145767e288f81b60d42e21a86530))
* move image types to exposure ([#32](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/32)) ([739e808](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/739e80863958996a9b6a9ac8a95f7a90ea2e4f75))
* on now for all channels ([#35](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/35)) ([da1c854](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/da1c854323a34141033bbd84bef4d94e2c669f9e))
* optional country code when fetching product offerings with coun… ([#21](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/21)) ([adf2cd9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/adf2cd9f307459dec8e5d64aeed42ae6370e528e))
* overlay widgets on asset model ([#27](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/27)) ([9d10d02](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/9d10d02b454339cd747ea49126cafd577ffa5c53))
* update login-response-model ([5134645](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5134645f29f17ad54b6312e6f04b7aa839fe79d2))
* update PlayModel with ads field ([a68eb2a](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a68eb2ac9ca019b8ca2339825a647a7c38b8521d))



## 0.0.29 (2020-10-13)


### Bug Fixes

* **payments:** add new param to purchase req. deprecate old one ([a9aeac7](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a9aeac77e391493fd67b7e7ec1b10859de5ccb45))



## 0.0.28 (2020-10-08)


### Bug Fixes

* make discount optional, in order to reflect backend ([0b463ff](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0b463ff64efe29ef2d9d16fd530477546e879d89))



## 0.0.27 (2020-10-07)


### Features

* **payments:** extend payment response model and purchase model ([02b6c0c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/02b6c0c99142dd94ea614b8deb90bebe90241bee))



## 0.0.26 (2020-10-07)


### Features

* add discount ([ccd8e12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ccd8e12a984120ce3a3aac12daf6434f1c4611c0))



## 0.0.25 (2020-10-05)


### Features

* **payments:** payment method methods ([#11](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/11)) ([d18de23](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d18de238db94d11077534c4c14a551fd70545d98))



## 0.0.24 (2020-10-05)



## 0.0.23 (2020-10-02)


### Features

* **asset:** add production countries to asset ([bd77fab](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bd77fab43ccca10714d8436f690d60e233051c00))



## 0.0.22 (2020-09-18)



## 0.0.21 (2020-09-18)



## 0.0.20 (2020-09-18)



## 0.0.19 (2020-09-17)



## 0.0.18 (2020-09-17)



## 0.0.17 (2020-09-16)



## 0.0.16 (2020-09-16)



## 0.0.15 (2020-09-11)



## 0.0.14 (2020-09-10)



## 0.0.13 (2020-09-04)



## 0.0.12 (2020-08-31)



## 0.0.11 (2020-08-28)



## 0.0.10 (2020-08-27)



## 0.0.9 (2020-08-27)



## 0.0.8 (2020-08-27)



## 0.0.7 (2020-08-26)



## 0.0.6 (2020-08-25)



## 0.0.5 (2020-08-25)



## 0.0.4 (2020-08-25)



## 0.0.3 (2020-08-21)



## 0.0.2 (2020-08-21)





# 0.25.0 (2021-04-13)


### Bug Fixes

* add missing enum ([48115e3](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/48115e32ebee519191168d41232038bcad4c5f55))
* add vouchers paymenttype ([b129b31](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b129b31f256d62b1dfd2a4480a356ef4265018ed))
* added mp3 and mp4 as possible formats ([#29](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/29)) ([a3d54da](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a3d54da8b7af49c667c6430c3cfcc2efb118ea4a))
* channelFeatures being a two-dimensional array ([c8dd8df](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c8dd8dfaee7c418d7a8f69cd9a8f5a16530b5624))
* enhanced analytics data in play response ([#40](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/40)) ([d06ec3d](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d06ec3da6c134bd52afbe3cd9644f593373241d5))
* fix deserialization bug caused by previous commit ([65e28a5](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/65e28a54b69758ab528b2b4783f97a8c51a712ff))
* fix invalid casing on nodejs-logger & etcd-client package names ([5487356](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5487356c5efb578c7a0d0f12babe2f47a1b586f4))
* fix system config method ([28f99d9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/28f99d91747dbddfba592f6aabdf030204d4572d))
* get time aligned with server ([#42](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/42)) ([c34a5cb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c34a5cb0e887ecce2bca841f66fcfc6dc9d96288))
* invalid casing for all sdk packages ([84dc2bb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/84dc2bb8d65fc326203abd6fcfb666642a186a43))
* move from deprecated endpoint ([656ce25](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/656ce250f415b041940e2c01e2b5e13a5dbb8802))
* resolve compiler errors ([c86f52c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c86f52c863c6a80a80f347586c4ae9bab03e4fd0))
* time endpoint now top level in exposure ([#44](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/44)) ([ae3522c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ae3522c710c22d1d153e6249ae75ba497e1371ad))
* time miscalculation ([8f84afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/8f84afd43db7888c8e2bd490e6fd500945fb0a13))


### Features

* add analytics percentage to system config model ([6f1bf04](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/6f1bf040813860b4801ef2f93da37c2b4e27e273))
* add get asset from list ([#30](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/30)) ([177ab12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/177ab12cc83b40f43f0bf365bacbee3e82075cc3))
* add getOnNow to content service ([03333dc](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/03333dc32e260c45deb3d02ff89bfb213ce62d68))
* add linked entity ([#28](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/28)) ([72685ed](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/72685ed023a5887d5a8db7fbc51f6f3cc92af79f))
* add missing properties and fix auth headers not being overridable ([bfae001](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bfae001e8014a46f2644d80f7f5d136623a7b7e6))
* add optional query param to logout endpoint ([b679afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b679afd160ca1040f7623001ef89e54b368a06dc))
* add parental ratings ([2def472](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/2def472134e955fbc571679b43d116548a5440d0))
* add payment method types to product offering ([1858ba6](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/1858ba6ea3989bbc4b4aec02266be27039d73811))
* add property `channelFeatures` to asset model ([0cc5f55](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0cc5f55cb7bbb5244cb528fbd866585a5ec7957c))
* add recommendations for asset, next/prev episode ([#24](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/24)) ([bbfd58e](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bbfd58e643378f7a2650193bc01ad732874bb4b0))
* add SystemService, add playAsset call to entitlement service. ([#23](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/23)) ([4965bef](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/4965bef1461e6d172b230dea12a5dd32791f9394))
* added exposure time service ([#41](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/41)) ([204f76d](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/204f76df2f304879f64112450007193935af2fac))
* enable optional enrichement of asset title ([3ca9b88](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/3ca9b8828005145767e288f81b60d42e21a86530))
* move image types to exposure ([#32](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/32)) ([739e808](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/739e80863958996a9b6a9ac8a95f7a90ea2e4f75))
* on now for all channels ([#35](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/35)) ([da1c854](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/da1c854323a34141033bbd84bef4d94e2c669f9e))
* optional country code when fetching product offerings with coun… ([#21](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/21)) ([adf2cd9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/adf2cd9f307459dec8e5d64aeed42ae6370e528e))
* overlay widgets on asset model ([#27](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/27)) ([9d10d02](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/9d10d02b454339cd747ea49126cafd577ffa5c53))
* update login-response-model ([5134645](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5134645f29f17ad54b6312e6f04b7aa839fe79d2))
* update PlayModel with ads field ([a68eb2a](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a68eb2ac9ca019b8ca2339825a647a7c38b8521d))



## 0.0.29 (2020-10-13)


### Bug Fixes

* **payments:** add new param to purchase req. deprecate old one ([a9aeac7](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a9aeac77e391493fd67b7e7ec1b10859de5ccb45))



## 0.0.28 (2020-10-08)


### Bug Fixes

* make discount optional, in order to reflect backend ([0b463ff](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0b463ff64efe29ef2d9d16fd530477546e879d89))



## 0.0.27 (2020-10-07)


### Features

* **payments:** extend payment response model and purchase model ([02b6c0c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/02b6c0c99142dd94ea614b8deb90bebe90241bee))



## 0.0.26 (2020-10-07)


### Features

* add discount ([ccd8e12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ccd8e12a984120ce3a3aac12daf6434f1c4611c0))



## 0.0.25 (2020-10-05)


### Features

* **payments:** payment method methods ([#11](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/11)) ([d18de23](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d18de238db94d11077534c4c14a551fd70545d98))



## 0.0.24 (2020-10-05)



## 0.0.23 (2020-10-02)


### Features

* **asset:** add production countries to asset ([bd77fab](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bd77fab43ccca10714d8436f690d60e233051c00))



## 0.0.22 (2020-09-18)



## 0.0.21 (2020-09-18)



## 0.0.20 (2020-09-18)



## 0.0.19 (2020-09-17)



## 0.0.18 (2020-09-17)



## 0.0.17 (2020-09-16)



## 0.0.16 (2020-09-16)



## 0.0.15 (2020-09-11)



## 0.0.14 (2020-09-10)



## 0.0.13 (2020-09-04)



## 0.0.12 (2020-08-31)



## 0.0.11 (2020-08-28)



## 0.0.10 (2020-08-27)



## 0.0.9 (2020-08-27)



## 0.0.8 (2020-08-27)



## 0.0.7 (2020-08-26)



## 0.0.6 (2020-08-25)



## 0.0.5 (2020-08-25)



## 0.0.4 (2020-08-25)



## 0.0.3 (2020-08-21)



## 0.0.2 (2020-08-21)





# 0.24.0 (2021-04-13)


### Bug Fixes

* add missing enum ([48115e3](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/48115e32ebee519191168d41232038bcad4c5f55))
* add vouchers paymenttype ([b129b31](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b129b31f256d62b1dfd2a4480a356ef4265018ed))
* added mp3 and mp4 as possible formats ([#29](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/29)) ([a3d54da](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a3d54da8b7af49c667c6430c3cfcc2efb118ea4a))
* channelFeatures being a two-dimensional array ([c8dd8df](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c8dd8dfaee7c418d7a8f69cd9a8f5a16530b5624))
* enhanced analytics data in play response ([#40](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/40)) ([d06ec3d](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d06ec3da6c134bd52afbe3cd9644f593373241d5))
* fix deserialization bug caused by previous commit ([65e28a5](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/65e28a54b69758ab528b2b4783f97a8c51a712ff))
* fix invalid casing on nodejs-logger & etcd-client package names ([5487356](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5487356c5efb578c7a0d0f12babe2f47a1b586f4))
* fix system config method ([28f99d9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/28f99d91747dbddfba592f6aabdf030204d4572d))
* get time aligned with server ([#42](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/42)) ([c34a5cb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c34a5cb0e887ecce2bca841f66fcfc6dc9d96288))
* invalid casing for all sdk packages ([84dc2bb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/84dc2bb8d65fc326203abd6fcfb666642a186a43))
* move from deprecated endpoint ([656ce25](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/656ce250f415b041940e2c01e2b5e13a5dbb8802))
* resolve compiler errors ([c86f52c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c86f52c863c6a80a80f347586c4ae9bab03e4fd0))
* time endpoint now top level in exposure ([#44](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/44)) ([ae3522c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ae3522c710c22d1d153e6249ae75ba497e1371ad))


### Features

* add analytics percentage to system config model ([6f1bf04](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/6f1bf040813860b4801ef2f93da37c2b4e27e273))
* add get asset from list ([#30](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/30)) ([177ab12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/177ab12cc83b40f43f0bf365bacbee3e82075cc3))
* add getOnNow to content service ([03333dc](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/03333dc32e260c45deb3d02ff89bfb213ce62d68))
* add linked entity ([#28](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/28)) ([72685ed](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/72685ed023a5887d5a8db7fbc51f6f3cc92af79f))
* add missing properties and fix auth headers not being overridable ([bfae001](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bfae001e8014a46f2644d80f7f5d136623a7b7e6))
* add optional query param to logout endpoint ([b679afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b679afd160ca1040f7623001ef89e54b368a06dc))
* add parental ratings ([2def472](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/2def472134e955fbc571679b43d116548a5440d0))
* add payment method types to product offering ([1858ba6](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/1858ba6ea3989bbc4b4aec02266be27039d73811))
* add property `channelFeatures` to asset model ([0cc5f55](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0cc5f55cb7bbb5244cb528fbd866585a5ec7957c))
* add recommendations for asset, next/prev episode ([#24](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/24)) ([bbfd58e](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bbfd58e643378f7a2650193bc01ad732874bb4b0))
* add SystemService, add playAsset call to entitlement service. ([#23](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/23)) ([4965bef](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/4965bef1461e6d172b230dea12a5dd32791f9394))
* added exposure time service ([#41](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/41)) ([204f76d](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/204f76df2f304879f64112450007193935af2fac))
* enable optional enrichement of asset title ([3ca9b88](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/3ca9b8828005145767e288f81b60d42e21a86530))
* move image types to exposure ([#32](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/32)) ([739e808](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/739e80863958996a9b6a9ac8a95f7a90ea2e4f75))
* on now for all channels ([#35](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/35)) ([da1c854](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/da1c854323a34141033bbd84bef4d94e2c669f9e))
* optional country code when fetching product offerings with coun… ([#21](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/21)) ([adf2cd9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/adf2cd9f307459dec8e5d64aeed42ae6370e528e))
* overlay widgets on asset model ([#27](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/27)) ([9d10d02](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/9d10d02b454339cd747ea49126cafd577ffa5c53))
* update login-response-model ([5134645](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5134645f29f17ad54b6312e6f04b7aa839fe79d2))
* update PlayModel with ads field ([a68eb2a](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a68eb2ac9ca019b8ca2339825a647a7c38b8521d))



## 0.0.29 (2020-10-13)


### Bug Fixes

* **payments:** add new param to purchase req. deprecate old one ([a9aeac7](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a9aeac77e391493fd67b7e7ec1b10859de5ccb45))



## 0.0.28 (2020-10-08)


### Bug Fixes

* make discount optional, in order to reflect backend ([0b463ff](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0b463ff64efe29ef2d9d16fd530477546e879d89))



## 0.0.27 (2020-10-07)


### Features

* **payments:** extend payment response model and purchase model ([02b6c0c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/02b6c0c99142dd94ea614b8deb90bebe90241bee))



## 0.0.26 (2020-10-07)


### Features

* add discount ([ccd8e12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ccd8e12a984120ce3a3aac12daf6434f1c4611c0))



## 0.0.25 (2020-10-05)


### Features

* **payments:** payment method methods ([#11](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/11)) ([d18de23](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d18de238db94d11077534c4c14a551fd70545d98))



## 0.0.24 (2020-10-05)



## 0.0.23 (2020-10-02)


### Features

* **asset:** add production countries to asset ([bd77fab](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bd77fab43ccca10714d8436f690d60e233051c00))



## 0.0.22 (2020-09-18)



## 0.0.21 (2020-09-18)



## 0.0.20 (2020-09-18)



## 0.0.19 (2020-09-17)



## 0.0.18 (2020-09-17)



## 0.0.17 (2020-09-16)



## 0.0.16 (2020-09-16)



## 0.0.15 (2020-09-11)



## 0.0.14 (2020-09-10)



## 0.0.13 (2020-09-04)



## 0.0.12 (2020-08-31)



## 0.0.11 (2020-08-28)



## 0.0.10 (2020-08-27)



## 0.0.9 (2020-08-27)



## 0.0.8 (2020-08-27)



## 0.0.7 (2020-08-26)



## 0.0.6 (2020-08-25)



## 0.0.5 (2020-08-25)



## 0.0.4 (2020-08-25)



## 0.0.3 (2020-08-21)



## 0.0.2 (2020-08-21)





# 0.23.0 (2021-04-09)


### Bug Fixes

* add missing enum ([48115e3](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/48115e32ebee519191168d41232038bcad4c5f55))
* add vouchers paymenttype ([b129b31](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b129b31f256d62b1dfd2a4480a356ef4265018ed))
* added mp3 and mp4 as possible formats ([#29](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/29)) ([a3d54da](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a3d54da8b7af49c667c6430c3cfcc2efb118ea4a))
* channelFeatures being a two-dimensional array ([c8dd8df](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c8dd8dfaee7c418d7a8f69cd9a8f5a16530b5624))
* enhanced analytics data in play response ([#40](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/40)) ([d06ec3d](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d06ec3da6c134bd52afbe3cd9644f593373241d5))
* fix deserialization bug caused by previous commit ([65e28a5](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/65e28a54b69758ab528b2b4783f97a8c51a712ff))
* fix invalid casing on nodejs-logger & etcd-client package names ([5487356](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5487356c5efb578c7a0d0f12babe2f47a1b586f4))
* fix system config method ([28f99d9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/28f99d91747dbddfba592f6aabdf030204d4572d))
* get time aligned with server ([#42](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/42)) ([c34a5cb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c34a5cb0e887ecce2bca841f66fcfc6dc9d96288))
* invalid casing for all sdk packages ([84dc2bb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/84dc2bb8d65fc326203abd6fcfb666642a186a43))
* move from deprecated endpoint ([656ce25](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/656ce250f415b041940e2c01e2b5e13a5dbb8802))
* resolve compiler errors ([c86f52c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c86f52c863c6a80a80f347586c4ae9bab03e4fd0))


### Features

* add analytics percentage to system config model ([6f1bf04](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/6f1bf040813860b4801ef2f93da37c2b4e27e273))
* add get asset from list ([#30](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/30)) ([177ab12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/177ab12cc83b40f43f0bf365bacbee3e82075cc3))
* add getOnNow to content service ([03333dc](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/03333dc32e260c45deb3d02ff89bfb213ce62d68))
* add linked entity ([#28](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/28)) ([72685ed](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/72685ed023a5887d5a8db7fbc51f6f3cc92af79f))
* add missing properties and fix auth headers not being overridable ([bfae001](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bfae001e8014a46f2644d80f7f5d136623a7b7e6))
* add optional query param to logout endpoint ([b679afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b679afd160ca1040f7623001ef89e54b368a06dc))
* add parental ratings ([2def472](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/2def472134e955fbc571679b43d116548a5440d0))
* add payment method types to product offering ([1858ba6](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/1858ba6ea3989bbc4b4aec02266be27039d73811))
* add property `channelFeatures` to asset model ([0cc5f55](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0cc5f55cb7bbb5244cb528fbd866585a5ec7957c))
* add recommendations for asset, next/prev episode ([#24](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/24)) ([bbfd58e](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bbfd58e643378f7a2650193bc01ad732874bb4b0))
* add SystemService, add playAsset call to entitlement service. ([#23](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/23)) ([4965bef](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/4965bef1461e6d172b230dea12a5dd32791f9394))
* added exposure time service ([#41](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/41)) ([204f76d](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/204f76df2f304879f64112450007193935af2fac))
* enable optional enrichement of asset title ([3ca9b88](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/3ca9b8828005145767e288f81b60d42e21a86530))
* move image types to exposure ([#32](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/32)) ([739e808](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/739e80863958996a9b6a9ac8a95f7a90ea2e4f75))
* on now for all channels ([#35](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/35)) ([da1c854](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/da1c854323a34141033bbd84bef4d94e2c669f9e))
* optional country code when fetching product offerings with coun… ([#21](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/21)) ([adf2cd9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/adf2cd9f307459dec8e5d64aeed42ae6370e528e))
* overlay widgets on asset model ([#27](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/27)) ([9d10d02](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/9d10d02b454339cd747ea49126cafd577ffa5c53))
* update login-response-model ([5134645](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5134645f29f17ad54b6312e6f04b7aa839fe79d2))
* update PlayModel with ads field ([a68eb2a](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a68eb2ac9ca019b8ca2339825a647a7c38b8521d))



## 0.0.29 (2020-10-13)


### Bug Fixes

* **payments:** add new param to purchase req. deprecate old one ([a9aeac7](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a9aeac77e391493fd67b7e7ec1b10859de5ccb45))



## 0.0.28 (2020-10-08)


### Bug Fixes

* make discount optional, in order to reflect backend ([0b463ff](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0b463ff64efe29ef2d9d16fd530477546e879d89))



## 0.0.27 (2020-10-07)


### Features

* **payments:** extend payment response model and purchase model ([02b6c0c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/02b6c0c99142dd94ea614b8deb90bebe90241bee))



## 0.0.26 (2020-10-07)


### Features

* add discount ([ccd8e12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ccd8e12a984120ce3a3aac12daf6434f1c4611c0))



## 0.0.25 (2020-10-05)


### Features

* **payments:** payment method methods ([#11](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/11)) ([d18de23](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d18de238db94d11077534c4c14a551fd70545d98))



## 0.0.24 (2020-10-05)



## 0.0.23 (2020-10-02)


### Features

* **asset:** add production countries to asset ([bd77fab](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bd77fab43ccca10714d8436f690d60e233051c00))



## 0.0.22 (2020-09-18)



## 0.0.21 (2020-09-18)



## 0.0.20 (2020-09-18)



## 0.0.19 (2020-09-17)



## 0.0.18 (2020-09-17)



## 0.0.17 (2020-09-16)



## 0.0.16 (2020-09-16)



## 0.0.15 (2020-09-11)



## 0.0.14 (2020-09-10)



## 0.0.13 (2020-09-04)



## 0.0.12 (2020-08-31)



## 0.0.11 (2020-08-28)



## 0.0.10 (2020-08-27)



## 0.0.9 (2020-08-27)



## 0.0.8 (2020-08-27)



## 0.0.7 (2020-08-26)



## 0.0.6 (2020-08-25)



## 0.0.5 (2020-08-25)



## 0.0.4 (2020-08-25)



## 0.0.3 (2020-08-21)



## 0.0.2 (2020-08-21)





# 0.22.0 (2021-04-09)


### Bug Fixes

* add missing enum ([48115e3](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/48115e32ebee519191168d41232038bcad4c5f55))
* add vouchers paymenttype ([b129b31](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b129b31f256d62b1dfd2a4480a356ef4265018ed))
* added mp3 and mp4 as possible formats ([#29](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/29)) ([a3d54da](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a3d54da8b7af49c667c6430c3cfcc2efb118ea4a))
* channelFeatures being a two-dimensional array ([c8dd8df](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c8dd8dfaee7c418d7a8f69cd9a8f5a16530b5624))
* enhanced analytics data in play response ([#40](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/40)) ([d06ec3d](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d06ec3da6c134bd52afbe3cd9644f593373241d5))
* fix deserialization bug caused by previous commit ([65e28a5](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/65e28a54b69758ab528b2b4783f97a8c51a712ff))
* fix invalid casing on nodejs-logger & etcd-client package names ([5487356](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5487356c5efb578c7a0d0f12babe2f47a1b586f4))
* fix system config method ([28f99d9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/28f99d91747dbddfba592f6aabdf030204d4572d))
* invalid casing for all sdk packages ([84dc2bb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/84dc2bb8d65fc326203abd6fcfb666642a186a43))
* move from deprecated endpoint ([656ce25](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/656ce250f415b041940e2c01e2b5e13a5dbb8802))
* resolve compiler errors ([c86f52c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c86f52c863c6a80a80f347586c4ae9bab03e4fd0))


### Features

* add analytics percentage to system config model ([6f1bf04](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/6f1bf040813860b4801ef2f93da37c2b4e27e273))
* add get asset from list ([#30](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/30)) ([177ab12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/177ab12cc83b40f43f0bf365bacbee3e82075cc3))
* add getOnNow to content service ([03333dc](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/03333dc32e260c45deb3d02ff89bfb213ce62d68))
* add linked entity ([#28](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/28)) ([72685ed](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/72685ed023a5887d5a8db7fbc51f6f3cc92af79f))
* add missing properties and fix auth headers not being overridable ([bfae001](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bfae001e8014a46f2644d80f7f5d136623a7b7e6))
* add optional query param to logout endpoint ([b679afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b679afd160ca1040f7623001ef89e54b368a06dc))
* add parental ratings ([2def472](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/2def472134e955fbc571679b43d116548a5440d0))
* add payment method types to product offering ([1858ba6](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/1858ba6ea3989bbc4b4aec02266be27039d73811))
* add property `channelFeatures` to asset model ([0cc5f55](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0cc5f55cb7bbb5244cb528fbd866585a5ec7957c))
* add recommendations for asset, next/prev episode ([#24](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/24)) ([bbfd58e](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bbfd58e643378f7a2650193bc01ad732874bb4b0))
* add SystemService, add playAsset call to entitlement service. ([#23](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/23)) ([4965bef](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/4965bef1461e6d172b230dea12a5dd32791f9394))
* added exposure time service ([#41](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/41)) ([204f76d](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/204f76df2f304879f64112450007193935af2fac))
* enable optional enrichement of asset title ([3ca9b88](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/3ca9b8828005145767e288f81b60d42e21a86530))
* move image types to exposure ([#32](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/32)) ([739e808](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/739e80863958996a9b6a9ac8a95f7a90ea2e4f75))
* on now for all channels ([#35](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/35)) ([da1c854](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/da1c854323a34141033bbd84bef4d94e2c669f9e))
* optional country code when fetching product offerings with coun… ([#21](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/21)) ([adf2cd9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/adf2cd9f307459dec8e5d64aeed42ae6370e528e))
* overlay widgets on asset model ([#27](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/27)) ([9d10d02](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/9d10d02b454339cd747ea49126cafd577ffa5c53))
* update login-response-model ([5134645](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5134645f29f17ad54b6312e6f04b7aa839fe79d2))
* update PlayModel with ads field ([a68eb2a](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a68eb2ac9ca019b8ca2339825a647a7c38b8521d))



## 0.0.29 (2020-10-13)


### Bug Fixes

* **payments:** add new param to purchase req. deprecate old one ([a9aeac7](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a9aeac77e391493fd67b7e7ec1b10859de5ccb45))



## 0.0.28 (2020-10-08)


### Bug Fixes

* make discount optional, in order to reflect backend ([0b463ff](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0b463ff64efe29ef2d9d16fd530477546e879d89))



## 0.0.27 (2020-10-07)


### Features

* **payments:** extend payment response model and purchase model ([02b6c0c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/02b6c0c99142dd94ea614b8deb90bebe90241bee))



## 0.0.26 (2020-10-07)


### Features

* add discount ([ccd8e12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ccd8e12a984120ce3a3aac12daf6434f1c4611c0))



## 0.0.25 (2020-10-05)


### Features

* **payments:** payment method methods ([#11](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/11)) ([d18de23](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d18de238db94d11077534c4c14a551fd70545d98))



## 0.0.24 (2020-10-05)



## 0.0.23 (2020-10-02)


### Features

* **asset:** add production countries to asset ([bd77fab](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bd77fab43ccca10714d8436f690d60e233051c00))



## 0.0.22 (2020-09-18)



## 0.0.21 (2020-09-18)



## 0.0.20 (2020-09-18)



## 0.0.19 (2020-09-17)



## 0.0.18 (2020-09-17)



## 0.0.17 (2020-09-16)



## 0.0.16 (2020-09-16)



## 0.0.15 (2020-09-11)



## 0.0.14 (2020-09-10)



## 0.0.13 (2020-09-04)



## 0.0.12 (2020-08-31)



## 0.0.11 (2020-08-28)



## 0.0.10 (2020-08-27)



## 0.0.9 (2020-08-27)



## 0.0.8 (2020-08-27)



## 0.0.7 (2020-08-26)



## 0.0.6 (2020-08-25)



## 0.0.5 (2020-08-25)



## 0.0.4 (2020-08-25)



## 0.0.3 (2020-08-21)



## 0.0.2 (2020-08-21)





# 0.21.0 (2021-04-07)


### Bug Fixes

* add missing enum ([48115e3](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/48115e32ebee519191168d41232038bcad4c5f55))
* add vouchers paymenttype ([b129b31](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b129b31f256d62b1dfd2a4480a356ef4265018ed))
* added mp3 and mp4 as possible formats ([#29](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/29)) ([a3d54da](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a3d54da8b7af49c667c6430c3cfcc2efb118ea4a))
* channelFeatures being a two-dimensional array ([c8dd8df](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c8dd8dfaee7c418d7a8f69cd9a8f5a16530b5624))
* enhanced analytics data in play response ([#40](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/40)) ([d06ec3d](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d06ec3da6c134bd52afbe3cd9644f593373241d5))
* fix deserialization bug caused by previous commit ([65e28a5](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/65e28a54b69758ab528b2b4783f97a8c51a712ff))
* fix invalid casing on nodejs-logger & etcd-client package names ([5487356](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5487356c5efb578c7a0d0f12babe2f47a1b586f4))
* fix system config method ([28f99d9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/28f99d91747dbddfba592f6aabdf030204d4572d))
* invalid casing for all sdk packages ([84dc2bb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/84dc2bb8d65fc326203abd6fcfb666642a186a43))
* move from deprecated endpoint ([656ce25](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/656ce250f415b041940e2c01e2b5e13a5dbb8802))
* resolve compiler errors ([c86f52c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c86f52c863c6a80a80f347586c4ae9bab03e4fd0))


### Features

* add analytics percentage to system config model ([6f1bf04](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/6f1bf040813860b4801ef2f93da37c2b4e27e273))
* add get asset from list ([#30](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/30)) ([177ab12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/177ab12cc83b40f43f0bf365bacbee3e82075cc3))
* add getOnNow to content service ([03333dc](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/03333dc32e260c45deb3d02ff89bfb213ce62d68))
* add linked entity ([#28](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/28)) ([72685ed](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/72685ed023a5887d5a8db7fbc51f6f3cc92af79f))
* add missing properties and fix auth headers not being overridable ([bfae001](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bfae001e8014a46f2644d80f7f5d136623a7b7e6))
* add optional query param to logout endpoint ([b679afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b679afd160ca1040f7623001ef89e54b368a06dc))
* add parental ratings ([2def472](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/2def472134e955fbc571679b43d116548a5440d0))
* add payment method types to product offering ([1858ba6](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/1858ba6ea3989bbc4b4aec02266be27039d73811))
* add property `channelFeatures` to asset model ([0cc5f55](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0cc5f55cb7bbb5244cb528fbd866585a5ec7957c))
* add recommendations for asset, next/prev episode ([#24](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/24)) ([bbfd58e](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bbfd58e643378f7a2650193bc01ad732874bb4b0))
* add SystemService, add playAsset call to entitlement service. ([#23](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/23)) ([4965bef](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/4965bef1461e6d172b230dea12a5dd32791f9394))
* enable optional enrichement of asset title ([3ca9b88](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/3ca9b8828005145767e288f81b60d42e21a86530))
* move image types to exposure ([#32](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/32)) ([739e808](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/739e80863958996a9b6a9ac8a95f7a90ea2e4f75))
* on now for all channels ([#35](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/35)) ([da1c854](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/da1c854323a34141033bbd84bef4d94e2c669f9e))
* optional country code when fetching product offerings with coun… ([#21](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/21)) ([adf2cd9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/adf2cd9f307459dec8e5d64aeed42ae6370e528e))
* overlay widgets on asset model ([#27](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/27)) ([9d10d02](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/9d10d02b454339cd747ea49126cafd577ffa5c53))
* update login-response-model ([5134645](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5134645f29f17ad54b6312e6f04b7aa839fe79d2))
* update PlayModel with ads field ([a68eb2a](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a68eb2ac9ca019b8ca2339825a647a7c38b8521d))



## 0.0.29 (2020-10-13)


### Bug Fixes

* **payments:** add new param to purchase req. deprecate old one ([a9aeac7](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a9aeac77e391493fd67b7e7ec1b10859de5ccb45))



## 0.0.28 (2020-10-08)


### Bug Fixes

* make discount optional, in order to reflect backend ([0b463ff](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0b463ff64efe29ef2d9d16fd530477546e879d89))



## 0.0.27 (2020-10-07)


### Features

* **payments:** extend payment response model and purchase model ([02b6c0c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/02b6c0c99142dd94ea614b8deb90bebe90241bee))



## 0.0.26 (2020-10-07)


### Features

* add discount ([ccd8e12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ccd8e12a984120ce3a3aac12daf6434f1c4611c0))



## 0.0.25 (2020-10-05)


### Features

* **payments:** payment method methods ([#11](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/11)) ([d18de23](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d18de238db94d11077534c4c14a551fd70545d98))



## 0.0.24 (2020-10-05)



## 0.0.23 (2020-10-02)


### Features

* **asset:** add production countries to asset ([bd77fab](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bd77fab43ccca10714d8436f690d60e233051c00))



## 0.0.22 (2020-09-18)



## 0.0.21 (2020-09-18)



## 0.0.20 (2020-09-18)



## 0.0.19 (2020-09-17)



## 0.0.18 (2020-09-17)



## 0.0.17 (2020-09-16)



## 0.0.16 (2020-09-16)



## 0.0.15 (2020-09-11)



## 0.0.14 (2020-09-10)



## 0.0.13 (2020-09-04)



## 0.0.12 (2020-08-31)



## 0.0.11 (2020-08-28)



## 0.0.10 (2020-08-27)



## 0.0.9 (2020-08-27)



## 0.0.8 (2020-08-27)



## 0.0.7 (2020-08-26)



## 0.0.6 (2020-08-25)



## 0.0.5 (2020-08-25)



## 0.0.4 (2020-08-25)



## 0.0.3 (2020-08-21)



## 0.0.2 (2020-08-21)





# 0.20.0 (2021-03-23)


### Bug Fixes

* add missing enum ([48115e3](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/48115e32ebee519191168d41232038bcad4c5f55))
* add vouchers paymenttype ([b129b31](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b129b31f256d62b1dfd2a4480a356ef4265018ed))
* added mp3 and mp4 as possible formats ([#29](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/29)) ([a3d54da](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a3d54da8b7af49c667c6430c3cfcc2efb118ea4a))
* channelFeatures being a two-dimensional array ([c8dd8df](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c8dd8dfaee7c418d7a8f69cd9a8f5a16530b5624))
* fix deserialization bug caused by previous commit ([65e28a5](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/65e28a54b69758ab528b2b4783f97a8c51a712ff))
* fix invalid casing on nodejs-logger & etcd-client package names ([5487356](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5487356c5efb578c7a0d0f12babe2f47a1b586f4))
* fix system config method ([28f99d9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/28f99d91747dbddfba592f6aabdf030204d4572d))
* invalid casing for all sdk packages ([84dc2bb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/84dc2bb8d65fc326203abd6fcfb666642a186a43))
* move from deprecated endpoint ([656ce25](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/656ce250f415b041940e2c01e2b5e13a5dbb8802))
* resolve compiler errors ([c86f52c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c86f52c863c6a80a80f347586c4ae9bab03e4fd0))


### Features

* add analytics percentage to system config model ([6f1bf04](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/6f1bf040813860b4801ef2f93da37c2b4e27e273))
* add get asset from list ([#30](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/30)) ([177ab12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/177ab12cc83b40f43f0bf365bacbee3e82075cc3))
* add getOnNow to content service ([03333dc](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/03333dc32e260c45deb3d02ff89bfb213ce62d68))
* add linked entity ([#28](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/28)) ([72685ed](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/72685ed023a5887d5a8db7fbc51f6f3cc92af79f))
* add missing properties and fix auth headers not being overridable ([bfae001](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bfae001e8014a46f2644d80f7f5d136623a7b7e6))
* add optional query param to logout endpoint ([b679afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b679afd160ca1040f7623001ef89e54b368a06dc))
* add parental ratings ([2def472](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/2def472134e955fbc571679b43d116548a5440d0))
* add payment method types to product offering ([1858ba6](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/1858ba6ea3989bbc4b4aec02266be27039d73811))
* add property `channelFeatures` to asset model ([0cc5f55](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0cc5f55cb7bbb5244cb528fbd866585a5ec7957c))
* add recommendations for asset, next/prev episode ([#24](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/24)) ([bbfd58e](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bbfd58e643378f7a2650193bc01ad732874bb4b0))
* add SystemService, add playAsset call to entitlement service. ([#23](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/23)) ([4965bef](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/4965bef1461e6d172b230dea12a5dd32791f9394))
* enable optional enrichement of asset title ([3ca9b88](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/3ca9b8828005145767e288f81b60d42e21a86530))
* move image types to exposure ([#32](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/32)) ([739e808](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/739e80863958996a9b6a9ac8a95f7a90ea2e4f75))
* on now for all channels ([#35](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/35)) ([da1c854](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/da1c854323a34141033bbd84bef4d94e2c669f9e))
* optional country code when fetching product offerings with coun… ([#21](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/21)) ([adf2cd9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/adf2cd9f307459dec8e5d64aeed42ae6370e528e))
* overlay widgets on asset model ([#27](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/27)) ([9d10d02](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/9d10d02b454339cd747ea49126cafd577ffa5c53))
* update login-response-model ([5134645](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5134645f29f17ad54b6312e6f04b7aa839fe79d2))
* update PlayModel with ads field ([a68eb2a](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a68eb2ac9ca019b8ca2339825a647a7c38b8521d))



## 0.0.29 (2020-10-13)


### Bug Fixes

* **payments:** add new param to purchase req. deprecate old one ([a9aeac7](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a9aeac77e391493fd67b7e7ec1b10859de5ccb45))



## 0.0.28 (2020-10-08)


### Bug Fixes

* make discount optional, in order to reflect backend ([0b463ff](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0b463ff64efe29ef2d9d16fd530477546e879d89))



## 0.0.27 (2020-10-07)


### Features

* **payments:** extend payment response model and purchase model ([02b6c0c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/02b6c0c99142dd94ea614b8deb90bebe90241bee))



## 0.0.26 (2020-10-07)


### Features

* add discount ([ccd8e12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ccd8e12a984120ce3a3aac12daf6434f1c4611c0))



## 0.0.25 (2020-10-05)


### Features

* **payments:** payment method methods ([#11](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/11)) ([d18de23](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d18de238db94d11077534c4c14a551fd70545d98))



## 0.0.24 (2020-10-05)



## 0.0.23 (2020-10-02)


### Features

* **asset:** add production countries to asset ([bd77fab](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bd77fab43ccca10714d8436f690d60e233051c00))



## 0.0.22 (2020-09-18)



## 0.0.21 (2020-09-18)



## 0.0.20 (2020-09-18)



## 0.0.19 (2020-09-17)



## 0.0.18 (2020-09-17)



## 0.0.17 (2020-09-16)



## 0.0.16 (2020-09-16)



## 0.0.15 (2020-09-11)



## 0.0.14 (2020-09-10)



## 0.0.13 (2020-09-04)



## 0.0.12 (2020-08-31)



## 0.0.11 (2020-08-28)



## 0.0.10 (2020-08-27)



## 0.0.9 (2020-08-27)



## 0.0.8 (2020-08-27)



## 0.0.7 (2020-08-26)



## 0.0.6 (2020-08-25)



## 0.0.5 (2020-08-25)



## 0.0.4 (2020-08-25)



## 0.0.3 (2020-08-21)



## 0.0.2 (2020-08-21)





# 0.19.0 (2021-03-19)


### Bug Fixes

* add missing enum ([48115e3](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/48115e32ebee519191168d41232038bcad4c5f55))
* add vouchers paymenttype ([b129b31](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b129b31f256d62b1dfd2a4480a356ef4265018ed))
* added mp3 and mp4 as possible formats ([#29](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/29)) ([a3d54da](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a3d54da8b7af49c667c6430c3cfcc2efb118ea4a))
* channelFeatures being a two-dimensional array ([c8dd8df](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c8dd8dfaee7c418d7a8f69cd9a8f5a16530b5624))
* fix deserialization bug caused by previous commit ([65e28a5](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/65e28a54b69758ab528b2b4783f97a8c51a712ff))
* fix invalid casing on nodejs-logger & etcd-client package names ([5487356](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5487356c5efb578c7a0d0f12babe2f47a1b586f4))
* fix system config method ([28f99d9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/28f99d91747dbddfba592f6aabdf030204d4572d))
* invalid casing for all sdk packages ([84dc2bb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/84dc2bb8d65fc326203abd6fcfb666642a186a43))
* move from deprecated endpoint ([656ce25](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/656ce250f415b041940e2c01e2b5e13a5dbb8802))
* resolve compiler errors ([c86f52c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c86f52c863c6a80a80f347586c4ae9bab03e4fd0))


### Features

* add analytics percentage to system config model ([6f1bf04](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/6f1bf040813860b4801ef2f93da37c2b4e27e273))
* add get asset from list ([#30](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/30)) ([177ab12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/177ab12cc83b40f43f0bf365bacbee3e82075cc3))
* add getOnNow to content service ([03333dc](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/03333dc32e260c45deb3d02ff89bfb213ce62d68))
* add linked entity ([#28](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/28)) ([72685ed](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/72685ed023a5887d5a8db7fbc51f6f3cc92af79f))
* add missing properties and fix auth headers not being overridable ([bfae001](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bfae001e8014a46f2644d80f7f5d136623a7b7e6))
* add optional query param to logout endpoint ([b679afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b679afd160ca1040f7623001ef89e54b368a06dc))
* add parental ratings ([2def472](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/2def472134e955fbc571679b43d116548a5440d0))
* add payment method types to product offering ([1858ba6](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/1858ba6ea3989bbc4b4aec02266be27039d73811))
* add property `channelFeatures` to asset model ([0cc5f55](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0cc5f55cb7bbb5244cb528fbd866585a5ec7957c))
* add recommendations for asset, next/prev episode ([#24](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/24)) ([bbfd58e](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bbfd58e643378f7a2650193bc01ad732874bb4b0))
* add SystemService, add playAsset call to entitlement service. ([#23](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/23)) ([4965bef](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/4965bef1461e6d172b230dea12a5dd32791f9394))
* enable optional enrichement of asset title ([3ca9b88](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/3ca9b8828005145767e288f81b60d42e21a86530))
* move image types to exposure ([#32](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/32)) ([739e808](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/739e80863958996a9b6a9ac8a95f7a90ea2e4f75))
* on now for all channels ([#35](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/35)) ([da1c854](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/da1c854323a34141033bbd84bef4d94e2c669f9e))
* optional country code when fetching product offerings with coun… ([#21](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/21)) ([adf2cd9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/adf2cd9f307459dec8e5d64aeed42ae6370e528e))
* overlay widgets on asset model ([#27](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/27)) ([9d10d02](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/9d10d02b454339cd747ea49126cafd577ffa5c53))
* update login-response-model ([5134645](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5134645f29f17ad54b6312e6f04b7aa839fe79d2))
* update PlayModel with ads field ([a68eb2a](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a68eb2ac9ca019b8ca2339825a647a7c38b8521d))



## 0.0.29 (2020-10-13)


### Bug Fixes

* **payments:** add new param to purchase req. deprecate old one ([a9aeac7](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a9aeac77e391493fd67b7e7ec1b10859de5ccb45))



## 0.0.28 (2020-10-08)


### Bug Fixes

* make discount optional, in order to reflect backend ([0b463ff](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0b463ff64efe29ef2d9d16fd530477546e879d89))



## 0.0.27 (2020-10-07)


### Features

* **payments:** extend payment response model and purchase model ([02b6c0c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/02b6c0c99142dd94ea614b8deb90bebe90241bee))



## 0.0.26 (2020-10-07)


### Features

* add discount ([ccd8e12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ccd8e12a984120ce3a3aac12daf6434f1c4611c0))



## 0.0.25 (2020-10-05)


### Features

* **payments:** payment method methods ([#11](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/11)) ([d18de23](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d18de238db94d11077534c4c14a551fd70545d98))



## 0.0.24 (2020-10-05)



## 0.0.23 (2020-10-02)


### Features

* **asset:** add production countries to asset ([bd77fab](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bd77fab43ccca10714d8436f690d60e233051c00))



## 0.0.22 (2020-09-18)



## 0.0.21 (2020-09-18)



## 0.0.20 (2020-09-18)



## 0.0.19 (2020-09-17)



## 0.0.18 (2020-09-17)



## 0.0.17 (2020-09-16)



## 0.0.16 (2020-09-16)



## 0.0.15 (2020-09-11)



## 0.0.14 (2020-09-10)



## 0.0.13 (2020-09-04)



## 0.0.12 (2020-08-31)



## 0.0.11 (2020-08-28)



## 0.0.10 (2020-08-27)



## 0.0.9 (2020-08-27)



## 0.0.8 (2020-08-27)



## 0.0.7 (2020-08-26)



## 0.0.6 (2020-08-25)



## 0.0.5 (2020-08-25)



## 0.0.4 (2020-08-25)



## 0.0.3 (2020-08-21)



## 0.0.2 (2020-08-21)





# 0.17.0 (2021-03-12)


### Bug Fixes

* add missing enum ([48115e3](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/48115e32ebee519191168d41232038bcad4c5f55))
* add vouchers paymenttype ([b129b31](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b129b31f256d62b1dfd2a4480a356ef4265018ed))
* added mp3 and mp4 as possible formats ([#29](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/29)) ([a3d54da](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a3d54da8b7af49c667c6430c3cfcc2efb118ea4a))
* channelFeatures being a two-dimensional array ([c8dd8df](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c8dd8dfaee7c418d7a8f69cd9a8f5a16530b5624))
* fix deserialization bug caused by previous commit ([65e28a5](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/65e28a54b69758ab528b2b4783f97a8c51a712ff))
* fix invalid casing on nodejs-logger & etcd-client package names ([5487356](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5487356c5efb578c7a0d0f12babe2f47a1b586f4))
* fix system config method ([28f99d9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/28f99d91747dbddfba592f6aabdf030204d4572d))
* invalid casing for all sdk packages ([84dc2bb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/84dc2bb8d65fc326203abd6fcfb666642a186a43))
* move from deprecated endpoint ([656ce25](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/656ce250f415b041940e2c01e2b5e13a5dbb8802))
* resolve compiler errors ([c86f52c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c86f52c863c6a80a80f347586c4ae9bab03e4fd0))


### Features

* add analytics percentage to system config model ([6f1bf04](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/6f1bf040813860b4801ef2f93da37c2b4e27e273))
* add get asset from list ([#30](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/30)) ([177ab12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/177ab12cc83b40f43f0bf365bacbee3e82075cc3))
* add getOnNow to content service ([03333dc](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/03333dc32e260c45deb3d02ff89bfb213ce62d68))
* add linked entity ([#28](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/28)) ([72685ed](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/72685ed023a5887d5a8db7fbc51f6f3cc92af79f))
* add missing properties and fix auth headers not being overridable ([bfae001](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bfae001e8014a46f2644d80f7f5d136623a7b7e6))
* add optional query param to logout endpoint ([b679afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b679afd160ca1040f7623001ef89e54b368a06dc))
* add parental ratings ([2def472](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/2def472134e955fbc571679b43d116548a5440d0))
* add payment method types to product offering ([1858ba6](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/1858ba6ea3989bbc4b4aec02266be27039d73811))
* add property `channelFeatures` to asset model ([0cc5f55](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0cc5f55cb7bbb5244cb528fbd866585a5ec7957c))
* add recommendations for asset, next/prev episode ([#24](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/24)) ([bbfd58e](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bbfd58e643378f7a2650193bc01ad732874bb4b0))
* add SystemService, add playAsset call to entitlement service. ([#23](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/23)) ([4965bef](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/4965bef1461e6d172b230dea12a5dd32791f9394))
* enable optional enrichement of asset title ([3ca9b88](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/3ca9b8828005145767e288f81b60d42e21a86530))
* move image types to exposure ([#32](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/32)) ([739e808](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/739e80863958996a9b6a9ac8a95f7a90ea2e4f75))
* optional country code when fetching product offerings with coun… ([#21](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/21)) ([adf2cd9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/adf2cd9f307459dec8e5d64aeed42ae6370e528e))
* overlay widgets on asset model ([#27](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/27)) ([9d10d02](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/9d10d02b454339cd747ea49126cafd577ffa5c53))
* update login-response-model ([5134645](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5134645f29f17ad54b6312e6f04b7aa839fe79d2))
* update PlayModel with ads field ([a68eb2a](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a68eb2ac9ca019b8ca2339825a647a7c38b8521d))



## 0.0.29 (2020-10-13)


### Bug Fixes

* **payments:** add new param to purchase req. deprecate old one ([a9aeac7](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a9aeac77e391493fd67b7e7ec1b10859de5ccb45))



## 0.0.28 (2020-10-08)


### Bug Fixes

* make discount optional, in order to reflect backend ([0b463ff](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0b463ff64efe29ef2d9d16fd530477546e879d89))



## 0.0.27 (2020-10-07)


### Features

* **payments:** extend payment response model and purchase model ([02b6c0c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/02b6c0c99142dd94ea614b8deb90bebe90241bee))



## 0.0.26 (2020-10-07)


### Features

* add discount ([ccd8e12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ccd8e12a984120ce3a3aac12daf6434f1c4611c0))



## 0.0.25 (2020-10-05)


### Features

* **payments:** payment method methods ([#11](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/11)) ([d18de23](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d18de238db94d11077534c4c14a551fd70545d98))



## 0.0.24 (2020-10-05)



## 0.0.23 (2020-10-02)


### Features

* **asset:** add production countries to asset ([bd77fab](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bd77fab43ccca10714d8436f690d60e233051c00))



## 0.0.22 (2020-09-18)



## 0.0.21 (2020-09-18)



## 0.0.20 (2020-09-18)



## 0.0.19 (2020-09-17)



## 0.0.18 (2020-09-17)



## 0.0.17 (2020-09-16)



## 0.0.16 (2020-09-16)



## 0.0.15 (2020-09-11)



## 0.0.14 (2020-09-10)



## 0.0.13 (2020-09-04)



## 0.0.12 (2020-08-31)



## 0.0.11 (2020-08-28)



## 0.0.10 (2020-08-27)



## 0.0.9 (2020-08-27)



## 0.0.8 (2020-08-27)



## 0.0.7 (2020-08-26)



## 0.0.6 (2020-08-25)



## 0.0.5 (2020-08-25)



## 0.0.4 (2020-08-25)



## 0.0.3 (2020-08-21)



## 0.0.2 (2020-08-21)





# 0.15.0 (2021-03-04)


### Bug Fixes

* add missing enum ([48115e3](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/48115e32ebee519191168d41232038bcad4c5f55))
* add vouchers paymenttype ([b129b31](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b129b31f256d62b1dfd2a4480a356ef4265018ed))
* added mp3 and mp4 as possible formats ([#29](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/29)) ([a3d54da](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a3d54da8b7af49c667c6430c3cfcc2efb118ea4a))
* channelFeatures being a two-dimensional array ([c8dd8df](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c8dd8dfaee7c418d7a8f69cd9a8f5a16530b5624))
* fix deserialization bug caused by previous commit ([65e28a5](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/65e28a54b69758ab528b2b4783f97a8c51a712ff))
* fix invalid casing on nodejs-logger & etcd-client package names ([5487356](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5487356c5efb578c7a0d0f12babe2f47a1b586f4))
* fix system config method ([28f99d9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/28f99d91747dbddfba592f6aabdf030204d4572d))
* invalid casing for all sdk packages ([84dc2bb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/84dc2bb8d65fc326203abd6fcfb666642a186a43))
* resolve compiler errors ([c86f52c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c86f52c863c6a80a80f347586c4ae9bab03e4fd0))


### Features

* add analytics percentage to system config model ([6f1bf04](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/6f1bf040813860b4801ef2f93da37c2b4e27e273))
* add getOnNow to content service ([03333dc](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/03333dc32e260c45deb3d02ff89bfb213ce62d68))
* add linked entity ([#28](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/28)) ([72685ed](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/72685ed023a5887d5a8db7fbc51f6f3cc92af79f))
* add missing properties and fix auth headers not being overridable ([bfae001](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bfae001e8014a46f2644d80f7f5d136623a7b7e6))
* add optional query param to logout endpoint ([b679afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b679afd160ca1040f7623001ef89e54b368a06dc))
* add parental ratings ([2def472](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/2def472134e955fbc571679b43d116548a5440d0))
* add payment method types to product offering ([1858ba6](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/1858ba6ea3989bbc4b4aec02266be27039d73811))
* add property `channelFeatures` to asset model ([0cc5f55](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0cc5f55cb7bbb5244cb528fbd866585a5ec7957c))
* add recommendations for asset, next/prev episode ([#24](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/24)) ([bbfd58e](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bbfd58e643378f7a2650193bc01ad732874bb4b0))
* add SystemService, add playAsset call to entitlement service. ([#23](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/23)) ([4965bef](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/4965bef1461e6d172b230dea12a5dd32791f9394))
* enable optional enrichement of asset title ([3ca9b88](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/3ca9b8828005145767e288f81b60d42e21a86530))
* optional country code when fetching product offerings with coun… ([#21](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/21)) ([adf2cd9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/adf2cd9f307459dec8e5d64aeed42ae6370e528e))
* overlay widgets on asset model ([#27](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/27)) ([9d10d02](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/9d10d02b454339cd747ea49126cafd577ffa5c53))
* update login-response-model ([5134645](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5134645f29f17ad54b6312e6f04b7aa839fe79d2))
* update PlayModel with ads field ([a68eb2a](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a68eb2ac9ca019b8ca2339825a647a7c38b8521d))



## 0.0.29 (2020-10-13)


### Bug Fixes

* **payments:** add new param to purchase req. deprecate old one ([a9aeac7](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a9aeac77e391493fd67b7e7ec1b10859de5ccb45))



## 0.0.28 (2020-10-08)


### Bug Fixes

* make discount optional, in order to reflect backend ([0b463ff](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0b463ff64efe29ef2d9d16fd530477546e879d89))



## 0.0.27 (2020-10-07)


### Features

* **payments:** extend payment response model and purchase model ([02b6c0c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/02b6c0c99142dd94ea614b8deb90bebe90241bee))



## 0.0.26 (2020-10-07)


### Features

* add discount ([ccd8e12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ccd8e12a984120ce3a3aac12daf6434f1c4611c0))



## 0.0.25 (2020-10-05)


### Features

* **payments:** payment method methods ([#11](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/11)) ([d18de23](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d18de238db94d11077534c4c14a551fd70545d98))



## 0.0.24 (2020-10-05)



## 0.0.23 (2020-10-02)


### Features

* **asset:** add production countries to asset ([bd77fab](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bd77fab43ccca10714d8436f690d60e233051c00))



## 0.0.22 (2020-09-18)



## 0.0.21 (2020-09-18)



## 0.0.20 (2020-09-18)



## 0.0.19 (2020-09-17)



## 0.0.18 (2020-09-17)



## 0.0.17 (2020-09-16)



## 0.0.16 (2020-09-16)



## 0.0.15 (2020-09-11)



## 0.0.14 (2020-09-10)



## 0.0.13 (2020-09-04)



## 0.0.12 (2020-08-31)



## 0.0.11 (2020-08-28)



## 0.0.10 (2020-08-27)



## 0.0.9 (2020-08-27)



## 0.0.8 (2020-08-27)



## 0.0.7 (2020-08-26)



## 0.0.6 (2020-08-25)



## 0.0.5 (2020-08-25)



## 0.0.4 (2020-08-25)



## 0.0.3 (2020-08-21)



## 0.0.2 (2020-08-21)





# 0.14.0 (2021-03-03)


### Bug Fixes

* add missing enum ([48115e3](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/48115e32ebee519191168d41232038bcad4c5f55))
* add vouchers paymenttype ([b129b31](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b129b31f256d62b1dfd2a4480a356ef4265018ed))
* added mp3 and mp4 as possible formats ([#29](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/29)) ([a3d54da](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a3d54da8b7af49c667c6430c3cfcc2efb118ea4a))
* channelFeatures being a two-dimensional array ([c8dd8df](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c8dd8dfaee7c418d7a8f69cd9a8f5a16530b5624))
* fix deserialization bug caused by previous commit ([65e28a5](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/65e28a54b69758ab528b2b4783f97a8c51a712ff))
* fix invalid casing on nodejs-logger & etcd-client package names ([5487356](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5487356c5efb578c7a0d0f12babe2f47a1b586f4))
* fix system config method ([28f99d9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/28f99d91747dbddfba592f6aabdf030204d4572d))
* invalid casing for all sdk packages ([84dc2bb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/84dc2bb8d65fc326203abd6fcfb666642a186a43))
* resolve compiler errors ([c86f52c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c86f52c863c6a80a80f347586c4ae9bab03e4fd0))


### Features

* add analytics percentage to system config model ([6f1bf04](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/6f1bf040813860b4801ef2f93da37c2b4e27e273))
* add getOnNow to content service ([03333dc](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/03333dc32e260c45deb3d02ff89bfb213ce62d68))
* add linked entity ([#28](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/28)) ([72685ed](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/72685ed023a5887d5a8db7fbc51f6f3cc92af79f))
* add missing properties and fix auth headers not being overridable ([bfae001](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bfae001e8014a46f2644d80f7f5d136623a7b7e6))
* add optional query param to logout endpoint ([b679afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b679afd160ca1040f7623001ef89e54b368a06dc))
* add parental ratings ([2def472](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/2def472134e955fbc571679b43d116548a5440d0))
* add payment method types to product offering ([1858ba6](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/1858ba6ea3989bbc4b4aec02266be27039d73811))
* add property `channelFeatures` to asset model ([0cc5f55](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0cc5f55cb7bbb5244cb528fbd866585a5ec7957c))
* add recommendations for asset, next/prev episode ([#24](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/24)) ([bbfd58e](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bbfd58e643378f7a2650193bc01ad732874bb4b0))
* add SystemService, add playAsset call to entitlement service. ([#23](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/23)) ([4965bef](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/4965bef1461e6d172b230dea12a5dd32791f9394))
* enable optional enrichement of asset title ([3ca9b88](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/3ca9b8828005145767e288f81b60d42e21a86530))
* optional country code when fetching product offerings with coun… ([#21](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/21)) ([adf2cd9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/adf2cd9f307459dec8e5d64aeed42ae6370e528e))
* overlay widgets on asset model ([#27](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/27)) ([9d10d02](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/9d10d02b454339cd747ea49126cafd577ffa5c53))
* update PlayModel with ads field ([a68eb2a](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a68eb2ac9ca019b8ca2339825a647a7c38b8521d))



## 0.0.29 (2020-10-13)


### Bug Fixes

* **payments:** add new param to purchase req. deprecate old one ([a9aeac7](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a9aeac77e391493fd67b7e7ec1b10859de5ccb45))



## 0.0.28 (2020-10-08)


### Bug Fixes

* make discount optional, in order to reflect backend ([0b463ff](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0b463ff64efe29ef2d9d16fd530477546e879d89))



## 0.0.27 (2020-10-07)


### Features

* **payments:** extend payment response model and purchase model ([02b6c0c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/02b6c0c99142dd94ea614b8deb90bebe90241bee))



## 0.0.26 (2020-10-07)


### Features

* add discount ([ccd8e12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ccd8e12a984120ce3a3aac12daf6434f1c4611c0))



## 0.0.25 (2020-10-05)


### Features

* **payments:** payment method methods ([#11](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/11)) ([d18de23](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d18de238db94d11077534c4c14a551fd70545d98))



## 0.0.24 (2020-10-05)



## 0.0.23 (2020-10-02)


### Features

* **asset:** add production countries to asset ([bd77fab](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bd77fab43ccca10714d8436f690d60e233051c00))



## 0.0.22 (2020-09-18)



## 0.0.21 (2020-09-18)



## 0.0.20 (2020-09-18)



## 0.0.19 (2020-09-17)



## 0.0.18 (2020-09-17)



## 0.0.17 (2020-09-16)



## 0.0.16 (2020-09-16)



## 0.0.15 (2020-09-11)



## 0.0.14 (2020-09-10)



## 0.0.13 (2020-09-04)



## 0.0.12 (2020-08-31)



## 0.0.11 (2020-08-28)



## 0.0.10 (2020-08-27)



## 0.0.9 (2020-08-27)



## 0.0.8 (2020-08-27)



## 0.0.7 (2020-08-26)



## 0.0.6 (2020-08-25)



## 0.0.5 (2020-08-25)



## 0.0.4 (2020-08-25)



## 0.0.3 (2020-08-21)



## 0.0.2 (2020-08-21)





# 0.13.0 (2021-03-02)


### Bug Fixes

* add missing enum ([48115e3](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/48115e32ebee519191168d41232038bcad4c5f55))
* add vouchers paymenttype ([b129b31](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b129b31f256d62b1dfd2a4480a356ef4265018ed))
* channelFeatures being a two-dimensional array ([c8dd8df](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c8dd8dfaee7c418d7a8f69cd9a8f5a16530b5624))
* fix deserialization bug caused by previous commit ([65e28a5](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/65e28a54b69758ab528b2b4783f97a8c51a712ff))
* fix invalid casing on nodejs-logger & etcd-client package names ([5487356](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5487356c5efb578c7a0d0f12babe2f47a1b586f4))
* fix system config method ([28f99d9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/28f99d91747dbddfba592f6aabdf030204d4572d))
* invalid casing for all sdk packages ([84dc2bb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/84dc2bb8d65fc326203abd6fcfb666642a186a43))
* resolve compiler errors ([c86f52c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c86f52c863c6a80a80f347586c4ae9bab03e4fd0))


### Features

* add analytics percentage to system config model ([6f1bf04](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/6f1bf040813860b4801ef2f93da37c2b4e27e273))
* add getOnNow to content service ([03333dc](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/03333dc32e260c45deb3d02ff89bfb213ce62d68))
* add linked entity ([#28](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/28)) ([72685ed](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/72685ed023a5887d5a8db7fbc51f6f3cc92af79f))
* add missing properties and fix auth headers not being overridable ([bfae001](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bfae001e8014a46f2644d80f7f5d136623a7b7e6))
* add optional query param to logout endpoint ([b679afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b679afd160ca1040f7623001ef89e54b368a06dc))
* add parental ratings ([2def472](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/2def472134e955fbc571679b43d116548a5440d0))
* add payment method types to product offering ([1858ba6](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/1858ba6ea3989bbc4b4aec02266be27039d73811))
* add property `channelFeatures` to asset model ([0cc5f55](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0cc5f55cb7bbb5244cb528fbd866585a5ec7957c))
* add recommendations for asset, next/prev episode ([#24](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/24)) ([bbfd58e](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bbfd58e643378f7a2650193bc01ad732874bb4b0))
* add SystemService, add playAsset call to entitlement service. ([#23](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/23)) ([4965bef](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/4965bef1461e6d172b230dea12a5dd32791f9394))
* enable optional enrichement of asset title ([3ca9b88](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/3ca9b8828005145767e288f81b60d42e21a86530))
* optional country code when fetching product offerings with coun… ([#21](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/21)) ([adf2cd9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/adf2cd9f307459dec8e5d64aeed42ae6370e528e))
* overlay widgets on asset model ([#27](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/27)) ([9d10d02](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/9d10d02b454339cd747ea49126cafd577ffa5c53))
* update PlayModel with ads field ([a68eb2a](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a68eb2ac9ca019b8ca2339825a647a7c38b8521d))



## 0.0.29 (2020-10-13)


### Bug Fixes

* **payments:** add new param to purchase req. deprecate old one ([a9aeac7](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a9aeac77e391493fd67b7e7ec1b10859de5ccb45))



## 0.0.28 (2020-10-08)


### Bug Fixes

* make discount optional, in order to reflect backend ([0b463ff](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0b463ff64efe29ef2d9d16fd530477546e879d89))



## 0.0.27 (2020-10-07)


### Features

* **payments:** extend payment response model and purchase model ([02b6c0c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/02b6c0c99142dd94ea614b8deb90bebe90241bee))



## 0.0.26 (2020-10-07)


### Features

* add discount ([ccd8e12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ccd8e12a984120ce3a3aac12daf6434f1c4611c0))



## 0.0.25 (2020-10-05)


### Features

* **payments:** payment method methods ([#11](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/11)) ([d18de23](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d18de238db94d11077534c4c14a551fd70545d98))



## 0.0.24 (2020-10-05)



## 0.0.23 (2020-10-02)


### Features

* **asset:** add production countries to asset ([bd77fab](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bd77fab43ccca10714d8436f690d60e233051c00))



## 0.0.22 (2020-09-18)



## 0.0.21 (2020-09-18)



## 0.0.20 (2020-09-18)



## 0.0.19 (2020-09-17)



## 0.0.18 (2020-09-17)



## 0.0.17 (2020-09-16)



## 0.0.16 (2020-09-16)



## 0.0.15 (2020-09-11)



## 0.0.14 (2020-09-10)



## 0.0.13 (2020-09-04)



## 0.0.12 (2020-08-31)



## 0.0.11 (2020-08-28)



## 0.0.10 (2020-08-27)



## 0.0.9 (2020-08-27)



## 0.0.8 (2020-08-27)



## 0.0.7 (2020-08-26)



## 0.0.6 (2020-08-25)



## 0.0.5 (2020-08-25)



## 0.0.4 (2020-08-25)



## 0.0.3 (2020-08-21)



## 0.0.2 (2020-08-21)





# 0.12.0 (2021-02-19)


### Bug Fixes

* add missing enum ([48115e3](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/48115e32ebee519191168d41232038bcad4c5f55))
* add vouchers paymenttype ([b129b31](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b129b31f256d62b1dfd2a4480a356ef4265018ed))
* channelFeatures being a two-dimensional array ([c8dd8df](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c8dd8dfaee7c418d7a8f69cd9a8f5a16530b5624))
* fix deserialization bug caused by previous commit ([65e28a5](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/65e28a54b69758ab528b2b4783f97a8c51a712ff))
* fix invalid casing on nodejs-logger & etcd-client package names ([5487356](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5487356c5efb578c7a0d0f12babe2f47a1b586f4))
* fix system config method ([28f99d9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/28f99d91747dbddfba592f6aabdf030204d4572d))
* invalid casing for all sdk packages ([84dc2bb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/84dc2bb8d65fc326203abd6fcfb666642a186a43))
* resolve compiler errors ([c86f52c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c86f52c863c6a80a80f347586c4ae9bab03e4fd0))


### Features

* add analytics percentage to system config model ([6f1bf04](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/6f1bf040813860b4801ef2f93da37c2b4e27e273))
* add getOnNow to content service ([03333dc](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/03333dc32e260c45deb3d02ff89bfb213ce62d68))
* add missing properties and fix auth headers not being overridable ([bfae001](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bfae001e8014a46f2644d80f7f5d136623a7b7e6))
* add optional query param to logout endpoint ([b679afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b679afd160ca1040f7623001ef89e54b368a06dc))
* add parental ratings ([2def472](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/2def472134e955fbc571679b43d116548a5440d0))
* add payment method types to product offering ([1858ba6](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/1858ba6ea3989bbc4b4aec02266be27039d73811))
* add property `channelFeatures` to asset model ([0cc5f55](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0cc5f55cb7bbb5244cb528fbd866585a5ec7957c))
* add recommendations for asset, next/prev episode ([#24](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/24)) ([bbfd58e](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bbfd58e643378f7a2650193bc01ad732874bb4b0))
* add SystemService, add playAsset call to entitlement service. ([#23](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/23)) ([4965bef](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/4965bef1461e6d172b230dea12a5dd32791f9394))
* enable optional enrichement of asset title ([3ca9b88](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/3ca9b8828005145767e288f81b60d42e21a86530))
* optional country code when fetching product offerings with coun… ([#21](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/21)) ([adf2cd9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/adf2cd9f307459dec8e5d64aeed42ae6370e528e))
* overlay widgets on asset model ([#27](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/27)) ([9d10d02](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/9d10d02b454339cd747ea49126cafd577ffa5c53))
* update PlayModel with ads field ([a68eb2a](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a68eb2ac9ca019b8ca2339825a647a7c38b8521d))



## 0.0.29 (2020-10-13)


### Bug Fixes

* **payments:** add new param to purchase req. deprecate old one ([a9aeac7](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a9aeac77e391493fd67b7e7ec1b10859de5ccb45))



## 0.0.28 (2020-10-08)


### Bug Fixes

* make discount optional, in order to reflect backend ([0b463ff](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0b463ff64efe29ef2d9d16fd530477546e879d89))



## 0.0.27 (2020-10-07)


### Features

* **payments:** extend payment response model and purchase model ([02b6c0c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/02b6c0c99142dd94ea614b8deb90bebe90241bee))



## 0.0.26 (2020-10-07)


### Features

* add discount ([ccd8e12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ccd8e12a984120ce3a3aac12daf6434f1c4611c0))



## 0.0.25 (2020-10-05)


### Features

* **payments:** payment method methods ([#11](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/11)) ([d18de23](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d18de238db94d11077534c4c14a551fd70545d98))



## 0.0.24 (2020-10-05)



## 0.0.23 (2020-10-02)


### Features

* **asset:** add production countries to asset ([bd77fab](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bd77fab43ccca10714d8436f690d60e233051c00))



## 0.0.22 (2020-09-18)



## 0.0.21 (2020-09-18)



## 0.0.20 (2020-09-18)



## 0.0.19 (2020-09-17)



## 0.0.18 (2020-09-17)



## 0.0.17 (2020-09-16)



## 0.0.16 (2020-09-16)



## 0.0.15 (2020-09-11)



## 0.0.14 (2020-09-10)



## 0.0.13 (2020-09-04)



## 0.0.12 (2020-08-31)



## 0.0.11 (2020-08-28)



## 0.0.10 (2020-08-27)



## 0.0.9 (2020-08-27)



## 0.0.8 (2020-08-27)



## 0.0.7 (2020-08-26)



## 0.0.6 (2020-08-25)



## 0.0.5 (2020-08-25)



## 0.0.4 (2020-08-25)



## 0.0.3 (2020-08-21)



## 0.0.2 (2020-08-21)





# 0.11.0 (2021-02-19)


### Bug Fixes

* add vouchers paymenttype ([b129b31](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b129b31f256d62b1dfd2a4480a356ef4265018ed))
* channelFeatures being a two-dimensional array ([c8dd8df](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c8dd8dfaee7c418d7a8f69cd9a8f5a16530b5624))
* fix deserialization bug caused by previous commit ([65e28a5](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/65e28a54b69758ab528b2b4783f97a8c51a712ff))
* fix invalid casing on nodejs-logger & etcd-client package names ([5487356](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5487356c5efb578c7a0d0f12babe2f47a1b586f4))
* fix system config method ([28f99d9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/28f99d91747dbddfba592f6aabdf030204d4572d))
* invalid casing for all sdk packages ([84dc2bb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/84dc2bb8d65fc326203abd6fcfb666642a186a43))
* resolve compiler errors ([c86f52c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c86f52c863c6a80a80f347586c4ae9bab03e4fd0))


### Features

* add analytics percentage to system config model ([6f1bf04](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/6f1bf040813860b4801ef2f93da37c2b4e27e273))
* add getOnNow to content service ([03333dc](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/03333dc32e260c45deb3d02ff89bfb213ce62d68))
* add missing properties and fix auth headers not being overridable ([bfae001](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bfae001e8014a46f2644d80f7f5d136623a7b7e6))
* add optional query param to logout endpoint ([b679afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b679afd160ca1040f7623001ef89e54b368a06dc))
* add parental ratings ([2def472](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/2def472134e955fbc571679b43d116548a5440d0))
* add payment method types to product offering ([1858ba6](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/1858ba6ea3989bbc4b4aec02266be27039d73811))
* add property `channelFeatures` to asset model ([0cc5f55](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0cc5f55cb7bbb5244cb528fbd866585a5ec7957c))
* add recommendations for asset, next/prev episode ([#24](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/24)) ([bbfd58e](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bbfd58e643378f7a2650193bc01ad732874bb4b0))
* add SystemService, add playAsset call to entitlement service. ([#23](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/23)) ([4965bef](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/4965bef1461e6d172b230dea12a5dd32791f9394))
* enable optional enrichement of asset title ([3ca9b88](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/3ca9b8828005145767e288f81b60d42e21a86530))
* optional country code when fetching product offerings with coun… ([#21](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/21)) ([adf2cd9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/adf2cd9f307459dec8e5d64aeed42ae6370e528e))
* overlay widgets on asset model ([#27](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/27)) ([9d10d02](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/9d10d02b454339cd747ea49126cafd577ffa5c53))
* update PlayModel with ads field ([a68eb2a](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a68eb2ac9ca019b8ca2339825a647a7c38b8521d))



## 0.0.29 (2020-10-13)


### Bug Fixes

* **payments:** add new param to purchase req. deprecate old one ([a9aeac7](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a9aeac77e391493fd67b7e7ec1b10859de5ccb45))



## 0.0.28 (2020-10-08)


### Bug Fixes

* make discount optional, in order to reflect backend ([0b463ff](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0b463ff64efe29ef2d9d16fd530477546e879d89))



## 0.0.27 (2020-10-07)


### Features

* **payments:** extend payment response model and purchase model ([02b6c0c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/02b6c0c99142dd94ea614b8deb90bebe90241bee))



## 0.0.26 (2020-10-07)


### Features

* add discount ([ccd8e12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ccd8e12a984120ce3a3aac12daf6434f1c4611c0))



## 0.0.25 (2020-10-05)


### Features

* **payments:** payment method methods ([#11](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/11)) ([d18de23](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d18de238db94d11077534c4c14a551fd70545d98))



## 0.0.24 (2020-10-05)



## 0.0.23 (2020-10-02)


### Features

* **asset:** add production countries to asset ([bd77fab](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bd77fab43ccca10714d8436f690d60e233051c00))



## 0.0.22 (2020-09-18)



## 0.0.21 (2020-09-18)



## 0.0.20 (2020-09-18)



## 0.0.19 (2020-09-17)



## 0.0.18 (2020-09-17)



## 0.0.17 (2020-09-16)



## 0.0.16 (2020-09-16)



## 0.0.15 (2020-09-11)



## 0.0.14 (2020-09-10)



## 0.0.13 (2020-09-04)



## 0.0.12 (2020-08-31)



## 0.0.11 (2020-08-28)



## 0.0.10 (2020-08-27)



## 0.0.9 (2020-08-27)



## 0.0.8 (2020-08-27)



## 0.0.7 (2020-08-26)



## 0.0.6 (2020-08-25)



## 0.0.5 (2020-08-25)



## 0.0.4 (2020-08-25)



## 0.0.3 (2020-08-21)



## 0.0.2 (2020-08-21)





# 0.10.0 (2021-02-18)


### Bug Fixes

* add vouchers paymenttype ([b129b31](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b129b31f256d62b1dfd2a4480a356ef4265018ed))
* channelFeatures being a two-dimensional array ([c8dd8df](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c8dd8dfaee7c418d7a8f69cd9a8f5a16530b5624))
* fix deserialization bug caused by previous commit ([65e28a5](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/65e28a54b69758ab528b2b4783f97a8c51a712ff))
* fix invalid casing on nodejs-logger & etcd-client package names ([5487356](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5487356c5efb578c7a0d0f12babe2f47a1b586f4))
* fix system config method ([28f99d9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/28f99d91747dbddfba592f6aabdf030204d4572d))
* invalid casing for all sdk packages ([84dc2bb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/84dc2bb8d65fc326203abd6fcfb666642a186a43))
* resolve compiler errors ([c86f52c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c86f52c863c6a80a80f347586c4ae9bab03e4fd0))


### Features

* add analytics percentage to system config model ([6f1bf04](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/6f1bf040813860b4801ef2f93da37c2b4e27e273))
* add getOnNow to content service ([03333dc](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/03333dc32e260c45deb3d02ff89bfb213ce62d68))
* add missing properties and fix auth headers not being overridable ([bfae001](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bfae001e8014a46f2644d80f7f5d136623a7b7e6))
* add optional query param to logout endpoint ([b679afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b679afd160ca1040f7623001ef89e54b368a06dc))
* add parental ratings ([2def472](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/2def472134e955fbc571679b43d116548a5440d0))
* add payment method types to product offering ([1858ba6](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/1858ba6ea3989bbc4b4aec02266be27039d73811))
* add property `channelFeatures` to asset model ([0cc5f55](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0cc5f55cb7bbb5244cb528fbd866585a5ec7957c))
* add recommendations for asset, next/prev episode ([#24](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/24)) ([bbfd58e](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bbfd58e643378f7a2650193bc01ad732874bb4b0))
* add SystemService, add playAsset call to entitlement service. ([#23](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/23)) ([4965bef](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/4965bef1461e6d172b230dea12a5dd32791f9394))
* enable optional enrichement of asset title ([3ca9b88](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/3ca9b8828005145767e288f81b60d42e21a86530))
* optional country code when fetching product offerings with coun… ([#21](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/21)) ([adf2cd9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/adf2cd9f307459dec8e5d64aeed42ae6370e528e))
* overlay widgets on asset model ([#27](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/27)) ([9d10d02](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/9d10d02b454339cd747ea49126cafd577ffa5c53))



## 0.0.29 (2020-10-13)


### Bug Fixes

* **payments:** add new param to purchase req. deprecate old one ([a9aeac7](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a9aeac77e391493fd67b7e7ec1b10859de5ccb45))



## 0.0.28 (2020-10-08)


### Bug Fixes

* make discount optional, in order to reflect backend ([0b463ff](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0b463ff64efe29ef2d9d16fd530477546e879d89))



## 0.0.27 (2020-10-07)


### Features

* **payments:** extend payment response model and purchase model ([02b6c0c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/02b6c0c99142dd94ea614b8deb90bebe90241bee))



## 0.0.26 (2020-10-07)


### Features

* add discount ([ccd8e12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ccd8e12a984120ce3a3aac12daf6434f1c4611c0))



## 0.0.25 (2020-10-05)


### Features

* **payments:** payment method methods ([#11](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/11)) ([d18de23](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d18de238db94d11077534c4c14a551fd70545d98))



## 0.0.24 (2020-10-05)



## 0.0.23 (2020-10-02)


### Features

* **asset:** add production countries to asset ([bd77fab](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bd77fab43ccca10714d8436f690d60e233051c00))



## 0.0.22 (2020-09-18)



## 0.0.21 (2020-09-18)



## 0.0.20 (2020-09-18)



## 0.0.19 (2020-09-17)



## 0.0.18 (2020-09-17)



## 0.0.17 (2020-09-16)



## 0.0.16 (2020-09-16)



## 0.0.15 (2020-09-11)



## 0.0.14 (2020-09-10)



## 0.0.13 (2020-09-04)



## 0.0.12 (2020-08-31)



## 0.0.11 (2020-08-28)



## 0.0.10 (2020-08-27)



## 0.0.9 (2020-08-27)



## 0.0.8 (2020-08-27)



## 0.0.7 (2020-08-26)



## 0.0.6 (2020-08-25)



## 0.0.5 (2020-08-25)



## 0.0.4 (2020-08-25)



## 0.0.3 (2020-08-21)



## 0.0.2 (2020-08-21)





# 0.9.0 (2021-02-17)


### Bug Fixes

* add vouchers paymenttype ([b129b31](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b129b31f256d62b1dfd2a4480a356ef4265018ed))
* channelFeatures being a two-dimensional array ([c8dd8df](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c8dd8dfaee7c418d7a8f69cd9a8f5a16530b5624))
* fix deserialization bug caused by previous commit ([65e28a5](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/65e28a54b69758ab528b2b4783f97a8c51a712ff))
* fix invalid casing on nodejs-logger & etcd-client package names ([5487356](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5487356c5efb578c7a0d0f12babe2f47a1b586f4))
* fix system config method ([28f99d9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/28f99d91747dbddfba592f6aabdf030204d4572d))
* invalid casing for all sdk packages ([84dc2bb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/84dc2bb8d65fc326203abd6fcfb666642a186a43))
* resolve compiler errors ([c86f52c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c86f52c863c6a80a80f347586c4ae9bab03e4fd0))


### Features

* add analytics percentage to system config model ([6f1bf04](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/6f1bf040813860b4801ef2f93da37c2b4e27e273))
* add getOnNow to content service ([03333dc](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/03333dc32e260c45deb3d02ff89bfb213ce62d68))
* add missing properties and fix auth headers not being overridable ([bfae001](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bfae001e8014a46f2644d80f7f5d136623a7b7e6))
* add optional query param to logout endpoint ([b679afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b679afd160ca1040f7623001ef89e54b368a06dc))
* add parental ratings ([2def472](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/2def472134e955fbc571679b43d116548a5440d0))
* add payment method types to product offering ([1858ba6](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/1858ba6ea3989bbc4b4aec02266be27039d73811))
* add property `channelFeatures` to asset model ([0cc5f55](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0cc5f55cb7bbb5244cb528fbd866585a5ec7957c))
* add recommendations for asset, next/prev episode ([#24](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/24)) ([bbfd58e](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bbfd58e643378f7a2650193bc01ad732874bb4b0))
* add SystemService, add playAsset call to entitlement service. ([#23](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/23)) ([4965bef](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/4965bef1461e6d172b230dea12a5dd32791f9394))
* enable optional enrichement of asset title ([3ca9b88](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/3ca9b8828005145767e288f81b60d42e21a86530))
* optional country code when fetching product offerings with coun… ([#21](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/21)) ([adf2cd9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/adf2cd9f307459dec8e5d64aeed42ae6370e528e))



## 0.0.29 (2020-10-13)


### Bug Fixes

* **payments:** add new param to purchase req. deprecate old one ([a9aeac7](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a9aeac77e391493fd67b7e7ec1b10859de5ccb45))



## 0.0.28 (2020-10-08)


### Bug Fixes

* make discount optional, in order to reflect backend ([0b463ff](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0b463ff64efe29ef2d9d16fd530477546e879d89))



## 0.0.27 (2020-10-07)


### Features

* **payments:** extend payment response model and purchase model ([02b6c0c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/02b6c0c99142dd94ea614b8deb90bebe90241bee))



## 0.0.26 (2020-10-07)


### Features

* add discount ([ccd8e12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ccd8e12a984120ce3a3aac12daf6434f1c4611c0))



## 0.0.25 (2020-10-05)


### Features

* **payments:** payment method methods ([#11](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/11)) ([d18de23](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d18de238db94d11077534c4c14a551fd70545d98))



## 0.0.24 (2020-10-05)



## 0.0.23 (2020-10-02)


### Features

* **asset:** add production countries to asset ([bd77fab](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bd77fab43ccca10714d8436f690d60e233051c00))



## 0.0.22 (2020-09-18)



## 0.0.21 (2020-09-18)



## 0.0.20 (2020-09-18)



## 0.0.19 (2020-09-17)



## 0.0.18 (2020-09-17)



## 0.0.17 (2020-09-16)



## 0.0.16 (2020-09-16)



## 0.0.15 (2020-09-11)



## 0.0.14 (2020-09-10)



## 0.0.13 (2020-09-04)



## 0.0.12 (2020-08-31)



## 0.0.11 (2020-08-28)



## 0.0.10 (2020-08-27)



## 0.0.9 (2020-08-27)



## 0.0.8 (2020-08-27)



## 0.0.7 (2020-08-26)



## 0.0.6 (2020-08-25)



## 0.0.5 (2020-08-25)



## 0.0.4 (2020-08-25)



## 0.0.3 (2020-08-21)



## 0.0.2 (2020-08-21)





# 0.8.0 (2021-02-16)


### Bug Fixes

* add vouchers paymenttype ([b129b31](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b129b31f256d62b1dfd2a4480a356ef4265018ed))
* channelFeatures being a two-dimensional array ([c8dd8df](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c8dd8dfaee7c418d7a8f69cd9a8f5a16530b5624))
* fix deserialization bug caused by previous commit ([65e28a5](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/65e28a54b69758ab528b2b4783f97a8c51a712ff))
* fix invalid casing on nodejs-logger & etcd-client package names ([5487356](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5487356c5efb578c7a0d0f12babe2f47a1b586f4))
* fix system config method ([28f99d9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/28f99d91747dbddfba592f6aabdf030204d4572d))
* invalid casing for all sdk packages ([84dc2bb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/84dc2bb8d65fc326203abd6fcfb666642a186a43))
* resolve compiler errors ([c86f52c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c86f52c863c6a80a80f347586c4ae9bab03e4fd0))


### Features

* add analytics percentage to system config model ([6f1bf04](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/6f1bf040813860b4801ef2f93da37c2b4e27e273))
* add getOnNow to content service ([03333dc](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/03333dc32e260c45deb3d02ff89bfb213ce62d68))
* add optional query param to logout endpoint ([b679afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b679afd160ca1040f7623001ef89e54b368a06dc))
* add parental ratings ([2def472](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/2def472134e955fbc571679b43d116548a5440d0))
* add payment method types to product offering ([1858ba6](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/1858ba6ea3989bbc4b4aec02266be27039d73811))
* add property `channelFeatures` to asset model ([0cc5f55](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0cc5f55cb7bbb5244cb528fbd866585a5ec7957c))
* add recommendations for asset, next/prev episode ([#24](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/24)) ([bbfd58e](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bbfd58e643378f7a2650193bc01ad732874bb4b0))
* add SystemService, add playAsset call to entitlement service. ([#23](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/23)) ([4965bef](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/4965bef1461e6d172b230dea12a5dd32791f9394))
* enable optional enrichement of asset title ([3ca9b88](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/3ca9b8828005145767e288f81b60d42e21a86530))
* optional country code when fetching product offerings with coun… ([#21](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/21)) ([adf2cd9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/adf2cd9f307459dec8e5d64aeed42ae6370e528e))



## 0.0.29 (2020-10-13)


### Bug Fixes

* **payments:** add new param to purchase req. deprecate old one ([a9aeac7](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a9aeac77e391493fd67b7e7ec1b10859de5ccb45))



## 0.0.28 (2020-10-08)


### Bug Fixes

* make discount optional, in order to reflect backend ([0b463ff](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0b463ff64efe29ef2d9d16fd530477546e879d89))



## 0.0.27 (2020-10-07)


### Features

* **payments:** extend payment response model and purchase model ([02b6c0c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/02b6c0c99142dd94ea614b8deb90bebe90241bee))



## 0.0.26 (2020-10-07)


### Features

* add discount ([ccd8e12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ccd8e12a984120ce3a3aac12daf6434f1c4611c0))



## 0.0.25 (2020-10-05)


### Features

* **payments:** payment method methods ([#11](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/11)) ([d18de23](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d18de238db94d11077534c4c14a551fd70545d98))



## 0.0.24 (2020-10-05)



## 0.0.23 (2020-10-02)


### Features

* **asset:** add production countries to asset ([bd77fab](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bd77fab43ccca10714d8436f690d60e233051c00))



## 0.0.22 (2020-09-18)



## 0.0.21 (2020-09-18)



## 0.0.20 (2020-09-18)



## 0.0.19 (2020-09-17)



## 0.0.18 (2020-09-17)



## 0.0.17 (2020-09-16)



## 0.0.16 (2020-09-16)



## 0.0.15 (2020-09-11)



## 0.0.14 (2020-09-10)



## 0.0.13 (2020-09-04)



## 0.0.12 (2020-08-31)



## 0.0.11 (2020-08-28)



## 0.0.10 (2020-08-27)



## 0.0.9 (2020-08-27)



## 0.0.8 (2020-08-27)



## 0.0.7 (2020-08-26)



## 0.0.6 (2020-08-25)



## 0.0.5 (2020-08-25)



## 0.0.4 (2020-08-25)



## 0.0.3 (2020-08-21)



## 0.0.2 (2020-08-21)





# 0.7.0 (2021-02-16)


### Bug Fixes

* add vouchers paymenttype ([b129b31](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b129b31f256d62b1dfd2a4480a356ef4265018ed))
* channelFeatures being a two-dimensional array ([c8dd8df](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c8dd8dfaee7c418d7a8f69cd9a8f5a16530b5624))
* fix deserialization bug caused by previous commit ([65e28a5](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/65e28a54b69758ab528b2b4783f97a8c51a712ff))
* fix invalid casing on nodejs-logger & etcd-client package names ([5487356](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/5487356c5efb578c7a0d0f12babe2f47a1b586f4))
* fix system config method ([28f99d9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/28f99d91747dbddfba592f6aabdf030204d4572d))
* invalid casing for all sdk packages ([84dc2bb](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/84dc2bb8d65fc326203abd6fcfb666642a186a43))
* resolve compiler errors ([c86f52c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/c86f52c863c6a80a80f347586c4ae9bab03e4fd0))


### Features

* add analytics percentage to system config model ([6f1bf04](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/6f1bf040813860b4801ef2f93da37c2b4e27e273))
* add optional query param to logout endpoint ([b679afd](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/b679afd160ca1040f7623001ef89e54b368a06dc))
* add parental ratings ([2def472](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/2def472134e955fbc571679b43d116548a5440d0))
* add payment method types to product offering ([1858ba6](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/1858ba6ea3989bbc4b4aec02266be27039d73811))
* add property `channelFeatures` to asset model ([0cc5f55](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0cc5f55cb7bbb5244cb528fbd866585a5ec7957c))
* add recommendations for asset, next/prev episode ([#24](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/24)) ([bbfd58e](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bbfd58e643378f7a2650193bc01ad732874bb4b0))
* add SystemService, add playAsset call to entitlement service. ([#23](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/23)) ([4965bef](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/4965bef1461e6d172b230dea12a5dd32791f9394))
* enable optional enrichement of asset title ([3ca9b88](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/3ca9b8828005145767e288f81b60d42e21a86530))
* optional country code when fetching product offerings with coun… ([#21](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/21)) ([adf2cd9](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/adf2cd9f307459dec8e5d64aeed42ae6370e528e))



## 0.0.29 (2020-10-13)


### Bug Fixes

* **payments:** add new param to purchase req. deprecate old one ([a9aeac7](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/a9aeac77e391493fd67b7e7ec1b10859de5ccb45))



## 0.0.28 (2020-10-08)


### Bug Fixes

* make discount optional, in order to reflect backend ([0b463ff](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/0b463ff64efe29ef2d9d16fd530477546e879d89))



## 0.0.27 (2020-10-07)


### Features

* **payments:** extend payment response model and purchase model ([02b6c0c](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/02b6c0c99142dd94ea614b8deb90bebe90241bee))



## 0.0.26 (2020-10-07)


### Features

* add discount ([ccd8e12](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/ccd8e12a984120ce3a3aac12daf6434f1c4611c0))



## 0.0.25 (2020-10-05)


### Features

* **payments:** payment method methods ([#11](https://github.com/EricssonBroadcastServices/javascript-sdk/issues/11)) ([d18de23](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/d18de238db94d11077534c4c14a551fd70545d98))



## 0.0.24 (2020-10-05)



## 0.0.23 (2020-10-02)


### Features

* **asset:** add production countries to asset ([bd77fab](https://github.com/EricssonBroadcastServices/javascript-sdk/commit/bd77fab43ccca10714d8436f690d60e233051c00))



## 0.0.22 (2020-09-18)



## 0.0.21 (2020-09-18)



## 0.0.20 (2020-09-18)



## 0.0.19 (2020-09-17)



## 0.0.18 (2020-09-17)



## 0.0.17 (2020-09-16)



## 0.0.16 (2020-09-16)



## 0.0.15 (2020-09-11)



## 0.0.14 (2020-09-10)



## 0.0.13 (2020-09-04)



## 0.0.12 (2020-08-31)



## 0.0.11 (2020-08-28)



## 0.0.10 (2020-08-27)



## 0.0.9 (2020-08-27)



## 0.0.8 (2020-08-27)



## 0.0.7 (2020-08-26)



## 0.0.6 (2020-08-25)



## 0.0.5 (2020-08-25)



## 0.0.4 (2020-08-25)



## 0.0.3 (2020-08-21)



## 0.0.2 (2020-08-21)
