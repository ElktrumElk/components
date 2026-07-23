import type { Plugin } from 'vite';

const COMPONENTS = [
  'Page', 'Header', 'Text', 'Container', 'Stack', 'Center', 'Divider',
  'Panel', 'Span', 'ScrollView', 'Section', 'Article', 'Navigator',
  'Button', 'IconButton', 'TextButton',
  'Card', 'Badge', 'Avatar', 'Image', 'Input', 'Tiles',
  'List', 'ListView', 'ListMenu',
  'BottomModal', 'SidePanel', 'Reabon',
  'Tab', 'TabView', 'Icon', 'IconNetwork', 'PageScrollView',
];

const HOOKS = [
  'createStore', 'useStore', 'useSetState',
  'useState', 'useStateLazy',
  'useRef', 'usePreviousValue',
  'useInstance', 'useComponentData',
  'useEffect', 'useMountEffect', 'useUpdateEffect',
  'useCallback', 'useMemo', 'useMemoOnce', 'useStableCallback',
];

function findUsed(source: string, names: string[]): string[] {
  const used: string[] = [];
  for (const name of names) {
    const regex = new RegExp(`\\b${name}\\b`, 'g');
    if (regex.test(source) && !source.includes(`import.*${name}`)) {
      used.push(name);
    }
  }
  return used;
}

interface AutoImportOptions {
  componentsFrom?: string;
  hooksFrom?: string;
}

export function componentAutoImport(options: AutoImportOptions = {}): Plugin {
  const compSource = options.componentsFrom ?? 'components';
  const hooksSource = options.hooksFrom ?? 'components/hooks';

  return {
    name: 'component-auto-import',
    enforce: 'pre',
    transform(code: string, id: string) {
      if (!id.endsWith('.tsx') && !id.endsWith('.jsx')) return null;
      if (id.includes('node_modules')) return null;

      const usedComponents = findUsed(code, COMPONENTS);
      const usedHooks = findUsed(code, HOOKS);

      if (usedComponents.length === 0 && usedHooks.length === 0) return null;

      const imports: string[] = [];

      if (usedComponents.length > 0) {
        imports.push(`import { ${usedComponents.join(', ')} } from '${compSource}';`);
      }
      if (usedHooks.length > 0) {
        imports.push(`import { ${usedHooks.join(', ')} } from '${hooksSource}';`);
      }

      return {
        code: imports.join('\n') + '\n' + code,
        map: null,
      };
    },
  };
}
