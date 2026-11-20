# Mouvi Plugin Store

Официальный каталог `.mu`-плагинов для [Mouvi](https://github.com/bitplugg/mouvi).

- `index.json` — индекс каталога, который читает приложение (**Настройки → Плагины → Открыть каталог магазина**).
- Плагины из этого репозитория считаются официальным источником (`bitplugg/mouvi-store`).
- `.mu` — ZIP-архив с `manifest.json` (и опционально runtime-кодом/ресурсами). Спецификация: [`HOW_WRITE_PLUGIN.md`](https://github.com/bitplugg/mouvi/blob/main/HOW_WRITE_PLUGIN.md).

## Example-плагины по возможностям `mouvi-engine`

Базовый системный плагин `mouvi-engine` гейтит/поддерживает следующие возможности. Для каждой добавлен отдельный пример:

| Возможность / хук | Плагин | Файл | Что демонстрирует |
|---|---|---|---|
| `importValidation` (декларативно) | `com.mouvi.examples.import-rules` | `example-import-rules.mu` | Распознавание конфигов через `importRules` без runtime-кода (`mouvi-rules://`, `[MouviRulesExample]`). |
| `importValidation` (runtime) | `com.mouvi.examples.import-runtime` | `example-import-runtime.mu` | `onImportValidate` (JS/QuickJS): кодовый парсинг/нормализация, `ownStorage`. |
| `connectionEvents` | `com.mouvi.examples.connection-events` | `example-connection-events.mu` | События `beforeConnect/afterConnect/disconnect/connectError/networkChange`, история и показ состояния/статистики в UI. |
| `uiExtensions` | `com.mouvi.examples.ui-extensions` | `example-ui-extensions.mu` | `getUiExtensions` / `onUiAction`, декларативные элементы UI, действия, `ownStorage`. |
| `uriHandlers` | `com.mouvi.examples.uri-handler` | `example-uri-handler.mu` | `handleUri` для кастомной схемы `mouvi-uri-example://`, сохранение и отображение результата. |
| `engineProvider` (адаптер) | `com.mouvi.examples.engine-adapter` | `example-engine-adapter.mu` | `prepareEngineConnection`: адаптация кастомного формата в конфиг нативно поддерживаемого движка (демо → WireGuard). Не загружает произвольный нативный/TUN-движок из `.mu`. |
| Комбинированный пример | `com.example.hello-import` | `hello-import.mu` | Runtime-плагин, объединяющий import/events/UI/URI/engine-adapter. |

Исходники примеров лежат в `plugins-src/` (манифесты, `main.js`, README).

## Установка
Mouvi → **Настройки → Плагины → Открыть каталог магазина** → выбрать плагин.  
(Также можно установить `.mu` по URL/файлу. Для неофициальных источников требуется подтверждение рисков.)
