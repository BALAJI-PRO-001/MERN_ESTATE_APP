export default function CreateListing() {
  return (
    <main>
      <h1 className="text-3xl font-semibold text-center my-7 text-gray-700">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row max-w-4xl mx-auto">
        <div className="flex flex-col gap-4 flex-1">
          <input
            id="name"
            type="text"
            placeholder="Name . . . ."
            className="border p-3 rounded-lg outline-none focus:border-green-600 focus:outline-none"
            maxLength="65"
            minLength="10"
            required
          />
          <textarea
            id="description"
            type="text"
            placeholder="Description . . . ."
            className="border p-3 rounded-lg outline-none focus:border-green-600 focus:outline-none"
            required
          ></textarea>
          <textarea
            id="address"
            type="text"
            placeholder="Address . . . ."
            className="border p-3 rounded-lg outline-none focus:border-green-600 focus:outline-none"
            required
          ></textarea>
        </div>
      </form>
    </main>
  );
}
