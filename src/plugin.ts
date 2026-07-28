import type { Plugin } from 'vite';

const COMPONENTS = [
  'Page', 'Header', 'Text', 'Container', 'Stack', 'Center', 'Divider',
  'Panel', 'Span', 'ScrollView', 'Section', 'Article', 'Navigator',
  'Button', 'IconButton', 'TextButton',
  'Card', 'Badge', 'Avatar', 'Image', 'Input', 'Tiles',
  'List', 'ListView', 'ListMenu',
  'BottomModal', 'SidePanel', 'Reabon',
  'Tab', 'TabView', 'Icon', 'IconNetwork', 'PageScrollView', 'Icons',
  'Gap', 'Example', 'Padding', 'GridView', 'Hover', 'Main'
];

const HOOKS = [
  'createStore', 'useStore', 'useSetState',
  'useState', 'useStateLazy',
  'useRef', 'usePreviousValue',
  'useInstance', 'useComponentData',
  'useEffect', 'useMountEffect', 'useUpdateEffect',
  'useCallback', 'useMemo', 'useMemoOnce', 'useStableCallback', 
];

// Robust checker that looks up both casing variants and validates existing imports safely
function findUsed(source: string, names: string[], checkKebabCase = false): string[] {
  const used: string[] = [];
  
  for (const name of names) {
    // 1. Create a bulletproof RegExp to detect if the item is already explicitly imported
    const importRegex = new RegExp(`import\\s+.*?\\b${name}\\b.*?\\s+from`, 's');
    if (importRegex.test(source)) continue; // Skip if already present in file

    // 2. Scan for either PascalCase (Stack) or lowercase/kebab-case tag match (stack / side-panel)
    const pascalRegex = new RegExp(`\\b${name}\\b`);
    let isUsed = pascalRegex.test(source);

    if (!isUsed && checkKebabCase) {
      // Convert 'SidePanel' -> 'side-panel' or 'Stack' -> 'stack'
      const kebabName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      const kebabRegex = new RegExp(`\\b${kebabName}\\b`);
      isUsed = kebabRegex.test(source);
    }

    if (isUsed) {
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
  const compSource = options.componentsFrom ?? 'elk-components';
  const hooksSource = options.hooksFrom ?? 'elk-components/hooks';

  return {
    name: 'component-auto-import',
    enforce: 'pre', // Process source strings before Vite compiles JSX
    transform(code: string, id: string) {
      // Intercept file extensions running JSX evaluations
      if (!id.endsWith('.tsx') && !id.endsWith('.jsx')) return null;
      if (id.includes('node_modules')) return null;
      if (id.includes('/src/lib/') || id.includes('/src/icons/') || id.includes('/src/hooks/')) return null;

      // Scan components passing 'true' to translate kebab-casing mutations automatically
      const usedComponents = findUsed(code, COMPONENTS, true);
      const usedHooks = findUsed(code, HOOKS, false);

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
        map: null, // Avoid breaking source maps in dev tools
      };
    },
  };
}
