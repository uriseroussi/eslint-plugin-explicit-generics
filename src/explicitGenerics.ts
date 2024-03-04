import { ESLintUtils } from '@typescript-eslint/utils';

type MessageIds = 'default';

type Options = string[];

const createRule = ESLintUtils.RuleCreator(
  () =>
    'https://github.com/uriseroussi/eslint-plugin-explicit-generics?tab=readme-ov-file#eslint-plugin-explicit-generics'
);

// Type: RuleModule<"uppercase", ...>
export const explicitGenerics = createRule<Options, MessageIds>({
  name: 'explicit-generics',
  meta: {
    docs: {
      description:
        'Enforces that certain functions must have their TypeScript generics inputs be provided',
    },
    messages: {
      default: 'Should include generics in function call',
    },
    type: 'problem',
    schema: {
      type: 'array',
      items: [
        {
          type: 'string',
        },
      ],
      uniqueItems: true,
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === 'Identifier' &&
          context.options.includes(node.callee.name)
        ) {
          if (!node.typeArguments) {
            context.report({
              messageId: 'default',
              node: node.callee,
            });
          }
        }
      },
    };
  },
});
