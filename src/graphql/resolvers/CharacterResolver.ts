import { ResolverInterface, Resolver, Query, Arg, FieldResolver, Root } from "type-graphql";
import { CharacterNode, PowerNode } from "../types";

@Resolver(() => CharacterNode)
export class CharacterResolver implements ResolverInterface<CharacterNode> {
  @Query(() => [CharacterNode], {description: "Get all the characters in marvel universe"})
  async allCharacters() {
    return []
  }

  @FieldResolver()
  async powers(
    @Root() parent: CharacterNode
  ): Promise<PowerNode[]> {
    return []
  }
}