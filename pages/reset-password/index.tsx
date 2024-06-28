export default function ResetPassword(){
    return(
            <section className="relative">
                <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 dark:hidden">
                    <img
                        className="h-full w-full"
                        src="/images/gradient.jpg"
                        alt="gradient"
                    />
                    </picture>
                    <picture className="pointer-events-none absolute inset-x-0 top-0 -z-10 hidden dark:block">
                    <img
                        className="h-full w-full"
                        src="/images/gradient_dark.jpg"
                        alt="gradient dark"
                    />
                </picture>
                <div className="container  py-20">
                    <h1 className="font-display text-jacarta-700 py-10 text-center text-4xl font-medium dark:text-white">
                        New Password
                    </h1>
                    <div className="mx-auto max-w-[24rem]">
                        <div className="mb-6">
                            <label
                                htmlFor="item-pass"
                                className="font-display text-jacarta-700 mb-2 block dark:text-white"
                            >
                                Password<span className="text-red">*</span>
                            </label>
                            <input
                                type="password"
                                id="item-pass"
                                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="item-pass1"
                                className="font-display text-jacarta-700 mb-2 block dark:text-white"
                            >
                                Password Conformation<span className="text-red">*</span>
                            </label>
                            <input
                                type="password"
                                id="item-pass1"
                                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="flex flex-row gap-5 items-center">
                            <button
                                className="bg-accent-lighter border-2 text-black cursor-default rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
                                >
                                Reset Password
                            </button>
                        </div>
                    </div>
                </div>
            </section>
    )
}