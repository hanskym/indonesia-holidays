export default function Home() {
  return (
    <div className="bg-gray-200 font-sans leading-normal tracking-normal">
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-6 text-4xl font-bold">We&apos;re launching soon</h1>
            <p className="mb-12 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur mollis ultricies
              rhoncus. Quisque a vestibulum erat. Donec eu elementum urna. Sed eget eros id turpis
              rutrum sollicitudin. Sed quis iaculis odio. Morbi id neque at turpis laoreet semper
              sit amet vitae turpis. Mauris fermentum venenatis metus in vehicula. Donec sit amet
              fringilla lorem. Maecenas sit amet pretium orci. Nullam maximus, ex sit amet tincidunt
              egestas, quam mi feugiat massa, vel luctus tellus diam ac quam.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-200 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 text-3xl font-bold">What to expect</h2>
            <p className="mb-12 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec orci quis justo
              aliquam euismod eget a leo. Sed eget orci feugiat, porttitor nibh vel, faucibus
              mauris.
            </p>
          </div>
          <div className="-mx-4 mt-12 flex flex-wrap">
            <div className="mb-8 w-full px-4 md:w-1/3">
              <div className="rounded-md bg-white p-8 shadow-md">
                <div className="mb-4 text-4xl font-bold text-purple-600">01</div>
                <h3 className="mb-4 text-2xl font-bold">Feature 1</h3>
                <p className="mb-4 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec orci quis justo
                  aliquam euismod eget a leo.
                </p>
              </div>
            </div>
            <div className="mb-8 w-full px-4 md:w-1/3">
              <div className="rounded-md bg-white p-8 shadow-md">
                <div className="mb-4 text-4xl font-bold text-purple-600">02</div>
                <h3 className="mb-4 text-2xl font-bold">Feature 2</h3>
                <p className="mb-4 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec orci quis justo
                  aliquam euismod eget a leo.
                </p>
              </div>
            </div>

            <div className="mb-8 w-full px-4 md:w-1/3">
              <div className="rounded-md bg-white p-8 shadow-md">
                <div className="mb-4 text-4xl font-bold text-purple-600">03</div>
                <h3 className="mb-4 text-2xl font-bold">Feature 3</h3>
                <p className="mb-4 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec orci quis justo
                  aliquam euismod eget a leo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
