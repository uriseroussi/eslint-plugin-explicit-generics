import { ESLintUtils } from '@typescript-eslint/utils';

type MessageIds = 'default';

type Options = { functionNames: string[] }[];

const createRule = ESLintUtils.RuleCreator(
  () =>
    'https://github.com/uriseroussi/eslint-plugin-explicit-generics?tab=readme-ov-file#eslint-plugin-explicit-generics'
);

export const explicitGenerics = createRule<Options, MessageIds>({
  name: 'explicit-generics',
  meta: {
    docs: {
      description:
        'Enforces that certain functions must have their TypeScript generics inputs be provided',
    },
    messages: {
      default: "'{{callee}}' should include generics in function call",
    },
    type: 'problem',
    schema: [
      {
        type: 'object',
        properties: {
          functionNames: {
            type: 'array',
            items: [
              {
                type: 'string',
              },
            ],
            uniqueItems: true,
          },
        },
      },
    ],
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === 'Identifier' &&
          context.options[0]!.functionNames.includes(node.callee.name)
        ) {
          if (!node.typeArguments) {
            context.report({
              messageId: 'default',
              data: { callee: node.callee.name },
              node: node.callee,
            });
          }
        }
      },
    };
  },
});
