import AbstractModel from 'osmosys/models/abstract';
import DS from 'ember-data';

export default AbstractModel.extend({
  name: DS.attr('string'),
  discountAmount: DS.attr('number'),
  discountPercentage: DS.attr('number'),
  setFee: DS.attr('number'),

  validations: {
    name: {
      presence: true
    },
    discountAmount: {
      numericality: {
        allowBlank: true
      }
    },
    discountPercentage: {
      numericality: {
        allowBlank: true
      }
    },
    setFee: {
      numericality: {
        allowBlank: true
      }
    }
  }
});
