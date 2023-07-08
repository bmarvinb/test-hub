export const TestsTable = () => {
  return (
    <div className="border rounded-lg">
      <div>
        <div className="px-4 rounded-t-lg py-6 font-semibold border-b bg-gray-50">
          Title
        </div>
        <div className="px-4 py-4 border-b hover:bg-gray-50 cursor-pointer">
          Test 1
        </div>
        <div className="px-4 py-4 border-b hover:bg-gray-50 cursor-pointer">
          Test 2
        </div>
        <div className="px-4 py-4 border-b hover:bg-gray-50 cursor-pointer">
          Test 3
        </div>
        <div className="px-4 py-4 border-b hover:bg-gray-50 cursor-pointer">
          Test 4
        </div>
        <div className="px-4 py-4 border-b hover:bg-gray-50 cursor-pointer">
          Test 5
        </div>
      </div>

      <div className="flex gap-4 justify-center px-4 py-6">
        <div>Prev</div>
        <div className="font-bold">1</div>
        <div>2</div>
        <div>3</div>
        <div>Next</div>
      </div>
    </div>
  );
};
