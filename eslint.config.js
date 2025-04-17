import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

import fs from 'fs'
import path from 'path'

import js from '@eslint/js'
import pluginVitest from '@vitest/eslint-plugin'
import pluginVue from 'eslint-plugin-vue'

const autoImportJson = JSON.parse(
  fs.readFileSync(path.resolve('.eslintrc-auto-import.json'), 'utf8'),
)

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },
  skipFormatting,
  {
    languageOptions: {
      globals: autoImportJson.globals,
    },
  },
  {
    rules: {
      'vue/attribute-hyphenation': [
        'off',
        {
          ignore: [],
          ignoreTags: [],
        },
      ],
    },
  },
]
