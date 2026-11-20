function ensure(host) {
  if (!host.storage) host.storage = {};
  if (!Array.isArray(host.storage.events)) host.storage.events = [];
  return host.storage;
}

function items(host) {
  var s = ensure(host);
  var list = s.events.slice().reverse().slice(0, 8);
  var out = [
    { type: 'text', style: 'title', text: 'Connection Events' },
    { type: 'text', text: 'Слушает события: beforeConnect, afterConnect, disconnect, connectError, networkChange.' },
    { type: 'keyValue', key: 'Всего событий', value: String(s.events.length) }
  ];
  var conn = host && host.state && host.state.status ? String(host.state.status) : 'unknown';
  out.push({ type: 'keyValue', key: 'Текущий статус', value: conn });
  out.push({ type: 'divider' });
  if (!list.length) {
    out.push({ type: 'text', style: 'caption', text: 'Событий пока нет. Выполните подключение/отключение.' });
  } else {
    out.push({ type: 'text', style: 'caption', text: 'Последние события:' });
    for (var i = 0; i < list.length; i++) {
      var e = list[i] || {};
      out.push({ type: 'keyValue', key: String(e.event || 'event'), value: String(e.at || '') });
    }
  }
  out.push({ type: 'divider' });
  out.push({ type: 'button', label: 'Обновить', action: 'refresh', primary: true });
  out.push({ type: 'button', label: 'Очистить историю', action: 'clear' });
  return out;
}

globalThis.MouviPlugin = {
  hooks: {
    onConnectionEvent: function (payload, host) {
      var s = ensure(host);
      s.events.push({
        event: payload && payload.event,
        at: new Date().toISOString(),
        data: payload && payload.data
      });
      if (s.events.length > 50) s.events = s.events.slice(s.events.length - 50);
      return { ok: true };
    },
    getUiExtensions: function (payload, host) {
      return [{ id: 'events', title: 'Connection Events', items: items(host) }];
    },
    onUiAction: function (payload, host) {
      var action = payload && payload.action;
      if (action === 'clear') {
        ensure(host).events = [];
        return { message: 'История очищена', items: items(host) };
      }
      return { items: items(host) };
    }
  }
};
