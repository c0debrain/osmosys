/* jshint ignore:start */
import createPouchViews from 'osmosys/utils/pouch-views';
import Ember from 'ember';
import PouchDB from 'pouchdb';
import PouchAdapterMemory from 'npm:pouchdb-adapter-memory';
import PouchDBUsers from 'npm:pouchdb-users';
import DatabaseService from 'osmosys/services/database';
import ConfigService from 'osmosys/services/config';
import PouchDBWorker from 'npm:worker-pouch/client';

const {
  get,
  set
} = Ember;

function cleanupDatabases(maindb, dbs) {
  return wait().then(function() {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (maindb.changesListener) {
        maindb.changesListener.cancel();
        maindb.changesListener.on('complete', function() {
          destroyDatabases(dbs).then(resolve, reject);
        });
      } else {
        destroyDatabases(dbs).then(resolve, reject);
      }
    });
  });
}

function destroyDatabases(dbs) {
  let destroyQueue = [];
  dbs.forEach((db) => {
    destroyQueue.push(db.info().then(function() {
      return db.destroy();
    }));
  });
  return Ember.RSVP.all(destroyQueue);
}

function runWithPouchDumpAsyncHelper(app, dumpName, functionToRun) {
  PouchDB.plugin(PouchAdapterMemory);
  PouchDB.plugin(PouchDBUsers);

  let db = new PouchDB('hospitalrun-test-database', {
    adapter: 'memory'
  });
  let configDB = new PouchDB('hospitalrun-test-config-database', {
    adapter: 'memory'
  });
  let usersDB;
  if (window.ELECTRON) {
    usersDB = new PouchDB('_users', {
      adapter: 'memory'
    });
  }
  let dump = require(`osmosys/tests/fixtures/${dumpName}`).default;
  let promise = db.load(dump);

  let InMemoryDatabaseService = DatabaseService.extend({

    createDB(configs) {
      let standAlone = get(this, 'standAlone');
      if (standAlone || !configs.config_external_search) {
        set(this, 'usePouchFind', true);
      }
      if (standAlone) {
        return promise.then(() => db);
      }
      if (!window.ELECTRON && navigator.serviceWorker) {
        // Use pouch-worker to run the DB in the service worker
        return navigator.serviceWorker.ready.then(() => {
          if (navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage) {
            PouchDB.adapter('worker', PouchDBWorker);
            db = new PouchDB('hospitalrun-test-database', {
              adapter: 'worker',
              worker: () => navigator.serviceWorker
            });
            return  db.load(dump).then(() => {
              return db;
            });
          } else {
            return promise.then(() => db);
          }
        });
      } else {
        return promise.then(() => db);
      }
    },
    createUsersDB() {
      return usersDB.installUsersBehavior().then(() => {
        set(this, 'usersDB', usersDB);
        return usersDB.put({
          _id: 'org.couchdb.user:hradmin',
          displayName: 'OsmoSys Administrator',
          email: 'hradmin@hospitalrun.io',
          type: 'user',
          name: 'hradmin',
          password: 'test',
          roles: ['System Administrator', 'admin', 'user'],
          userPrefix: 'p1'
        });
      }).catch((err) => {
        console.log('Error creating users db!!!', err);
      });
    }
  });

  let InMemoryConfigService = ConfigService.extend({
    createDB() {
      return configDB;
    },
    replicateConfigDB() {
      return configDB.get('config_disable_offline_sync').then(function(doc) {
        if (doc.value !== true) {
          doc.value = true;
          return configDB.put(doc);
        }
      }).catch(function() {
        return configDB.put({
          _id: 'config_disable_offline_sync',
          value: true
        });
      });
    }
  });

  app.__deprecatedInstance__.register('service:config', InMemoryConfigService);
  app.__deprecatedInstance__.register('service:database', InMemoryDatabaseService);

  return new Ember.RSVP.Promise(function(resolve) {
    promise.then(function() {
      db.setMaxListeners(35);
      createPouchViews(db, true, dumpName).then(function() {
        functionToRun();
        andThen(function() {
          let databasesToClean = [
            configDB,
            db
          ];
          if (window.ELECTRON) {
            databasesToClean.push(usersDB);
          }
          cleanupDatabases(db, databasesToClean).then(function() {
            configDB = null;
            db = null;
            if (window.ELECTRON) {
              usersDB = null;
            }
            resolve();
          }, function(err) {
            console.log('error cleaning up dbs:', err);
          });
        });
      });
    }, function(err) {
      console.log('error loading db', JSON.stringify(err, null, 2));
    });
  });
}

Ember.Test.registerAsyncHelper('runWithPouchDump', runWithPouchDumpAsyncHelper);
/* jshint ignore:end */
