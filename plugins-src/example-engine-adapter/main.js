function demoWireGuardConfig() {
  // Демо-конфиг: синтаксически валиден для парсера/адаптера, но использует демонстрационные ключи/endpoint.
  // Для реального подключения требуется настоящий сервер и ключи.
  return [
    '[Interface]',
    'PrivateKey = YJ3b2np9rJ3Vwz2t5m0l2aS0pC8vVf8kP1o2n3m4l5U=',
    'Address = 10.8.0.2/32',
    'DNS = 1.1.1.1',
    '',
    '[Peer]',
    'PublicKey = h1s8oC2b0Q7cZl2pN1xYk8vL5mN3pQ4rS6tU7vW8xYz=',
    'AllowedIPs = 0.0.0.0/0, ::/0',
    'Endpoint = 203.0.113.10:51820',
    'PersistentKeepalive = 25',
    ''
  ].join('\n');
}

function items() {
  return [
    { type: 'text', style: 'title', text: 'Engine Adapter Demo' },
    { type: 'text', text: 'Хук engineProvider (prepareEngineConnection) преобразует неподдерживаемый формат в конфиг нативного движка.' },
    { type: 'keyValue', key: 'Демо-вход', value: 'mouvi-adapter://demo' },
    { type: 'keyValue', key: 'Целевой движок', value: 'wireguard (нативный)' },
    { type: 'divider' },
    { type: 'text', style: 'caption', text: 'Примечание: используется демонстрационный WireGuard-конфиг (без реального сервера).' }
  ];
}

globalThis.MouviPlugin = {
  hooks: {
    prepareEngineConnection: function (payload, host) {
      var protocol = String((payload && payload.protocol) || '').toLowerCase();
      var content = String((payload && payload.content) || '').trim();
      var lower = content.toLowerCase();

      // Пример 1: кастомная схема в content
      if (lower.indexOf('mouvi-adapter://') === 0) {
        return {
          handled: true,
          protocol: 'wireguard',
          content: demoWireGuardConfig(),
          name: 'Mouvi Adapter Demo (WireGuard)'
        };
      }

      // Пример 2: если приложение передало неизвестный протокол с нашей меткой
      if (protocol === 'unknown' && lower.indexOf('[mouviadapterdemo]') >= 0) {
        return {
          handled: true,
          protocol: 'wireguard',
          content: demoWireGuardConfig(),
          name: String((payload && payload.name) || 'Mouvi Adapter Demo')
        };
      }

      return { handled: false };
    },
    getUiExtensions: function () {
      return [{ id: 'main', title: 'Engine Adapter', items: items() }];
    },
    onUiAction: function () {
      return { items: items() };
    }
  }
};
