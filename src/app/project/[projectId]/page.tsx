type Props = {
  params: Promise<{ projectId: string }>;
};

const page = async ({ params }: Props) => {
  const projectId = (await params).projectId;

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <h2>Project: </h2>
      <p>{projectId}</p>
      <p>{projectId}</p>
    </div>
  );
};

export default page;
