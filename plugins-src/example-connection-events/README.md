# Example: Connection Events

Демонстрирует возможность `mouvi-engine`: **connectionEvents** (`onConnectionEvent`).

## Возможности
- Получает события: `beforeConnect`, `afterConnect`, `disconnect`, `connectError`, `networkChange`
- Сохраняет историю в `ownStorage`
- Показывает историю и текущий статус соединения через `uiExtensions` (читает `host.state`)

## Как проверить
Установите плагин, откройте его UI-расширение в «Плагины» и выполните подключение/отключение VPN.
