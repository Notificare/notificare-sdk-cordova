// noinspection JSUnresolvedVariable

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  // Cordova is now initialized. Have fun!

  console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
  document.getElementById('deviceready').classList.add('ready');

  (async () => {
    console.log(`Is configured = ${await Notificare.isConfigured()}`);
    console.log(`Is ready = ${await Notificare.isReady()}`);

    await Notificare.launch();

    Notificare.onDeviceRegistered((device) => {
      console.log(`---> Device registered: ${JSON.stringify(device)}`);
    });

    Notificare.onReady(async (application) => {
      console.log('=======================');
      console.log('= NOTIFICARE IS READY =');
      console.log('=======================');
      console.log(JSON.stringify(application));

      // Stop listening to device_registered events.
      // sub.remove();

      await Notificare.events().logCustom('CUSTOM_EVENT');
      await Notificare.events().logCustom('CUSTOM_EVENT', {
        color: 'blue',
        lovesNotificare: true,
        nested: {
          works: true,
          list: ['a', 'b', 'c'],
        },
      });

      setTimeout(async function register() {
        await Notificare.device().register(null, null);
      }, 2000);

      setTimeout(async function registerAnonymous() {
        await Notificare.device().register('helder@notifica.re', 'Helder Pinhal');
      }, 5000);

      console.log(`---> Tags = ${JSON.stringify(await Notificare.device().fetchTags())}`);
      await Notificare.device().addTags(['cordova', 'hpinhal']);
      console.log(`---> Tags = ${JSON.stringify(await Notificare.device().fetchTags())}`);
      await Notificare.device().removeTag('hpinhal');
      console.log(`---> Tags = ${JSON.stringify(await Notificare.device().fetchTags())}`);
      await Notificare.device().clearTags();
      console.log(`---> Tags = ${JSON.stringify(await Notificare.device().fetchTags())}`);

      console.log(`---> Language = ${JSON.stringify(await Notificare.device().getPreferredLanguage())}`);
      await Notificare.device().updatePreferredLanguage('nl-NL');
      console.log(`---> Language = ${JSON.stringify(await Notificare.device().getPreferredLanguage())}`);
      await Notificare.device().updatePreferredLanguage(null);
      console.log(`---> Language = ${JSON.stringify(await Notificare.device().getPreferredLanguage())}`);

      console.log(`---> DnD = ${JSON.stringify(await Notificare.device().fetchDoNotDisturb())}`);
      await Notificare.device().updateDoNotDisturb({ start: '23:00', end: '08:00' });
      console.log(`---> DnD = ${JSON.stringify(await Notificare.device().fetchDoNotDisturb())}`);
      await Notificare.device().clearDoNotDisturb();
      console.log(`---> DnD = ${JSON.stringify(await Notificare.device().fetchDoNotDisturb())}`);

      console.log(`---> User data = ${JSON.stringify(await Notificare.device().fetchUserData())}`);
      await Notificare.device().updateUserData({ firstName: 'Helder', lastName: 'Pinhal' });
      console.log(`---> User data = ${JSON.stringify(await Notificare.device().fetchUserData())}`);
      await Notificare.device().updateUserData({});
      console.log(`---> User data = ${JSON.stringify(await Notificare.device().fetchUserData())}`);

      //
      // Push
      //

      console.log(`---> Remote notifications enabled = ${await NotificarePush.hasRemoteNotificationsEnabled()}`);
      await NotificarePush.enableRemoteNotifications();
      console.log(`---> Remote notifications enabled = ${await NotificarePush.hasRemoteNotificationsEnabled()}`);

      await NotificarePush.setPresentationOptions(['alert', 'sound', 'badge']);

      //
      // Inbox
      //

      console.log(`---> Badge = ${await NotificareInbox.getBadge()}`);
      console.log(`---> Items = ${(await NotificareInbox.getItems()).length}`);
    });

    NotificarePush.onNotificationReceived((notification) => {
      console.log(`---> Received notification = ${JSON.stringify(notification)}`);
    });

    NotificarePush.onNotificationOpened(async (notification) => {
      console.log(`---> Opened notification = ${JSON.stringify(notification)}`);

      await NotificarePushUI.presentNotification(notification);
    });

    NotificareInbox.onBadgeUpdated((badge) => {
      console.log(`---> Badge updated = ${badge}`);
    });

    NotificareInbox.onInboxUpdated((items) => {
      console.log(`---> Inbox updated = ${JSON.stringify(items)}`);
    });

    NotificarePushUI.onNotificationWillPresent((notification) => {
      console.log('=== NOTIFICATION WILL PRESENT ===');
      console.log(JSON.stringify(notification));
    });

    NotificarePushUI.onNotificationPresented((notification) => {
      console.log('=== NOTIFICATION PRESENTED ===');
      console.log(JSON.stringify(notification));
    });

    NotificarePushUI.onNotificationFinishedPresenting((notification) => {
      console.log('=== NOTIFICATION FINISHED PRESENTING ===');
      console.log(JSON.stringify(notification));
    });

    NotificarePushUI.onNotificationFailedToPresent((notification) => {
      console.log('=== NOTIFICATION FAILED TO PRESENT ===');
      console.log(JSON.stringify(notification));
    });

    NotificarePushUI.onNotificationUrlClicked((data) => {
      console.log('=== NOTIFICATION URL CLICKED ===');
      console.log(JSON.stringify(data));
    });

    NotificarePushUI.onActionWillExecute((data) => {
      console.log('=== ACTION WILL EXECUTE ===');
      console.log(JSON.stringify(data));
    });

    NotificarePushUI.onActionExecuted((data) => {
      console.log('=== ACTION EXECUTED ===');
      console.log(JSON.stringify(data));
    });

    NotificarePushUI.onActionNotExecuted((data) => {
      console.log('=== ACTION NOT EXECUTED ===');
      console.log(JSON.stringify(data));
    });

    NotificarePushUI.onActionFailedToExecute((data) => {
      console.log('=== ACTION FAILED TO EXECUTE ===');
      console.log(JSON.stringify(data));
    });

    NotificarePushUI.onCustomActionReceived((data) => {
      console.log('=== CUSTOM ACTION RECEIVED ===');
      console.log(JSON.stringify(data));
    });
  })();
}
