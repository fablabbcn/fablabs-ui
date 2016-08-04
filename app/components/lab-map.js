import Ember from 'ember';

export default Ember.Component.extend({

  setup: Ember.on('didInsertElement', function() {
    Ember.run.scheduleOnce('afterRender', this, function() {
      let location = this.get('location');

      L.mapbox.accessToken = 'pk.eyJ1IjoidG9tYXNkaWV6IiwiYSI6ImRTd01HSGsifQ.loQdtLNQ8GJkJl2LUzzxVg';
      let map = L.mapbox.map('map', 'mapbox.light').setView([location.latitude, location.longitude], 15);

      // Setters
      if (this.get('center')) {
        map.setView(this.get('center'), this.get('zoom'));
      }

      map.addLayer(L.marker([location.latitude, location.longitude])).invalidateSize()

      // Set
      this.set('map', map);
    });
})
});
