import { Field, ID, ObjectType } from '@nestjs/graphql';

import { GraphQLScalarType } from 'graphql/type';

@ObjectType({ isAbstract: true })
export class Abstract {
  @Field((): GraphQLScalarType<string, string> => ID)
  public id: number | undefined;
}
