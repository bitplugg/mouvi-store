// Mouvi example runtime plugin (QuickJS, synchronous hooks).
// Demonstrates: code-based import validation, connection events, UI extension, engine adapter stub.

function now() { return Date.now ? Date.now() : 0; }

function ensureState(host) {
  if (!host.storage) host.storage = {};
  if (!Array.isArray(host.storage.events)) host.storage.events = [];
  if (typeof host.storage.imports !== 'number') host.storage.imports = 0;
  return host.storage;
}

function uiItems(host) {
  var s = ensureState(host);
  var last = s.events.length ? s.events[s.events.length - 1] : null;
  var lastText = last ? (String(last.event) + ' ' + JSON.stringify(last.data || {})) : 'нет событий';
  if (lastText.length > 120) lastText = lastText.slice(0, 117) + '...';
  return [
    { type: 'text', style: 'title', text: 'Hello Import (runtime)' },
    { type: 'text', text: 'Эталонный плагин: код, UI, события и engine-адаптер.' },
    { type: 'keyValue', key: 'Импортов (runtime)', value: String(s.imports) },
    { type: 'keyValue', key: 'Последнее событие', value: lastText },
    { type: 'divider' },
    { type: 'button', label: 'Ping runtime', action: 'ping', primary: true },
    { type: 'button', label: 'Очистить историю', action: 'clear' },
    { type: 'text', style: 'caption', text: 'Тест импорта: mouvi-example://demo#Example или [MouviExample]' }
  ];
}

globalThis.MouviPlugin = {
  hooks: {
    onImportValidate: function (payload, host) {
      var content = String((payload && payload.content) || '');
      var trimmed = content.trim();
      var lower = trimmed.toLowerCase();
      var isExample = lower.indexOf('mouvi-example://') === 0 || lower.indexOf('[mouviexample]') >= 0;
      if (!isExample) return null;

      var s = ensureState(host);
      s.imports += 1;

      // Демо code-based импорта: распознаём и нормализуем имя.
      var name = 'Mouvi Example';
      var hash = trimmed.indexOf('#');
      if (hash >= 0 && hash + 1 < trimmed.length) {
        try { name = decodeURIComponent(trimmed.slice(hash + 1)) || name; } catch (e) { name = trimmed.slice(hash + 1) || name; }
      }

      // Можно также вернуть protocol/content для трансформации в нативный движок.
      return {
        match: true,
        label: 'Mouvi Example (runtime)',
        name: name,
        metadata: { recognizedBy: 'runtime', at: now() }
      };
    },

    onConnectionEvent: function (payload, host) {
      var s = ensureState(host);
      s.events.push({ t: now(), event: payload && payload.event, data: payload && payload.data });
      if (s.events.length > 30) s.events = s.events.slice(s.events.length - 30);
      return { ok: true };
    },

    getUiExtensions: function (payload, host) {
      return [{ id: 'main', title: 'Hello Import', items: uiItems(host) }];
    },

    onUiAction: function (payload, host) {
      var action = payload && payload.action;
      if (action === 'ping') {
        return { message: 'pong (runtime ok)', items: uiItems(host) };
      }
      if (action === 'clear') {
        var s = ensureState(host);
        s.events = [];
        s.imports = 0;
        return { message: 'История очищена', items: uiItems(host) };
      }
      return { message: 'Неизвестное действие: ' + String(action), items: uiItems(host) };
    },

    // Engine adapter hook: мост для неподдерживаемых протоколов к нативным движкам.
    // Демо-заглушка: не перехватывает подключения. Реальный плагин может вернуть:
    // { handled: true, protocol: 'wireguard'|'amneziawg'|'vless', content: '<валидный конфиг>' }
    prepareEngineConnection: function (payload, host) {
      return { handled: false, reason: 'demo-noop' };
    },

    handleUri: function (payload, host) {
      var uri = String((payload && payload.uri) || '');
      if (uri.toLowerCase().indexOf('mouvi-example://') === 0) {
        return { handled: true, action: 'importHint', uri: uri };
      }
      return { handled: false };
    }
  }
};
