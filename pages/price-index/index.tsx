import Graph from "../../components/Graph";

export default function PageIndex(){
    return(
        <section className="relative my-24">
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
            <div className="grid grid-cols-2 gap-10">
                <Graph data="Average House Sales"/>
                <Graph data="Median List Price"/>
                <Graph data="Average Vacancy Rate"/>
                <Graph data="Average 30 Year Mortgage Rate"/>
                {/* <Graph data=""/> */}
            </div>
        </section>
    )
}