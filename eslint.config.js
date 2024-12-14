import eslint from '@eslint/js'
import eslintImport from 'eslint-plugin-import'
import eslintSimpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintJsdoc from 'eslint-plugin-jsdoc'
import tsEslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tsEslint.config(
  eslint.configs.recommended,
  tsEslint.configs.recommendedTypeChecked,
  tsEslint.configs.stylisticTypeChecked,
  eslintImport.flatConfigs.recommended,
  eslintImport.flatConfigs.typescript,
  eslintJsdoc.configs['flat/contents-typescript-error'],
  eslintJsdoc.configs['flat/logical-typescript-error'],
  eslintConfigPrettier,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'simple-import-sort': eslintSimpleImportSort,
      jsdoc: eslintJsdoc,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'jsdoc/no-undefined-types': 'error',
      'jsdoc/check-tag-names': 'off',
      'jsdoc/check-template-node': 'off',
      'jsdoc/informative-docs': 'off',
      eqeqeq: 'error',
      'no-cond-assign': 'error',
      'no-class-assign': 'error',
      'no-const-assign': 'error',
      'accessor-pairs': 'warn',
    },
  },
)
