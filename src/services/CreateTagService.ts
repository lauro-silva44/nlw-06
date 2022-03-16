import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService {
  async execute(name: string) {
    const tagRepositories = getCustomRepository(TagsRepositories);

    if (!name) {
      throw new Error("NAME INCORRECT!");
    }

    const alreadyExists = await tagRepositories.findOne({ name });

    if (alreadyExists) {
      throw new Error("TAG ALREADY EXISTS!");
    }

    const tag = tagRepositories.create({ name });
    await tagRepositories.save(tag);

    return tag;
  }
}

export { CreateTagService };
