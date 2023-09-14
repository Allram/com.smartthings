'use strict';

const SmartThingsDevice = require('../../lib/SmartThingsDevice');

module.exports = class SmartThingsDeviceOven extends SmartThingsDevice {

  static CAPABILITIES = [
    {
      homeyCapabilityId: 'samsung_oven_progress_remaining_time',
      smartThingsComponentId: 'main',
      smartThingsCapabilityId: 'samsungce.ovenOperatingState',
      smartThingsAttributeId: 'remainingTimeStr',
      async onReport({ value }) {
        return value;
      },
    },
    {
      homeyCapabilityId: 'samsung_oven_status_job',
      smartThingsComponentId: 'main',
      smartThingsCapabilityId: 'samsungce.ovenOperatingState',
      smartThingsAttributeId: 'ovenJobState',
      async onReport({ value }) {
        if (value === 'finished') {
          this.homey.flow
            .getDeviceTriggerCard('samsung_oven_job_finished')
            .trigger(this)
            .catch(this.error);
        }

        return value;
      },
    },
  ];

};
