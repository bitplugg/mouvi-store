// Example: runtime importValidation (onImportValidate)
globalThis.MouviPlugin = {
  hooks: {
    onImportValidate: function (payload, host) {
      var content = String((payload && payload.content) || '').trim();
      var lower = content.toLowerCase();
      if (lower.indexOf('mouvi-runtime://') !== 0) return null;

      var name = 'Runtime Example';
      var hash = content.indexOf('#');
      if (hash >= 0 && hash + 1 < content.length) {
        try { name = decodeURIComponent(content.slice(hash + 1)) || name; }
        catch (e) { name = content.slice(hash + 1) || name; }
      }

      // Пример хранения счётчика в ownStorage (если разрешено)
      try {
        if (!host.storage) host.storage = {};
        host.storage.importCount = (Number(host.storage.importCount) || 0) + 1;
      } catch (e) {}

      return {
        match: true,
        label: 'Mouvi Runtime Import',
        name: name,
        metadata: { recognizedBy: 'runtime', plugin: 'example-import-runtime' }
      };
    }
  }
};
