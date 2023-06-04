import { TestDTO, TestsRepository } from "@/repositories/tests";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps<{
  tests: TestDTO[];
}> = async () => {
  const repository = new TestsRepository();
  const tests = await repository.getAll();

  return {
    props: { tests },
    revalidate: 60,
  };
};

export default function Tests(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { tests } = props;
  return (
    <div>
      <h1>Tests</h1>
      <pre>{JSON.stringify(tests, null, 2)}</pre>
    </div>
  );
}
