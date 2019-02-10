import { ObjectType, Field } from 'type-graphql';
import { CharacterNode } from './CharacterNode';

@ObjectType({ description: 'A character in the marvel universe' })
export class TeamNode {
  @Field()
  identifier: string;

  @Field()
  name: string;

  @Field()
  createdOn: Date;

  @Field()
  updatedOn: Date;

  @Field(() => CharacterNode)
  characters: CharacterNode[]
}
