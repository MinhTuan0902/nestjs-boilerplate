import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLFormattedError } from 'graphql';
import { join } from 'path';

const isProduction = process.env.NODE_ENV === 'production';

export const getApolloDriverConfig = (): ApolloDriverConfig => {
  return {
    driver: ApolloDriver,
    path: 'api/graphql',
    playground: !isProduction,
    autoSchemaFile: {
      path: join(process.cwd(), 'graphql/schema.gql'),
    },
    definitions: {
      path: join(process.cwd(), 'generated/graphql.ts'),
    },
    formatError: (
      formattedError: GraphQLFormattedError,
    ): GraphQLFormattedError => {
      if (isProduction) {
        delete formattedError.extensions.stacktrace;
      }
      return formattedError;
    },
    introspection: true,
  };
};
