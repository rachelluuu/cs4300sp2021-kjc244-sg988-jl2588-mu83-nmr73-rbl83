function InputForm() {
  return (
    <div className="InputForm container mx-auto px-10 pt-20">
      <div class="mb-3 pt-0">
        <form class="grid grid-cols-4 gap-4 pb-10">
          <div class="col-span-2">
            <input type="text" placeholder="Placeholder" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
          </div>
          <div>
            <input type="text" placeholder="Placeholder" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
          </div>
          <div>
            <input type="text" placeholder="Placeholder" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
          </div>
        </form>
        <button class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
          Large
          </button>
      </div>

    </div>
  );
}

export default InputForm;
