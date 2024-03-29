/**
 * @author Hervé Guétin <www.linkedin.com/in/herveguetin>
 */
import Event from './../event';
import Module from './../module';
import Translation from './../string/translation';
import { Alpine } from 'alpinejs';
import Precognition, { client } from 'laravel-precognition-alpine';

// For Magento to parse JSON payload to the request params. Otherwide $request->getParams() is empty.
client.axios().defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

let config = {};

const listen = function () {
  Event.listen('zermatt:kickoff', () => Translation.init());
  Event.listen('zermatt:translation:init', () => Module.init(config));
  Event.waitFor(['zermatt:translation:init', 'zermatt:module:init'], () => {
    Event.dispatch('zermatt:init');
    Alpine.start();
  });
};

const init = function (Config) {
  config = Config;
  // eslint-disable-next-line no-undef
  window.Alpine = Alpine;
  Alpine.plugin(Precognition);
  listen();
  Event.dispatch('zermatt:kickoff');
};

export default init;
