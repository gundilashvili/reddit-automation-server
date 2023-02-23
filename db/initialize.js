const WarmUpSetting = require('./models/warm_up_setting');
const TaskSetting = require('./models/task_setting');
const defaults = require('./default');

module.exports = initialize = async () => {
  try {
    const warmupSettings = await WarmUpSetting.find();
    const taskSettings = await TaskSetting.find();

    // Create a default warmup settings
    if (!warmupSettings.length) {
       await new WarmUpSetting(defaults.warmup_setting).save().then((data) => {
        console.log(`DEFAULT - warm-up settings created \n ${data}`);
      });
    }

    // Create a default task settings
    if (!taskSettings.length) {
      await new TaskSetting(defaults.task_setting).save().then((data) => {
        console.log(`DEFAULT - task settings created \n ${data}`);
      });
    }
  } catch (e) {
    console.log(e);
  }
};
