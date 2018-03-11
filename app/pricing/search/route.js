import AbstractSearchRoute from 'osmosys/routes/abstract-search-route';
export default AbstractSearchRoute.extend({
  moduleName: 'pricing',
  searchKeys: [{
    name: 'name',
    type: 'fuzzy'
  }],
  searchModel: 'pricing'
});
