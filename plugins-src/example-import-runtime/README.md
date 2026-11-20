# Example: Import Runtime (Code)

Демонстрирует возможность `mouvi-engine`: **runtime importValidation** (`onImportValidate`, JS/QuickJS).

## Что проверяет
- Распознаёт схему `mouvi-runtime://...`
- Извлекает имя из `#fragment` и возвращает нормализованный результат импорта
- Ведёт счётчик в `ownStorage` (демо)

## Как проверить
Импортируйте текст: `mouvi-runtime://demo#My%20Server`
