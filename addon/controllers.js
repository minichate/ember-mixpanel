import Ember from 'ember';
import Mixpanel from 'ember-cli-mixpanel/mixpanel';

export default Ember.ObjectProxy.extend(Mixpanel, {
});
