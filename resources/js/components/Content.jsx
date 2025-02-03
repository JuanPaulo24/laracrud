function Content() {
    return (
        <div className="flex justify-between w-screen px-16 mx-auto container">
            <div className="max-w-xl pt-14">
                <h1 className="text-4xl font-bold text-indigo-900 sm:text-5xl lg:text-6xl tracking-wide">
                    BUSINESS
                    <br />
                    LANDING PAGE
                </h1>
                <p className="mt-6 text-lg leading-5 text-indigo-950 w-[300px] tracking-wide">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do diam nanummy aibh suismed
                    tineidunt i laoreet delore.
                </p>
                <div className="mt-8">
                    <button className="w-[150px] bg-gradient-to-r from-indigo-700 to-blue-300 text-white tracking-widest px-6 py-2 rounded-full text-sm font-bold shadow-md cursor-pointer">
                        More Info
                    </button>
                </div>
            </div>

            <div className="hidden lg:block pt-14 pr-16 z-10">
                <img
                    src="/images/content-image.png"
                    alt="Business team collaboration"
                    className="w-[550px] object-contain"
                />
            </div>

            <div className="absolute inset-x-0 bottom-0">
                <svg
                    className="w-full"
                    height="400"
                    viewBox="0 0 1440 400"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0 400L1440 400L1440 0C1440 0 1200 300 960 300C720 300 720 150 480 150C240 150 240 350 0 350L0 400Z"
                        fill="#4361EE"
                        opacity="0.95"
                    />
                </svg>
            </div>
        </div>
    )
}

export default Content
