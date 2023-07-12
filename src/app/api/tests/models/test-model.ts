import prisma, { QuestionType as QuestionTypeDB } from "@/lib/prisma";
import { CreateTestDTO, QuestionType } from "@/shared/dtos/test-dto";

export class TestModel {
  private dto: CreateTestDTO;

  constructor(dto: CreateTestDTO) {
    this.dto = dto;
  }

  async create() {
    return prisma.test.create({
      data: {
        title: "Your Test Title",
        description: "Your Test Description",
      },
    });
  }
}
