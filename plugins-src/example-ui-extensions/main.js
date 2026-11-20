function ensure(host) {
  if (!host.storage) host.storage = {};
  if (typeof host.storage.clicks !== 'number') host.storage.clicks = 0;
  if (typeof host.storage.note !== 'string') host.storage.note = 'готово';
  return host.storage;
}

function items(host) {
  var s = ensure(host);
  return [
    { type: 'text', style: 'title', text: 'UI Extensions Demo' },
    { type: 'text', text: 'Пример декларативного UI плагина и действий.' },
    { type: 'keyValue', key: 'Нажатий', value: String(s.clicks) },
    { type: 'keyValue', key: 'Состояние', value: String(s.note) },
    { type: 'divider' },
    { type: 'button', label: '+1', action: 'inc', primary: true },
    { type: 'button', label: 'Сбросить', action: 'reset' },
    { type: 'button', label: 'Ping', action: 'ping' },
    { type: 'text', style: 'caption', text: 'Данные хранятся в ownStorage плагина.' }
  ];
}

globalThis.MouviPlugin = {
  hooks: {
    getUiExtensions: function (payload, host) {
      return [{ id: 'main', title: 'UI Extensions', items: items(host) }];
    },
    onUiAction: function (payload, host) {
      var action = payload && payload.action;
      var s = ensure(host);
      if (action === 'inc') {
        s.clicks += 1;
        s.note = 'увеличено';
        return { items: items(host) };
      }
      if (action === 'reset') {
        s.clicks = 0;
        s.note = 'сброшено';
        return { message: 'Счётчик сброшен', items: items(host) };
      }
      if (action === 'ping') {
        s.note = 'pong @ ' + new Date().toISOString();
        return { message: 'pong', items: items(host) };
      }
      return { message: 'Неизвестное действие: ' + String(action), items: items(host) };
    }
  }
};
