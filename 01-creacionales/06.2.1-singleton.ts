/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

import { configManager } from "./Singleton/config-manager.ts";


configManager.setConfig('apiURL','htpp:/localhost:300/api');
configManager.setConfig('timeOut', '5000');
configManager.setConfig('apiKey', 'ABC123');


console.log(configManager.getConfig('apiURL'));
console.log(configManager.getConfig('timeOut'));
console.log(configManager.getConfig('apiKey'));