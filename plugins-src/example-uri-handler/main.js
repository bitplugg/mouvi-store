function ensure(host) {
  if (!host.storage) host.storage = {};
  if (typeof host.storage.lastUri !== 'string') host.storage.lastUri = '';
  if (typeof host.storage.handledCount !== 'number') host.storage.handledCount = 0;
  return host.storage;
}

function items(host) {
  var s = ensure(host);
  return [
    { type: 'text', style: 'title', text: 'URI Handler Demo' },
    { type: 'text', text: 'Обрабатывает URI-схему mouvi-uri-example:// через хук handleUri.' },
    { type: 'keyValue', key: 'Обработано URI', value: String(s.handledCount) },
    { type: 'keyValue', key: 'Последний URI', value: s.lastUri || '—' },
    { type: 'divider' },
    { type: 'button', label: 'Обновить', action: 'refresh', primary: true },
    { type: 'button', label: 'Очистить', action: 'clear' },
    { type: 'text', style: 'caption', text: 'Интеграция вызова handleUri зависит от сценария/версии приложения.' }
  ];
}

globalThis.MouviPlugin = {
  hooks: {
    handleUri: function (payload, host) {
      var uri = String((payload && payload.uri) || '');
      if (uri.toLowerCase().indexOf('mouvi-uri-example://') !== 0) {
        return { handled: false };
      }
      var s = ensure(host);
      s.lastUri = uri;
      s.handledCount += 1;
      return { handled: true, action: 'demo', uri: uri, message: 'URI обработан example-uri-handler' };
    },
    getUiExtensions: function (payload, host) {
      return [{ id: 'main', title: 'URI Handler', items: items(host) }];
    },
    onUiAction: function (payload, host) {
      var action = payload && payload.action;
      if (action === 'clear') {
        var s = ensure(host);
        s.lastUri = '';
        s.handledCount = 0;
        return { message: 'Очищено', items: items(host) };
      }
      return { items: items(host) };
    }
  }
};
