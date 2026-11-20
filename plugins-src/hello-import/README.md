# Hello Import (Example plugin)

Эталонный runtime-плагин Mouvi (`.mu`): демонстрирует **код** (JavaScript/QuickJS), **UI-расширение**, **события соединения** и **engine-адаптер** (хук `prepareEngineConnection`).

## Что делает
- `importValidation` (runtime + декларативные правила): распознаёт `mouvi-example://...` и `[MouviExample]`, ведёт счётчик импортов в `ownStorage`.
- `connectionEvents`: записывает последние события (`beforeConnect`, `afterConnect`, `disconnect`, `connectError`, `networkChange`).
- `uiExtensions`: показывает экран в **Настройки → Плагины** (статус, последнее событие, кнопки `Ping`/`Очистить`).
- `engineProvider`: пример `prepareEngineConnection` (адаптер/мост к нативным движкам `wireguard|amneziawg|vless`) — в демо заглушка (`handled:false`).
- `uriHandlers`: пример обработки `mouvi-example://` URI.

## Сборка
Из корня репозитория Mouvi:
```bash
./mouvi-builder validate examples/plugins/hello-import
./mouvi-builder build examples/plugins/hello-import -o examples/plugins/hello-import.mu
```

## Установка
**Настройки → Плагины → (＋) → Установить из файла** → выбрать `hello-import.mu`.
Плагин не из официального магазина, при активации нужно подтвердить: **«Я согласен со всеми рисками»**.
Базовый `mouvi-engine` должен быть включён.

## Тест
- Импорт конфига: `mouvi-example://demo#Example` или `[MouviExample]\nname=demo`
- UI/события: откройте карточку расширения плагина в экране «Плагины» и выполните подключение/отключение, чтобы увидеть события.
